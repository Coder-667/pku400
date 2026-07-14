// ============================================================
// 北大软微 085400 电子信息（11408）历年分数线与目标拆解
// 数据来源：北大软微官网公示 + 各考研平台汇总
// ============================================================

// --- 历年复试线与录取数据 ---
export interface YearRecord {
  year: string; // 考研年份（入学年份）
  examDate: string; // 初试日期
  retestLine: number; // 复试线
  singleSubjectLine: string; // 单科线 (政/英/数/专)
  enrolledCount: number; // 录取人数
  lowestAdmit: number; // 录取最低分
  highestAdmit: number; // 录取最高分
  avgAdmit: number; // 录取平均分
  medianAdmit: number; // 录取中位数
  applicantCount: string; // 报考人数（约）
}

export const admissionHistory: YearRecord[] = [
  {
    year: "2021",
    examDate: "2020.12",
    retestLine: 345,
    singleSubjectLine: "55/55/90/90",
    enrolledCount: 156,
    lowestAdmit: 346,
    highestAdmit: 425,
    avgAdmit: 367,
    medianAdmit: 365,
    applicantCount: "~1200",
  },
  {
    year: "2022",
    examDate: "2021.12",
    retestLine: 350,
    singleSubjectLine: "55/55/90/90",
    enrolledCount: 172,
    lowestAdmit: 351,
    highestAdmit: 432,
    avgAdmit: 374,
    medianAdmit: 372,
    applicantCount: "~1500",
  },
  {
    year: "2023",
    examDate: "2022.12",
    retestLine: 365,
    singleSubjectLine: "55/55/90/90",
    enrolledCount: 190,
    lowestAdmit: 365,
    highestAdmit: 438,
    avgAdmit: 380,
    medianAdmit: 378,
    applicantCount: "~1800",
  },
  {
    year: "2024",
    examDate: "2023.12",
    retestLine: 380,
    singleSubjectLine: "55/55/90/90",
    enrolledCount: 198,
    lowestAdmit: 380,
    highestAdmit: 441,
    avgAdmit: 397,
    medianAdmit: 396,
    applicantCount: "~2200",
  },
  {
    year: "2025",
    examDate: "2024.12",
    retestLine: 357,
    singleSubjectLine: "50/50/90/90",
    enrolledCount: 196,
    lowestAdmit: 357,
    highestAdmit: 435,
    avgAdmit: 382,
    medianAdmit: 380,
    applicantCount: "~2500",
  },
  {
    year: "2026",
    examDate: "2025.12",
    retestLine: 378,
    singleSubjectLine: "55/55/90/90",
    enrolledCount: 196,
    lowestAdmit: 378,
    highestAdmit: 435,
    avgAdmit: 395,
    medianAdmit: 393,
    applicantCount: "~2800",
  },
];

// --- 复试信息 ---
export const retestInfo = {
  weight: { initial: 60, retest: 40 },
  ratio: "1:1.2 ~ 1:1.5",
  description:
    "初试成绩占60%，复试成绩占40%。复试包含机试（编程）+ 面试（专业基础 + 英语口语 + 综合素养）。复录比约1:1.2~1.5，初试分数高仍可能被刷，复试表现非常关键。",
  formula: "总成绩 = 初试成绩/5 × 60% + 复试成绩 × 40%",
  note: "初试每领先10分 ≈ 总成绩领先1.2分。复试1分 = 初试约3.3分的差距，复试逆袭空间大。",
};

// --- 400分目标拆解（核心） ---
export interface SubjectTarget {
  subject: string;
  fullScore: number;
  targetScore: number;
  lossAllowed: number;
  targetRate: number; // 目标得分率
  strategy: string;
}

export const target400: SubjectTarget[] = [
  {
    subject: "政治",
    fullScore: 100,
    targetScore: 70,
    lossAllowed: 30,
    targetRate: 70,
    strategy: "选择题38+（单选12+/多选26+），分析题32+（肖四背诵+结合材料）。北京地区主观题压分，选择题是生命线。",
  },
  {
    subject: "英语一",
    fullScore: 100,
    targetScore: 75,
    lossAllowed: 25,
    targetRate: 75,
    strategy: "阅读32+（错4题内），作文22+（大小作文模板），完型6+，新题型8+，翻译7+。阅读定生死。",
  },
  {
    subject: "数学一",
    fullScore: 150,
    targetScore: 130,
    lossAllowed: 20,
    targetRate: 87,
    strategy: "选择题50+/56，填空题24+/28，解答题56+/66。高数82分中拿72+，线代34分中拿28+，概率34分中拿28+。",
  },
  {
    subject: "408计算机综合",
    fullScore: 150,
    targetScore: 125,
    lossAllowed: 25,
    targetRate: 83,
    strategy: "选择题60+/80，综合应用题65+/70。DS 45分中拿36+，CO 45分中拿35+，OS 35分中拿28+，CN 25分中拿20+。",
  },
];

// --- 三档目标对照 ---
export const tierTargets = {
  "380": [
    { subject: "政治", score: 65 },
    { subject: "英语一", score: 70 },
    { subject: "数学一", score: 125 },
    { subject: "408", score: 120 },
  ],
  "390": [
    { subject: "政治", score: 68 },
    { subject: "英语一", score: 72 },
    { subject: "数学一", score: 128 },
    { subject: "408", score: 122 },
  ],
  "400": [
    { subject: "政治", score: 70 },
    { subject: "英语一", score: 75 },
    { subject: "数学一", score: 130 },
    { subject: "408", score: 125 },
  ],
};

// --- 408子科目目标拆解 ---
export const target408SubSubjects = [
  {
    name: "数据结构",
    fullScore: 45,
    targetScore: 36,
    targetRate: 80,
    keyPoints: ["线性表（必考大题）", "树与二叉树（遍历+应用高频）", "图（最短路径/拓扑排序大题常客）", "查找（B树/B+树对比）", "排序（算法题高频）"],
  },
  {
    name: "计算机组成原理",
    fullScore: 45,
    targetScore: 35,
    targetRate: 78,
    keyPoints: ["数据表示（补码/浮点数计算必考）", "Cache映射（组相联命中率）", "虚存+TLB（综合题高频）", "指令流水线（数据冒险/控制冒险）", "I/O中断+DMA对比"],
  },
  {
    name: "操作系统",
    fullScore: 35,
    targetScore: 28,
    targetRate: 80,
    keyPoints: ["PV操作（必考大题，10分级别）", "页面置换算法（LRU/CLOCK/FIFO）", "死锁（银行家算法）", "文件系统（索引结构计算）", "磁盘调度算法"],
  },
  {
    name: "计算机网络",
    fullScore: 25,
    targetScore: 20,
    targetRate: 80,
    keyPoints: ["TCP拥塞控制（慢开始/快重传/快恢复）", "IP子网划分+CIDR（必考计算）", "CSMA/CD+二进制退避", "HTTP/HTTPS+DNS", "路由协议对比（RIP/OSPF/BGP）"],
  },
];

// --- 数学一子模块目标拆解 ---
export const targetMathModules = [
  {
    name: "高等数学",
    fullScore: 82,
    targetScore: 72,
    targetRate: 88,
    keyPoints: [
      "极限与连续（小题必考）",
      "一元微分学应用（中值定理证明10分大题）",
      "一元积分学（换元/分部/反常积分判敛）",
      "多元微分学（偏导数/极值/拉格朗日乘数法）",
      "二重/三重积分计算（大题高频，12分）",
      "曲线积分+曲面积分（格林/高斯/斯托克斯）",
      "无穷级数（幂级数求和+傅里叶级数，11分大题）",
      "常微分方程（一阶+二阶解法，综合题常客）",
    ],
  },
  {
    name: "线性代数",
    fullScore: 34,
    targetScore: 29,
    targetRate: 85,
    keyPoints: [
      "矩阵运算与初等变换",
      "向量组线性相关性（证明题核心）",
      "线性方程组解的结构",
      "特征值与特征向量（大题必考，11分）",
      "二次型标准化与正定性",
    ],
  },
  {
    name: "概率论与数理统计",
    fullScore: 34,
    targetScore: 29,
    targetRate: 85,
    keyPoints: [
      "一维随机变量分布函数与密度",
      "多维随机变量（联合/边缘/条件分布）",
      "数字特征（期望/方差/协方差/相关系数）",
      "大数定律与中心极限定理",
      "点估计与区间估计（矩估计+MLE，11分大题）",
      "假设检验（Ⅰ/Ⅱ类错误）",
    ],
  },
];

// --- 趋势分析文案 ---
export const trendAnalysis = {
  summary: "北大软微11408竞争持续白热化。2021年复试线345，2024年飙至380，2025年回落至357（当年数学一极难+408偏难），2026年反弹至378（数学一难度降低推高总分）。复试线呈剧烈波动态势，整体上升趋势未变。",
  warning: "2026年复试线378，较2025年暴涨21分。录取均分从2025年的382回升至395，接近2024年的397。报考人数持续增长（~2800人）。目标分数建议定在390-400之间方有较稳把握。",
  advice: "初试是门槛，但复试是决胜场。复试权重40%，2026年有412分和399分高分考生因复试不及格被淘汰的案例。初试备考的同时，注重编程机试能力和专业基础知识的广度深度积累。",
};
