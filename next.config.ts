import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    domains: [
      "localhost",
      "images.unsplash.com",
      "icon2.cleanpng.com",
      "http://localhost:8080/public/logos",
    ],
  },
  turbopack: {},
  fallbacks: {
    document: "/offline",
  },
};

export default withPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
