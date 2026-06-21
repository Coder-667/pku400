import Link from "next/link";
import { BookOpen, Dumbbell, FileText, Target, Layers, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const subSubjects = [
  { name: "数据结构", score: "45分", weight: "约30%", color: "bg-purple-100 text-purple-800" },
  { name: "计算机组成原理", score: "45分", weight: "约30%", color: "bg-orange-100 text-orange-800" },
  { name: "操作系统", score: "35分", weight: "约23%", color: "bg-cyan-100 text-cyan-800" },
  { name: "计算机网络", score: "25分", weight: "约17%", color: "bg-pink-100 text-pink-800" },
];

const dsTopics = [
  "线性表（顺序表、链表、栈、队列）",
  "树与二叉树（遍历、BST、平衡二叉树）",
  "图（存储结构、DFS/BFS、最小生成树、最短路径、拓扑排序、关键路径）",
  "查找（顺序、折半、B树/B+树、散列表）",
  "排序（插入、交换、选择、归并、基数排序及复杂度分析）",
];

const coTopics = [
  "数据表示与运算（补码、浮点数、ALU）",
  "存储器层次结构（Cache、虚存、TLB）",
  "指令系统（寻址方式、CISC vs RISC）",
  "CPU数据通路（流水线、数据冒险/控制冒险）",
  "总线与I/O（中断、DMA、总线标准）",
];

const osTopics = [
  "进程管理（进程/线程、同步互斥、死锁）",
  "内存管理（分页/分段、虚拟内存、页面置换）",
  "文件系统（文件结构、目录、空闲空间管理）",
  "I/O管理（磁盘调度、I/O控制方式、SPOOLing）",
];

const cnTopics = [
  "物理层（奈奎斯特定理、香农定理、编码）",
  "数据链路层（CSMA/CD、MAC帧、交换机）",
  "网络层（IP、子网划分、CIDR、路由协议RIP/OSPF/BGP）",
  "传输层（TCP/UDP、流量控制、拥塞控制）",
  "应用层（DNS、HTTP/HTTPS、FTP、SMTP）",
];

export default function Home408Page() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          北大<span className="text-primary"> 408 </span>计算机学科专业基础综合
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          全国统考，涵盖数据结构、计算机组成原理、操作系统、计算机网络四门核心课程，总分150分
        </p>
      </div>

      {/* Three-Phase Learning Path */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" /> 三阶段学习路径
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500 text-white text-xs font-bold">1</span>
                <Badge className="bg-emerald-100 text-emerald-800" variant="outline">基础</Badge>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                跟着<strong>王道考研4件套</strong>视频+教材，逐个科目过一遍，建立四门课程的整体知识框架
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white text-xs font-bold">2</span>
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <Badge className="bg-blue-100 text-blue-800" variant="outline">提高 · 回归真题</Badge>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                刷<strong>408历年真题</strong>，重点关注近10年真题。遇到薄弱环节回头翻看<strong>王道单科书</strong>对应的精讲
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-500 text-white text-xs font-bold">3</span>
                <Badge className="bg-purple-100 text-purple-800" variant="outline">冲刺</Badge>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                回顾<strong>错题集</strong>，真题二刷/三刷，重点攻克综合应用题（数据结构算法题 + 组成原理大题）
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Syllabus Overview */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" /> 试卷结构（150分）
      </h2>
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {subSubjects.map((sub) => (
          <Card key={sub.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{sub.name}</CardTitle>
                <Badge className={sub.color} variant="outline">{sub.weight}</Badge>
              </div>
              <p className="text-2xl font-bold text-primary">{sub.score}</p>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Topic Checklists - DS + CO in first row */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-500" /> 数据结构考点清单
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {dsTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                {topic}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-orange-500" /> 组成原理考点清单
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {coTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* OS + CN in second row */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-cyan-500" /> 操作系统考点清单
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {osTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                {topic}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5 text-pink-500" /> 计算机网络考点清单
          </h2>
          <div className="grid grid-cols-1 gap-1.5">
            {cnTopics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500 shrink-0" />
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/books">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">浏览书目</h3>
                <p className="text-sm text-muted-foreground">王道4件套 + 参考教材</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/exercises">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Dumbbell className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">刷题练习</h3>
                <p className="text-sm text-muted-foreground">历年真题 + AI生成题</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/ai-generate">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">AI 生成习题</h3>
                <p className="text-sm text-muted-foreground">输入知识点 · 自动出题</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/math">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">数学一专题</h3>
                <p className="text-sm text-muted-foreground">高数 + 线代 + 概率论</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
