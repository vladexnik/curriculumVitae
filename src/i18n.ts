import { createI18n } from 'vue-i18n'

const messages = {
  en: {
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
    domain: 'Domain',
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

    createCV: 'Create CV +',
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
    langProficincy: 'Language proficiency',
    skillMastery: 'Skill mastery',
    deleteCV: 'Delete CV',
    updateProject: 'Update Project',
    removeProject: 'Remove Project',
    responsibilities: 'Responsibilities',
    exportPDF: 'export pdf',
    memberSince: 'A member since',
    appearance: 'Appereance',

  },
  de: {
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
    domain: 'Domain',
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

    createCV: '+ Lebenslauf Erstellen',
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
    langProficincy: 'Language proficiency',
    skillMastery: 'Fertigkeitsbeherrschung',
    deleteCV: 'Lebenslauf löschen',
    updateProject: 'Update Project',
    removeProject: 'Remove Project',
    responsibilities: 'Responsibilities',
    exportPDF: 'pdf exportieren',
    memberSince: 'Seitdem Mitglied',
    appearance: 'Aussehen',
    language: 'Sprache',
    skill: 'Fertigkeit'
  },
  ru: {
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
    domain: 'Домен',
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
    langProficincy: 'Владение языком',
    skillMastery: 'Уровень владения',
    deleteCV: 'Удалить Резюме',
    updateProject: 'Обновить Проект',
    removeProject: 'Удалить Проект',
    responsibilities: 'Обязанности',
    exportPDF: 'Экспорт pdf',
    memberSince: 'Аккаунт был создан',
    appearance: 'Внешний вид',
  }
}

export const i18n = createI18n({
  legacy: false, 
  locale: 'en', 
  fallbackLocale: 'en',
  messages
})
