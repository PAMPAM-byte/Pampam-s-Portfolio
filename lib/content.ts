export const contact = {
  email: 'favourpamilerin1@gmail.com',
  phone: '+234 705 083 0039',
  phoneHref: 'tel:+2347050830039',
  linkedin: 'https://www.linkedin.com/in/favour-akintade-394a55342',
  github: 'https://github.com/PAMPAM-byte',
  instagram: 'https://www.instagram.com/pamilhereen',
  x: 'https://x.com/pamilhereen',
};

export const cvHref = '/cv/Favour_Akintade_Software_Developer_CV.html';
export const ibmVerifyHref = 'https://coursera.org/verify/professional-cert/J2GV0EBFNGFC';

export type Project = {
  name: string;
  url: string;
  tag: string;
  image: string;
  description: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    name: 'Nannoy',
    url: 'https://nannoy.com',
    tag: 'Edtech · AI',
    image: '/images/projects/nannoy.jpg',
    description:
      'An AI learning platform for African career-switchers. It interviews you, generates a personalised course, and puts Nora — a voice and text mentor — on every lesson, with verified certificates employers can check.',
    tech: ['Next.js', 'React', 'AI'],
  },
  {
    name: 'TalkingStage',
    url: 'https://talkingstage.buzz',
    tag: 'Dating · AI',
    image: '/images/projects/talkingstage.png',
    description:
      'A Nigerian-first AI dating experience. Users meet AI characters, each with their own backstory and style, and chat in English or Pidgin — with per-character memory controls, conversation management, and safety reporting.',
    tech: ['Next.js', 'Tailwind CSS', 'AI'],
  },
  {
    name: 'SetupRadar',
    url: 'https://setupradar-one.vercel.app/',
    tag: 'Markets · Alerts',
    image: '/images/projects/setupradar.jpg',
    description:
      'A trading companion that watches the markets around the clock and fires a real-time alert the moment your exact setup forms — across markets and timeframes.',
    tech: ['Vite', 'React', 'Alerts'],
  },
  {
    name: 'Josephine FreshHome',
    url: 'https://josephinefreshhome.vercel.app/',
    tag: 'Brand · Home care',
    image: '/images/projects/josephine.jpg',
    description:
      'A product site for a home-care brand in Akure — liquid soap, Izal, shampoo — with a catalogue, WhatsApp ordering, wholesale, and souvenir flows.',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
];

export const stack = [
  {
    title: 'Frontend',
    items: [
      'HTML5, CSS3, JavaScript (ES6+)',
      'React and Next.js',
      'Responsive, mobile-first interfaces',
      'Component-based architecture',
      'Web accessibility',
      'API integration',
    ],
    tools: 'React · Next.js · Tailwind · Git · Figma',
  },
  {
    title: 'Mobile',
    items: [
      'Flutter and Dart for iOS and Android',
      'Widgets, layouts, and navigation',
      'Stateful and stateless UI',
      'Forms, lists, and screen flows',
      'Local persistence and app state',
      'Figma-to-Flutter UI builds',
    ],
    tools: 'Flutter · Dart · Android Studio · REST APIs',
  },
  {
    title: 'Java & backend',
    items: [
      'Object-oriented Java',
      'Spring Framework and Spring Boot',
      'RESTful API development',
      'Relational and NoSQL databases',
      'Docker and microservices',
      'Cloud-native development',
    ],
    tools: 'Java · Spring · Maven · Docker · MySQL',
  },
];

export const contactTopics = [
  'Frontend engineering role',
  'Java / backend development role',
  'Website / application project',
  'Mobile / Flutter role',
  'Collaboration / partnership',
  'Other',
];
