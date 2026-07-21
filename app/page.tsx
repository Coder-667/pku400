import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/CountdownTimer";
import { BookOpen, Languages, Binary, Cpu, TrendingUp, Calendar, ExternalLink, Bell, CreditCard, MapPin } from "lucide-react";
import { target400 } from "@/lib/admission-data";

const scoreMap = Object.fromEntries(target400.map((t) => [t.subject, t.targetScore]));

const subjects = [
  {
    id: "politics",
    title: "政治",
    icon: BookOpen,
    color: "text-red-600",
    bgColor: "bg-red-50 dark:bg-red-950",
    borderColor: "border-red-200 dark:border-red-800",
    targetScore: scoreMap["政治"],
    fullScore: "100分",
    phases: [
      { label: "7月", text: "徐涛强化课 + 核心考案 + 肖1000" },
      { label: "9月", text: "腿姐技巧班，二刷肖1000" },
      { label: "10月", text: "三刷肖1000，重点攻克错题" },
      { label: "11月", text: "肖八选择题2-3遍，大题看看" },
      { label: "12月", text: "肖四大题背诵 + 时政总结" },
    ],
    principle: "选择题38+是底线，北京主观题压分严重",
  },
  {
    id: "english",
    title: "英语（一）",
    icon: Languages,
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    borderColor: "border-blue-200 dark:border-blue-800",
    targetScore: scoreMap["英语一"],
    fullScore: "100分",
    phases: [
      { label: "每日", text: "单词 + 长难句（颉斌斌66句）" },
      { label: "6月", text: "阅读唐迟，2-3天/篇（05-13年）" },
      { label: "7月", text: "三轮单词完成，2-3篇/天（14-22年）" },
      { label: "8月中", text: "石雷鹏大小作文网课" },
      { label: "9-10月", text: "小三门技巧 + 真题套卷模拟" },
      { label: "11-12月", text: "23-26年真题全真模拟 + 复盘" },
    ],
    principle: "阅读错4题以内是75分的关键，作文不能只背模板",
  },
  {
    id: "math",
    title: "数学（一）",
    icon: Binary,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
    borderColor: "border-emerald-200 dark:border-emerald-800",
    targetScore: scoreMap["数学一"],
    fullScore: "150分",
    link: "/math",
    phases: [
      { label: "3-6月", text: "基础期：高数（张宇/武忠祥）+ 线代（李永乐）+ 概率论（余丙森）" },
      { label: "7-9月", text: "提高期：《880》+ 归纳固定解法" },
      { label: "10-11月", text: "真题阶段：两天一套 + 错题复盘" },
      { label: "12月", text: "模拟考试：24-26真题 + 押题卷" },
    ],
    principle: "130分 = 选填50+ + 解答56+，错题每隔3-4天必须重做",
  },
  {
    id: "408",
    title: "408 计算机综合",
    icon: Cpu,
    color: "text-purple-600",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    borderColor: "border-purple-200 dark:border-purple-800",
    targetScore: scoreMap["408计算机综合"],
    fullScore: "150分",
    link: "/408",
    phases: [
      { label: "数据结构", text: "45分 → 目标36分：线性表、树、图、查找、排序" },
      { label: "组成原理", text: "45分 → 目标35分：数据表示、CPU、存储层次、I/O" },
      { label: "操作系统", text: "35分 → 目标28分：进程、内存管理、文件系统、I/O" },
      { label: "计算机网络", text: "25分 → 目标20分：TCP/IP协议栈、应用层协议" },
    ],
    principle: "选择题60+ + 大题65+ = 125分，王道4件套为核心",
  },
];

export default function MainHomePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Countdown Hero */}
      <div className="text-center mb-8">
        <p className="text-sm text-muted-foreground mb-4">
          距2027年全国硕士研究生招生考试初试（2026年12月19—20日）
        </p>
        <CountdownTimer />
        <p className="text-lg font-bold mt-4 tracking-widest" style={{ color: "#9B1B30", fontFamily: "'STKaiti', 'KaiTi', 'Noto Serif SC', serif" }}>
          不要把梦想埋没
        </p>
      </div>

      {/* 考研大事记 */}
      <Card className="mb-8 border-border max-w-3xl mx-auto">
        <CardContent className="p-4 md:p-5">
          <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            考研大事记
            <span className="text-xs text-muted-foreground font-normal">— 2027年（初试 2026.12.19—20）</span>
          </h3>

          <div className="space-y-3 text-sm">
            {[
              {
                time: "7月—9月初",
                title: "高校发布招生简章/专业目录",
                desc: "各高校陆续公布招生简章、专业目录、参考书目。重点关注北大软微是否调整考试科目、招生人数、学制。",
                link: { href: "https://www.ss.pku.edu.cn", text: "软微官网" },
              },
              {
                time: "8月下旬",
                title: "教育部发布统考大纲/管理规定",
                desc: "教育部发布《全国硕士研究生招生工作管理规定》和统考公共课大纲，明确报名、考试时间及政策变化。",
              },
              {
                time: "9月中下旬",
                title: "研招网网上咨询周",
                desc: "登录研招网向目标院校咨询报考条件、招生政策等。建议提前准备好问题清单，避免临时遗漏。",
              },
              {
                time: "10月上旬",
                title: "网上预报名",
                desc: "预计 10月10日—13日，每天 9:00—22:00。主要面向应届生，部分省份往届生也可参加。预报名成功并缴费后无需重复报名。",
              },
              {
                time: "10月中下旬",
                title: "网上正式报名 + 缴费",
                desc: "预计 10月16日—27日，每天 9:00—22:00。所有考生必须完成，逾期不补。建议避开首尾高峰时段。",
              },
              {
                time: "10月底—11月初",
                title: "网上确认",
                desc: "各省时间不同，一般 10月31日—11月5日。需上传证件照、身份证、学历证明等材料，未确认则报名无效。",
              },
              {
                time: "11月上旬",
                title: "肖八上市",
                desc: "预计 11月10日左右。主要用于政治选择题模拟和全年时政查漏补缺，不必死背分析题。",
                note: "淘宝/京东提前加购",
              },
              {
                time: "12月初",
                title: "肖四上市 + 准考证打印",
                desc: "肖四约 12月5日—10日上市，分析题需重点背诵；准考证考前10天左右开放打印，建议多打几份备用。",
                note: "第一时间买，马上背",
              },
              {
                time: "12月19日—20日",
                title: "全国硕士研究生招生考试初试",
                desc: "上午 8:30—11:30，下午 14:00—17:00。19日上午政治、下午英语一；20日上午数学一、下午408。",
              },
            ].map((event) => (
              <div key={event.title} className="flex gap-3">
                <span className="w-24 shrink-0 text-xs font-semibold text-primary pt-0.5">{event.time}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{event.title}</span>
                    {event.link && (
                      <a
                        href={event.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline inline-flex items-center gap-0.5"
                      >
                        {event.link.text}
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                    {event.note && (
                      <span className="text-xs text-muted-foreground">（{event.note}）</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 报名信息速查 */}
          <div className="mt-4 pt-3 border-t border-border grid sm:grid-cols-3 gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Bell className="h-3 w-3 shrink-0" />
              <span>报考单位：北京大学（10001）</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="h-3 w-3 shrink-0" />
              <span>专业代码：085400 电子信息</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 shrink-0" />
              <span>考点：户籍所在地</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Score Bar */}
      <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 flex-wrap">
        {target400.map((t, i) => (
          <span key={t.subject} className="flex items-center gap-1">
            <span className="text-sm font-medium text-muted-foreground">{t.subject}</span>
            <Badge className="bg-primary/10 text-primary font-bold text-sm px-2.5 py-1">
              {t.targetScore}
            </Badge>
            {i < target400.length - 1 && (
              <span className="text-muted-foreground/40 text-lg font-light">+</span>
            )}
          </span>
        ))}
        <span className="text-muted-foreground/40 text-lg font-light">=</span>
        <Badge className="bg-red-100 text-red-700 font-bold text-base px-3 py-1">400</Badge>
      </div>

      {/* Score-driven prompt */}
      <div className="text-center mb-10">
        <p className="text-lg font-bold text-foreground">
          目标<span className="text-primary">400</span>分 — 不是口号，是每天每科都要算的账
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          2026考研复试线378分，录取均分395，中位数393，报考约2800人。400分仍是稳妥上岸的底线。
        </p>
        <Link
          href="/scores"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
        >
          <TrendingUp className="h-3 w-3" />
          查看完整分数线与目标拆解
        </Link>
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
                    {subject.fullScore}
                  </Badge>
                </div>
                {/* Target score callout */}
                <div className="mb-3 text-center py-2 rounded-lg bg-background/50 border border-foreground/5">
                  <span className="text-xs text-muted-foreground">目标 </span>
                  <span className={`text-xl font-bold ${subject.color}`}>
                    {subject.targetScore}
                  </span>
                  <span className="text-xs text-muted-foreground"> 分</span>
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
          <h2 className="text-2xl font-bold mb-2">180天总规划：以400分为目标倒推</h2>
          <p className="text-muted-foreground mb-4">
            先定分数目标，再倒推每个阶段必须完成什么。而不是学了再说。
          </p>
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10 mb-8">
            <p className="text-sm">
              <strong className="text-primary">倒推逻辑：</strong>
              数学一130（丢20分）→ 高数72/82 + 线代29/34 + 概率29/34。
              408综合125（丢25分）→ DS 36/45 + CO 35/45 + OS 28/35 + CN 20/25。
              英语一75 → 阅读32+作文22+其他21。<br />
              政治70 → 选择38+分析32。
              这180天的每一分钟，都在为上面这些数字服务。
            </p>
          </div>

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
              goal: "套卷化、考试化，目标分数模拟验证",
              items: [
                { subject: "全线", points: ["数学真题二刷/模拟", "408 真题复盘与整合", "英语一套卷节奏", "政治主观题框架建立"] },
              ],
              note: "这一阶段要用模考分数验证：数学一是否稳定130+？408是否稳定125+？差距就是下一步的方向。",
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
              { label: "数学一", hours: "4~4.5h", target: "目标130", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" },
              { label: "408", hours: "3~3.5h", target: "目标125", color: "text-purple-600 bg-purple-50 dark:bg-purple-950" },
              { label: "英语一", hours: "1.5~2h", target: "目标75", color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
              { label: "政治", hours: "0.5h", target: "目标70", color: "text-red-600 bg-red-50 dark:bg-red-950" },
              { label: "复盘/总结", hours: "0.5h", target: "默写公式", color: "text-amber-600 bg-amber-50 dark:bg-amber-950" },
            ].map((t) => (
              <div key={t.label} className={`rounded-lg p-3 text-center ${t.color}`}>
                <p className="text-xs opacity-70">{t.label}</p>
                <p className="text-lg font-bold">{t.hours}</p>
                <p className="text-xs opacity-60 mt-0.5">{t.target}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><strong className="text-foreground">数学一必须压倒性优先</strong> — 150分卷面，130分目标，丢分空间只有20分。是最难、最慢、最吃连续性的科目。</p>
            <p><strong className="text-foreground">408 必须尽早展开</strong> — 四门课125分，每门都要吃透。不能后期突击。</p>
            <p><strong className="text-foreground">英语一不能放，但不需要抢太多时间</strong> — 目标75分，阅读错4题内即可达标，重点在维持和精练。</p>
            <p><strong className="text-foreground">政治先保持存在感</strong> — 目标70分，选择38+即可。前期喧宾夺主会挤占数学和408的时间。</p>
          </div>

          <hr className="my-8" />

          <h2 className="text-2xl font-bold mb-4">你接下来最该担心的不是来不来得及，而是这4件事</h2>
          <div className="space-y-4">
            {[
              { num: "1", title: "数学一能否稳定在130+", body: "如果你前30天数学只是「看懂」，后面很难到130。你需要做到：独立做题、复盘错因、归纳题型。130分意味着你最多错2道选择题+1道大题半错。" },
              { num: "2", title: "408 四门是不是在持续滚动", body: "408最怕断节奏。今天学DS，明天停三天，CO一听就忘，OS拖到后面，CN只看不练。125分要求选择题60+，大题65+。" },
              { num: "3", title: "英语一有没有按英一标准练到75", body: "不要被英二78麻痹。英一75 = 阅读32(错4题) + 作文22 + 完型6 + 新题型8 + 翻译7。拿真题验证。" },
              { num: "4", title: "是否过早追求完美", body: "你不是要把每一章学成满分讲师，而是要在有限时间内建立：可用基础、可持续做题能力、可转化成分数的体系。400分是目标，不是每科都要满分。" },
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
