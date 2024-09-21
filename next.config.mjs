/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dttcu7d3t/**", // Customize path if needed
      },
    ],
  },
};

export default nextConfig;
