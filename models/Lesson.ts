import mongoose, { Schema, Document } from "mongoose";

// Interfaz para el documento de Mongoose basada en nuestro flujo
export interface ILessonSchema extends Document {
  topic: string;
  educationalLevel: string;
  durationTotal: number;
  objectives: string[];
  timeline: Array<{
    durationInMinutes: number;
    activityTitle: string;
    description: string;
    teacherRole: string;
    studentRole: string;
  }>;
  practicalExercises: string[];
  evaluationCriteria: string;
  createdAt: Date;
}

const LessonSchema: Schema = new Schema({
  userId: { type: String, required: true }, // <--- AGREGAR ESTO
  topic: { type: String, required: true },
  educationalLevel: { type: String, required: true },
  durationTotal: { type: Number, required: true },
  objectives: [{ type: String }],
  timeline: [
    {
      durationInMinutes: { type: Number, required: true },
      activityTitle: { type: String, required: true },
      description: { type: String, required: true },
      teacherRole: { type: String, required: true },
      studentRole: { type: String, required: true },
    },
  ],
  practicalExercises: [{ type: String }],
  evaluationCriteria: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Evitamos sobreescribir el modelo si ya existe compilado en el contexto de Next.js
export default mongoose.models.Lesson || mongoose.model<ILessonSchema>("Lesson", LessonSchema);