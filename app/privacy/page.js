
export const metadata = {
    title: "Politique de confidentialité - Ballouchi Annonce",
    description: "Politique de protection des données personnelles de Ballouchi Annonce"
  }
  
  export default function PrivacyPage() {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Politique de Confidentialité</h1>
  
        <section className="mb-8">
          <p className="text-sm text-gray-500 mb-4">
            Effective date: [Date de mise en vigueur]
          </p>
          <p className="text-gray-600 mb-4">
            Chez Ballouchi Annonce, nous prenons la protection de vos données personnelles très au sérieux.
            Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">1. Données collectées</h2>
          <div className="text-gray-600 mb-4">
            <p>Nous collectons :</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Informations de compte (nom, email)</li>
              <li>Données de profil (préférences, photos)</li>
              <li>Données d'utilisation (logs, adresse IP)</li>
              <li>Cookies et technologies similaires</li>
            </ul>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">2. Utilisation des données</h2>
          <div className="text-gray-600 mb-4">
            <p>Vos données servent à :</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Fournir et améliorer nos services</li>
              <li>Personnaliser votre expérience</li>
              <li>Communiquer avec vous</li>
              <li>Prévenir les abus</li>
            </ul>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">3. Partage des données</h2>
          <div className="text-gray-600 mb-4">
            <p>Nous ne vendons pas vos données. Partage limité avec :</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Prestataires techniques (hébergeur, email)</li>
              <li>Obligations légales</li>
              <li>Avec votre consentement</li>
            </ul>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">4. Cookies</h2>
          <div className="text-gray-600 mb-4">
            <p>Nous utilisons des cookies pour :</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Authentification</li>
              <li>Préférences utilisateur</li>
              <li>Analyse d'audience</li>
            </ul>
            <p className="mt-4">Vous pouvez contrôler les cookies via les paramètres de votre navigateur.</p>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">5. Vos droits</h2>
          <div className="text-gray-600 mb-4">
            <p>Conformément au RGPD, vous avez droit à :</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Accès à vos données</li>
              <li>Rectification</li>
              <li>Suppression</li>
              <li>Portabilité</li>
              <li>Opposition</li>
            </ul>
            <p className="mt-4">Contactez-nous à <a href="mailto:privacy@ballouchi-annonce.com" className="text-blue-600 hover:underline">privacy@ballouchi-annonce.com</a> pour exercer vos droits.</p>
          </div>
        </section>
  
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">6. Sécurité</h2>
          <div className="text-gray-600 mb-4">
            <p>Nous mettons en œuvre des mesures techniques et organisationnelles :</p>
            <ul className="list-disc pl-6 mt-2">
              <li>Chiffrement SSL</li>
              <li>Accès restreint</li>
              <li>Sauvegardes régulières</li>
            </ul>
          </div>
        </section>
  
        <section className="mt-8 border-t pt-4">
          <p className="text-sm text-gray-500">
            Pour toute question concernant cette politique, contactez-nous à :
            <br />
            <a href="mailto:privacy@ballouchi-annonce.com" className="text-blue-600 hover:underline">
              privacy@ballouchi-annonce.com
            </a>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Consultez aussi nos <a href="/terms" className="text-blue-600 hover:underline">Conditions d'utilisation</a>
          </p>
        </section>
      </main>
    )
  }
  