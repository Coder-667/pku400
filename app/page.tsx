import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { BookOpen, Languages, Binary, Cpu } from "lucide-react";

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

      {/* Bold prompt */}
      <div className="text-center mb-10">
        <p className="text-xl font-bold text-foreground">今天你听歌了吗？</p>
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

      {/* 180-Day Study Plan */}
      <Card className="mt-10 border-border">
        <CardContent className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-2">180天总规划：应该怎么切</h2>
          <p className="text-muted-foreground mb-8">
            你现在最需要的不是宏大口号，而是明确每个阶段打什么仗。
          </p>

          {[
            {
              phase: "第一阶段：第 1~45 天",
              goal: "数学一和 408 建立骨架，英语一完成迁移启动",
              items: [
                {
                  subject: "数学一",
                  points: ["从基础开始系统过高数、线代、概率", "先建立完整知识地图", "每学完一个知识块就做基础题"],
                  note: "这一阶段数学最重要的不是难题，而是：概念、基本公式、基本题型、章节衔接",
                },
                {
                  subject: "408",
                  points: ["按四门建立框架（数据结构、计组、操作系统、计网）", "明确每门的高频考点", "开第一轮系统学习"],
                },
                {
                  subject: "英语一",
                  points: ["从英二手感切到英一要求", "单词持续", "阅读真题精做", "观察你在英一里的真实位置"],
                },
                {
                  subject: "政治",
                  points: ["可轻启动", "不需要占太多时间"],
                },
              ],
            },
            {
              phase: "第二阶段：第 46~90 天",
              goal: "完成基础主干，进入强化",
              items: [
                { subject: "数学一", points: ["一轮基础尽量完成", "开始题型归纳", "错题本建立", "逐渐提高做题独立性"] },
                { subject: "408", points: ["第一轮继续推进并完成主干", "结合章节题、真题知识点练习", "开始理解性串联"] },
                { subject: "英语一", points: ["阅读进入主训练期", "开始补翻译/新题型/作文", "逐步建立英一题感"] },
                { subject: "政治", points: ["系统输入逐渐展开"] },
              ],
            },
            {
              phase: "第三阶段：第 91~130 天",
              goal: "强化提分，开始真题化",
              items: [
                { subject: "数学一", points: ["进入强化阶段", "重点题型反复练", "真题开始系统做"] },
                { subject: "408", points: ["第二轮复习", "真题、选择题、综合题反复刷", "建立知识点—题型—易错点闭环"] },
                { subject: "英语一", points: ["真题成套训练", "作文框架定型", "稳定阅读正确率"] },
                { subject: "政治", points: ["选择题强化", "高频知识点开始固化"] },
              ],
            },
            {
              phase: "第四阶段：第 131~160 天",
              goal: "套卷化、考试化",
              items: [
                { subject: "全线", points: ["数学真题二刷/模拟", "408 真题复盘与整合", "英语一套卷节奏", "政治主观题框架建立"] },
              ],
              note: "这一阶段要从「我会不会」切换成：「我在规定时间内能拿多少分」",
            },
            {
              phase: "第五阶段：第 161~180 天",
              goal: "冲刺稳定输出",
              items: [
                { subject: "全线", points: ["高频错题回顾", "背诵与记忆巩固", "套卷保持手感", "调作息", "降低无效焦虑"] },
              ],
            },
          ].map((stage) => (
            <div key={stage.phase} className="mb-8 border-l-4 border-primary pl-4">
              <h3 className="text-lg font-bold">{stage.phase}</h3>
              <p className="text-sm text-primary font-semibold mb-3">核心任务：{stage.goal}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stage.items.map((item) => (
                  <div key={item.subject} className="bg-muted/50 rounded-lg p-3">
                    <p className="font-bold text-sm mb-2">{item.subject}</p>
                    <ul className="space-y-1">
                      {item.points.map((p) => (
                        <li key={p} className="text-xs text-muted-foreground flex items-start gap-1">
                          <span className="shrink-0 mt-1 w-1 h-1 rounded-full bg-primary/60 inline-block" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {stage.note && (
                <p className="text-xs text-muted-foreground mt-2 italic">{stage.note}</p>
              )}
            </div>
          ))}

          <hr className="my-8" />

          <h2 className="text-2xl font-bold mb-4">前期时间分配（每天 10h+，前 2 个月）</h2>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
            {[
              { label: "数学一", hours: "4~4.5h", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" },
              { label: "408", hours: "3~3.5h", color: "text-purple-600 bg-purple-50 dark:bg-purple-950" },
              { label: "英语一", hours: "1.5~2h", color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
              { label: "政治", hours: "0.5h", color: "text-red-600 bg-red-50 dark:bg-red-950" },
              { label: "复盘/总结", hours: "0.5h", color: "text-amber-600 bg-amber-50 dark:bg-amber-950" },
            ].map((t) => (
              <div key={t.label} className={`rounded-lg p-3 text-center ${t.color}`}>
                <p className="text-xs opacity-70">{t.label}</p>
                <p className="text-lg font-bold">{t.hours}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">数学一必须压倒性优先</strong> — 因为它最难、最慢、最吃连续性。</p>
            <p><strong className="text-foreground">408 必须尽早展开</strong> — 因为它不是后期能轻松补回来的。</p>
            <p><strong className="text-foreground">英语一不能放，但不需要抢太多时间</strong> — 你已经有基础，当前主要是适配和维持。</p>
            <p><strong className="text-foreground">政治先保持存在感</strong> — 别消失，但也别前期喧宾夺主。</p>
          </div>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold mb-4">你接下来最该担心的不是来不来得及，而是这 4 件事</h2>
          <div className="space-y-4">
            {[
              { num: "1", title: "数学一启动质量", body: "如果你前 30 天数学只是「看懂」，那后面会很难。你要做到：听课/看书后能独立做题、能复盘为什么错、能归纳题型。" },
              { num: "2", title: "408 的节奏是否持续", body: "408 最怕：今天学数据结构，明天停三天，计组一听就忘，操作系统拖到后面，计网只看不练。它必须持续滚动。" },
              { num: "3", title: "英语一有没有按英一标准练", body: "不要被去年英二 78 麻痹。你要尽快拿英一真题验证自己。" },
              { num: "4", title: "是否过早追求完美", body: "你现在不是要把每一章学成满分讲师，而是要在有限时间内建立：可用基础、可持续做题能力、可转化成分数的体系。" },
            ].map((item) => (
              <div key={item.num} className="flex gap-3">
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">{item.num}</span>
                <div>
                  <p className="font-bold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
