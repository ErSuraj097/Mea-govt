export const SITE_CONFIG = {
  name: 'Ministry of External Affairs | ICCR Indian Language Learning Portal',
  shortName: 'MEA Language Portal',
  description: 'Official Government of India Sovereign Multilingual Learning & Speech Evaluation Portal under ICCR and MeitY Sambhasini.',
  url: 'https://www.mea.gov.in',
  ogImage: '/images/PM-Narendra-Modi.webp',
  author: 'Ministry of External Affairs, Government of India',
  links: {
    mea: 'https://www.mea.gov.in',
    iccr: 'https://www.iccr.gov.in',
    Sambhasini: 'https://Sambhasini.gov.in',
  },
  colors: {
    navy: '#0C2340',
    saffron: '#F26522',
    green: '#138808',
    slateBg: '#F8F9FA',
  },
  roles: [
    { id: 'student', label: 'Learner (Diplomat/Scholar)', route: '/dashboard/student' },
    { id: 'teacher', label: 'Faculty / Evaluator', route: '/dashboard/teacher' },
    { id: 'admin', label: 'Super Admin', route: '/dashboard/admin' },
    { id: 'creator', label: 'Course Creator / Linguist', route: '/dashboard/creator' },
    { id: 'tester', label: 'QA / Speech Tester', route: '/dashboard/tester' },
    { id: 'institute', label: 'Embassy / SVCC Mission Admin', route: '/dashboard/institute' },
    { id: 'accounting', label: 'Treasury / Accounting', route: '/dashboard/accounting' },
  ],
};
