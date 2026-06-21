import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const chapter = await prisma.chapter.update({
    where: { id },
    data: { content: body.content },
  });
  return NextResponse.json(chapter);
}
