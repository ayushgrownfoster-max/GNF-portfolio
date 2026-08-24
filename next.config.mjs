/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add your WordPress media host(s) here once the CMS is live, e.g.
    // { protocol: 'https', hostname: 'cms.grownfoster.com', pathname: '/wp-content/uploads/**' }
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cms.grownfoster.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;
