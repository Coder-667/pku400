import { prisma } from "@/lib/prisma";
import { BookCard } from "@/components/BookCard";

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const books = await prisma.book.findMany({
    include: { _count: { select: { chapters: true } } },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">参考书目</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
