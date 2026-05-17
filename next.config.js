import { execSync } from "child_process";

function getAppVersion() {
  try {
    return execSync("git describe --tags --always --dirty", {
      encoding: "utf-8",
      cwd: process.cwd(),
    }).trim();
  } catch {
    return "unknown";
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_APP_VERSION:
      process.env.APP_VERSION ||
      (process.env.VERCEL_GIT_COMMIT_SHA
        ? process.env.VERCEL_GIT_COMMIT_SHA.substring(0, 7)
        : getAppVersion()),
  },
};

export default nextConfig;
