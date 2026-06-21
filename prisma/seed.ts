import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const isTurso = process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN;

const prisma = isTurso
  ? new PrismaClient({
      adapter: new PrismaLibSql({
        url: process.env.TURSO_DATABASE_URL!,
        authToken: process.env.TURSO_AUTH_TOKEN!,
      }),
    })
  : new PrismaClient({
      adapter: new PrismaBetterSqlite3({
        url: process.env.DATABASE_URL || "file:./prisma/dev.db",
      }),
    });

async function main() {
  await prisma.exercise.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.book.deleteMany();

  // ==================== 408 数据结构 ====================
  const dsBook1 = await prisma.book.create({
    data: {
      title: "《数据结构（C语言版）》",
      author: "严蔚敏",
      publisher: "清华大学出版社",
      category: "ds",
      description: "国内数据结构经典教材，覆盖408数据结构考点：线性表、栈与队列、树与二叉树、图、查找、排序等。",
      chapters: {
        create: [
          { title: "第1章 绪论", order: 1, syllabusRef: "数据结构基本概念、算法分析" },
          { title: "第2章 线性表", order: 2, syllabusRef: "顺序表、链表、循环链表" },
          { title: "第3章 栈和队列", order: 3, syllabusRef: "栈的应用、循环队列、双端队列" },
          { title: "第6章 树和二叉树", order: 4, syllabusRef: "二叉树遍历、BST、平衡二叉树、哈夫曼树" },
          { title: "第7章 图", order: 5, syllabusRef: "存储结构、DFS/BFS、最小生成树、最短路径、拓扑排序、关键路径" },
          { title: "第9章 查找", order: 6, syllabusRef: "顺序、折半、B树/B+树、散列表" },
          { title: "第10章 内部排序", order: 7, syllabusRef: "插入、交换、选择、归并、基数排序与复杂度" },
        ],
      },
    },
  });

  const dsBook2 = await prisma.book.create({
    data: {
      title: "《2026王道考研·数据结构》",
      author: "王道论坛",
      publisher: "电子工业出版社",
      category: "ds",
      description: "408考研数据结构核心辅导书，命题思路贴近真题，知识点讲解精炼，配套大量408真题与习题。",
      chapters: {
        create: [
          { title: "第1章 绪论", order: 1, syllabusRef: "算法复杂度分析" },
          { title: "第2章 线性表", order: 2, syllabusRef: "顺序表、链表、408真题" },
          { title: "第3章 栈和队列", order: 3, syllabusRef: "栈和队列的应用、408真题" },
          { title: "第4章 树与二叉树", order: 4, syllabusRef: "二叉树遍历、线索二叉树、408真题" },
          { title: "第5章 图", order: 5, syllabusRef: "图算法、408真题" },
          { title: "第6章 查找", order: 6, syllabusRef: "B树/B+树、散列表、408真题" },
          { title: "第7章 排序", order: 7, syllabusRef: "各排序算法对比、408真题" },
        ],
      },
    },
  });

  // ==================== 408 计算机组成原理 ====================
  const coBook1 = await prisma.book.create({
    data: {
      title: "《计算机组成原理》",
      author: "唐朔飞",
      publisher: "高等教育出版社",
      category: "co",
      description: "国内计算机组成原理经典教材，覆盖408组成原理全部考点：数据表示、存储层次、指令系统、CPU数据通路、总线与I/O。",
      chapters: {
        create: [
          { title: "第1章 计算机系统概论", order: 1, syllabusRef: "冯·诺依曼结构、计算机性能指标" },
          { title: "第2章 数据表示与运算", order: 2, syllabusRef: "补码、浮点数IEEE754、ALU" },
          { title: "第3章 存储系统", order: 3, syllabusRef: "Cache映射、虚拟存储器、TLB" },
          { title: "第4章 指令系统", order: 4, syllabusRef: "寻址方式、CISC/RISC" },
          { title: "第5章 中央处理器", order: 5, syllabusRef: "数据通路、流水线、冒险处理" },
          { title: "第6章 总线", order: 6, syllabusRef: "总线仲裁、总线标准" },
          { title: "第7章 输入输出系统", order: 7, syllabusRef: "中断、DMA、程序查询" },
        ],
      },
    },
  });

  const coBook2 = await prisma.book.create({
    data: {
      title: "《2026王道考研·计算机组成原理》",
      author: "王道论坛",
      publisher: "电子工业出版社",
      category: "co",
      description: "408考研组成原理核心辅导书，对存储器层次结构、CPU数据通路、指令流水线等408高频考点讲解透彻。",
      chapters: {
        create: [
          { title: "第1章 计算机系统概述", order: 1, syllabusRef: "性能指标、408真题" },
          { title: "第2章 数据的表示和运算", order: 2, syllabusRef: "浮点数、运算方法、408真题" },
          { title: "第3章 存储器层次结构", order: 3, syllabusRef: "Cache、虚存、408真题" },
          { title: "第4章 指令系统", order: 4, syllabusRef: "指令格式、寻址方式、408真题" },
          { title: "第5章 中央处理器", order: 5, syllabusRef: "数据通路、流水线、408真题" },
          { title: "第6章 总线", order: 6, syllabusRef: "总线标准、408真题" },
          { title: "第7章 输入输出系统", order: 7, syllabusRef: "中断/DMA、408真题" },
        ],
      },
    },
  });

  // ==================== 408 操作系统 ====================
  const osBook1 = await prisma.book.create({
    data: {
      title: "《计算机操作系统》",
      author: "汤小丹",
      publisher: "西安电子科技大学出版社",
      category: "os",
      description: "国内操作系统经典教材，覆盖408操作系统考点：进程管理、内存管理、文件系统、I/O管理。",
      chapters: {
        create: [
          { title: "第1章 操作系统引论", order: 1, syllabusRef: "OS类型、特征、运行环境" },
          { title: "第2章 进程管理", order: 2, syllabusRef: "进程/线程、同步互斥、死锁" },
          { title: "第3章 内存管理", order: 3, syllabusRef: "分页/分段、虚拟内存、页面置换算法" },
          { title: "第4章 文件系统", order: 4, syllabusRef: "文件结构、目录、空闲空间管理" },
          { title: "第5章 I/O管理", order: 5, syllabusRef: "磁盘调度、I/O控制方式、SPOOLing" },
        ],
      },
    },
  });

  const osBook2 = await prisma.book.create({
    data: {
      title: "《2026王道考研·操作系统》",
      author: "王道论坛",
      publisher: "电子工业出版社",
      category: "os",
      description: "408考研操作系统核心辅导书，对PV操作、页面置换、磁盘调度等408常考大题有详细讲解。",
      chapters: {
        create: [
          { title: "第1章 操作系统概述", order: 1, syllabusRef: "408真题" },
          { title: "第2章 进程管理", order: 2, syllabusRef: "PV操作、死锁、408真题" },
          { title: "第3章 内存管理", order: 3, syllabusRef: "页面置换、地址翻译、408真题" },
          { title: "第4章 文件管理", order: 4, syllabusRef: "文件系统、408真题" },
          { title: "第5章 I/O管理", order: 5, syllabusRef: "磁盘调度、408真题" },
        ],
      },
    },
  });

  // ==================== 408 计算机网络 ====================
  const cnBook1 = await prisma.book.create({
    data: {
      title: "《计算机网络》",
      author: "谢希仁",
      publisher: "电子工业出版社",
      category: "cn",
      description: "国内计算机网络经典教材，覆盖408计网考点：TCP/IP协议栈、各层协议与设备。",
      chapters: {
        create: [
          { title: "第1章 概述", order: 1, syllabusRef: "计算机网络体系结构" },
          { title: "第2章 物理层", order: 2, syllabusRef: "奈奎斯特/香农定理、编码与调制" },
          { title: "第3章 数据链路层", order: 3, syllabusRef: "CSMA/CD、MAC帧、交换机、VLAN" },
          { title: "第4章 网络层", order: 4, syllabusRef: "IP、子网划分、CIDR、路由协议RIP/OSPF/BGP" },
          { title: "第5章 运输层", order: 5, syllabusRef: "TCP/UDP、流量控制、拥塞控制" },
          { title: "第6章 应用层", order: 6, syllabusRef: "DNS、HTTP/HTTPS、FTP、SMTP" },
        ],
      },
    },
  });

  const cnBook2 = await prisma.book.create({
    data: {
      title: "《2026王道考研·计算机网络》",
      author: "王道论坛",
      publisher: "电子工业出版社",
      category: "cn",
      description: "408考研计网核心辅导书，对TCP拥塞控制、IP子网划分、路由协议等408高频考点讲解细致。",
      chapters: {
        create: [
          { title: "第1章 计算机网络体系结构", order: 1, syllabusRef: "408真题" },
          { title: "第2章 物理层", order: 2, syllabusRef: "408真题" },
          { title: "第3章 数据链路层", order: 3, syllabusRef: "CSMA/CD、交换式以太网、408真题" },
          { title: "第4章 网络层", order: 4, syllabusRef: "子网划分、路由协议、408真题" },
          { title: "第5章 传输层", order: 5, syllabusRef: "TCP拥塞控制、408真题" },
          { title: "第6章 应用层", order: 6, syllabusRef: "DNS、HTTP、408真题" },
        ],
      },
    },
  });

  // ==================== 数学一 ====================
  const mathBook1 = await prisma.book.create({
    data: {
      title: "《张宇高等数学18讲》",
      author: "张宇",
      publisher: "北京理工大学出版社",
      category: "math_one",
      description: "数学一高数部分核心辅导书，覆盖函数极限、微积分、级数、微分方程等全部考纲内容。",
      chapters: {
        create: [
          { title: "第1讲 函数极限与连续", order: 1, syllabusRef: "极限计算、连续性" },
          { title: "第2讲 导数与微分", order: 2, syllabusRef: "微分中值定理" },
          { title: "第3讲 一元函数积分学", order: 3, syllabusRef: "不定积分、定积分" },
          { title: "第4讲 多元函数微分学", order: 4, syllabusRef: "偏导数、极值" },
          { title: "第5讲 二重积分", order: 5, syllabusRef: "二重积分计算" },
          { title: "第6讲 微分方程", order: 6, syllabusRef: "一阶/高阶微分方程" },
        ],
      },
    },
  });

  const mathBook2 = await prisma.book.create({
    data: {
      title: "《李永乐线性代数辅导讲义》",
      author: "李永乐",
      publisher: "西安交通大学出版社",
      category: "math_one",
      description: "数学一线代核心辅导书，覆盖行列式、矩阵、向量组、方程组、特征值、二次型。",
      chapters: {
        create: [
          { title: "第1章 行列式", order: 1, syllabusRef: "行列式计算" },
          { title: "第2章 矩阵", order: 2, syllabusRef: "矩阵运算、逆矩阵" },
          { title: "第3章 向量", order: 3, syllabusRef: "线性相关性" },
          { title: "第4章 线性方程组", order: 4, syllabusRef: "齐次/非齐次方程" },
          { title: "第5章 特征值与特征向量", order: 5, syllabusRef: "相似对角化" },
          { title: "第6章 二次型", order: 6, syllabusRef: "标准型、正定性" },
        ],
      },
    },
  });

  // Sample exercises
  const dsCh1 = await prisma.chapter.findFirst({ where: { bookId: dsBook2.id, order: 4 } });
  const coCh1 = await prisma.chapter.findFirst({ where: { bookId: coBook2.id, order: 5 } });
  const osCh1 = await prisma.chapter.findFirst({ where: { bookId: osBook2.id, order: 2 } });

  if (dsCh1) {
    await prisma.exercise.create({
      data: {
        chapterId: dsCh1.id,
        type: "textbook",
        difficulty: "medium",
        question: "已知一棵二叉树的前序遍历序列为 ABDEGCF，中序遍历序列为 DBGEACF。\n\n1. 请画出这棵二叉树\n2. 写出其后序遍历序列\n3. 求该二叉树的深度",
        answer: "**1. 二叉树结构：**\n\n```\n      A\n     / \\\n    B   C\n   / \\ /\n  D  E F\n     /\n    G\n```\n\n**2. 后序遍历序列：** DGEBFCA\n\n**3. 二叉树深度：** 4（从根A到叶G经过A→B→E→G）",
        explanation: "由前序和中序唯一确定二叉树：\n1. 前序第一个A是根节点\n2. 中序中A左边DBGE是左子树，右边CF是右子树\n3. 递归对左右子树重复上述过程\n\n深度：根节点到最远叶子节点的边数+1",
        tags: "[\"二叉树\",\"遍历\",\"前序\",\"中序\",\"后序\"]",
        source: "王道考研·数据结构 第4章",
      },
    });
  }

  if (coCh1) {
    await prisma.exercise.create({
      data: {
        chapterId: coCh1.id,
        type: "textbook",
        difficulty: "hard",
        question: "某计算机采用5级指令流水线，各段执行时间分别为：取指200ps、译码100ps、执行150ps、访存200ps、写回100ps。\n\n1. 该流水线的时钟周期至少为多少？\n2. 连续执行100条指令的吞吐率是多少？\n3. 与串行执行相比，加速比是多少？",
        answer: "**1. 时钟周期：**\n流水线时钟周期 = max(200, 100, 150, 200, 100) = **200ps**\n\n**2. 吞吐率：**\n流水线执行时间 = 1×5×200ps + (100-1)×200ps = 1000 + 19800 = 20800ps\n吞吐率 = 100 / 20800ps ≈ **4.81条/ns**\n\n**3. 加速比：**\n串行执行时间 = 100 × (200+100+150+200+100) = 100 × 750 = 75000ps\n加速比 = 75000 / 20800 ≈ **3.61**",
        explanation: "流水线时钟周期由最慢的段决定（瓶颈段）。吞吐率 = 指令数 / 总执行时间。五段流水线：第1条指令需5个周期填充，后续每个周期完成1条。理想加速比趋近于段数5，实际受限于各段不均衡。",
        tags: "[\"流水线\",\"CPU\",\"时钟周期\",\"吞吐率\",\"加速比\"]",
        source: "王道考研·计算机组成原理 第5章",
      },
    });
  }

  if (osCh1) {
    await prisma.exercise.create({
      data: {
        chapterId: osCh1.id,
        type: "textbook",
        difficulty: "medium",
        question: "某系统中有3个进程P1、P2、P3共享8台打印机。\n\n- P1最大需求为4台，当前已分配2台\n- P2最大需求为5台，当前已分配2台\n- P3最大需求为3台，当前已分配1台\n\n1. 当前系统处于安全状态吗？请用银行家算法分析\n2. 若P1再请求1台打印机，能否立即分配？",
        answer: "**1. 安全性分析：**\n\n当前可用资源 = 8 - (2+2+1) = 3台\n\n各进程剩余需求：\n- P1: Need = 4-2 = 2\n- P2: Need = 5-2 = 3\n- P3: Need = 3-1 = 2\n\n安全序列 P1→P3→P2：\n- 满足P1: Work=3≥2(Need) ✓, Work=3+2=5\n- 满足P3: Work=5≥2 ✓, Work=5+1=6\n- 满足P2: Work=6≥3 ✓\n\n**系统处于安全状态。**\n\n**2. 若P1再请求1台：**\n\n分配后：P1已分配3，可用=2\nP1 Need=1, P3 Need=2, P2 Need=3\n\n安全性检查：Work=2≥P1.Need=1 ✓, Work=2+3=5\nWork=5≥P3.Need=2 ✓, Work=5+1=6\nWork=6≥P2.Need=3 ✓\n\n**可以立即分配。**",
        explanation: "银行家算法核心：试探性分配后检查是否存在安全序列。若存在，则系统仍然安全，可以分配；否则拒绝分配以避免死锁。",
        tags: "[\"银行家算法\",\"死锁\",\"安全状态\",\"进程管理\"]",
        source: "王道考研·操作系统 第2章",
      },
    });
  }

  console.log("Seed completed successfully!");
  console.log(`Books created: ${await prisma.book.count()}`);
  console.log(`Chapters created: ${await prisma.chapter.count()}`);
  console.log(`Exercises created: ${await prisma.exercise.count()}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
