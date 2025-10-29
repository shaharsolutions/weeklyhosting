import type { Task, ShoppingItem, DayOfWeek, Template } from './types';

export const initialTasks: Task[] = [
  { id: 1, text: 'ניקיון וסידור מהיר של הבית', completed: false },
  { id: 2, text: 'עריכת שולחן יפה', completed: false },
  { id: 3, text: 'הכנת מנה עיקרית', completed: false },
  { id: 4, text: 'הכנת תוספת או סלט', completed: false },
  { id: 5, text: 'בדיקה שיש מספיק שתיה', completed: false },
  { id: 6, text: 'הדלקת נרות או תאורה נעימה', completed: false },
];

export const initialShoppingList: ShoppingItem[] = [
  { id: 1, name: 'יין אדום / לבן', purchased: false },
  { id: 2, name: 'חומרי גלם למנה עיקרית', purchased: false },
  { id: 3, name: 'ירקות טריים לסלט', purchased: false },
  { id: 4, name: 'לחם טרי / חלה', purchased: false },
  { id: 5, name: 'קינוח קטן', purchased: false },
];

export const daysOfWeek: Record<DayOfWeek, { name: string; gcal: string }> = {
    SUNDAY: { name: 'ראשון', gcal: 'SU' },
    MONDAY: { name: 'שני', gcal: 'MO' },
    TUESDAY: { name: 'שלישי', gcal: 'TU' },
    WEDNESDAY: { name: 'רביעי', gcal: 'WE' },
    THURSDAY: { name: 'חמישי', gcal: 'TH' },
    FRIDAY: { name: 'שישי', gcal: 'FR' },
    SATURDAY: { name: 'שבת', gcal: 'SA' },
};

export const hostingTemplates: Template[] = [
    {
      id: 'family-dinner',
      name: 'ארוחת ערב משפחתית',
      description: 'תבנית קלאסית לארוחה חמה וביתית.',
      tasks: [
        { text: 'בישול מנה עיקרית מסורתית' },
        { text: 'הכנת 2-3 סוגי סלטים' },
        { text: 'עריכת שולחן חגיגי עם מפה' },
        { text: 'אפיית עוגה או קינוח ביתי' },
        { text: 'סידור פינת קפה/תה לסוף הארוחה' },
      ],
      shoppingItems: [
        { name: 'עוף שלם / נתח בשר' },
        { name: 'תפוחי אדמה ובטטות' },
        { name: 'ירקות טריים לסלטים' },
        { name: 'בקבוק יין אדום' },
        { name: 'מצרכים לעוגה' },
        { name: 'פירות העונה' },
      ],
    },
    {
      id: 'friends-gathering',
      name: 'מפגש חברים קליל',
      description: 'אווירה כיפית וקלילה עם נשנושים ושתיה.',
      tasks: [
        { text: 'הכנת פלטת גבינות ונקניקים' },
        { text: 'הכנת מטבלים ונשנושים (נאצ\'וס, ירקות חתוכים)' },
        { text: 'קירור בירות ומשקאות קלים' },
        { text: 'בחירת פלייליסט כיפי' },
        { text: 'סידור פינת ישיבה נוחה בסלון' },
      ],
      shoppingItems: [
        { name: 'מבחר גבינות קשות ורכות' },
        { name: 'קרקרים' },
        { name: 'בירות/יין' },
        { name: 'זיתים ומלפפונים חמוצים' },
        { name: 'נאצ\'וס וסלסה' },
        { name: 'שקית קרח' },
      ],
    },
      {
      id: 'birthday-party',
      name: 'חגיגת יום הולדת',
      description: 'כל מה שצריך למסיבה קטנה ומושלמת.',
      tasks: [
        { text: 'קישוט הבית עם בלונים וסרטים' },
        { text: 'הכנת עוגת יום הולדת' },
        { text: 'הכנת כיבוד קל (פיצות, בורקסים)' },
        { text: 'ארגון פינת מתנות' },
        { text: 'וידוא שיש נרות וגפרורים' },
      ],
      shoppingItems: [
        { name: 'בלונים וקישוטים' },
        { name: 'מצרכים לעוגה' },
        { name: 'חטיפים מלוחים ומתוקים' },
        { name: 'שתיה קלה ומיצים' },
        { name: 'כלים חד פעמיים' },
        { name: 'נרות יום הולדת' },
      ],
    },
  ];