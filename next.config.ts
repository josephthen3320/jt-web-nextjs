import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // Sveltia CMS lives in public/admin/index.html. Next serves that file
        // only at /admin/index.html, but the CMS resolves config.yml relative
        // to the page URL, so send visitors there (not a rewrite).
        source: "/admin",
        destination: "/admin/index.html",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
