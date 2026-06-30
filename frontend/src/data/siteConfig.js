export const siteConfig = {
  name: "Beostar Gym",
  motto: "WE TRAIN AS ONE",
  address: "Jurija Gagarina 78",
  city: "Novi Beograd",
  country: "Srbija",
  countryCode: "RS",
  offer: "Vođeni, personalni i grupni treninzi",
  heroLabel: "BEOSTAR GYM / NOVI BEOGRAD",
  heroTitle: "TRENIRAMO KAO JEDAN",
  heroDescription:
    "Vođeni, personalni i grupni treninzi na Novom Beogradu. CrossFit, Yoga, Pilates, Box i funkcionalni treninzi na adresi Jurija Gagarina 78.",
  whyTitle: "SNAGA GRUPE. FOKUS TRENERA. TVOJ TEMPO.",
  whyDescription:
    "U Beostar Gym-u treninzi su vođeni, jasni i energični. Bilo da dolaziš zbog snage, kondicije, mobilnosti ili kontinuiteta, imaš termin, trenera i ekipu koja trenira sa tobom.",
  locationTitle: "NAĐI NAS NA NOVOM BEOGRADU",
  footerCopy: "Treniramo kao jedan. Vidimo se na treningu.",
  title: "Beostar Gym | Grupni i personalni treninzi na Novom Beogradu",
  metaDescription:
    "Beostar Gym na adresi Jurija Gagarina 78. Vođeni, personalni i grupni treninzi: CrossFit, Yoga, Pilates, Box, Burn i ASSTRO. Pogledajte raspored treninga.",
  ogTitle: "Beostar Gym | Treniramo kao jedan",
  ogDescription:
    "Vođeni, personalni i grupni treninzi na Novom Beogradu. CrossFit, Yoga, Pilates, Box i više. Jurija Gagarina 78.",
  siteUrl: "TODO_ADD_PRODUCTION_DOMAIN",
  tiktokUrl: "https://www.tiktok.com/@beostargym",
  instagramUrl: "https://www.instagram.com/beostar_gym",
  googleMapsUrl: "TODO_ADD_VERIFIED_GOOGLE_MAPS_URL",
  googleMapsSearchUrl:
    "https://www.google.com/maps/search/?api=1&query=Beostar%20Gym%20Jurija%20Gagarina%2078",
  scheduleDisclaimer:
    "Raspored se može povremeno menjati. Za najnovije informacije pišite nam na društvenim mrežama.",
  trainingTags: ["CrossFit", "Yoga", "Pilates", "Box", "Burn", "ASSTRO"],
  images: {
    logo: {
      src: "/logo_orange_background_white_text.jpg",
      alt: "Beostar Gym logo"
    },
    heroMain: {
      src: "/gym-interior-2.png",
      alt: "Glavni prostor za trening u Beostar Gym-u"
    },
    heroInset: {
      src: "/gym-interior-1.png",
      alt: "Zona sa tegovima i klupom u Beostar Gym-u"
    },
    approach: {
      src: "/gym-interior-3.png",
      alt: "Prostor za funkcionalni trening u Beostar Gym-u"
    },
    location: {
      src: "/gym-interior-4.png",
      alt: "Ulazni deo i unutrašnjost Beostar Gym-a"
    }
  }
};

export function isVerifiedUrl(value) {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

export function isPlaceholder(value) {
  return typeof value === "string" && value.startsWith("TODO_");
}
