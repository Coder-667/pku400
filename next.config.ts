import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pku400",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
