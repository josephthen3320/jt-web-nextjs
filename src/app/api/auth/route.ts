import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';

/**
 * First leg of the Sveltia CMS GitHub login. The CMS opens this route in a
 * popup; we bounce it to GitHub and keep a one-time `state` in a cookie so the
 * callback can prove the round trip started here.
 *
 * Requires GITHUB_OAUTH_CLIENT_ID (and GITHUB_OAUTH_CLIENT_SECRET for the
 * callback) in the deployment environment.
 */
export const dynamic = 'force-dynamic';

const STATE_COOKIE = 'cms_oauth_state';

export async function GET(request: NextRequest) {
    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    if (!clientId) {
        return NextResponse.json(
            { error: 'GITHUB_OAUTH_CLIENT_ID is not set for this deployment' },
            { status: 500 }
        );
    }

    // Derive the callback from the host serving this request, so preview and
    // production deployments both work as long as the OAuth App allows them.
    const redirectUri = `${request.nextUrl.origin}/api/callback`;
    const state = randomBytes(16).toString('hex');

    const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
    authorizeUrl.searchParams.set('client_id', clientId);
    authorizeUrl.searchParams.set('redirect_uri', redirectUri);
    // `repo` covers commits and pull requests (used by editorial_workflow) on
    // both public and private repositories.
    authorizeUrl.searchParams.set('scope', request.nextUrl.searchParams.get('scope') ?? 'repo');
    authorizeUrl.searchParams.set('state', state);

    const response = NextResponse.redirect(authorizeUrl);
    response.cookies.set(STATE_COOKIE, state, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/api',
        maxAge: 600,
    });
    return response;
}
