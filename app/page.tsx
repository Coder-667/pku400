import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { BookOpen, Languages, Binary, Cpu, ClipboardList } from "lucide-react";

const examInfo = [
  { label: "专业代码", value: "085400 电子信息" },
  { label: "方向", value: "软件工程 / 人工智能" },
  { label: "学院", value: "软件与微电子学院" },
  { label: "考试科目", value: "政治 + 英一 + 数一 + 408" },
];

const subjects = [
  {
    id: "politics",
    title: "政治",
    icon: BookOpen,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
    score: "100分",
    phases: [
      { label: "7月", text: "徐涛强化课 + 核心考案 + 肖1000" },
      { label: "9月", text: "腿姐技巧班，二刷肖1000" },
      { label: "10月", text: "三刷肖1000，重点攻克错题" },
      { label: "11月", text: "肖八选择题2-3遍，大题看看" },
      { label: "12月", text: "肖四大题背诵 + 时政总结" },
    ],
    principle: "前松后紧，选择题是重中之重",
  },
  {
    id: "english",
    title: "英语（一）",
    icon: Languages,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
    score: "100分",
    phases: [
      { label: "每日", text: "单词 + 长难句（颉斌斌66句）" },
      { label: "6月", text: "阅读唐迟，2-3天/篇（05-13年）" },
      { label: "7月", text: "三轮单词完成，2-3篇/天（14-22年）" },
      { label: "8月中", text: "石雷鹏大小作文网课" },
      { label: "9-10月", text: "小三门技巧 + 真题套卷模拟" },
      { label: "11-12月", text: "23-26年真题全真模拟 + 复盘" },
    ],
    principle: "做题时时刻反思错因，保持饥饿",
  },
  {
    id: "math",
    title: "数学（一）",
    icon: Binary,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    score: "150分",
    link: "/math",
    phases: [
      { label: "3-6月", text: "基础期：高数（张宇/武忠祥）+ 线代（李永乐）+ 概率论（余丙森）" },
      { label: "7-9月", text: "提高期：《880》+ 归纳固定解法" },
      { label: "10-11月", text: "真题阶段：两天一套 + 错题复盘" },
      { label: "12月", text: "模拟考试：24-26真题 + 押题卷" },
    ],
    principle: "错题每隔3-4天必须重做，直到做对为止",
  },
  {
    id: "408",
    title: "408 计算机综合",
    icon: Cpu,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    borderColor: "border-purple-200 dark:border-purple-800",
    score: "150分",
    link: "/408",
    phases: [
      { label: "数据结构", text: "45分：线性表、树、图、查找、排序" },
      { label: "组成原理", text: "45分：数据表示、CPU、存储层次、I/O" },
      { label: "操作系统", text: "35分：进程、内存管理、文件系统、I/O" },
      { label: "计算机网络", text: "25分：TCP/IP协议栈、应用层协议" },
    ],
    principle: "4门科目各占约25%，需全面覆盖 · 王道4件套为核心",
  },
];

export default function MainHomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Countdown Hero */}
      <div className="text-center mb-12">
        <p className="text-sm text-muted-foreground mb-4">
          距2026年全国硕士研究生招生考试初试
        </p>
        <CountdownTimer />
        <p className="text-sm text-muted-foreground mt-4">
          2026年12月19日 上午8:30
        </p>
      </div>

      {/* Info bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
        <Link href="/408">
          <Card className="h-full hover:shadow-md transition-shadow cursor-pointer border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950">
            <CardContent className="p-4 text-center">
              <ClipboardList className="h-5 w-5 text-purple-500 mx-auto mb-1" />
              <p className="text-xs text-muted-foreground mb-1">408复习计划</p>
              <p className="font-semibold text-sm text-purple-700 dark:text-purple-300">四阶段备考</p>
            </CardContent>
          </Card>
        </Link>
        {examInfo.map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="font-semibold text-sm">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Four Subject Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {subjects.map((subject) => {
          const cardContent = (
            <Card
              className={`h-full border ${subject.borderColor} ${subject.bgColor} hover:shadow-md transition-shadow`}
            >
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <subject.icon className={`h-5 w-5 ${subject.color}`} />
                  <h3 className={`font-bold text-lg ${subject.color}`}>
                    {subject.title}
                  </h3>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {subject.score}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {subject.phases.map((phase) => (
                    <li key={phase.label} className="text-sm">
                      <span className="font-semibold text-foreground">
                        {phase.label}
                      </span>
                      <span className="text-muted-foreground">
                        {" "}
                        {phase.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-foreground/10 italic">
                  {subject.principle}
                </p>
              </CardContent>
            </Card>
          );

          if (subject.link) {
            return (
              <Link key={subject.id} href={subject.link} className="group">
                {cardContent}
              </Link>
            );
          }
          return <div key={subject.id}>{cardContent}</div>;
        })}
      </div>
    </div>
  );
}
