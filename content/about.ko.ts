import type { AboutContent } from './about.en';

export const aboutContentKo: AboutContent = {
  pageLabel: 'ABOUT',
  introSection: {
    label: 'KESTA 소개',
    paragraphs: [
      'KESTA는 대한민국의 우수한 브랜드를 발굴하고, 오프라인 리테일, 팝업스토어, 마케팅, 글로벌 유통을 연결하는 브랜드 플랫폼입니다.',
      '단순히 공간을 운영하는 것이 아니라, 브랜드가 소비자와 만나고, 시장을 검증하며, 국내를 넘어 글로벌 시장까지 성장할 수 있도록 함께합니다.'
    ]
  },
  visionSection: {
    label: 'OUR VISION',
    headline: ['Beyond Retail.', 'Building Global Brand Opportunities.'],
    paragraphs: [
      '우리는 제품을 판매하는 공간을 만드는 것이 아니라, 브랜드가 새로운 시장과 소비자를 만나는 기회를 만듭니다.',
      'KESTA는 브랜드의 성장 파트너로서 대한민국 브랜드의 글로벌 진출을 함께 만들어갑니다.'
    ]
  },
  whatWeDo: {
    label: 'WHAT WE DO',
    items: [
      { title: 'POP-UP STORE', desc: '브랜드 경험을 극대화하는 팝업 프로젝트 운영' },
      { title: 'RETAIL', desc: '백화점 및 오프라인 리테일 유통 운영' },
      { title: 'MARKETING', desc: '콘텐츠, SNS, 인플루언서, 라이브커머스를 통한 브랜드 마케팅' },
      { title: 'GLOBAL DISTRIBUTION', desc: '해외 유통 및 글로벌 시장 진출 지원' },
      { title: 'TIKTOK SHOP', desc: '라이브커머스 및 글로벌 커머스 운영' },
      { title: 'BRAND CONSULTING', desc: '브랜드 런칭 및 성장 전략 컨설팅' }
    ]
  },
  whyKesta: {
    label: 'WHY KESTA',
    items: [
      { title: 'Curated Brand Selection', desc: '엄선된 브랜드 큐레이션' },
      { title: 'Proven Retail Experience', desc: '실전 중심의 오프라인 운영 경험' },
      { title: 'Global Expansion', desc: '국내를 넘어 해외 시장까지 연결' },
      { title: 'Marketing & Commerce', desc: '마케팅과 판매를 함께 설계' }
    ]
  },
  readyBanner: {
    title: 'READY TO GO\nGLOBAL?',
    line: 'Kesta와 함께 당신의 브랜드를 알리세요.'
  },
  hero: {
    title: 'Born in Los Angeles.\nOperated in Korea.',
    deck: '글로벌 야망과 로컬 전문성이 만나는 곳'
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
          ko: '우리는 브랜드를 선별하고, 공간을 합리적으로 운영하며,\n시장을 넘나드는 오프라인 성장 기회를 만듭니다.'
        }
      ]
    },
    {
      id: 'intro',
      title: '',
      blocks: [
        {
          kind: 'lead',
          ko: 'Kesta는 LA에서 시작된\n경험 중심의 큐레이션 리테일 플랫폼입니다.'
        },
        {
          kind: 'body',
          ko:
            'Kesta는\n한국 시장에서 브랜드를 선별 · 운영하고\n검증된 브랜드를 미국 팝업 기회로 연결하는 역할을 합니다.'
        }
      ]
    },
    {
      id: 'what-we-do',
      title: 'What We Do',
      blocks: [
        { kind: 'body', ko: '우리는 한국에서 미국으로 이어지는 오프라인 경로를 만듭니다.' }
      ]
    },
    {
      id: 'platform-not-consulting',
      title: '',
      blocks: [
        {
          kind: 'body',
          ko:
            'Kesta는 컨설팅이나 일회성 홍보를 제공하지 않습니다.\n실제 리테일 환경에서 브랜드가 검증 → 성장 → 확장할 수 있는 구조를 제공합니다.'
        }
      ]
    },
    {
      id: 'our-philosophy',
      title: 'Our Philosophy',
      blocks: [
        {
          kind: 'body',
          ko: '브랜드는\n직접 경험될 때 가장 강력해 진다고 믿습니다.'
        },
        {
          kind: 'body',
          ko:
            '오프라인 경험은\n디지털 노출만으로는 얻을 수 없는\n신뢰와 인사이트, 그리고 다음 단계로의 동력을 만듭니다.'
        }
      ]
    },
    {
      id: 'our-role',
      title: 'Our Role',
      blocks: [
        { kind: 'quote', ko: 'Kesta는 에이전시가 아닙니다.\nKesta는 플랫폼입니다.' },
        {
          kind: 'body',
          ko:
            '우리는 브랜드를 선별하고, 공간을 운영하며,\n시장을 넘나드는 오프라인 성장 기회를 만듭니다.'
        }
      ]
    }
  ]
};

export type AboutContentKo = typeof aboutContentKo;

