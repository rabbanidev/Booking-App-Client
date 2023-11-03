/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "sgp1.digitaloceanspaces.com",
      "i.travelapi.com",
    ],
  },
};

module.exports = nextConfig;
