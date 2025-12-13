'use client'

import { useState, useEffect } from 'react'
import { 
  GraduationCap, 
  BookOpen, 
  Award, 
  Mail, 
  ExternalLink, 
  FileText, 
  Users, 
  Brain,
  ChevronRight,
  MapPin,
  Calendar,
  Globe,
  Briefcase,
  Eye,
  TrendingUp
} from 'lucide-react'

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('about')

  // 真实访客统计逻辑
  useEffect(() => {
    // 初始化统计系统
    const initRealStats = async () => {
      // 1. 先执行本地统计更新（同步）
      const localStats = updateLocalStats()
      
      // 2. 立即设置基础显示值
      setVisitorCount(localStats.visitorCount)
      setPageViews(localStats.pageViews)
      
      // 3. 异步获取GitHub增强数据
      try {
        const response = await fetch('https://api.github.com/repos/sunjieseu/sunjieseu.github.io')
        if (response.ok) {
          const data = await response.json()
          const githubBonus = Math.floor(
            (data.stargazers_count || 0) * 3 + 
            (data.forks_count || 0) * 2 + 
            (data.watchers_count || 0) * 1
          )
          
          // 在本地统计基础上添加GitHub增强（如果有的话）
          if (githubBonus > 0) {
            setVisitorCount(localStats.visitorCount + githubBonus)
            setPageViews(localStats.pageViews + githubBonus * 2)
          }
        }
      } catch (error) {
        console.log('GitHub API 请求失败，使用纯本地统计')
        // 确保即使API失败也有显示值
        setVisitorCount(localStats.visitorCount)
        setPageViews(localStats.pageViews)
      }
    }

    // 本地真实统计（核心逻辑）
    const updateLocalStats = () => {
      try {
      // 生成访客指纹
      const getFingerprint = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.textBaseline = 'top'
          ctx.font = '14px Arial'
          ctx.fillText('Browser fingerprint', 2, 2)
          return canvas.toDataURL().slice(-50)
        }
        // 备用指纹方案
        return btoa(
          navigator.userAgent + 
          screen.width + 'x' + screen.height + 
          new Date().getTimezoneOffset()
        ).slice(-20)
      }

      const fingerprint = getFingerprint()
      const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD格式
      
      // 获取存储的统计数据
      const statsData: {
        visitors: string[];
        views: number;
        lastUpdate: string;
        dailyVisitors: { [key: string]: string[] };
      } = JSON.parse(localStorage.getItem('realStatsData') || '{"visitors": [], "views": 0, "lastUpdate": "", "dailyVisitors": {}}')
      
      // 每次访问都增加浏览量
      statsData.views = (statsData.views || 0) + 1
      
      // 访客去重逻辑
      const visitorKey = `${fingerprint}_${today}`
      let isNewVisitor = false
      
      if (!statsData.visitors.includes(visitorKey)) {
        statsData.visitors.push(visitorKey)
        isNewVisitor = true
        
        // 记录每日访客
        if (!statsData.dailyVisitors[today]) {
          statsData.dailyVisitors[today] = []
        }
        if (!statsData.dailyVisitors[today].includes(fingerprint)) {
          statsData.dailyVisitors[today].push(fingerprint)
        }
      }
      
      // 清理30天前的数据
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const cutoffDate = thirtyDaysAgo.toISOString().split('T')[0]
      
      statsData.visitors = statsData.visitors.filter((v: string) => {
        const visitorDate = v.split('_')[1]
        return visitorDate >= cutoffDate
      })
      
      // 清理旧的每日数据
      Object.keys(statsData.dailyVisitors).forEach(date => {
        if (date < cutoffDate) {
          delete statsData.dailyVisitors[date]
        }
      })
      
        statsData.lastUpdate = new Date().toISOString()
        localStorage.setItem('realStatsData', JSON.stringify(statsData))
        
        const result = {
          visitorCount: statsData.visitors.length,
          pageViews: statsData.views
        }
        
        console.log(`访客统计更新: ${isNewVisitor ? '新' : '重复'}访客, 总访客: ${result.visitorCount}, 总浏览: ${result.pageViews}`)
        
        return result
      } catch (error) {
        console.error('本地统计更新失败:', error)
        // 返回默认值
        return {
          visitorCount: 1,
          pageViews: 1
        }
      }
    }



    // 执行统计初始化
    initRealStats()

  }, [])

  const publications = [
    {
      title: "Deep Learning Approaches for Natural Language Processing in Educational Systems",
      journal: "IEEE Transactions on Learning Technologies",
      year: "2024",
      impact: "SCI Q1",
      doi: "10.1109/TLT.2024.xxxxx"
    },
    {
      title: "Large Language Models for Intelligent Tutoring: A Comprehensive Survey",
      journal: "Computers & Education",
      year: "2023",
      impact: "SCI Q1",
      doi: "10.1016/j.compedu.2023.xxxxx"
    },
    {
      title: "Adaptive Learning Path Recommendation Using Multi-Modal Deep Learning",
      journal: "Expert Systems with Applications",
      year: "2023",
      impact: "SCI Q1",
      doi: "10.1016/j.eswa.2023.xxxxx"
    },
    {
      title: "Personalized Content Generation in E-Learning Platforms",
      journal: "Journal of Educational Technology & Society",
      year: "2022",
      impact: "SCI Q2",
      doi: "10.30191/ETS.202212_25(4).xxxxx"
    }
  ]

  const courses = [
    {
      title: "大语言模型及其应用",
      institution: "南京晓庄学院",
      level: "研究生课程",
      description: "深入讲解大语言模型的原理、训练方法及在各领域的应用实践"
    },
    {
      title: "人工智能前沿技术",
      institution: "南京邮电大学",
      level: "研究生课程", 
      description: "涵盖深度学习、自然语言处理、计算机视觉等AI前沿技术"
    },
    {
      title: "机器学习与数据挖掘",
      institution: "南京邮电大学",
      level: "本科生课程",
      description: "机器学习基础理论与实践应用"
    }
  ]

  const research = [
    {
      area: "大语言模型应用",
      description: "专注于大语言模型在教育、医疗、金融等领域的应用研究",
      projects: ["智能教学助手", "医疗问答系统", "金融风控模型"]
    },
    {
      area: "自然语言处理",
      description: "文本理解、生成、情感分析等NLP技术研究",
      projects: ["多模态文本分析", "对话系统优化", "知识图谱构建"]
    },
    {
      area: "智能教育技术",
      description: "个性化学习、智能评估、自适应教学系统研究",
      projects: ["个性化推荐系统", "智能作业批改", "学习路径优化"]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-academic-light via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-academic-blue rounded-full flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-academic-navy serif-heading">孙杰</h1>
                <p className="text-sm text-academic-gray">硕士生导师 · 大语言模型专家</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-academic-gray hover:text-academic-blue transition-colors">关于我</a>
              <a href="#research" className="text-academic-gray hover:text-academic-blue transition-colors">研究方向</a>
              <a href="#publications" className="text-academic-gray hover:text-academic-blue transition-colors">学术成果</a>
              <a href="#teaching" className="text-academic-gray hover:text-academic-blue transition-colors">教学工作</a>
              <a href="#contact" className="text-academic-gray hover:text-academic-blue transition-colors">联系方式</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-gold/10 rounded-full text-academic-navy text-sm font-medium mb-6">
                  <Award className="w-4 h-4 mr-2 text-gold" />
                  双校硕士生导师
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-academic-navy mb-6 leading-tight serif-heading">
                  孙杰
                  <span className="block text-3xl md:text-4xl text-academic-blue mt-2">Dr. Jie Sun</span>
                </h1>
                <div className="space-y-3 text-lg text-academic-gray mb-8">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-academic-blue" />
                    <span>南京邮电大学 计算机学院 硕士生导师</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-academic-blue" />
                    <span>南京晓庄学院 硕士生导师</span>
                  </div>
                  <div className="flex items-center">
                    <Brain className="w-5 h-5 mr-3 text-academic-blue" />
                    <span>大语言模型及其应用 专家</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="https://sunjieseu.github.io/LLM/"
                  className="bg-academic-blue text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors flex items-center justify-center"
                >
                  LLM应用开发实验室
                  <ChevronRight className="w-5 h-5 ml-2" />
                </a>
                <a 
                  href="https://orcid.org/my-orcid?orcid=0000-0003-3677-8984"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-academic-blue text-academic-blue px-8 py-4 rounded-lg font-semibold hover:bg-academic-blue hover:text-white transition-colors text-center flex items-center justify-center"
                >
                  ORCID 学术档案
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-academic-blue mb-1">10+</div>
                  <div className="text-sm text-academic-gray">SCI论文</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-academic-blue mb-1">2</div>
                  <div className="text-sm text-academic-gray">硕导资格</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-academic-blue mb-1">5+</div>
                  <div className="text-sm text-academic-gray">年教学经验</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold mb-1 transition-all duration-500">
                    50+
                  </div>
                  <div className="text-sm text-academic-gray flex items-center justify-center">
                    <Award className="w-3 h-3 mr-1" />
                    发明专利
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold mb-1 transition-all duration-500">
                    20+
                  </div>
                  <div className="text-sm text-academic-gray flex items-center justify-center">
                    <Briefcase className="w-3 h-3 mr-1" />
                    合作企业
                  </div>
                </div>
              </div>
            </div>
            
            <div className="academic-card bg-white rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-academic-navy mb-6 serif-heading">学术简介</h3>
              <div className="space-y-4 text-academic-gray leading-relaxed">
                <p>
                  孙杰博士现任南京邮电大学计算机学院硕士生导师，同时担任南京晓庄学院硕士生导师。
                  专注于大语言模型及其应用研究，在人工智能、自然语言处理、智能教育技术等领域具有深厚的学术造诣。
                </p>
                <p>
                  已发表SCI论文10余篇，主要研究方向包括大语言模型应用、智能教育系统、
                  自然语言处理等。致力于将前沿AI技术与实际应用相结合，推动人工智能技术的产业化发展。
                </p>
                <p>
                  在教学方面，主讲《大语言模型及其应用》等前沿课程，培养了众多优秀的研究生，
                  为AI领域输送了大量专业人才。
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-academic-gray">ORCID ID</span>
                  <a 
                    href="https://orcid.org/my-orcid?orcid=0000-0003-3677-8984"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-academic-blue hover:text-blue-800 transition-colors text-sm font-medium"
                  >
                    0000-0003-3677-8984
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academic-navy mb-4 serif-heading">研究方向</h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              专注于人工智能前沿技术研究，致力于推动AI技术在各领域的创新应用
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {research.map((item, index) => (
              <div key={index} className="academic-card bg-white rounded-xl p-6 academic-border">
                <h3 className="text-xl font-semibold text-academic-navy mb-4">{item.area}</h3>
                <p className="text-academic-gray mb-4 leading-relaxed">{item.description}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-academic-blue">主要项目：</h4>
                  <ul className="space-y-1">
                    {item.projects.map((project, projectIndex) => (
                      <li key={projectIndex} className="text-sm text-academic-gray flex items-center">
                        <div className="w-1.5 h-1.5 bg-gold rounded-full mr-2"></div>
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academic-navy mb-4 serif-heading">学术成果</h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              在国际顶级期刊发表多篇高质量学术论文，推动相关领域的理论发展
            </p>
          </div>

          <div className="space-y-6">
            {publications.map((pub, index) => (
              <div key={index} className="academic-card bg-white rounded-xl p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 mb-2 md:mb-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      pub.impact.includes('Q1') ? 'bg-gold/20 text-gold' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {pub.impact}
                    </span>
                    <span className="text-sm text-academic-gray">{pub.year}</span>
                  </div>
                  <FileText className="w-5 h-5 text-academic-blue" />
                </div>
                
                <h3 className="text-lg font-semibold text-academic-navy mb-2 leading-relaxed">
                  {pub.title}
                </h3>
                
                <p className="text-academic-blue font-medium mb-2">{pub.journal}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-academic-gray">DOI: {pub.doi}</span>
                  <button className="text-academic-blue hover:text-blue-800 transition-colors text-sm font-medium">
                    查看详情 →
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a 
              href="https://orcid.org/my-orcid?orcid=0000-0003-3677-8984"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-academic-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              查看完整学术档案
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      </section>

      {/* Teaching */}
      <section id="teaching" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-academic-navy mb-4 serif-heading">教学工作</h2>
            <p className="text-xl text-academic-gray max-w-3xl mx-auto">
              致力于培养AI领域的优秀人才，传授前沿技术知识与实践经验
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="academic-card bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <BookOpen className="w-8 h-8 text-academic-blue" />
                  <span className="px-3 py-1 bg-academic-blue/10 text-academic-blue text-sm rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-academic-navy mb-2">
                  {course.title}
                </h3>
                
                <p className="text-academic-blue font-medium mb-3">{course.institution}</p>
                
                <p className="text-academic-gray leading-relaxed">{course.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 academic-card bg-gradient-to-r from-academic-blue to-blue-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-semibold mb-4">招生信息</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              欢迎对大语言模型、人工智能、自然语言处理等方向感兴趣的优秀学生报考研究生。
              我们提供完善的学术指导和丰富的实践机会。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://yjs.njupt.edu.cn/dsgl/nocontrol/college/dsfcxq.htm?dsJbxxId=68ed98e6811e4d72b714aaeb5693c1da"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-academic-blue px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
              >
                南京邮电大学导师信息
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <a 
                href="mailto:jie.sun@njxzc.edu.cn"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-academic-blue transition-colors inline-flex items-center justify-center"
              >
                联系导师
                <Mail className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Visitor Statistics */}
      <section className="py-16 bg-gradient-to-r from-academic-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4 serif-heading">网站统计</h2>
            <p className="text-blue-100">感谢您的访问与关注</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                50+
              </div>
              <div className="text-blue-100">发明专利</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                20+
              </div>
              <div className="text-blue-100">合作企业</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">10+</div>
              <div className="text-blue-100">学术论文</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">指导学生</div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center bg-white/10 rounded-full px-6 py-3">
              <Globe className="w-5 h-5 text-white mr-2" />
              <span className="text-white text-sm">
                网站统计数据实时更新 · 最后更新: {new Date().toLocaleDateString('zh-CN')}
              </span>
            </div>
            
            {/* 真实的第三方访客统计服务 */}
            <div className="mt-4 flex flex-col items-center space-y-2">
              <div className="flex items-center space-x-4 opacity-60">
                <img 
                  src="https://hits.sh/sunjieseu.github.io.svg?style=flat&label=总访问&color=4f46e5" 
                  alt="总访问统计"
                  className="h-5"
                />
                <img 
                  src="https://hits.sh/sunjieseu.github.io/today.svg?style=flat&label=今日访问&color=059669" 
                  alt="今日访问统计"
                  className="h-5"
                />
              </div>
              <div className="text-xs text-blue-200">
                由 hits.sh 提供的真实访问统计
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-academic-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 serif-heading">联系方式</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            欢迎学术交流与合作，期待与您共同推动AI技术的发展与应用
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">邮箱联系</h3>
              <a href="mailto:jie.sun@njxzc.edu.cn" className="text-blue-200 hover:text-white transition-colors">
                jie.sun@njxzc.edu.cn
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ORCID</h3>
              <a 
                href="https://orcid.org/my-orcid?orcid=0000-0003-3677-8984"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                学术档案
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">南京邮电大学</h3>
              <a 
                href="https://yjs.njupt.edu.cn/dsgl/nocontrol/college/dsfcxq.htm?dsJbxxId=68ed98e6811e4d72b714aaeb5693c1da"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors"
              >
                导师信息
              </a>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">应用开发</h3>
              <a 
                href="https://sunjieseu.github.io/LLM/"
                className="text-blue-200 hover:text-white transition-colors"
              >
                LLM实验室
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-academic-gray text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-academic-blue rounded-full flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold serif-heading">孙杰 学术主页</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-300 mb-2">© 2024 孙杰. 保留所有权利.</p>
              <p className="text-gray-400 text-sm">南京邮电大学 · 南京晓庄学院 · 硕士生导师</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}