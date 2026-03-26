export interface Actualite {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  imageUrl: string;
  category: string;
}

export const actualites: Actualite[] = [
  {
    id: "1",
    title: "WAIRB DRC accélère sa transformation digitale",
    excerpt: "Découvrez comment nos nouveaux outils digitaux révolutionnent la gestion de vos polices d'assurance au quotidien.",
    content: "Dans un monde en constante évolution, WAIRB DRC SAS s'engage à offrir à ses clients des solutions toujours plus innovantes. Notre transformation digitale s'accélère aujourd'hui avec le déploiement d'une nouvelle plateforme de gestion en ligne.\n\nCette plateforme permettra à nos clients de consulter l'historique de leurs polices, de déclarer un sinistre en quelques clics et de suivre son évolution en temps réel.\n\n« Notre objectif est de rendre l'assurance transparente et accessible à tous, tout en maintenant l'expertise de proximité qui fait notre force », souligne la Direction Générale. \n\nLes équipes sont actuellement en formation pour accompagner chaque client dans l'adoption de ces nouveaux outils.",
    date: "24 Mars 2026",
    imageUrl: "/images/img_05.jpg",
    category: "Innovation"
  },
  {
    id: "2",
    title: "Nouveau partenariat stratégique dans le secteur minier",
    excerpt: "WAIRB DRC SAS signe un accord majeur pour l'accompagnement des acteurs du secteur minier en RDC.",
    content: "Le secteur minier est un pilier de l'économie congolaise, et ses acteurs font face à des risques complexes nécessitant une couverture d'assurance sur mesure. WAIRB DRC SAS est fier d'annoncer la signature d'un partenariat stratégique avec un groupement d'entreprises minières.\n\nCet accord s'inscrit dans notre volonté d'apporter notre expertise internationale et notre connaissance fine du marché local aux projets de grande envergure. Nous accompagnerons ces entreprises sur l'ensemble de leur cycle de vie : de l'exploration à l'exploitation, en passant par la construction des infrastructures secondaires.\n\n« Protéger les investissements miniers, c'est participer activement au développement du tissu économique de la RDC », a précisé le Président du Conseil d'Administration lors de la signature conjointe.",
    date: "15 Mars 2026",
    imageUrl: "/images/img_10.jpg",
    category: "Partenariat"
  },
  {
    id: "3",
    title: "Succès de notre séminaire sur la gestion des risques cyber",
    excerpt: "Retour sur la journée de sensibilisation organisée par WAIRB DRC à Kinshasa concernant les menaces informatiques.",
    content: "Ce mardi s'est tenu à Kinshasa notre séminaire dédié à la gestion des risques cyber, un sujet brûlant pour les entreprises de toutes tailles.\n\nAnimé par nos experts internationaux en Cyber-assurance, cet événement a rassemblé plus d'une centaine de dirigeants et de directeurs informatiques de la place. Les échanges ont porté sur l'identification des vulnérabilités, l'importance de la prévention et, in fine, sur les solutions de transfert de risques via l'assurance.\n\nFace à la recrudescence des cyber-attaques, l'assurance ne peut plus être le seul rempart ; elle doit s'inscrire dans une stratégie globale de résilience. Les participants sont repartis avec des recommandations claires et un audit préliminaire proposé par nos équipes.\n\nWAIRB DRC compte organiser de nouvelles sessions de formation sur ce thème dans les mois à venir.",
    date: "02 Mars 2026",
    imageUrl: "/images/img_25.jpg",
    category: "Événement"
  },
  {
    id: "4",
    title: "Lancement de la nouvelle offre PME",
    excerpt: "Une assurance simplifiée et tout-en-un pour soutenir le développement des Petites et Moyennes Entreprises congolaises.",
    content: "Les PME constituent le moteur de notre économie, mais elles manquent souvent d'une couverture d'assurance adaptée à leurs besoins spécifiques.\n\nC'est pourquoi WAIRB DRC SAS annonce le lancement exclusif de son offre \"PME Protect\". Cette solution combine assurance Responsabilité Civile, protection des locaux, et prévoyance pour les dirigeants en un seul contrat simple et modulable.\n\nNous avons pensé cette offre pour qu'elle grandisse avec votre entreprise.",
    date: "20 Février 2026",
    imageUrl: "/images/img_18.jpg",
    category: "Produit"
  },
  {
    id: "5",
    title: "Ouverture d'une nouvelle succursale à Lubumbashi",
    excerpt: "Pour être au plus près de nos clients du Katanga, WAIRB DRC SAS inaugure son nouveau bureau régional.",
    content: "Dans le cadre de notre stratégie d'expansion et pour répondre à la demande croissante dans le Haut-Katanga, nous sommes heureux d'annoncer l'ouverture officielle de notre nouvelle succursale à Lubumbashi.\n\nCe nouveau bureau nous permettra d'offrir un service de proximité inégalé aux entreprises locales, notamment dans les secteurs minier et logistique.\n\nNotre équipe sur place est d'ores et déjà opérationnelle.",
    date: "05 Février 2026",
    imageUrl: "/images/img_29.jpg",
    category: "Entreprise"
  },
  {
    id: "6",
    title: "Engagement RSE : Programme de bourses étudiantes",
    excerpt: "WAIRB DRC s'engage pour l'avenir de la jeunesse congolaise en finançant les études de 50 jeunes talents.",
    content: "Parce que l'avenir de la RDC repose sur la formation de sa jeunesse, WAIRB DRC SAS lance cette année son premier programme de bourses d'excellence.\n\nDestiné aux étudiants issus de milieux modestes et inscrits dans des filières d'économie, finance et droit, ce programme couvrira l'intégralité de leurs frais de scolarité universitaire.\n\n\"Notre responsabilité sociale dépasse notre métier d'assureur. Nous voulons investir dans ceux qui construiront le pays demain\", a déclaré la Direction Générale.",
    date: "15 Janvier 2026",
    imageUrl: "/images/img_22.jpg",
    category: "Engagement"
  }
];
