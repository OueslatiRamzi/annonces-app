"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// 🔹 Schéma de validation
const schema = yup.object().shape({
  name: yup.string().min(4, "Le nom doit contenir au moins 4 caractères").required("Le nom est obligatoire"),
  email: yup.string().email("Email invalide").required("Email obligatoire"),
  telephone: yup.string().matches(/^\d{8}$/, "Numéro invalide").required("Numéro de téléphone obligatoire"),
  message: yup.string().max(30, "Le message ne doit pas dépasser 30 caractères").required("Message obligatoire"),
});

export default function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("Message envoyé :", data);
    alert("Votre message a été envoyé !");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md rounded-lg">
      <div>
        <label>Nom :</label>
        <input {...register("name")} className="border p-2 w-full" />
        <p className="text-red-500">{errors.name?.message}</p>
      </div>

      <div>
        <label>Email :</label>
        <input {...register("email")} className="border p-2 w-full" />
        <p className="text-red-500">{errors.email?.message}</p>
      </div>

      <div>
        <label>Téléphone :</label>
        <input {...register("telephone")} className="border p-2 w-full" />
        <p className="text-red-500">{errors.telephone?.message}</p>
      </div>

      <div>
        <label>Message :</label>
        <textarea {...register("message")} className="border p-2 w-full"></textarea>
        <p className="text-red-500">{errors.message?.message}</p>
      </div>

      <button type="submit" className="mt-4 bg-primary text-white px-4 py-2 rounded">Envoyer</button>
    </form>
  );
}
