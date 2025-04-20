
export const metadata = {
    title: "Conditions d'utilisation - Ballouchi Annonce",
    description: "Conditions générales d'utilisation de la plateforme Ballouchi Annonce"
  }
  
  export default function TermsPage() {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Conditions Générales d'Utilisation</h1>
        
        <section className="mb-8">
          <p className="text-sm text-gray-500 mb-4">
            Dernière mise à jour : [Date]
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Acceptation des conditions</h2>
          <p className="text-gray-600 mb-4">
            En utilisant Ballouchi Annonce, vous acceptez pleinement et sans réserve les présentes conditions 
            d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre plateforme.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">2. Utilisation du service</h2>
          <p className="text-gray-600 mb-4">
            Vous vous engagez à utiliser notre service de manière légale et éthique. Toute utilisation abusive 
            ou frauduleuse pourra entraîner la suspension de votre compte.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">3. Responsabilités des utilisateurs</h2>
          <p className="text-gray-600 mb-4">
            Les utilisateurs sont responsables du contenu qu'ils publient. Nous nous réservons le droit de 
            supprimer tout contenu inapproprié sans préavis.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">4. Propriété intellectuelle</h2>
          <p className="text-gray-600 mb-4">
            Tous les contenus de la plateforme (logos, textes, graphismes) sont la propriété exclusive de 
            Ballouchi Annonce. Toute reproduction sans autorisation est interdite.
          </p>
        </section>
  
        {/* Ajoutez d'autres sections selon vos besoins */}
  
        <section className="mt-8 border-t pt-4">
          <p className="text-sm text-gray-500">
            Pour toute question concernant ces conditions d'utilisation, veuillez nous contacter à 
            contact@ballouchi-annonce.com
          </p>
        </section>
      </main>
    )
  }