export interface LessonRequestInput {
  topic: string;
  educationalLevel: string;
  durationMinutes: number;
  additionalNotes?: string;
}

export interface LessonTimeBlock {
  durationInMinutes: number;
  activityTitle: string;
  description: string;
  teacherRole: string; // Qué hace el profe
  studentRole: string; // Qué hacen los alumnos
}

export interface GeneratedLessonPlan {
  id: string;
  topic: string;
  targetAudience: string;
  durationTotal: number;
  objectives: string[];
  timeline: LessonTimeBlock[];
  practicalExercises: string[];
  evaluationCriteria: string;
  createdAt: string;
}