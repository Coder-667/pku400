import { getAvailableYears } from "@/data/exam-questions";
import { ExamYearContent } from "./ExamYearContent";

export function generateStaticParams() {
  return getAvailableYears().map((year) => ({ year: String(year) }));
}

interface ExamYearPageProps {
  params: Promise<{ year: string }>;
}

export default function ExamYearPage({ params }: ExamYearPageProps) {
  return <ExamYearContent params={params} />;
}
