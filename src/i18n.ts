import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    signUpTitle: 'Register Now',
    signUpSubtitle: 'Welcome! Sign up to continue.',
    signUpAction: 'Sign Up',
    signUpRedirect: 'i have an account',

    loginTitle: 'Welcome Back',
    loginSubtitle: 'Hello again! Sign in to continue.',
    loginAction: 'Sign In',
    loginRedirect: "i don't have an account",

    light: 'Light',
    dark: 'Dark',
    deviceSettings: 'Device Settings',

    firstName: 'First Name',
    lastName: 'Last Name',
    department: 'Department',
    email: 'Email',
    position: 'Position',

    search: 'Search',

    projectName: 'Name',
    domain: 'Domain | Domains',
    startDate: 'Start Date',
    endDate: 'End Date',

    cvName: 'Name',
    education: 'Education',
    employee: 'Employee',

    departmentName: 'Name',
    employees: 'Employees',
    positionName: 'Name',

    skillName: 'Name',
    skillType: 'Type',
    skillCategory: 'Category',

    lang: 'Name',
    nativeName: 'Native Name',
    iso2: 'ISO2',

    noData: 'No data found',   
    noResultsTitle: 'No results found',
    noResultsDescription: 'Try another search, check the spelling or use a broader term',
    resetSearch: 'Reset Search',
    customNoResultsTitle: 'No match your search',
    customNoResultsDescription: 'Please try different keywords or reset the search to view all projects.',
    
    projects: 'Projects',
    cvs: 'CVs',
    departments: 'Departments',
    positions: 'Positions',
    skills: 'Skills',
    languages: 'Languages',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    preview: 'Preview',
    details: 'Details', 

    createCV: 'Create CV',
    addSkill: 'Add Skill',
    addLanguage: 'Add Language',
    updateSkill: 'Update Skill',
    updateLanguage: 'Update Language',
    removeSkill: 'Remove Skill',
    removeLanguage: 'Remove Language',
    addProject: '+ Add Project',
    skill: 'Skill',
    language: 'Language',

    add: 'Add',
    update: 'Update',
    updateCV: 'Update CV',
    uploadAvatar: 'Upload avatar image',
    uploadText: 'png, jpg or gif no more than 0.5MB',
    description: 'Description',
    cancel: 'Cancel',
    create: 'Create',
    confirm: 'Confirm',
    langProficiency: 'Language proficiency',
    skillMastery: 'Skill mastery',
    deleteCV: 'Delete CV',
    updateProject: 'Update Project',
    removeProject: 'Remove Project',
    responsibilities: 'Responsibilities',
    exportPDF: 'export pdf',
    memberSince: 'A member since',
    appearance: 'Appereance',
    delete: 'Delete',
    project: 'Project',
    professionalSkills: 'Professional Skills',
    projectRole: 'Project Role',
    period: 'Period',
    environment: 'Environment',
    experienceInYears: 'expirience in years',
    lastUsed: 'last used',
    programmingLang: 'Programming languages',
    frontend: 'Frontend',
    backend: 'Backend',
    testTools: 'Testing frameworks and tools',
    devOps: 'DevOps',
    sourceControl: 'Source control systems',
    datepicker: {
      firstDayOfWeek: "0",
      dayNames: "Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday",
      dayNamesShort: "Sun | Mon | Tue | Wed | Thu | Fri | Sat",
      monthNames: "January | February | March | April | May | June | July  | August | September | October | November | December",
      monthNamesShort: "Jan | Feb | Mar | Apr | May | Jun | Jul  | Aug | Sep | Oct | Nov | Dec",
      today: 'Today',
      clear: 'Clear',
    },
  },
  de: {
    signUpTitle: 'Register Now',
    signUpSubtitle: 'Welcome! Sign up to continue.',
    signUpAction: 'Sign Up',
    signUpRedirect: 'ich habe ein konto',

    loginTitle: 'Welcome Back',
    loginSubtitle: 'Hello again! Sign in to continue.',
    loginAction: 'Sign In',
    loginRedirect: "i don't have an account",

    light: 'Licht',
    dark: 'Dunkel',
    deviceSettings: 'Geräteeinstellungen',

    firstName: "Vorname",
    lastName: "Nachname",
    department: "Abteilung",
    email: "Email",
    position: "Position",

    search: 'Suche',

    projectName: 'Name',
    domain: 'Doman | Domänen',
    startDate: 'Anfangsdatum',
    endDate: 'Enddatum',

    cvName: 'Name',
    employee: 'Mitarbeiter',
    education: 'Ausbildung',

    departmentName: 'Name',
    employees: 'Mitarbeiter',
    positionName: 'Name',

    skillName: 'Name',
    skillType: 'Type',
    skillCategory: 'Kategorie',

    lang: 'Name',
    nativeName: 'Einheimischer Name',
    iso2: 'ISO2',

    noData: 'Keine Daten gefunden',
    noResultsTitle: 'Keine Ergebnisse gefunden',
    noResultsDescription: 'Versuchen Sie eine andere Suche, überprüfen Sie die Rechtschreibung oder verwenden Sie einen allgemeineren Begriff',
    resetSearch: 'Suche zurücksetzen',
    customNoResultsTitle: 'Keine Daten  passen zu Ihrer Suche',
    customNoResultsDescription: 'Bitte versuchen Sie andere Stichworte oder setzen Sie die Suche zurück, um alle Projekte anzuzeigen.',
 
    projects: 'Projekte',
    cvs: 'Labansläufe',
    departments: 'Abteilungen',
    positions: 'Positionen',
    skills: 'Fähigkeiten',
    languages: 'Sprachen',
    profile: 'Profil',
    settings: 'Einstellungen',
    logout: 'Ausloggen',
    preview: 'Vorshau',
    details: 'Einzelheiten', 

    createCV: 'Lebenslauf Erstellen',
    addSkill: 'Fertigkeit hinzufügen',
    addLanguage: 'Sprache hinzufügen',
    updateSkill: 'Fertigkeit aktualisieren',
    updateLanguage: 'Sprache aktualisieren',
    removeSkill: 'Remove Skill',
    removeLanguage: 'Remove Language',
    addProject: '+ Add Projekt',

    add: 'Add',
    update: 'Aktualisieren',
    updateCV: 'Einzelheiten',
    uploadAvatar: 'Avatarbild hochladen',
    uploadText: 'png, jpg oder gif nicht größer als 0,5 MB',
    description: 'Beschreibung',
    cancel: 'Stornieren',
    create: 'Erstellen',
    confirm: 'Bestätigen',
    langProficiency: 'Sprachkompetenz',
    skillMastery: 'Fertigkeitsbeherrschung',
    deleteCV: 'Lebenslauf löschen',
    updateProject: 'Update Project',
    removeProject: 'Remove Project',
    responsibilities: 'Responsibilities',
    exportPDF: 'pdf exportieren',
    memberSince: 'Seitdem Mitglied',
    appearance: 'Aussehen',
    language: 'Sprache',
    skill: 'Fertigkeit',
    delete: 'Löschen',
    project: 'Projekt',
    professionalSkills: 'Professional Skills',
    projectRole: 'Project Role',
    period: 'Period',
    environment: 'Environment',
    experienceInYears: 'expirience in years',
    lastUsed: 'last used',
  
    programmingLang: 'Programmiersprachen',
    frontend: 'Frontend',
    backend: 'Backend',
    testTools: 'Testing frameworks and tools',
    devOps: 'DevOps',
    sourceControl: 'Quellcodeverwaltungssysteme',
    datepicker: {
      firstDayOfWeek: "0",
      dayNames: "Sunday | Monday | Tuesday | Wednesday | Thursday | Friday | Saturday",
      dayNamesShort: "Sun | Mon | Tue | Wed | Thu | Fri | Sat",
      monthNames: "January | February | March | April | May | June | July  | August | September | October | November | December",
      monthNamesShort: "Jan | Feb | Mar | Apr | May | Jun | Jul  | Aug | Sep | Oct | Nov | Dec",
      today: 'Today',
      clear: 'Clear',
    },
  },
  ru: {
    signUpTitle: 'Зарегистрируйтесь',
    signUpSubtitle: 'Добро пожаловать! Создайте аккаунт, чтобы продолжить',
    signUpAction: 'Создать аккаунт',
    signUpRedirect: 'У меня есть аккаунт',

    loginTitle: 'С возвращением',
    loginSubtitle: 'Рады вас видеть! Войдите, чтобы продолжить',
    loginAction: 'Войти',
    loginRedirect: "У меня нет аккаунтаа",

    light: 'Светлая',
    dark: 'Темная',
    deviceSettings: 'Настройки устройства',

    firstName: "Имя",
    lastName: "Фамилия",
    department: "Отдел",
    email: "Почта",
    position: "Должность",

    search: 'Поиск',

    projectName: 'Имя',
    domain: 'Домен | Домены',
    startDate: 'Дата начала',
    endDate: 'Дата окончания',

    cvName: 'Имя',
    employee: 'Сотрудник',
    education: 'Образование',

    departmentName: 'Имя',
    employees: 'Сотрудники',
    positionName: 'Имя',

    skillName: 'Имя',
    skillType: 'Тип',
    skillCategory: 'Категория',

    lang: 'Имя',
    nativeName: 'Родное Имя',
    iso2: 'ISO2',

    noData: 'Данные не найдены',
    noResultsTitle: 'Результаты не найдены',
    noResultsDescription: 'Попробуйте другой поиск, проверьте орфографию или используйте более общий термин',
    resetSearch: 'Сбросить поиск',
    customNoResultsTitle: 'Данные не соответствуют вашему запросу',
    customNoResultsDescription: 'Пожалуйста, попробуйте другие ключевые слова или сбросьте поиск, чтобы увидеть все проекты.',

    projects: 'Проекты',
    cvs: 'Резюме',
    departments: 'Отделы',
    positions: 'Должности',
    skills: 'Навыки',
    languages: 'Языки',
    profile: 'Профиль',
    settings: 'Настройки',
    logout: 'Выйти',
    preview: 'Просмотр',
    details: 'Подробности', 

    createCV: 'Создать Резюме',
    addSkill: 'Добавить Навык',
    addLanguage: 'Добавить Язык',
    updateSkill: 'Обновить Навык',
    updateLanguage: 'Обновить Язык',
    removeSkill: 'Удалить Навыки',
    removeLanguage: 'Удалить Язык',
    addProject: '+ Добавить Проект',
    skill: 'Навык',
    language: 'Язык',

    add: 'Добавить',
    update: 'Обновить',
    updateCV: 'Обновить Резюме',
    uploadAvatar: 'Загрузите изображение аватара',
    uploadText: 'png, jpg or gif не больше 0.5МБ',
    description: 'Описание',
    cancel: 'Отмена',
    create: 'Создать',
    confirm: 'Подтвердить',
    langProficiency: 'Владение языком',
    skillMastery: 'Уровень владения',
    deleteCV: 'Удалить Резюме',
    updateProject: 'Обновить Проект',
    removeProject: 'Удалить Проект',
    responsibilities: 'Обязанности',
    exportPDF: 'Экспорт pdf',
    memberSince: 'Аккаунт был создан',
    appearance: 'Внешний вид',
    delete: 'Удалить',
    project: 'Проект',
    professionalSkills: 'Профессиональные Навыки',
    projectRole: 'Роль на проекте',
    period: 'Период',
    environment: 'Окружение',
    experienceInYears: 'Опыт в годах',
    lastUsed: 'Последнее использование',

    programmingLang: 'Языки программирования',
    frontend: 'Frontend',
    backend: 'Backend',
    testTools: 'Платформы и инструменты тестирования',
    devOps: 'DevOps',
    sourceControl: 'Системы контроля версий',
    datepicker: {
      firstDayOfWeek: "1",
      dayNames: "Воскресенье | Понедельник | Вторник | Среда | Четверг | Пятница | Суббота",
      dayNamesShort: "Вс | Пн | Вт | Ср | Чт | Пт | Сб",
      monthNames: "Январь | Февраль | Март | Апрель | Май | Июнь | Июль  | Август | Сентябрь | Октябрь | Ноябрь | Декабрь",
      monthNamesShort: "Янв | Фев | Мар | Апр | Май | Июн | Июл  | Авг | Сен | Окт | Ноя | Дек",
      today: 'Сегодня',
      clear: 'Очистить',
    },
  }
}

export const i18n = createI18n({
  legacy: false, 
  globalInjection: true,
  locale: 'en', 
  fallbackLocale: 'en',
  messages
})
