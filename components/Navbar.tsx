import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
      <span className="font-bold text-gray-900">Asistente IA</span>
      {/* Este botón maneja el avatar del usuario, menú de cuenta y logout automáticamente */}
      <UserButton showName />
    </nav>
  );
}