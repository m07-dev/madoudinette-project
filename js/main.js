document.addEventListener("DOMContentLoaded", () => {
  
  // =========================================
  // 1. GESTION DU MENU MOBILE
  // =========================================
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      menu.classList.toggle('hidden');
    });
  }

  // =========================================
  // 2. GESTION DU CARROUSEL (Si présent)
  // =========================================
  const track = document.querySelector('.carousel__content');
  if (track) {
    const originalCards = Array.from(track.children);
    originalCards.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    const computeWidth = () => {
      const set = Array.from(track.children).slice(0, originalCards.length);
      let total = 0;
      set.forEach(el => {
        const style = window.getComputedStyle(el);
        const marginRight = parseFloat(style.marginRight) || 0;
        total += el.offsetWidth + marginRight;
      });
      return total;
    };

    const scrollWidth = computeWidth();
    track.style.setProperty('--scroll-width', scrollWidth + 'px');
    const speed = 60;
    const duration = scrollWidth / speed;
    track.style.setProperty('--animation-duration', duration + 's');

    window.addEventListener('resize', () => {
      const newW = computeWidth();
      track.style.setProperty('--scroll-width', newW + 'px');
      const newD = newW / speed;
      track.style.setProperty('--animation-duration', newD + 's');
    });
  }

  // =========================================
  // 3. GESTION DE LA TRADUCTION (FR / EN)
  // =========================================
  
  function changeLanguage(lang) {
    // Sauvegarde
    localStorage.setItem('selectedLang', lang);

    // Mise à jour des textes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[lang][key];
        } else {
          // Utilise innerHTML pour garder le gras éventuel
          element.innerHTML = translations[lang][key];
        }
      }
    });

    // Mise à jour visuelle des boutons (Desktop ET Mobile)
    updateActiveButtons(lang);
  }

  function updateActiveButtons(lang) {
    // Liste de tous les boutons (Desktop et Mobile)
    const buttons = {
        fr: [document.getElementById('lang-fr'), document.getElementById('mobile-lang-fr')],
        en: [document.getElementById('lang-en'), document.getElementById('mobile-lang-en')]
    };

    // On réinitialise tout le monde (transparence et gras)
    [...buttons.fr, ...buttons.en].forEach(btn => {
        if(btn) {
            btn.style.opacity = "0.6";
            btn.style.fontWeight = "normal";
            // Pour le mobile, on peut gérer le fond
            if(btn.id.includes('mobile')) {
                 btn.classList.remove('bg-white', 'text-marron-fonce');
                 btn.classList.add('text-white');
            }
        }
    });

    // On active ceux de la langue choisie
    if (buttons[lang]) {
        buttons[lang].forEach(btn => {
            if(btn) {
                btn.style.opacity = "1";
                btn.style.fontWeight = "bold";
                // Style spécifique mobile actif
                if(btn.id.includes('mobile')) {
                    btn.classList.add('bg-white', 'text-marron-fonce');
                    btn.classList.remove('text-white');
                }
            }
        });
    }
  }

  // Initialisation au chargement
  const savedLang = localStorage.getItem('selectedLang') || 'fr';
  changeLanguage(savedLang);

  // --- ÉCOUTEURS D'ÉVÉNEMENTS (Desktop & Mobile) ---
  
  // Fonction pour attacher l'événement click
  const attachClick = (id, lang) => {
      const el = document.getElementById(id);
      if (el) {
          el.addEventListener('click', (e) => {
              e.preventDefault();
              changeLanguage(lang);
              // Optionnel : fermer le menu mobile après choix
              if(id.includes('mobile') && menu) {
                  menu.classList.add('hidden');
              }
          });
      }
  };

  attachClick('lang-fr', 'fr');
  attachClick('lang-en', 'en');
  attachClick('mobile-lang-fr', 'fr');
  attachClick('mobile-lang-en', 'en');

});

// =========================================
// 4. DICTIONNAIRE DE TRADUCTION
// =========================================
const translations = {
  fr: {
    // --- NAVIGATION & FOOTER ---
    "nav_home": "Accueil",
    "nav_catalogue": "Catalogue",
    "nav_culture": "Culture & Bienfaits",
    "nav_contact": "Contact",
    "footer_desc": "Les premiers petits pots pour bébés inspirés des saveurs africaines, biologiques et halal. Pour une alimentation saine, riche et pleine de culture.",
    "footer_links_title": "Liens utiles",
    "footer_contact_title": "Contact",
    "footer_follow": "Suivez nous",
    "footer_copyright": "© 2025 Madoudinette — Tous droits réservés.",

    // --- ACCUEIL ---
    "hero_title": "Madoudinette",
    "hero_desc": "Les 1ers petits pots pour bébés inspirés des saveurs africaines, halal et biologiques.",
    "btn_discover": "Découvrir nos produits",
    "intro_title": "Présentation",
    "intro_text": "Madoudinette : marque fondée par une maman de cinq enfants, proposant des petits pots <span class='text-vert-olive font-bold'>bio</span>, <span class='text-vert-olive font-bold'>halal</span> et inspirés des <span class='text-orange-brul font-bold'>saveurs africaines</span>, pour répondre au manque de diversité dans l’alimentation infantile.",
    "home_products_title": "Nos Produits",
    "btn_details": "Voir les détails →",
    "home_values_title": "Nos Valeurs",
    "val_fresh_title": "Ingrédients frais",
    "val_fresh_desc": "Légumes bio, céréales africaines et viandes halal. Sans additifs, juste l'essentiel pour bien grandir.",
    "val_rich_title": "Palette riche",
    "val_rich_desc": "Des recettes aux saveurs du monde pour éveiller la curiosité et transmettre un patrimoine riche.",
    "val_safe_title": "Saine et sûre",
    "val_safe_desc": "Validées par des nutritionnistes, nos recettes 100% naturelles aux super-aliments sont sûres pour bébé.",
    "val_sustain_title": "Durabilité",
    "val_sustain_desc": "Ingrédients bio et équitables, soutien aux producteurs africains et emballages écoresponsables.",
    "testimonials_title": "Ce que nos clients pensent de nous",
    "review_1": "Je suis vraiment ravie d’avoir découvert Madidounette. Mon bébé adore leurs recettes, et moi je suis bluffée par la diversité des saveurs proposées. On est loin des goûts classiques qu’on retrouve partout !.",
    "review_2": "Les repas sont équilibrés, savoureux, et surtout adaptés aux besoins des tout-petits. En tant que parent, c’est rassurant de savoir que tout est fait dans le respect des normes. Un vrai gain de sérénité.",
    "review_3": "Un concept utile, fiable, et vraiment pratique pour les repas de bébé. On apprécie l’aspect sain, halal et la transparence sur la composition. Idéal pour les familles soucieuses de bien faire.",
    "tag_6m": "Dès 6 mois",
    "tag_8m": "Dès 8 mois",
    "prod_mafe_title": "Mafé Bœuf",
    "prod_mafe_desc_short": "Un grand classique d’Afrique de l’Ouest revisité. Bœuf tendre, pâte d'arachide douce et petits légumes.",
    "prod_yassa_title": "Yassa Poulet",
    "prod_yassa_desc_short": "Une recette saine et gourmande du célèbre Yassa sénégalais, adaptée aux bébés dès 6 mois, alliant tradition culinaire et apports essentiels pour grandir en douceur.",
    "prod_thieb_title": "Thieb Poisson",
    "prod_thieb_desc_short": "Un plat inspiré du traditionnel Tcheboudienne Sénégalais, revisité pour bébé dès 6 mois. Savoureux et équilibré, il répond aux besoins nutritionnels des tout-petits.",

    // --- CATALOGUE ---
    "cat_header_title": "Nos Petits Pots",
    "cat_header_desc": "Découvrir notre gamme complète de recettes inspirées d'Afrique et d'ailleurs. Cuisinés avec amour, certifiés Bio & Halal.",
    "filter_all": "Tout voir",
    "filter_6m": "Dès 6 mois",
    "filter_8m": "Dès 8 mois",
    "filter_sweet": "Douceurs Sucrées",
    "tag_bestseller": "Best-seller",
    "tag_halal": "Halal",
    "tag_bio": "Bio",
    "allergen_peanut": "Arachide",
    "allergen_fish": "Poisson",
    "label_vegetables": "Légumes",

    // --- CULTURE ---
    "cult_intro_title": "Qualité, saveurs africaines, bio & halal",
    "cult_intro_desc": "Madoudinette propose des petits pots biologiques et 100% halal, inspirés des saveurs africaines et du monde.",
    "btn_more_project": "En savoir plus sur le projet",
    "acc_1_title": "Recettes inspirées d'Afrique",
    "acc_1_text": "Nos recettes (mafé, yassa...) sont revisitées pour les bébés dès 6 mois.",
    "acc_2_title": "Bio & naturel",
    "acc_2_text": "Ingrédients frais, de saison et issus de l'agriculture biologique.",
    "summary_title": "En résumé",
    "summary_desc": "Madoudinette est née d'un besoin réel : proposer des petits pots sains et culturels.",
    // NOUVEAUX ÉLÉMENTS DE LA VERSION 2 :
    "acc_3_title": "Halal & éthique",
    "acc_3_text": "Ingrédients 100 % halal, préparés avec rigueur et transparence, dans le respect des convictions religieuses et des bonnes pratiques d'hygiène et de traçabilité.",
    "acc_4_title": "Respect de l'environnement",
    "acc_4_text": "Choix d'ingrédients et de procédés responsables pour réduire l'impact environnemental : emballages mesurés, filières responsables et recettes durables.",
    "acc_5_title": "Fabrication locale & traçabilité",
    "acc_5_text": "Nous favorisons les circuits courts, les partenaires locaux et la transparence tout au long de la chaîne pour soutenir l'économie de proximité et garantir la traçabilité des ingrédients.",
    "acc_6_title": "SAV et accompagnement",
    "acc_6_text": "Accompagnement client, informations claires sur les ingrédients et procédures simplifiées pour les retours ou questions liées aux produits.",
    "summary_list_1": "Saveurs africaines et diversité culinaire",
    "summary_list_2": "Produits bio, naturels et sans additifs",
    "summary_list_3": "Ingrédients 100 % halal et traçables",
    "summary_list_4": "Soutien aux producteurs locaux et circuits courts",
    // founder & narrative (culture page)
    "culture_hero_title": "Qualité, saveurs africaines, bio & halal",
    "culture_hero_desc": "Madoudinette propose des petits pots <span class='text-vert-olive font-bold'>biologiques</span> et <span class='text-vert-olive font-bold'>100% halal</span>, inspirés des <span class='text-orange-brul font-bold'>saveurs africaines</span> et du monde. Nos recettes sont pensées pour respecter la santé des tout-petits, les convictions des familles et transmettre la richesse culturelle.",
    "culture_founder_title": "Derrière Madoudinette : une maman, une mission",
    "culture_founder_intro": "Je m’appelle Fatoumata, maman de cinq enfants et fondatrice de Madoudinette. L’idée est née lors d’un voyage au Sénégal, quand j’ai constaté qu’il était impossible de trouver des petits pots adaptés à mon bébé : rien de halal, et aucune recette inspirée des saveurs africaines.",
    "culture_moment_title": "Un déclic familial",
    "culture_moment_desc": "Heureusement, ma famille a cuisiné pour lui des plats traditionnels adaptés à son âge, qu’il a adoré. Ce fut un déclic : j’ai réalisé à quel point l’offre de petits pots manquait de diversité et de représentation culturelle.",
    "culture_brand_title": "Une marque engagée",
    "culture_brand_desc": "C'est ainsi qu'est née Madoudinette : des petits pots inspirés des recettes du monde, halal, bio et sains, mettant à l’honneur des saveurs comme le mafé, yassa, thieboudienne, revisités pour les bébés dès 6 mois.",
    "culture_brand_follow": "Chaque recette est pensée pour éveiller les papilles des tout-petits, leur transmettre le goût des bonnes choses et de leurs racines, tout en respectant leur santé.",

    // --- DETAILS PRODUITS ---
    "btn_back_catalogue": "← Retour au catalogue",
    "label_composition": "Composition",
    "label_vegetables": "Légumes :",
    "label_proteins": "Protéines :",
    "label_sauce": "Sauce :",
    "label_info_useful": "Infos utiles",
    "label_age": "Âge conseillé :",
    "label_portion": "Portion :",
    "label_allergens": "Allergènes :",
    "label_conservation": "Conservation :",
    "label_prep": "Mode de préparation :",
    "text_conservation": "À conserver à température ambiante. À consommer dans les 24 heures après ouverture.",
    "text_prep": "Réchauffer au bain-marie ou au micro-ondes (sans couvercle).",
    "tag_mouline": "Texture Moulinée",
    "prod_mafe_desc_long": "Faites voyager les papilles de bébé avec ce grand classique d’Afrique de l’Ouest !",
    "mafe_ing_veg": "Carottes bio, Pommes de terre bio, Oignons.",
    "mafe_ing_prot": "Bœuf Halal (origine France).",
    "mafe_ing_sauce": "Eau de cuisson, Pâte d'arachide bio (5%).",
    // NOUVEAUX ÉLÉMENTS DE DÉTAIL PRODUIT YASSA/THIEB :
    "yassa_ing_veg": "Oignons jaunes fondants, Carottes.",
    "yassa_ing_prot": "Poulet fermier Halal (10%).",
    "yassa_ing_sauce": "Jus de citron, Huile d'olive, Thym.",
    "yassa_ing_acc": "Riz blanc mixé.",
    "thieb_ing_veg": "Carottes, Aubergines, Chou, Tomate.",
    "thieb_ing_prot": "Colin d'Alaska (Pêche durable MSC).",
    "thieb_ing_starch": "Riz de Camargue.",
    "label_accompaniment": "Accompagnement :",
    "label_starch": "Féculents :",
    "allergen_none": "Aucun allergène majeur",


    // --- CONTACT PAGE ---
    "contact_header_title": "Contactez-nous",
    "contact_header_desc": "Une question sur nos produits, une suggestion ou juste envie de dire bonjour ? L'équipe Madoudinette est à votre écoute.",
    "contact_info_title": "Nos Coordonnées",
    "contact_form_title": "Envoyez-nous un message",
    "form_label_name": "Votre Nom",
    "form_label_email": "Votre Email",
    "form_label_subject": "Sujet",
    "form_label_message": "Votre Message",
    "form_btn_send": "Envoyer mon message",
  },

  en: {
    // --- NAVIGATION & FOOTER ---
    "nav_home": "Home",
    "nav_catalogue": "Catalogue",
    "nav_culture": "Culture & Benefits",
    "nav_contact": "Contact",
    "footer_desc": "The first baby food jars inspired by African flavors, organic and halal. For a healthy, rich, and culturally diverse diet.",
    "footer_links_title": "Useful Links",
    "footer_contact_title": "Contact",
    "footer_follow": "Follow us",
    "footer_copyright": "© 2025 Madoudinette — All rights reserved.",

    // --- HOME ---
    "hero_title": "Madoudinette",
    "hero_desc": "The 1st baby food jars inspired by African flavors, Halal and Organic.",
    "btn_discover": "Discover our products",
    "intro_title": "About Us",
    "intro_text": "Madoudinette: a brand founded by a mother of five, offering <span class='text-vert-olive font-bold'>organic</span>, <span class='text-vert-olive font-bold'>halal</span> baby jars inspired by <span class='text-orange-brul font-bold'>African flavors</span>, to address the lack of diversity in infant nutrition.",
    "home_products_title": "Our Products",
    "btn_details": "View details →",
    "home_values_title": "Our Values",
    "val_fresh_title": "Fresh Ingredients",
    "val_fresh_desc": "Organic vegetables, African grains, and Halal meat. No additives, just the essentials to grow well.",
    "val_rich_title": "Rich Palette",
    "val_rich_desc": "Recipes with flavors from around the world to awaken curiosity and share a rich heritage.",
    "val_safe_title": "Healthy & Safe",
    "val_safe_desc": "Validated by nutritionists, our 100% natural recipes with superfoods are safe for baby.",
    "val_sustain_title": "Sustainability",
    "val_sustain_desc": "Organic and fair-trade ingredients, support for African producers, and eco-friendly packaging.",
    "testimonials_title": "What our customers say",
    "review_1": "I'm so glad I discovered Madidounette. My baby loves their recipes, and I'm blown away by the variety of flavors they offer. They're nothing like the usual tastes you find everywhere!",
    "review_2": "The meals are balanced, tasty, and above all, tailored to the needs of toddlers. As a parent, it's reassuring to know that everything is done according to regulations. A real peace of mind.",
    "review_3": "A useful, reliable, and truly practical concept for baby food. We appreciate its healthy, halal aspect and the transparency regarding its ingredients. Ideal for families who care about doing things right.",
    "tag_6m": "From 6 months",
    "tag_8m": "From 8 months",
    "prod_mafe_title": "Beef Mafe",
    "prod_mafe_desc_short": "A classic West African dish with a twist. Tender beef, mild peanut paste and baby vegetables.",
    "prod_yassa_title": "Chicken Yassa",
    "prod_yassa_desc_short": "A healthy and delicious recipe for the famous Senegalese Yassa, adapted for babies from 6 months old, combining culinary tradition and essential nutrients for gentle growth.",
    "prod_thieb_title": "Fish Thieb",
    "prod_thieb_desc_short": "A dish inspired by the traditional Senegalese Thieboudienne, adapted for babies from 6 months old. Tasty and balanced, it meets the nutritional needs of toddlers.",

    // --- CATALOGUE ---
    "cat_header_title": "Our Baby Jars",
    "cat_header_desc": "Discover our complete range of recipes inspired by Africa and beyond. Cooked with love, certified Organic & Halal.",
    "filter_all": "See all",
    "filter_6m": "From 6 months",
    "filter_8m": "From 8 months",
    "filter_sweet": "Sweet Treats",
    "tag_bestseller": "Best-seller",
    "tag_halal": "Halal",
    "tag_bio": "Organic",
    "allergen_peanut": "Peanut",
    "allergen_fish": "Fish",
    "label_vegetables": "Vegetables",

    // --- CULTURE ---
    "cult_intro_title": "Quality, African flavors, Organic & Halal",
    "cult_intro_desc": "Madoudinette offers organic and 100% halal baby jars, inspired by African and world flavors.",
    "btn_more_project": "Learn more about the project",
    "acc_1_title": "Recipes inspired by Africa",
    "acc_1_text": "Our recipes (mafe, yassa...) are revisited for babies from 6 months.",
    "acc_2_title": "Organic & Natural",
    "acc_2_text": "Fresh, seasonal ingredients from organic farming.",
    // NOUVEAUX ÉLÉMENTS DE LA VERSION 2 :
    "acc_3_title": "Halal & Ethical",
    "acc_3_text": "100% halal ingredients, prepared with rigor and transparency, respecting religious convictions and hygiene/traceability best practices.",
    "acc_4_title": "Environmental Respect",
    "acc_4_text": "Choice of responsible ingredients and processes to reduce environmental impact: measured packaging, responsible sourcing and sustainable recipes.",
    "acc_5_title": "Local Production & Traceability",
    "acc_5_text": "We favor short supply chains, local partners and full transparency to support local economies and guarantee ingredient traceability.",
    "acc_6_title": "Customer Support",
    "acc_6_text": "Customer support, clear ingredient information and simplified procedures for returns or product questions.",
    "summary_title": "In summary",
    "summary_desc": "Madoudinette was born out of a real need: to offer healthy and culturally diverse baby food.",
    "summary_list_1": "African flavors and culinary diversity",
    "summary_list_2": "Organic, natural products with no additives",
    "summary_list_3": "100% halal and traceable ingredients",
    "summary_list_4": "Support for local producers and short supply chains",
    // founder & narrative (culture page)
    "culture_hero_title": "Quality, African flavors, Organic & Halal",
    "culture_hero_desc": "Madoudinette offers <span class='text-vert-olive font-bold'>organic</span>, <span class='text-vert-olive font-bold'>100% halal</span> baby jars inspired by <span class='text-orange-brul font-bold'>African flavors</span> and world recipes. Our recipes are designed to respect infants' health, family convictions and cultural richness.",
    "culture_founder_title": "Behind Madoudinette: a mother, a mission",
    "culture_founder_intro": "My name is Fatoumata, mother of five and founder of Madoudinette. The idea was born during a trip to Senegal, when I found it impossible to find baby jars adapted to my baby: nothing halal and no recipes inspired by African flavors.",
    "culture_moment_title": "A family spark",
    "culture_moment_desc": "Luckily my family cooked traditional dishes adapted to his age, which he loved. It was a turning point: I realised the baby food market lacked diversity and cultural representation.",
    "culture_brand_title": "A committed brand",
    "culture_brand_desc": "That's how Madoudinette was born: baby jars inspired by world recipes, halal, organic and wholesome, showcasing flavors such as mafé, yassa and thieboudienne, specially reworked for babies from 6 months.",
    "culture_brand_follow": "Each recipe is designed to awaken little ones' taste buds, pass on the taste of good food and their roots, while respecting their health.",

    // --- PRODUCT DETAILS ---
    "btn_back_catalogue": "← Back to Catalogue",
    "label_composition": "Composition",
    "label_vegetables": "Vegetables:",
    "label_proteins": "Proteins:",
    "label_sauce": "Sauce:",
    "label_info_useful": "Useful Info",
    "label_age": "Recommended age:",
    "label_portion": "Portion:",
    "label_allergens": "Allergens:",
    "label_conservation": "Storage:",
    "label_prep": "Preparation:",
    "text_conservation": "Store at room temperature. Consume within 24 hours after opening.",
    "text_prep": "Reheat in a bain-marie or microwave (without cover).",
    "tag_mouline": "Mashed Texture",
    "prod_mafe_desc_long": "Take baby's taste buds on a journey with this West African classic!",
    "mafe_ing_veg": "Organic carrots, Organic potatoes, Onions.",
    "mafe_ing_prot": "Halal Beef (origin: France).",
    "mafe_ing_sauce": "Cooking water, Organic peanut paste (5%).",
    // NOUVEAUX ÉLÉMENTS DE DÉTAIL PRODUIT YASSA/THIEB :
    "yassa_ing_veg": "Yellow onions, Carrots.",
    "yassa_ing_prot": "Halal farm chicken (10%).",
    "yassa_ing_sauce": "Lime juice, Olive oil, Thyme.",
    "yassa_ing_acc": "Blended white rice.",
    "thieb_ing_veg": "Carrots, Eggplants, Cabbage, Tomato.",
    "thieb_ing_prot": "Alaskan Pollock (MSC sustainable fishing).",
    "thieb_ing_starch": "Camargue Rice.",
    "label_accompaniment": "Side dish:",
    "label_starch": "Starches:",
    "allergen_none": "No major allergens",

    // --- CONTACT PAGE ---
    "contact_header_title": "Contact Us",
    "contact_header_desc": "A question about our products, a suggestion, or just want to say hello? The Madoudinette team is here to listen.",
    "contact_info_title": "Our Contact Details",
    "contact_form_title": "Send us a message",
    "form_label_name": "Your Name",
    "form_label_email": "Your Email",
    "form_label_subject": "Subject",
    "form_label_message": "Your Message",
    "form_btn_send": "Send my message",
  }
};
