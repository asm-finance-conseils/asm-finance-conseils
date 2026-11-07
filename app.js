const products = {
  cash:{title:"Mon Carnet de Caisse ASM",desc:"Un suivi journalier des entrées, sorties et soldes.",rows:[]},
  budget:{title:"Mon Budget Simplifié ASM",desc:"Un support pour prévoir les recettes et dépenses et faire le bilan de la période.",rows:[]},
  stock:{title:"Mon Carnet de Gestion de Stock ASM",desc:"Des fiches pour suivre les produits, les entrées, les sorties et les quantités disponibles.",rows:[]},
  due:{title:"Mon Carnet de Suivi des Échéances ASM",desc:"Un tableau pour noter les dates prévues, montants à payer, paiements effectués et soldes.",rows:[]},
  "bundle-pdf":{title:"Pack PDF – 4 carnets ASM",desc:"Les quatre carnets au format PDF.",rows:[]},
  "bundle-excel":{title:"Pack Excel – 4 outils ASM",desc:"Les quatre outils Excel avec calculs automatiques.",rows:[]},
  "bundle-physical":{title:"Pack physique – 4 carnets ASM",desc:"Les quatre carnets imprimés au format A5.",rows:[]}
};
const prices = {
  cash:{"PDF":"1 500 FCFA","Excel":"2 500 FCFA","Papier":"4 000 FCFA"},
  budget:{"PDF":"1 500 FCFA","Excel":"2 500 FCFA","Papier":"4 000 FCFA"},
  stock:{"PDF":"2 000 FCFA","Excel":"3 000 FCFA","Papier":"4 500 FCFA"},
  due:{"PDF":"1 500 FCFA","Excel":"2 500 FCFA","Papier":"4 000 FCFA"}
};
const bundlePrices = {
  "bundle-pdf":"5 000 FCFA",
  "bundle-excel":"10 000 FCFA",
  "bundle-physical":"14 000 FCFA"
};
const previewImages = {
  cash:"assets/caisse_interieur.png",
  budget:"assets/budget_interieur.png",
  stock:"assets/stock_interieur.png",
  due:"assets/echeances_interieur.png"
};
let selected = "cash";
const previewModal=document.getElementById("previewModal");
const orderModal=document.getElementById("orderModal");
function openModal(el){el.classList.add("open");el.setAttribute("aria-hidden","false")}
function closeModals(){[previewModal,orderModal].forEach(m=>{m.classList.remove("open");m.setAttribute("aria-hidden","true")})}
function showPreview(id){
  selected=id;
  const p=products[id];
  document.getElementById("previewTitle").textContent=p.title;
  document.getElementById("previewText").textContent=p.desc;
  const sheet=document.getElementById("sampleSheet");
  sheet.innerHTML="";
  const img=document.createElement("img");
  img.src=previewImages[id];
  img.alt="Extrait réel d’une page intérieure de "+p.title;
  img.className="real-preview-page";
  sheet.appendChild(img);
  openModal(previewModal);
}
function showOrder(id){
  selected=id;
  const p=products[id];
  document.getElementById("orderProduct").textContent=p.title+". Choisissez le format souhaité.";
  const select=document.querySelector('#orderForm select[name="format"]');
  select.innerHTML="";
  const choices = id.startsWith("bundle-")
    ? [{v:"Pack",t:id==="bundle-pdf"?"Pack PDF":id==="bundle-excel"?"Pack Excel":"Pack physique"}]
    : [{v:"PDF",t:"Numérique (PDF)"},{v:"Excel",t:"Excel"},{v:"Papier",t:"Papier"}];
  select.add(new Option("Choisir le format",""));
  choices.forEach(c=>select.add(new Option(c.t,c.v)));
  openModal(orderModal);
}
document.querySelectorAll("[data-preview]").forEach(b=>b.addEventListener("click",()=>showPreview(b.dataset.preview)));
document.querySelectorAll("[data-buy]").forEach(b=>b.addEventListener("click",()=>showOrder(b.dataset.buy)));
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",closeModals));
[previewModal,orderModal].forEach(m=>m.addEventListener("click",e=>{if(e.target===m)closeModals()}));
document.getElementById("previewOrder").addEventListener("click",()=>{closeModals();showOrder(selected)});
document.getElementById("orderForm").addEventListener("submit",e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.target).entries());
  const price=selected.startsWith("bundle-") ? bundlePrices[selected] : (prices[selected]?.[data.format] || "à confirmer");
  const formatLabel = data.format==="PDF"?"Numérique (PDF)":data.format==="Pack"?(selected==="bundle-pdf"?"Pack PDF":selected==="bundle-excel"?"Pack Excel":"Pack physique"):data.format;
  const msg=`Bonjour ASM FINANCES CONSEILS. Je souhaite commander : ${products[selected].title}. Nom : ${data.name}. Téléphone : ${data.phone}. Format : ${formatLabel}. Prix affiché : ${price}. Ville/commune : ${data.city||"Non précisée"}. Merci de confirmer la disponibilité, le prix final, les modalités de paiement et les frais éventuels de livraison. Délai indicatif : fichiers PDF/Excel sous 24 h après confirmation du paiement ; carnets physiques sous 3 à 5 jours ouvrables après confirmation de la commande et du paiement, selon disponibilité et zone. Aucun paiement n’est collecté sur le site pour le moment.`;
  window.open("https://wa.me/2290156025140?text="+encodeURIComponent(msg),"_blank","noopener");
  closeModals();
});
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();
