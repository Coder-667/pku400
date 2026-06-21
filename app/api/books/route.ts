import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const books = await prisma.book.findMany({
    include: { _count: { select: { chapters: true } } },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(books);
}

export async function POST(request: Request) {
  const body = await request.json();
  const book = await prisma.book.create({
    data: {
      title: body.title,
      author: body.author,
      publisher: body.publisher || "",
      category: body.category,
      description: body.description || "",
      theaLink: body.theaLink || "",
    },
  });
  return NextResponse.json(book, { status: 201 });
}
