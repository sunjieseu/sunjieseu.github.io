import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '孙杰 - 南京邮电大学/南京晓庄学院硕士生导师',
  description: '孙杰，南京邮电大学计算机学院硕士生导师，南京晓庄学院硕士生导师，专注于大语言模型及其应用研究',
  keywords: '孙杰, 硕士生导师, 南京邮电大学, 南京晓庄学院, 大语言模型, 人工智能, 学术研究',
  authors: [{ name: '孙杰' }],
  creator: '孙杰',
  publisher: '孙杰',
  openGraph: {
    title: '孙杰 - 南京邮电大学/南京晓庄学院硕士生导师',
    description: '孙杰，南京邮电大学计算机学院硕士生导师，南京晓庄学院硕士生导师，专注于大语言模型及其应用研究',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="baidu-site-verification" content="codeva-bqpfwaSrVq" />
        <link rel="canonical" href="https://sunjieseu.github.io" />
      </head>
      <body>{children}</body>
    </html>
  )
}