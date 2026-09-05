import suryaconImage from './assets/suryacon.png'
import tudoorImage from './assets/tudoor.jpg'
import gexusImage from './assets/gexus.png'
import jsyncImage from './assets/jsync-logo.png'
import tripitImage from './assets/tripit.png'
import codeJettImage from './assets/codejett-logo.png'
import tudoorLogo from './assets/logos/tudoor-white.png'
import psquareLogo from './assets/logos/psquare.png'
import navoditaLogo from './assets/logos/navodita.png'
import tripitLogo from './assets/logos/tripit-india.png'

export const profile = {
  name: 'Sahil Singh',
  firstName: 'Sahil',
  lastName: 'Singh',
  role: 'Software Development Engineer',
  tagline: 'Offline-first systems · Electron · React 19',
  location: 'Chandigarh, India',
  phone: '+91 78891 43859',
  phoneHref: 'tel:+917889143859',
  email: 'sahilserrka058@gmail.com',
  website: 'https://sahilsingh.me',
  linkedin: 'https://www.linkedin.com/in/sahilserrka/',
  github: 'https://github.com/JScoder-git',
  githubAlt: 'https://github.com/Sahil-ps',
  resume: '/resume.html',
}

export const navLinks = [
  { name: 'About', href: '#about', index: '01' },
  { name: 'Skills', href: '#skills', index: '02' },
  { name: 'Work', href: '#experience', index: '03' },
  { name: 'Projects', href: '#projects', index: '04' },
  { name: 'Contact', href: '#contact', index: '05' },
]

export const heroStats = [
  { value: '20+', label: 'Engineers led' },
  { value: '5', label: 'Live products' },
  { value: '450', label: 'API endpoints' },
  { value: '5s', label: 'ERP sync' },
]

export const marqueeItems = [
  'React 19',
  'TypeScript',
  'Electron.js',
  'NestJS',
  'Offline-first',
  'TanStack Query',
  'PostgreSQL',
  'Capacitor',
  'Socket.io',
  'Prisma',
  'GSAP',
  'AWS',
]

export const about = {
  heading: 'Software development engineer who ships offline-first products.',
  paragraphs: [
    'Software Development Engineer at PSquare (May 2025–Present). Built SURYACON — a construction ERP with a 20+ engineer team — and shipped TUDOOR solo at tudoor.co.',
    'I work across React, Electron, Capacitor, and Node/NestJS. Strongest where UI, sync, and systems meet: offline-first SQLite, RBAC, realtime chat, and production payments.',
  ],
  tags: [
    { icon: '01', label: 'SDE' },
    { icon: '02', label: 'Offline-first' },
    { icon: '03', label: 'Electron ERP' },
    { icon: '04', label: 'Realtime' },
    { icon: '05', label: 'Payments' },
    { icon: '06', label: 'Open source' },
  ],
}

export const skillRows = [
  ['JavaScript', 'TypeScript', 'React 19', 'Redux Toolkit', 'Zustand', 'TanStack Query', 'Vite', 'Tailwind'],
  ['Electron.js', 'Capacitor', 'Node.js', 'Express', 'NestJS', 'Fastify', 'Socket.io', 'BullMQ'],
  ['PostgreSQL', 'Prisma', 'MongoDB', 'Redis', 'SQLite', 'AWS', 'Docker', 'Razorpay'],
]

export const experiences = [
  {
    index: '01',
    role: 'Solo Full-Stack',
    company: 'TUDOOR',
    client: 'tudoor.co',
    location: 'Mohali, India',
    period: 'Jun 2026 — Aug 2026',
    type: 'Solo',
    logo: tudoorLogo,
    logoBg: '#ffffff',
    logoFit: 'contain',
    description: [
      'Shipped the public EdTech marketplace alone — web plus Capacitor Android/iOS.',
      'Owned Express 5 + Prisma + PostgreSQL API, Redis, Socket.io chat, Razorpay + RevenueCat.',
      'Geo marketplace (requirements → proposals → matches). ~65ms avg / ~126ms p95 under k6.',
    ],
    tech: ['React 19', 'Capacitor', 'Express', 'Prisma', 'Redis', 'Socket.io', 'Razorpay'],
  },
  {
    index: '02',
    role: 'Software Development Engineer',
    company: 'PSquare · SURYACON',
    client: 'Construction ERP',
    location: 'Mohali, India',
    period: 'Aug 2025 — Jun 2026',
    type: 'Full-time',
    logo: psquareLogo,
    logoBg: '#5b2d8e',
    description: [
      'Built frontend for a 20+ engineer Electron ERP — 7 role UIs, 59 IPC handlers, ~700 TS/TSX files.',
      'Owned Redux Toolkit + RTK Query (38 slices, ~450 endpoints) across Billing, Inventory, PO, HR.',
      'Built offline-first encrypted SQLite (AES + zlib). Sync 30s → 5s. 40% less storage. 85% smaller payloads.',
    ],
    tech: ['Electron', 'React', 'RTK Query', 'better-sqlite3', 'Socket.io', 'CryptoJS'],
  },
  {
    index: '03',
    role: 'Software Developer',
    company: 'PSquare · CEPPL',
    client: 'Internal client',
    location: 'Mohali, India',
    period: 'May 2025 — Aug 2025',
    type: 'Full-time',
    logo: psquareLogo,
    logoBg: '#5b2d8e',
    description: [
      'Built a private firm operations dashboard with org-restricted access.',
      'Reporting UI with PDF/Excel export flows and reusable module components.',
    ],
    tech: ['React', 'Redux Toolkit', 'Vite', 'jsPDF', 'XLSX'],
  },
  {
    index: '04',
    role: 'Full-Stack Developer',
    company: 'Navodita Infotech',
    client: 'JS:MEDIA',
    location: 'Pune, India',
    period: 'Dec 2024 — Apr 2025',
    type: 'Full-time',
    logo: navoditaLogo,
    logoBg: '#4a1c24',
    description: [
      'Built React social feed, messaging UI, and realtime chat for 500+ users / 1,000+ daily messages.',
      'Express + MongoDB APIs, JWT auth, and a dedicated Socket.io service.',
    ],
    tech: ['React', 'Redux', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
  },
  {
    index: '05',
    role: 'Full-Stack Developer',
    company: 'TripIt India',
    client: 'Travel platform',
    location: 'Delhi, India',
    period: 'Aug 2024 — Dec 2024',
    type: 'Full-time',
    logo: tripitLogo,
    logoBg: '#b7e4df',
    description: [
      'Developed booking UI and REST APIs for tours, international packages, custom requests, and blog.',
      'JWT-secured booking flows on MongoDB supporting $50K+ in bookings.',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'JWT', 'GSAP', 'Docker'],
  },
]

export const projects = [
  {
    title: 'TUDOOR',
    subtitle: 'Public live product · tudoor.co',
    description: 'EdTech teacher marketplace I shipped solo — geo matching, chat, and payments on web plus Capacitor iOS/Android.',
    features: [
      'Google OAuth / PKCE',
      'Socket.io chat + BullMQ',
      'Razorpay + RevenueCat',
      '~65ms avg API under k6',
    ],
    tech: ['React 19', 'Capacitor', 'Express', 'Prisma', 'Redis'],
    image: tudoorImage,
    imageFit: 'cover',
    imageBg: '#0b1220',
    color: '#7dd3fc',
    live: 'https://tudoor.co',
  },
  {
    title: 'SURYACON',
    subtitle: 'Electron construction ERP',
    description: 'Offline-first desktop ERP for construction sites. Seven RBAC roles, encrypted SQLite, and a 20+ engineer frontend built end to end.',
    features: [
      '59 IPC handlers · ~700 TS files',
      '38 slices / ~450 RTK Query endpoints',
      'Sync 30s → 5s · 85% smaller payloads',
      'Role-isolated DBs · 12 backup pipelines',
    ],
    tech: ['Electron.js', 'React', 'RTK Query', 'SQLite', 'Socket.io'],
    image: suryaconImage,
    imageFit: 'contain',
    imageBg: '#f7f7f7',
    color: '#d4ff5a',
  },
  {
    title: 'GEXUS',
    subtitle: 'Esports platform · gexus.tech',
    description: 'Tournaments, teams, escrow marketplace, and wallets. NestJS API with 43 Prisma models plus a Go/S3 upload microservice.',
    features: [
      'Brackets, prizes, escrow',
      'Go upload for 100MB+ S3 files',
      'Google OAuth + OTP',
      'Hybrid Postgres + Mongo',
    ],
    tech: ['NestJS', 'React 19', 'Go', 'Prisma', 'Razorpay'],
    image: gexusImage,
    imageFit: 'contain',
    imageBg: '#000000',
    color: '#c4b5fd',
    live: 'https://gexus.tech',
  },
  {
    title: 'Code Jett',
    subtitle: 'Realtime code collaboration',
    description: 'Realtime code collaboration platform with WebSocket sync, multi-language execution, and live pairing.',
    features: [
      'WebSocket code sync',
      'Multi-language execution',
      'Live collaboration',
      'Monaco editor workspace',
    ],
    tech: ['React.js', 'WebSocket', 'Node.js', 'Monaco Editor'],
    image: codeJettImage,
    imageFit: 'contain',
    imageBg: '#000000',
    color: '#67e8f9',
    github: 'https://github.com/JScoder-git/Hackistica-24-',
  },
  {
    title: 'JSync Engine',
    subtitle: 'Open-source sync · npm v0.7.8',
    description: 'Realtime offline-first sync engine with CRDTs, delta sync, and React / React Native client SDKs.',
    features: [
      '<5ms local query latency',
      'LWW, OR-Set, PN-Counter',
      '60–80% less bandwidth',
      'AES-256-GCM + Fastify WS',
    ],
    tech: ['TypeScript', 'Fastify', 'SQLite', 'CRDTs', 'Turborepo'],
    image: jsyncImage,
    imageFit: 'contain',
    imageBg: '#000000',
    color: '#fbbf24',
    github: 'https://github.com/JScoder-git/SYNC_ENGINE',
  },
  {
    title: 'TripIt',
    subtitle: 'Travel booking platform · TripIt India',
    description: 'Multi-module travel platform for tours, international packages, custom requests, and blog — JWT booking flows processing $50K+ in bookings.',
    features: [
      'Tours + international packages',
      'Custom tour request flows',
      'JWT-secured booking APIs',
      '$50K+ bookings processed',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'JWT', 'GSAP', 'Docker'],
    image: tripitImage,
    imageFit: 'contain',
    imageBg: '#ffffff',
    wordmark: 'TripIt',
    color: '#38bdf8',
  },
]

export const education = {
  degree: 'Bachelor of Engineering — Computer Science',
  school: 'Chandigarh University',
  period: '2021 — 2025',
}
