"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 🔹 Schéma de validation
const schema = yup.object().shape({
  nom: yup.string().min(4, "Le nom doit contenir au moins 4 caractères").required("Le nom est obligatoire"),
  prix: yup.string().matches(/^\d{8}$/, "Le prix doit être un nombre de 8 chiffres").required("Prix obligatoire"),
  description: yup.string().max(30, "La description ne doit pas dépasser 30 caractères").required("Description obligatoire"),
});

export default function AnnonceForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Annonce publiée :", data);
    alert("Annonce publiée !");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-lg">
      <div>
        <label>Nom de l'annonce :</label>
        <input {...register("nom")} className="border p-2 w-full" />
        <p className="text-red-500">{errors.nom?.message}</p>
      </div>

      <div>
        <label>Prix :</label>
        <input {...register("prix")} className="border p-2 w-full" />
        <p className="text-red-500">{errors.prix?.message}</p>
      </div>

      <div>
        <label>Description :</label>
        <textarea {...register("description")} className="border p-2 w-full"></textarea>
        <p className="text-red-500">{errors.description?.message}</p>
      </div>
      <div>
        <label className="block">Image</label>
        <input type="file" {...register("image")} className="w-full border p-2" />
        <p className="text-red-500">{errors.image?.message}</p>
      </div>

      <button type="submit" className="mt-4 bg-secondary text-white px-4 py-2 rounded ">Publier</button>
    </form>
  );
}
