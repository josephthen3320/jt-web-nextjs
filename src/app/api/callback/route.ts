import { NextRequest, NextResponse } from 'next/server';

/**
 * Second leg of the Sveltia CMS GitHub login: exchanges the authorization code
 * for an access token and hands it back to the CMS window using the same
 * postMessage handshake Netlify/Decap CMS uses ("authorizing:github").
 */
export const dynamic = 'force-dynamic';

const STATE_COOKIE = 'cms_oauth_state';

/** Token or error message is embedded as a JS string literal; escape `<`. */
function handshakePage(message: string, status = 200) {
    const payload = JSON.stringify(message).replace(/</g, '\\u003c');
    return new NextResponse(
        `<!doctype html><html><body><script>
(function () {
    var payload = ${payload};
    function receiveMessage(event) {
        if (event.data === 'authorizing:github' && window.opener) {
            window.opener.postMessage(payload, event.origin);
        }
    }
    window.addEventListener('message', receiveMessage, false);
    if (window.opener) window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`,
        {
            status,
            headers: {
                'Content-Type': 'text/html; charset=utf-8',
                'Cache-Control': 'no-store',
            },
        }
    );
}

export async function GET(request: NextRequest) {
    const { searchParams, origin } = request.nextUrl;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const expectedState = request.cookies.get(STATE_COOKIE)?.value;

    if (!code) {
        const reason = searchParams.get('error_description') ?? 'GitHub did not return an authorization code';
        return handshakePage(`authorization:github:error:${JSON.stringify({ message: reason })}`, 400);
    }
    if (!state || !expectedState || state !== expectedState) {
        return handshakePage(
            `authorization:github:error:${JSON.stringify({ message: 'OAuth state check failed, please retry the login' })}`,
            400
        );
    }

    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
        return handshakePage(
            `authorization:github:error:${JSON.stringify({ message: 'OAuth client is not configured on this deployment' })}`,
            500
        );
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
            redirect_uri: `${origin}/api/callback`,
        }),
    });

    const token = (await tokenResponse.json()) as {
        access_token?: string;
        error_description?: string;
    };

    if (!token.access_token) {
        const reason = token.error_description ?? 'GitHub rejected the token exchange';
        return handshakePage(`authorization:github:error:${JSON.stringify({ message: reason })}`, 502);
    }

    const response = handshakePage(
        `authorization:github:success:${JSON.stringify({ token: token.access_token, provider: 'github' })}`
    );
    // Clear the one-time state so it cannot be replayed.
    response.cookies.set(STATE_COOKIE, '', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/api',
        maxAge: 0,
    });
    return response;
}
