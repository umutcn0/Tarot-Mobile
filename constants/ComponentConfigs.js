const appSettingsFields = {
  language: {
    title: 'Dil',
    type: 'select',
    options: ['Türkçe'],
  },
  currency: {
    title: 'Para Birimi',
    type: 'select',
    options: ['TRY'],
  },
};

const profileSettingsFields = {
  displayName: {
    title: 'İsmi Güncelle',
    type: 'text',
  },
  age: {
    title: 'Yaşı Güncelle',
    type: 'number',
  },
  maritalStatus: {
    title: 'Medeni Durumunu Güncelle',
    type: 'select',
    options: ['Single', 'In a Relationship', 'Married', 'Divorced', 'Widowed'],
  },
  jobStatus: {
    title: 'İş Durumunu Güncelle',
    type: 'select',
    options: ['Employed', 'Unemployed', 'Student', 'Retired'],
  },
  education: {
    title: 'Eğitim Durumunu Güncelle',
    type: 'select',
    options: ['High School', 'Bachelor', 'Master', 'PhD', 'Other'],
  },
};

const homeFortuneTypes = [
  {
    title: "Genel Hayat",
    description: "Yaşamındaki genel yönleri değerlendirir.",
    icon: "cube-outline",
  },
  {
    title: "Aşk ve İlişkiler",
    description: "İlişkilerdeki dinamikler hakkında rehberlik sağlamak.",
    icon: "heart-outline",
  },
  {
    title: "Kariyer ve İş",
    description: "İş hayatı ve kariyer yolculuğu",
    icon: "briefcase-outline",
  },
  {
    title: "Maddi Durum ve Finansal",
    description: "Finansal durumunuz hakkında bilgi verir.",
    icon: "cash-outline",
  },
  {
    title: "Sağlık ve Zindelik",
    description: "Sağlık ve zindelik durumunuz hakkında bilgi verir.",
    icon: "moon-outline",
  },
  {
    title: "Kişisel Gelişim ve Ruhsal",
    description: "Kişisel gelişim ve ruhsal durumunuz hakkında bilgi verir.",
    icon: "barbell-outline",
  },
  {
    title: "Zaman Çerçevesi",
    description: "Zaman çerçevenizi belirler.",
    icon: "time-outline",
  },
  {
    title: "Niyet Falı",
    description: "Niyetlerinizin gerçekleşme olasılığını gösterir.",
    icon: "gift-outline",
    coinAmount: 5,
  },
]

export { appSettingsFields, profileSettingsFields, homeFortuneTypes };