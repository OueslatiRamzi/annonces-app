import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-itim mb-8">Bienvenue sur BALLOUCHI</h1>
      <div className="space-x-4">
        <Link href="/annonces" className="bg-primary text-white px-16 py-4 rounded">Annonces</Link>
        <Link href="/publier" className="bg-secondary text-white px-16 py-4 rounded">Publier</Link>
      </div>
    </div>
  );
}
