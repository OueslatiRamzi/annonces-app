import "./globals.css";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";


export const metadata = {
  title: "Site d’annonces BALLOUCHI",
  description: "Trouver les meilleures annonces en Tunisie. Vendez, achetez et publier votre annonce près de chez vous.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      
      <body className="flex flex-col min-h-screen" >
      <Header />
      <NavBar />
      <main className="flex-1 p-4">{children}</main>
      <Footer />
      </body>
    </html>
  );
}
