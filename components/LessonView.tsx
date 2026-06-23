import React from "react";

// Definimos la interfaz local que coincide con la respuesta del backend
interface TimeBlock {
  durationInMinutes: number;
  activityTitle: string;
  description: string;
  teacherRole: string;
  studentRole: string;
}

interface LessonPlanData {
  topic: string;
  educationalLevel: string;
  durationTotal: number;
  objectives: string[];
  timeline: TimeBlock[];
  practicalExercises: string[];
  evaluationCriteria: string;
}

interface LessonViewProps {
  data: LessonPlanData | null;
}

export default function LessonView({ data }: LessonViewProps) {
  // Si no hay datos cargados, mostramos un estado vacío amigable
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[350px] border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 p-8 text-center">
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-900">
          Vista previa del plan
        </h3>
        <p className="text-sm text-gray-500 max-w-xs mt-1">
          Configurá los datos a la izquierda y hacé clic en "Diseñar Clase" para
          ver la estructura aquí.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-fade-in">
      {/* Encabezado Principal */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
        <span className="inline-block bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
          {data.educationalLevel === "academia-it"
            ? "Academia IT / Bootcamp"
            : data.educationalLevel}
        </span>
        <h1 className="text-2xl font-bold leading-tight">{data.topic}</h1>
        <div className="flex items-center gap-4 mt-3 text-sm text-blue-100">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Duración: {data.durationTotal} min.
          </span>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Sección: Objetivos */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-3">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Objetivos de Aprendizaje
          </h2>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-gray-600 pl-2">
            {data.objectives?.map((obj, i) => (
              <li key={i}>{obj}</li>
            ))}
          </ul>
        </div>

        {/* Sección: Cronograma Pedagógico */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Estructura de la Clase (Timeline)
          </h2>

          <div className="overflow-x-auto border border-gray-100 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-4 py-3 w-20 text-center">Tiempo</th>
                  <th className="px-4 py-3">Actividad</th>
                  <th className="px-4 py-3 hidden md:table-cell">
                    Rol Profesor
                  </th>
                  <th className="px-4 py-3 hidden md:table-cell">Rol Alumno</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {data.timeline?.map((block, i) => (
                  <tr key={i} className="hover:bg-gray-50/70 transition">
                    <td className="px-4 py-4 text-center font-semibold text-blue-600 bg-blue-50/30">
                      {block.durationInMinutes} min
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-gray-900">
                        {block.activityTitle}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {block.description}
                      </div>
                      {/* Vistas colapsadas para móviles */}
                      <div className="mt-2 space-y-1 block md:hidden text-xs border-t border-dashed border-gray-100 pt-2">
                        <div>
                          <span className="font-medium text-gray-700">
                            Profe:
                          </span>{" "}
                          {block.teacherRole}
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">
                            Alumno:
                          </span>{" "}
                          {block.studentRole}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-600 text-xs hidden md:table-cell">
                      {block.teacherRole}
                    </td>
                    <td className="px-4 py-4 text-gray-600 text-xs hidden md:table-cell">
                      {block.studentRole}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dos columnas para Ejercicios y Evaluación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Col: Ejercicios */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Actividades / Ejercicios Prácticos
            </h3>
            <ul className="space-y-2 text-xs text-gray-600 pl-1">
              {data.practicalExercises?.map((ex, i) => (
                <li key={i} className="flex gap-2">
                  <span className="font-bold text-indigo-600">•</span>
                  <span>{ex}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col: Evaluación */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
              <svg
                className="w-4 h-4 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Criterios de Evaluación
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              {data.evaluationCriteria}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
