import withPWA from "@ducanh2912/next-pwa";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler:{
    removeConsole: process.env.NODE_ENV !== "development",
  },
  turbopack: {},
  fallbacks:{
      document: "/offline",
    } 
};

export default withPWA({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
