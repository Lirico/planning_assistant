"use client";

import React, { useState } from "react";
import { LessonRequestInput } from "@/types/lesson";

interface LessonFormProps {
  onSubmit: (data: LessonRequestInput) => void;
  isLoading: boolean;
}

export default function LessonForm({ onSubmit, isLoading }: LessonFormProps) {
  const [formData, setFormData] = useState<LessonRequestInput>({
    topic: "",
    educationalLevel: "secundario", // Valor por defecto
    durationMinutes: 60,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "durationMinutes" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.topic.trim()) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Configurar Planificación</h2>
        <p className="text-sm text-gray-500">Completá los datos para que la IA diseñe tu clase.</p>
      </div>

      {/* Input: Tema de la clase */}
      <div className="flex flex-col gap-2">
        <label htmlFor="topic" className="text-sm font-semibold text-gray-700">
          ¿Qué tema vas a dictar?
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          required
          value={formData.topic}
          onChange={handleChange}
          placeholder="Ej: Introducción a Funciones en JavaScript"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>

      {/* Grid para Nivel y Duración */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Select: Nivel Educativo */}
        <div className="flex flex-col gap-2">
          <label htmlFor="educationalLevel" className="text-sm font-semibold text-gray-700">
            Nivel de los alumnos
          </label>
          <select
            id="educationalLevel"
            name="educationalLevel"
            value={formData.educationalLevel}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="primario">Primario</option>
            <option value="secundario">Secundario</option>
            <option value="universitario">Universitario / Adultos</option>
            <option value="academia-it">Academia IT / Bootcamps</option>
          </select>
        </div>

        {/* Input: Duración */}
        <div className="flex flex-col gap-2">
          <label htmlFor="durationMinutes" className="text-sm font-semibold text-gray-700">
            Duración (minutos)
          </label>
          <input
            type="number"
            id="durationMinutes"
            name="durationMinutes"
            min={15}
            max={300}
            required
            value={formData.durationMinutes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Textarea: Notas Adicionales */}
      <div className="flex flex-col gap-2">
        <label htmlFor="additionalNotes" className="text-sm font-semibold text-gray-700">
          Notas adicionales o enfoque (Opcional)
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          rows={3}
          value={formData.additionalNotes || ""}
          onChange={handleChange}
          placeholder="Ej: Enfocar en la práctica, los alumnos ya conocen variables..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>

      {/* Botón de Submit */}
      <button
        type="submit"
        disabled={isLoading || !formData.topic.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generando plan pedagógico...
          </>
        ) : (
          "Diseñar Clase con IA"
        )}
      </button>
    </form>
  );
}