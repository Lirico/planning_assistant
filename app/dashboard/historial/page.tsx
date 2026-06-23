"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Importamos el visor de forma dinámica para evitar problemas de hidratación
const LessonView = dynamic(() => import("@/components/LessonView"), {
  ssr: false,
});

export default function HistorialPage() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargamos el historial al montar el componente
  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch("/api/lessons");
        const data = await response.json();
        if (Array.isArray(data)) {
          setLessons(data);
          // Por defecto seleccionamos la última generada si existe
          if (data.length > 0) setSelectedLesson(data[0]);
        }
      } catch (error) {
        console.error("Error al cargar las clases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/50 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-sm text-gray-500 font-medium">Cargando tu historial pedagógico...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Historial de Clases</h1>
          <p className="text-sm text-gray-500">Revisá y reutilizá las planificaciones que diseñaste anteriormente.</p>
        </header>

        {lessons.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <p className="text-gray-600 font-medium">Todavía no generaste ninguna clase.</p>
            <p className="text-gray-400 text-sm mt-1">Las planificaciones que crees en el panel principal aparecerán acá automáticamente.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* COLUMNA IZQUIERDA: Listado de tarjetas */}
            <div className="lg:col-span-1 space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {lessons.map((lesson) => {
                const isSelected = selectedLesson?._id === lesson._id;
                return (
                  <button
                    key={lesson._id}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`w-full text-left p-4 rounded-xl border transition shadow-sm flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-blue-50/80 border-blue-500 ring-1 ring-blue-500"
                        : "bg-white border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      {lesson.educationalLevel === "academia-it" ? "Academia IT" : lesson.educationalLevel}
                    </span>
                    <h3 className="font-bold text-gray-900 line-clamp-1">{lesson.topic}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-400 mt-1 w-full">
                      <span>{lesson.durationTotal} minutos</span>
                      <span>{new Date(lesson.createdAt).toLocaleDateString("es-AR")}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* COLUMNA DERECHA: Visor de la clase seleccionada */}
            <div className="lg:col-span-2">
              <LessonView data={selectedLesson} />
            </div>

          </div>
        )}
      </div>
    </main>
  );
}