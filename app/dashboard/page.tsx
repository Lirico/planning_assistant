// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LessonForm from "@/components/LessonForm";
import { LessonRequestInput } from "@/types/lesson";

// Importamos el visor de forma dinámica desactivando el Server-Side Rendering (SSR) solo para este componente
const LessonView = dynamic(() => import("@/components/LessonView"), {
  ssr: false,
});

export default function DashboardPage() {
  const [lessonData, setLessonData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateLesson = async (inputData: LessonRequestInput) => {
    setIsLoading(true);
    setLessonData(null);
    try {
      const response = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputData),
      });
      const data = await response.json();
      setLessonData(data);
    } catch (error) {
      console.error("Error al conectar con la API", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <LessonForm onSubmit={handleGenerateLesson} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-2">
          {/* Al desactivar el SSR acá, Next.js no va a intentar adivinar los datos vacíos en el servidor */}
          <LessonView data={lessonData} />
        </div>
      </div>
    </main>
  );
}