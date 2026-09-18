import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      { source: "/products", destination: "/product/", permanent: true },
      { source: "/industries", destination: "/#business", permanent: true },
      { source: "/solutions", destination: "/#business", permanent: true },
      { source: "/solutions/:path*", destination: "/#business", permanent: true },
      { source: "/download/:path*", destination: "/?lead=download", permanent: true }
    ];
  }
};

export default nextConfig;
