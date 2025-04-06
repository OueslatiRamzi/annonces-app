import { Suspense } from "react";
import LoginPageContent from "./LoginPageContent";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Chargement...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
