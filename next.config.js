await import("./src/env.js")

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.famlam.ca",
      },
      {
        protocol: "https",
        hostname: "utfs.io",
      },
    ],
  },
}

export default config
