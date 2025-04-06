import { create } from "zustand";

const useAnnonceStore = create((set) => ({
  annonces: [],
  categories: [],
  selectedGouvernorat: "",
  selectedCategorie: "",
  setAnnonces: (annonces) => set({ annonces }),
  setCategories: (categories) => set({ categories }),
  setSelectedGouvernorat: (gouvernorat) => set({ selectedGouvernorat: gouvernorat }),
  setSelectedCategorie: (categorie) => set({ selectedCategorie: categorie }),
}));

export default useAnnonceStore;
