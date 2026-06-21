import { NextResponse } from "next/server";
import { generateExercises } from "@/lib/claude";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, count = 3, difficulty = "medium" } = body;

    if (!topic || topic.trim().length === 0) {
      return NextResponse.json({ error: "知识点不能为空" }, { status: 400 });
    }

    const exercises = await generateExercises({
      topic: topic.trim(),
      count: Math.min(Math.max(1, count), 10),
      difficulty,
    });

    return NextResponse.json({ exercises });
  } catch (error) {
    console.error("Generate exercises error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "生成失败，请重试" },
      { status: 500 }
    );
  }
}
