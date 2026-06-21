import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

interface GenerateExerciseInput {
  topic: string;
  count?: number;
  difficulty?: "easy" | "medium" | "hard";
  includeAnswer?: boolean;
  includeExplanation?: boolean;
}

export async function generateExercises(input: GenerateExerciseInput) {
  const { topic, count = 3, difficulty = "medium", includeAnswer = true, includeExplanation = true } = input;

  const systemPrompt = `你是一位北大软微408计算机综合考研辅导专家。请根据给定的知识点，生成高质量的考研习题。

要求：
1. 题目语言为中文
2. 题目应贴合408考试风格，注重概念理解和综合应用
3. 若题目包含公式，请使用LaTeX格式（如 $f(x) = wx + b$）
4. 难度：${difficulty}
5. 每道题包含：题目标题、题目内容（Markdown格式）
${includeAnswer ? "6. 每道题需包含：参考答案（Markdown格式）" : ""}
${includeExplanation ? "7. 每道题需包含：详细解析（Markdown格式）" : ""}

请以JSON数组格式返回，格式如下：
[{
  "title": "题目标题",
  "question": "题目内容（Markdown）",
  "answer": "参考答案（Markdown）",
  "explanation": "详细解析（Markdown）",
  "difficulty": "${difficulty}",
  "tags": ["标签1", "标签2"]
}]`;

  const userMessage = `请根据以下知识点生成 ${count} 道${difficulty === "easy" ? "基础" : difficulty === "medium" ? "中等" : "困难"}难度的习题：${topic}`;

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  const text = textBlock.text;
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error("Could not parse JSON from Claude response");
  }

  return JSON.parse(jsonMatch[0]) as Array<{
    title: string;
    question: string;
    answer: string;
    explanation: string;
    difficulty: string;
    tags: string[];
  }>;
}
