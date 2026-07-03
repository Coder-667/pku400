import Link from "next/link";
import { BookOpen, Dumbbell, FileText, Target, Layers, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { target408SubSubjects } from "@/lib/admission-data";

const subSubjects = [
  { name: "数据结构", score: "45分", target: 36, weight: "约30%", color: "bg-purple-100 text-purple-800" },
  { name: "计算机组成原理", score: "45分", target: 35, weight: "约30%", color: "bg-orange-100 text-orange-800" },
  { name: "操作系统", score: "35分", target: 28, weight: "约23%", color: "bg-cyan-100 text-cyan-800" },
  { name: "计算机网络", score: "25分", target: 20, weight: "约17%", color: "bg-pink-100 text-pink-800" },
];

const dsTopics = [
  { text: "线性表（顺序表、链表、栈、队列）", freq: "high" },
  { text: "树与二叉树（遍历、BST、平衡二叉树）", freq: "high" },
  { text: "图（DFS/BFS、最小生成树、最短路径、拓扑排序、关键路径）", freq: "high" },
  { text: "查找（顺序、折半、B树/B+树、散列表）", freq: "high" },
  { text: "排序（插入、交换、选择、归并、基数排序及复杂度分析）", freq: "high" },
];

const coTopics = [
  { text: "数据表示与运算（补码、浮点数、ALU）", freq: "high" },
  { text: "存储器层次结构（Cache、虚存、TLB）", freq: "high" },
  { text: "指令系统（寻址方式、CISC vs RISC）", freq: "mid" },
  { text: "CPU数据通路（流水线、数据冒险/控制冒险）", freq: "high" },
  { text: "总线与I/O（中断、DMA、总线标准）", freq: "mid" },
];

const osTopics = [
  { text: "进程管理（进程/线程、同步互斥、死锁）", freq: "high" },
  { text: "内存管理（分页/分段、虚拟内存、页面置换）", freq: "high" },
  { text: "文件系统（文件结构、目录、空闲空间管理）", freq: "mid" },
  { text: "I/O管理（磁盘调度、I/O控制方式、SPOOLing）", freq: "mid" },
];

const cnTopics = [
  { text: "物理层（奈奎斯特定理、香农定理、编码）", freq: "low" },
  { text: "数据链路层（CSMA/CD、MAC帧、交换机）", freq: "mid" },
  { text: "网络层（IP、子网划分、CIDR、路由协议RIP/OSPF/BGP）", freq: "high" },
  { text: "传输层（TCP/UDP、流量控制、拥塞控制）", freq: "high" },
  { text: "应用层（DNS、HTTP/HTTPS、FTP、SMTP）", freq: "mid" },
];

const freqBadge: Record<string, { label: string; className: string }> = {
  high: { label: "高频", className: "bg-red-100 text-red-700" },
  mid: { label: "中频", className: "bg-yellow-100 text-yellow-700" },
  low: { label: "低频", className: "bg-gray-100 text-gray-600" },
};

export default function Home408Page() {
  const totalTarget = target408SubSubjects.reduce((sum, s) => sum + s.targetScore, 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          北大<span className="text-primary"> 408 </span>计算机学科专业基础综合
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          全国统考，涵盖四门核心课程，总分150分 · 目标{totalTarget}分
        </p>
      </div>

      {/* Three-Phase Learning Path */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" /> 三阶段学习路径（目标得分率递进）
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="border-l-4 border-l-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500 text-white text-xs font-bold">1</span>
                <Badge className="bg-emerald-100 text-emerald-800" variant="outline">基础 · 60%得分率</Badge>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                跟着<strong>王道考研4件套</strong>视频+教材，逐个科目过一遍。此阶段每章课后题正确率达到60%即可，重点是建立四门课程的整体知识框架。
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white text-xs font-bold">2</span>
                <ArrowRight className="h-4 w-4 text-blue-500" />
                <Badge className="bg-blue-100 text-blue-800" variant="outline">提高 · 75%得分率</Badge>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                刷<strong>408历年真题</strong>（近10年），真题正确率目标75%。遇到薄弱环节回头翻<strong>王道单科书</strong>对应的精讲，建立知识点-题型-易错点闭环。
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/30">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-purple-500 text-white text-xs font-bold">3</span>
                <Badge className="bg-purple-100 text-purple-800" variant="outline">冲刺 · 83%得分率</Badge>
              </div>
              <p className="text-sm text-foreground leading-relaxed">
                真题二刷/三刷正确率目标83%（=125/150），回顾<strong>错题集</strong>，重点攻克综合应用题（DS算法题 + CO组成大题 + OS PV操作）
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Syllabus Overview */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Target className="h-5 w-5 text-primary" /> 试卷结构（150分）· 目标{totalTarget}分
      </h2>
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        {subSubjects.map((sub) => (
          <Card key={sub.name}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{sub.name}</CardTitle>
                <Badge className={sub.color} variant="outline">{sub.weight}</Badge>
              </div>
              <p className="text-2xl font-bold text-primary">
                <span className="text-base font-normal text-muted-foreground">目标</span> {sub.target}
              </p>
              <p className="text-xs text-muted-foreground">
                满分{sub.score} · 目标得分率 {Math.round((sub.target / parseInt(sub.score)) * 100)}%
              </p>
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
              <div key={topic.text} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
                {topic.text}
                <Badge className={`text-[10px] ml-auto ${freqBadge[topic.freq].className}`} variant="outline">
                  {freqBadge[topic.freq].label}
                </Badge>
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
              <div key={topic.text} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0" />
                {topic.text}
                <Badge className={`text-[10px] ml-auto ${freqBadge[topic.freq].className}`} variant="outline">
                  {freqBadge[topic.freq].label}
                </Badge>
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
              <div key={topic.text} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 shrink-0" />
                {topic.text}
                <Badge className={`text-[10px] ml-auto ${freqBadge[topic.freq].className}`} variant="outline">
                  {freqBadge[topic.freq].label}
                </Badge>
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
              <div key={topic.text} className="flex items-center gap-2 text-sm p-2 rounded-md bg-muted/50">
                <span className="h-1.5 w-1.5 rounded-full bg-pink-500 shrink-0" />
                {topic.text}
                <Badge className={`text-[10px] ml-auto ${freqBadge[topic.freq].className}`} variant="outline">
                  {freqBadge[topic.freq].label}
                </Badge>
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
        <Link href="/scores">
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-3">
              <Target className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold">分数线</h3>
                <p className="text-sm text-muted-foreground">历年数据 + 目标拆解</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
