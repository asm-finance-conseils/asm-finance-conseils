// Endpoint serveur à compléter lors de l'activation FedaPay.
// IMPORTANT : ne jamais exposer FEDAPAY_SECRET_KEY dans le navigateur.
module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }
  return res.status(503).json({
    error: "Paiement FedaPay non configuré",
    message: "Configurez d'abord le compte marchand et les clés API dans les variables d'environnement du serveur."
  });
};
