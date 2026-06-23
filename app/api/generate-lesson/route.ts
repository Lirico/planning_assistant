import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

// IMPORTAMOS MONGOOSE Y EL MODELO
import dbConnect from "@/lib/db";
import Lesson from "@/models/Lesson";

const lessonPlanSchema = z.object({
  topic: z.string(),
  educationalLevel: z.string(),
  durationTotal: z.number(),
  objectives: z.array(z.string()),
  timeline: z.array(
    z.object({
      durationInMinutes: z.number(),
      activityTitle: z.string(),
      description: z.string(),
      teacherRole: z.string(),
      studentRole: z.string(),
    })
  ),
  practicalExercises: z.array(z.string()),
  evaluationCriteria: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, educationalLevel, durationMinutes, additionalNotes } = body;

    if (!topic) {
      return NextResponse.json({ error: "El tema es obligatorio" }, { status: 400 });
    }

    const systemPrompt = `
      Actuás como un Diseñador Instruccional y Pedagogo Experto con más de 10 años de experiencia en metodologías activas de enseñanza.
      Tu tarea es diseñar un plan de clase (Lesson Plan) sumamente detallado, realista y accionable basado en los requerimientos del usuario.
      Estructurá el tiempo de forma milimétrica en bloques lógicos dentro de la propiedad 'timeline'.
    `;

    const userPrompt = `
      Diseñá una clase con las siguientes especificaciones:
      - Tema central: ${topic}
      - Nivel de los alumnos: ${educationalLevel}
      - Duración total de la clase: ${durationMinutes} minutos.
      ${additionalNotes ? `- Notas adicionales de enfoque: ${additionalNotes}` : ""}
    `;

    // 1. Llamamos a Gemini
    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: lessonPlanSchema,
      prompt: userPrompt,
      system: systemPrompt,
    });

    // 2. CONECTAMOS A LA BASE DE DATOS
    await dbConnect();

    // 3. GUARDAMOS EL REGISTRO EN MONGO ATLAS
    // Pasamos el objeto que nos devolvió la IA. Mongoose se encarga de mapearlo con el Schema.
    const savedLesson = await Lesson.create({
      topic: object.topic,
      educationalLevel: object.educationalLevel,
      durationTotal: object.durationTotal,
      objectives: object.objectives,
      timeline: object.timeline,
      practicalExercises: object.practicalExercises,
      evaluationCriteria: object.evaluationCriteria,
    });

    // 4. DEVOLVEMOS EL OBJETO YA GUARDADO (que incluye el _id de MongoDB)
    return NextResponse.json(savedLesson);

  } catch (error) {
    console.error("Error en el flujo:", error);
    return NextResponse.json(
      { error: "Hubo un error al procesar o guardar el plan de clase" },
      { status: 500 }
    );
  }
}