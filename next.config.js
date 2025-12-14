/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 确保静态资源使用相对路径
  assetPrefix: '',
  // 个人主页部署在根域名，不需要 basePath
}

module.exports = nextConfig