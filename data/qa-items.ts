// ============================================================
// AI Q&A Archive — 从 Gemini / Claude 等 AI 对话中保存的问答
// ============================================================
//
// 如何添加更多 Q&A：
// 1. Google Takeout → takeout.google.com → 选择 "Gemini" → 导出
// 2. 解压后找到 JSON 文件，复制问答内容
// 3. 按下方格式添加到 qaItems 数组中
// 4. 重新构建部署即可
//
// 也支持直接从 Gemini 分享链接手动复制粘贴添加。
// ============================================================

export type QASubject = "math" | "408" | "english" | "politics" | "general";
export type QASubject408 = "ds" | "co" | "os" | "cn";

export const QA_SUBJECT_LABELS: Record<QASubject, string> = {
  math: "数学一",
  "408": "408计算机综合",
  english: "英语一",
  politics: "政治",
  general: "综合",
};

export const QA_SUBJECT_COLORS: Record<QASubject, string> = {
  math: "bg-emerald-100 text-emerald-800",
  "408": "bg-purple-100 text-purple-800",
  english: "bg-blue-100 text-blue-800",
  politics: "bg-red-100 text-red-800",
  general: "bg-gray-100 text-gray-800",
};

export const QA_408_SUB_LABELS: Record<QASubject408, string> = {
  ds: "数据结构",
  co: "组成原理",
  os: "操作系统",
  cn: "计算机网络",
};

export const QA_408_SUB_COLORS: Record<QASubject408, string> = {
  ds: "bg-purple-100 text-purple-800",
  co: "bg-orange-100 text-orange-800",
  os: "bg-cyan-100 text-cyan-800",
  cn: "bg-pink-100 text-pink-800",
};

export interface QAItem {
  id: string;
  date: string;
  subject: QASubject;
  subSubject?: QASubject408;
  topic: string;
  question: string;
  answer: string;
  tags: string[];
  isWeakPoint: boolean;
  source: string;
}

export const qaItems: QAItem[] = [
  {
    id: "gemini-pipeline-20250701",
    date: "2025-07-01",
    subject: "408",
    subSubject: "co",
    topic: "指令流水线",
    question:
      "五段流水线 CPU 中，各段分别是什么？数据冒险有哪几种类型，分别如何解决？",
    answer: `## 五段流水线结构

| 阶段 | 英文 | 功能 |
|------|------|------|
| IF | Instruction Fetch | 取指令 |
| ID | Instruction Decode | 译码 / 读寄存器 |
| EX | Execute | 执行 / 计算地址 |
| MEM | Memory Access | 访存 |
| WB | Write Back | 写回寄存器 |

## 数据冒险（Data Hazard）三种类型

### 1. RAW（Read After Write）—— 真相关
- 后一条指令需要读前一条指令尚未写回的结果
- **解决：前推（Forwarding / Bypassing）**
  - 从 EX/MEM 或 MEM/WB 流水线寄存器直接旁路到 EX 段
  - 相邻指令 RAW：需 1 个 stall + 前推
  - 隔一条指令：通常可纯前推解决

### 2. WAR（Write After Read）—— 反相关
- 后一条指令要写的目的寄存器，前一条指令还没读
- 在五段流水线中：所有读在 ID 段，所有写在 WB 段
- **五段流水线中 WAR 不会发生**（读总比写早）

### 3. WAW（Write After Write）—— 输出相关
- 两条指令写同一个目的寄存器
- 必须保证按顺序写回
- 五段流水线中：WB 顺序与指令顺序一致
- **五段流水线中 WAW 不会发生**

> 关键结论：五段流水线中，只需处理 RAW 相关。前推技术可消除大部分 stall。`,
    tags: ["流水线", "数据冒险", "前推", "RAW"],
    isWeakPoint: false,
    source: "Gemini",
  },
  {
    id: "gemini-pv-20250703",
    date: "2025-07-03",
    subject: "408",
    subSubject: "os",
    topic: "PV操作",
    question:
      "桌上有一空盘，最多放 n 个水果。爸爸放苹果，妈妈放橘子，儿子吃苹果，女儿吃橘子。用 PV 操作描述同步互斥关系。请详细解释每个信号量的含义和初始值。",
    answer: `## 信号量设计

| 信号量 | 初值 | 含义 |
|--------|------|------|
| \`mutex\` | 1 | 互斥访问盘子（缓冲区） |
| \`empty\` | n | 盘子空位数（缓冲区空闲容量） |
| \`apple\` | 0 | 盘中苹果数量（儿子等待的事件） |
| \`orange\` | 0 | 盘中橘子数量（女儿等待的事件） |

## 伪代码

\`\`\`c
// 爸爸
Dad() {
    P(empty);     // 1. 等空位
    P(mutex);     // 2. 互斥进入
    放苹果();
    V(mutex);     // 3. 释放互斥
    V(apple);     // 4. 通知儿子
}

// 儿子
Son() {
    P(apple);     // 1. 等苹果
    P(mutex);     // 2. 互斥进入
    取苹果();
    V(mutex);     // 3. 释放互斥
    V(empty);     // 4. 释放空位
}
\`\`\`

## 为什么不能合并爸爸和妈妈？

如果合并，儿子/女儿无法区分盘中是苹果还是橘子，会导致：
- 儿子 P(apple) 被妈妈的橘子唤醒 → 逻辑错误
- **多类生产者-消费者必须用不同信号量区分产品类型**

## 常见错误

1. **只用一个 full 信号量** → 儿子/女儿不知道取到的是什么
2. **P(mutex) 和 P(empty) 顺序颠倒** → 死锁风险
3. **忘了 V(empty)** → 缓冲区最终满，生产者永远阻塞`,
    tags: ["PV操作", "生产者-消费者", "同步互斥", "信号量"],
    isWeakPoint: true,
    source: "Gemini",
  },
  {
    id: "gemini-cache-20250705",
    date: "2025-07-05",
    subject: "408",
    subSubject: "co",
    topic: "Cache映射",
    question:
      "Cache 的三种映射方式（直接映射、全相联、组相联）各有什么优缺点？组相联中组号如何计算？请举例说明。",
    answer: `## 三种映射方式对比

### 1. 直接映射（Direct Mapped）
- 每个主存块只能映射到唯一的 Cache 行
- **Cache 行号 = 主存块号 mod Cache 行数**
- 优：硬件简单，命中速度快
- 缺：冲突缺失率高（多个块争用同一行）

### 2. 全相联映射（Fully Associative）
- 主存块可放入任意 Cache 行
- 优：冲突缺失率最低
- 缺：比较电路复杂，成本高，速度慢

### 3. 组相联映射（Set Associative）
- Cache 分为若干组，每组有 k 块（k 路组相联）
- 主存块先映射到固定组，组内可放任意位置
- **组号 = 主存块号 mod 组数**
- 优：折中方案，兼具前两者优点

## 组相联计算示例

设 Cache 共 16 块，4 路组相联 → 共 4 组（16÷4=4）
主存块号 = 10

**组号 = 10 mod 4 = 2 号组**

组内可放在第 2 组的 4 个块中任意位置。

## 地址划分（组相联）

| 标记（Tag） | 组索引（Index） | 块内偏移（Offset） |
|-------------|-----------------|-------------------|

- 组索引位数 = log₂(组数)
- 块内偏移位数 = log₂(块大小)`,
    tags: ["Cache", "组相联", "映射方式"],
    isWeakPoint: false,
    source: "Gemini",
  },
  {
    id: "gemini-tcp-20250708",
    date: "2025-07-08",
    subject: "408",
    subSubject: "cn",
    topic: "TCP拥塞控制",
    question:
      "TCP 拥塞控制有哪几个阶段？收到 3 个重复 ACK 和超时分别如何处理？cwnd 和 ssthresh 如何变化？",
    answer: `## TCP 拥塞控制四个阶段

### 1. 慢开始（Slow Start）
- cwnd 从 1 MSS 开始
- 每收到一个 ACK，cwnd += 1 MSS（指数增长）
- 直到 cwnd ≥ ssthresh → 进入拥塞避免

### 2. 拥塞避免（Congestion Avoidance）
- 每经过一个 RTT，cwnd += 1 MSS（线性增长）
- 直到检测到拥塞

### 3. 快重传（Fast Retransmit）
- 收到 3 个重复 ACK → 立即重传丢失的报文段
- ssthresh = cwnd / 2
- cwnd = ssthresh + 3（考虑已离开网络的 3 个报文）
- 进入**快恢复**

### 4. 快恢复（Fast Recovery）
- 每收到一个重复 ACK，cwnd += 1
- 收到新 ACK → cwnd = ssthresh，进入拥塞避免

## 超时 vs 3 个重复 ACK

| 事件 | ssthresh | cwnd | 后续阶段 |
|------|----------|------|----------|
| 超时 | cwnd/2 | 1 | 慢开始 |
| 3 重复 ACK | cwnd/2 | ssthresh+3 | 快恢复 |

> 考试重点：超时 → 慢开始，3 重复 ACK → 快恢复。二种反应，四点参数。`,
    tags: ["TCP", "拥塞控制", "快重传", "快恢复"],
    isWeakPoint: false,
    source: "Gemini",
  },
  {
    id: "gemini-linear-algebra-20250710",
    date: "2025-07-10",
    subject: "math",
    topic: "特征值与特征向量",
    question:
      "如何理解特征值和特征向量的几何意义？实对称矩阵的特征值有什么特殊性质？相似对角化的条件是什么？",
    answer: `## 几何意义

特征向量 $\\vec{v}$：线性变换 $A$ 作用下**方向不变**的向量
特征值 $\\lambda$：该方向上拉伸/压缩的倍数

$$A\\vec{v} = \\lambda\\vec{v}$$

## 实对称矩阵的特殊性质

1. **特征值全为实数**（实对称矩阵的所有特征值一定是实数）
2. **不同特征值的特征向量相互正交**
3. **一定可以正交相似对角化**：
   $$A = Q\\Lambda Q^T$$
   其中 $Q$ 为正交矩阵（$Q^T = Q^{-1}$），$\\Lambda$ 为对角矩阵

## 相似对角化的条件

$n$ 阶方阵 $A$ 可相似对角化 $\\iff$ $A$ 有 $n$ 个线性无关的特征向量

等价条件：
- $A$ 的每个特征值的**几何重数 = 代数重数**
- 即对每个 $k$ 重特征值，刚好有 $k$ 个线性无关的特征向量

> 实对称矩阵一定可对角化，是最友好的矩阵类型。`,
    tags: ["线性代数", "特征值", "对角化", "实对称矩阵"],
    isWeakPoint: true,
    source: "Gemini",
  },
  {
    id: "gemini-translation-20250712",
    date: "2025-07-12",
    subject: "english",
    topic: "翻译技巧",
    question:
      "英语一翻译真题中，遇到长难句拆分的技巧有哪些？怎么处理定语从句和同位语从句的翻译？",
    answer: `## 长难句拆分三步骤

### 1. 找主干
- 先定位主谓宾，忽略修饰成分
- 识别从句连接词（that, which, who, when, where...）

### 2. 拆从句
- 将长句按从句边界切分为短句
- 定语从句 → 前置做定语（...的）或后置独立成句
- 同位语从句 → 加"即"或"这一..."来衔接

### 3. 重组语序
- 英语：修饰后置、从句右分支
- 中文：修饰前置、短句并列

## 定语从句处理

**前置法**（短定语）：
> The method **that he proposed** is effective.
> → 他**提出的**方法很有效。

**后置法**（长定语）：
> He proposed a method, **which was later widely adopted**.
> → 他提出了一种方法，**这种方法后来被广泛采用**。

## 同位语从句处理

> The fact **that he passed the exam** surprised everyone.
> → 他通过了考试**这一**事实让所有人惊讶。

> 核心原则：中文不习惯长定语，能拆就拆。翻译追求的是意思准确 + 表达通顺，不是字对字。`,
    tags: ["翻译", "长难句", "定语从句", "英语一"],
    isWeakPoint: true,
    source: "Gemini",
  },
];

/** Get all unique subjects that have Q&A items */
export function getQASubjects(): QASubject[] {
  const subjects = new Set(qaItems.map((q) => q.subject));
  return Array.from(subjects);
}

/** Get Q&A items filtered by subject */
export function getQABySubject(subject: QASubject): QAItem[] {
  return qaItems.filter((q) => q.subject === subject).sort(
    (a, b) => b.date.localeCompare(a.date)
  );
}

/** Get all weak point items */
export function getWeakPoints(): QAItem[] {
  return qaItems.filter((q) => q.isWeakPoint).sort(
    (a, b) => b.date.localeCompare(a.date)
  );
}

/** Group Q&A items by subject for display */
export function getQAGroupedBySubject(): Record<QASubject, QAItem[]> {
  const result: Record<string, QAItem[]> = {};
  for (const subject of getQASubjects()) {
    result[subject] = getQABySubject(subject);
  }
  return result as Record<QASubject, QAItem[]>;
}
