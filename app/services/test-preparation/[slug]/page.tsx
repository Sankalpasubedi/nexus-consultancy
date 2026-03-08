import { Metadata } from "next";
import ExamDetailClient from "./ExamDetailClient";
import { exams, getExamBySlug } from "../examData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return exams.map((exam) => ({
    slug: `enroll-for-${exam.title.toLowerCase().replace(/\s+/g, "-")}`,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const exam = getExamBySlug(slug);

  if (!exam) {
    return {
      title: "Exam Not Found | Nexsus Education",
    };
  }

  return {
    title: `${exam.title} Preparation | Nexsus Education`,
    description: exam.description,
  };
}

export default async function ExamDetailPage({ params }: Props) {
  const { slug } = await params;
  return <ExamDetailClient slug={slug} />;
}
