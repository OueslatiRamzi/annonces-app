// app/layout.js
import { ThemeProvider } from './components/ThemeProvider';
import Providers from './Providers';
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './globals.css';
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: "Site d'annonces BALLOUCHI",
  description: "Trouver les meilleures annonces en Tunisie. Vendez, achetez et publier votre annonce près de chez vous.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider>
          <Providers>
            <div className="flex flex-col min-h-screen bg-slate-300 dark:bg-gray-900">
              <Header />
              <NavBar />
              <main className="flex-1 container mx-auto px-4 lg:px-6 py-8">
                {children}
                <Analytics />
                <ToastContainer position="bottom-right" />
              </main>
              <Footer />
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}