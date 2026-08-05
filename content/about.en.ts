import type { ContentBlock, ContentSection } from './contentBlocks';

export interface AboutContent {
  pageLabel: string;
  hero: { title: string; deck: string };
  introSection?: {
    label: string;
    paragraphs: string[];
  };
  visionSection?: {
    label: string;
    headline: string[];
    paragraphs: string[];
  };
  whatWeDo?: {
    label: string;
    items: { title: string; desc: string }[];
  };
  whyKesta?: {
    label: string;
    items: { title: string; desc: string }[];
  };
  readyBanner?: {
    title: string;
    line: string;
  };
  gallery: { images: { src: string; alt: string }[] };
  sections: ContentSection[];
}

export const aboutContentEn: AboutContent = {
  pageLabel: 'ABOUT',
  introSection: {
    label: 'ABOUT KESTA',
    paragraphs: [
      'KESTA discovers outstanding Korean brands and connects offline retail, pop-up stores, marketing, and global distribution into one brand platform.',
      'We do more than operate space — we help brands meet consumers, validate the market, and grow beyond Korea into global markets.'
    ]
  },
  visionSection: {
    label: 'OUR VISION',
    headline: ['Beyond Retail.', 'Building Global Brand Opportunities.'],
    paragraphs: [
      'We don\'t just build space to sell products — we create opportunities for brands to meet new markets and new consumers.',
      'As a growth partner for brands, KESTA builds the global expansion of Korean brands together.'
    ]
  },
  whatWeDo: {
    label: 'WHAT WE DO',
    items: [
      { title: 'POP-UP STORE', desc: 'Pop-up projects that maximize brand experience' },
      { title: 'RETAIL', desc: 'Department store and offline retail distribution operations' },
      { title: 'MARKETING', desc: 'Brand marketing through content, SNS, influencers, and livestream commerce' },
      { title: 'GLOBAL DISTRIBUTION', desc: 'Support for overseas distribution and global market entry' },
      { title: 'TIKTOK SHOP', desc: 'Livestream commerce and global commerce operations' },
      { title: 'BRAND CONSULTING', desc: 'Consulting on brand launch and growth strategy' }
    ]
  },
  whyKesta: {
    label: 'WHY KESTA',
    items: [
      { title: 'Curated Brand Selection', desc: 'A carefully curated selection of brands' },
      { title: 'Proven Retail Experience', desc: 'Hands-on, execution-driven offline operating experience' },
      { title: 'Global Expansion', desc: 'Connecting brands from Korea to overseas markets' },
      { title: 'Marketing & Commerce', desc: 'Designing marketing and sales together' }
    ]
  },
  readyBanner: {
    title: 'READY TO GO\nGLOBAL?',
    line: 'Promote your brand with Kesta.'
  },
  hero: {
    title: 'Born in Los Angeles.\nOperated in Korea.',
    deck: 'Where Global Ambition Meets Local Expertise'
  },
  gallery: {
    images: [
      { src: '/assets/photos/shoots/design_guide02.png', alt: 'Kesta LA reference 01' },
      { src: '/assets/photos/shoots/design_guide03.png', alt: 'Kesta LA reference 02' },
      { src: '/assets/images/hero/kollab-hero-bg-01.png', alt: 'Kesta reference 03' },
      { src: '/assets/images/hero/kollab-hero-bg-02.png', alt: 'Kesta reference 04' }
    ]
  },
  sections: [
    {
      id: 'operations',
      title: '',
      blocks: [
        {
          kind: 'body',
          en: 'We curate brands and operate spaces with efficiency,\ncreating offline growth opportunities across markets.'
        }
      ]
    },
    {
      id: 'intro',
      title: '',
      blocks: [
        {
          kind: 'lead',
          en:
            'Kesta is an LA-born,\nexperience-driven curation retail platform.'
        },
        {
          kind: 'body',
          en:
            'Kesta selects and operates brands in the Korean market\nand connects validated brands to U.S. pop-up opportunities.'
        }
      ]
    },
    {
      id: 'what-we-do',
      title: 'What We Do',
      blocks: [
        { kind: 'body', en: 'We build an offline pathway from Korea to the U.S.' }
      ]
    },
    {
      id: 'platform-not-consulting',
      title: '',
      blocks: [
        {
          en:
            'Kesta does not offer consulting or one-time promotions.\nWe provide a structure where brands can validate → grow → expand\nthrough real retail experience.'
        }
      ]
    },
    {
      id: 'our-philosophy',
      title: 'Our Philosophy',
      blocks: [
        {
          kind: 'body',
          en: 'We believe brands grow strongest\nwhen they are experienced in person.'
        },
        {
          kind: 'body',
          en:
            'Offline experience creates trust, insight, and momentum\nthat digital exposure alone cannot replace.'
        }
      ]
    },
    {
      id: 'our-role',
      title: 'Our Role',
      blocks: [
        { kind: 'quote', en: 'Kesta is not an agency.\nKesta is a platform.' },
        {
          en:
            'We curate brands, operate spaces,\nand create offline growth opportunities across markets.'
        }
      ]
    }
  ]
};

export type AboutContentType = AboutContent;

