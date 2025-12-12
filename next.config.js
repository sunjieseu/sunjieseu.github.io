/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 个人主页不需要 basePath，因为它部署在根域名
}

module.exports = nextConfig