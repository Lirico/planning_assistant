// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Definimos qué rutas requieren autenticación (todo lo que empiece con /dashboard)
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(); // Si no está logueado, Clerk lo redirige automáticamente al login
  }
});

export const config = {
  matcher: [
    // Ejecuta el middleware en todas las rutas excepto archivos estáticos y rutas internas de Next.js
    "/((?!_next|[^?]*\\.(?:html|css|js|gif|svg|png|webp|jpg|jpeg|curve|ico|csv|docx|xlsx|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};