"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { X } from "lucide-react";

export default function EditAnnoncePage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [error, setError] = useState("");
  const [annonce, setAnnonce] = useState({
    nom: "",
    description: "",
    prix: "",
    categorie: "",
    telephone: "",
    emplacement: "",
    imageUrls: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnonce = async () => {
      try {
        const res = await fetch(`/api/annonces/${id}`);
        if (!res.ok) throw new Error("Échec du chargement");
        const data = await res.json();
        
        setAnnonce({
          ...data,
          prix: data.prix.toString(),
          categorie: data.categorie?.nom || "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnonce();
  }, [id]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const MAX_IMAGES = 3;
    const currentImages = annonce.imageUrls.length;
    
    // Vérification du nombre maximum d'images
    if (currentImages + files.length > MAX_IMAGES) {
      const availableSlots = MAX_IMAGES - currentImages;
      if (availableSlots <= 0) {
        setError("Maximum de 3 images atteint");
        setTimeout(() => setError(""), 3000);
        return;
      }
      files.splice(availableSlots);
    }

    const newImages = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "votre_upload_preset");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/votre_cloud_name/image/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        newImages.push(data.secure_url);
      } catch (err) {
        console.error("Erreur upload:", err);
      }
    }

    setAnnonce(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setAnnonce(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    
    if (!session?.user?.id) {
      setError("Authentification requise");
      return;
    }

    try {
      const payload = {
        ...annonce,
        userId: session.user.id,
        prix: parseFloat(annonce.prix),
        imageUrls: annonce.imageUrls.filter(url => url.trim() !== "")
      };

      // Validation du numéro de téléphone
      const phoneRegex = /^\d{8}$/;
      if (!phoneRegex.test(payload.telephone)) {
        throw new Error("Numéro de téléphone invalide (8 chiffres requis)");
      }

      const res = await fetch(`/api/annonces/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur de mise à jour");

      router.push(`/annonces/${id}`);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(""), 5000);
    }
  }

  if (loading) return <div className="text-center p-8">Chargement...</div>;

  return (
    <section className="container mx-auto p-6 max-w-2xl">
  <h1 className="text-3xl font-bold text-primary mb-6">Modifier l'annonce</h1>
  
  <form onSubmit={handleSubmit} className="space-y-6">
    {error && <div className="text-red-500 p-3 bg-red-50 rounded-lg">{error}</div>}

    {/* Section Images */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Images ({annonce.imageUrls.length}/3)</label>
      <div className="grid grid-cols-3 gap-2">
        {annonce.imageUrls.map((url, index) => (
          <div key={index} className="relative group">
            <Image
              src={url}
              alt={`Image ${index + 1}`}
              width={200}
              height={200}
              className="rounded-lg object-cover aspect-square"
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {annonce.imageUrls.length < 3 && (
          <label className="aspect-square border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
            />
            <span className="text-gray-500">+ Ajouter</span>
          </label>
        )}
      </div>
      {annonce.imageUrls.length >= 3 && (
        <p className="text-sm text-gray-500 mt-1">Maximum de 3 images atteint</p>
      )}
    </div>

    {/* Nom de l'annonce */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Nom de l'annonce *</label>
      <Input
        value={annonce.nom}
        onChange={(e) => setAnnonce({ ...annonce, nom: e.target.value })}
        required
      />
    </div>

    {/* Description */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Description *</label>
      <Textarea
        value={annonce.description}
        onChange={(e) => setAnnonce({ ...annonce, description: e.target.value })}
        required
      />
    </div>

    {/* Prix */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Prix (TND) *</label>
      <Input
        type="number"
        value={annonce.prix}
        onChange={(e) => setAnnonce({ ...annonce, prix: e.target.value })}
        required
      />
    </div>

    {/* Catégorie */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Catégorie *</label>
      <Input
        value={annonce.categorie}
        onChange={(e) => setAnnonce({ ...annonce, categorie: e.target.value })}
        required
      />
    </div>

    {/* Téléphone */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Téléphone *</label>
      <Input
        value={annonce.telephone}
        onChange={(e) => setAnnonce({ ...annonce, telephone: e.target.value })}
        required
      />
    </div>

    {/* Gouvernorat */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Gouvernorat *</label>
      <select
        value={annonce.emplacement}
        onChange={(e) => setAnnonce({ ...annonce, emplacement: e.target.value })}
        className="w-full p-2.5 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
        required
      >
        <option value="">Sélectionner un gouvernorat</option>
        <option value="Tunis">Tunis</option>
        <option value="Ariana">Ariana</option>
        <option value="Ben Arous">Ben Arous</option>
        <option value="Manouba">Manouba</option>
        <option value="Nabeul">Nabeul</option>
        <option value="Zaghouan">Zaghouan</option>
        <option value="Bizerte">Bizerte</option>
        <option value="Béja">Béja</option>
        <option value="Jendouba">Jendouba</option>
        <option value="Le Kef">Le Kef</option>
        <option value="Siliana">Siliana</option>
        <option value="Sousse">Sousse</option>
        <option value="Monastir">Monastir</option>
        <option value="Mahdia">Mahdia</option>
        <option value="Sfax">Sfax</option>
        <option value="Kairouan">Kairouan</option>
        <option value="Kasserine">Kasserine</option>
        <option value="Sidi Bouzid">Sidi Bouzid</option>
        <option value="Gabès">Gabès</option>
        <option value="Medenine">Medenine</option>
        <option value="Tataouine">Tataouine</option>
        <option value="Gafsa">Gafsa</option>
        <option value="Tozeur">Tozeur</option>
        <option value="Kebili">Kebili</option>
      </select>
    </div>

    {/* Bouton de soumission */}
    <div className="pt-6">
      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700 py-3 text-lg font-medium"
      >
        Enregistrer les modifications
      </Button>
    </div>
  </form>
</section>
  );
}