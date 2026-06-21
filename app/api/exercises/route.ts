import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const exercises = await prisma.exercise.findMany({
    include: { chapter: { select: { title: true, book: { select: { title: true, id: true } } } } },
    orderBy: { createdAt: "desc" },
    take: 100,
  });
  return NextResponse.json(exercises);
}

export async function POST(request: Request) {
  const body = await request.json();
  const exercise = await prisma.exercise.create({
    data: {
      chapterId: body.chapterId,
      type: body.type || "ai_generated",
      question: body.question,
      answer: body.answer || "",
      explanation: body.explanation || "",
      difficulty: body.difficulty || "medium",
      tags: JSON.stringify(body.tags || []),
      source: body.source || "",
      theaLink: body.theaLink || "",
    },
  });
  return NextResponse.json(exercise, { status: 201 });
}
