// Centralized business data. Only real, confirmed information lives here.
// Anything not yet confirmed by the client is left as a clearly-named
// placeholder rather than invented.

export const business = {
  name: "Serene Hands",
  fullName: "Serene Hands Home Care Services",
  tagline: "Care that feels like home.",
  phone: "0597562653",
  phoneHref: "tel:+233597562653",
  whatsappHref: "https://wa.me/233597562653",
  email: "serenehandshomeservices@gmail.com",
  instagram: "https://instagram.com/serenehandshomeservice",
  instagramHandle: "@serenehandshomeservice",
  tiktok: "https://www.tiktok.com/@serenehandshomecare",
  tiktokHandle: "@serenehandshomecare",
  // Service area confirmed from client's Instagram/TikTok flyer (Aug 2026)
  serviceAreaLabel: "Serving communities in Kumasi & Accra",
};

export const forms = {
  // Sign up free at formspree.io, create a form, and paste its ID here
  // (the part after "https://formspree.io/f/"). All website forms are
  // submitted to Formspree. The client's private phone/WhatsApp number is
  // for questions only and is never used as a form fallback.
  // Shared across all three forms for now — split into separate Formspree
  // forms later if volume/notifications get noisy.
  contactFormspreeId: "mvkokjzy",
  careersFormspreeId: "mvkokjzy",
  bookingFormspreeId: "mvkokjzy",
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "Join Our Team", to: "/careers" },
  { label: "FAQ", to: "/faq" },
];

export type SupportArea = {
  id: string;
  title: string;
  description: string;
};

// Directly from the client's flyer: "We support children with"
export const supportAreas: SupportArea[] = [
  {
    id: "autism",
    title: "Autism Spectrum Disorder",
    description:
      "Consistent, patient support that meets each child where they are and helps routines feel safe.",
  },
  {
    id: "cerebral-palsy",
    title: "Cerebral Palsy",
    description:
      "Hands-on assistance with daily movement, comfort and everyday activities at home.",
  },
  {
    id: "adhd",
    title: "ADHD & Hyperactivity",
    description:
      "Structured, engaged care that channels energy into learning and play.",
  },
  {
    id: "communication",
    title: "Communication Disorders",
    description:
      "Supportive, encouraging interaction that helps a child's own way of communicating come through.",
  },
  {
    id: "learning-differences",
    title: "Learning Differences",
    description:
      "Care built around how each child learns best, not a one-size-fits-all approach.",
  },
  {
    id: "more",
    title: "And Many More",
    description:
      "Every child is different — care is shaped around your child's specific needs.",
  },
];

export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  overview: string;
  whoItsFor: string;
  whatItInvolves: string[];
};

// Directly from the client's flyer: "Our Services"
export const services: Service[] = [
  {
    id: "personalized-care-plans",
    title: "Personalized Care Plans",
    shortDescription: "Care built around your child, not a template.",
    overview:
      "Every family and every child is different. A personalized care plan starts with understanding your child's needs, routines and personality before any care begins.",
    whoItsFor:
      "Families who want a caregiver plan shaped specifically around their child's diagnosis, routine and personality.",
    whatItInvolves: [
      "Getting to know your child and family",
      "A plan shaped around daily routines and preferences",
      "Ongoing adjustment as your child's needs change",
    ],
  },
  {
    id: "behavior-support",
    title: "Behavior Support",
    shortDescription: "Calm, consistent support through difficult moments.",
    overview:
      "Patient, steady support that helps children navigate challenging moments with consistency and encouragement rather than frustration.",
    whoItsFor:
      "Children who benefit from a consistent, patient approach to behavior and emotional regulation.",
    whatItInvolves: [
      "Consistent, predictable responses",
      "Positive reinforcement and encouragement",
      "Close communication with parents about what's working",
    ],
  },
  {
    id: "therapy-assistance",
    title: "Therapy Assistance",
    shortDescription: "Support that reinforces your child's therapy goals at home.",
    overview:
      "Caregivers help carry therapy goals into everyday life at home, supporting the progress made in formal therapy sessions.",
    whoItsFor:
      "Children in ongoing therapy who benefit from consistent reinforcement between sessions.",
    whatItInvolves: [
      "Supporting exercises and routines recommended by therapists",
      "Encouraging practice in a comfortable home setting",
      "Keeping families informed of progress",
    ],
  },
  {
    id: "daily-living-skills-support",
    title: "Daily Living Skills Support",
    shortDescription: "Practical help building everyday independence.",
    overview:
      "Support with the everyday skills that build a child's confidence and independence over time.",
    whoItsFor:
      "Children working toward greater independence in daily routines.",
    whatItInvolves: [
      "Support with dressing, feeding and personal routines",
      "Encouraging independence at a comfortable pace",
      "Patient, step-by-step guidance",
    ],
  },
  {
    id: "special-education-support",
    title: "Special Education Support",
    shortDescription: "Encouragement and structure around learning.",
    overview:
      "Support that complements a child's education, helping learning differences feel like less of a barrier.",
    whoItsFor:
      "Children who need extra one-on-one support and encouragement around learning.",
    whatItInvolves: [
      "Support with schoolwork and learning routines",
      "Patient, encouraging approach to learning differences",
      "Coordination with parents on educational goals",
    ],
  },
  {
    id: "companionship-respite-care",
    title: "Companionship & Respite Care",
    shortDescription: "Warm company for your child, breathing room for you.",
    overview:
      "Genuine companionship for your child, and trusted relief for parents and family caregivers who need time to rest.",
    whoItsFor:
      "Families who need trusted, reliable support so they can rest, work or attend to other responsibilities.",
    whatItInvolves: [
      "Attentive, friendly companionship",
      "Reliable coverage so parents can step away with peace of mind",
      "Consistent caregivers your child comes to know and trust",
    ],
  },
  {
    id: "developmental-activities",
    title: "Developmental Activities",
    shortDescription: "Play and activities that support growth.",
    overview:
      "Age-appropriate, engaging activities designed to support your child's development through play.",
    whoItsFor:
      "Children who benefit from structured, developmentally supportive play and activity.",
    whatItInvolves: [
      "Play-based developmental activities",
      "Activities adapted to your child's abilities",
      "A safe, encouraging environment to try new things",
    ],
  },
];

export const whyChooseUs = [
  {
    title: "Trained Pediatric Caregivers",
    description: "Caregivers with a specific focus on children's needs.",
  },
  {
    title: "Compassionate & Patient Approach",
    description: "Every child is met with patience and kindness.",
  },
  {
    title: "Safe, Supportive & Nurturing Environment",
    description: "Care that feels safe and steady, right at home.",
  },
  {
    title: "Focus on Growth & Independence",
    description: "Support that helps children build skills over time.",
  },
  {
    title: "Evidence-Based Care Strategies",
    description: "An approach grounded in what genuinely helps children thrive.",
  },
  {
    title: "Flexible Scheduling",
    description: "Care arranged around your family's routine.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Get in Touch",
    description: "Tell Serene Hands about your child and the kind of support you're looking for.",
  },
  {
    number: "02",
    title: "Understand Your Needs",
    description: "We talk through your child's needs, routines and what would help most.",
  },
  {
    number: "03",
    title: "Build a Care Plan",
    description: "Together we shape a care plan around your child specifically.",
  },
  {
    number: "04",
    title: "Begin Care",
    description: "Care begins, with ongoing communication so you always know how things are going.",
  },
];

export const faqs = [
  {
    question: "What is home care for children with special needs?",
    answer:
      "It's professional, compassionate support delivered in your own home — helping your child with daily routines, learning, behavior support and companionship, shaped around their specific needs.",
  },
  {
    question: "What conditions do you support?",
    answer:
      "Our caregivers support children with autism spectrum disorder, cerebral palsy, ADHD and hyperactivity, communication disorders, learning differences, and more. If you're unsure whether we can help, reach out and tell us about your child.",
  },
  {
    question: "How do I request care?",
    answer:
      "Use the Request Care form to send your details securely through our form system. For general questions, you can also call or WhatsApp us.",
  },
  {
    question: "How does the care plan get built?",
    answer:
      "We start by getting to know your child and your family's routine, then build a plan shaped specifically around what would help most — adjusting over time as needs change.",
  },
  {
    question: "Can care be customized?",
    answer:
      "Yes. Every child is different, and care is built around your child's specific needs rather than a fixed package.",
  },
  {
    question: "How are caregivers selected?",
    answer:
      "Caregivers are chosen for their patience, compassion and focus on pediatric care, and are expected to hold to Serene Hands' standards for professionalism and communication.",
  },
  {
    question: "How does scheduling work?",
    answer:
      "Scheduling is flexible and arranged around your family's routine — get in touch to talk through what would work best.",
  },
  {
    question: "How can I stay informed about my child's care?",
    answer:
      "Open communication with families is a core part of how Serene Hands works — you're kept informed and involved throughout.",
  },
  {
    question: "How do I become a caregiver?",
    answer:
      "Visit the Caregivers page to learn more about joining the Serene Hands team and to submit an application.",
  },
];

export const resourceArticles = [
  {
    slug: "signs-your-child-may-benefit-from-home-care-support",
    title: "Signs Your Child May Benefit from Home Care Support",
    excerpt:
      "Some questions to ask yourself if you're wondering whether extra support at home could help your child.",
    readingTime: "4 min read",
  },
  {
    slug: "what-to-ask-before-choosing-a-pediatric-caregiver",
    title: "What to Ask Before Choosing a Pediatric Caregiver",
    excerpt:
      "Practical questions to bring to any conversation with a home-care provider for your child.",
    readingTime: "5 min read",
  },
  {
    slug: "supporting-therapy-progress-at-home",
    title: "Supporting Therapy Progress at Home",
    excerpt:
      "How consistent, everyday support at home can reinforce the progress made in formal therapy sessions.",
    readingTime: "4 min read",
  },
];
