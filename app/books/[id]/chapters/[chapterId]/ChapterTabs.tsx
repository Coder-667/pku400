"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChapterContent } from "@/components/ChapterContent";
import { ExerciseCard } from "@/components/ExerciseCard";
import { Dumbbell, BookOpen } from "lucide-react";

interface ExerciseSummary {
  id: string;
  question: string;
  difficulty: string;
  tags: string;
  type: string;
}

interface ChapterTabsProps {
  chapterId: string;
  content: string;
  exercises: ExerciseSummary[];
}

export function ChapterTabs({ content, exercises }: ChapterTabsProps) {
  const [tab, setTab] = useState("read");

  return (
    <Tabs value={tab} onValueChange={setTab}>
      <div className="flex items-center justify-between mb-4">
        <TabsList>
          <TabsTrigger value="read">
            <BookOpen className="h-4 w-4" />
            阅读模式
          </TabsTrigger>
          <TabsTrigger value="exercises">
            <Dumbbell className="h-4 w-4" />
            习题列表（共 {exercises.length} 题）
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="read">
        <ChapterContent content={content} exercises={exercises} />
      </TabsContent>

      <TabsContent value="exercises">
        {exercises.length === 0 ? (
          <p className="text-muted-foreground text-center py-12">暂无习题，可前往管理页添加</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {exercises.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
