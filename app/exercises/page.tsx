import { prisma } from "@/lib/prisma";
import { ExerciseCard } from "@/components/ExerciseCard";
import { Suspense } from "react";

export default async function ExercisesPage() {
  const exercises = await prisma.exercise.findMany({
    include: {
      chapter: { select: { title: true, book: { select: { title: true } } } },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">习题库</h1>
        <p className="text-muted-foreground">
          共 {exercises.length} 道习题，包含教材原题和AI生成题
        </p>
      </div>

      <Suspense fallback={<p>加载中...</p>}>
        {exercises.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">暂无习题</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </Suspense>
    </div>
  );
}
