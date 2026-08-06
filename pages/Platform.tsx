/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Tent, Store, Megaphone, Globe, Smartphone, Briefcase } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { platformContentEn } from '../content/platform.en';
import { platformContentKo } from '../content/platform.ko';
import StageCard from '../components/StageCard';
import CurvedPath from '../components/CurvedPath';
import { containerVariants, itemVariants } from '../utils/animations';
import type { StageData } from '../types';

// Icon mapping - monochrome, bold-stroke line icons (no color emoji)
const iconMap = {
  Tent,
  Store,
  Megaphone,
  Globe,
  Smartphone,
  Briefcase
};

const Platform: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'ko' ? platformContentKo : platformContentEn;
  const [mounted, setMounted] = useState(false);
  const journeyWrapRef = useRef<HTMLDivElement | null>(null);
  const [journeyAnchorPx, setJourneyAnchorPx] = useState<Array<{ x: number; y: number }>>([]);

  // Convert content roadmap to StageData format
  const ROADMAP_DATA: StageData[] = content.roadmap.map((stage) => ({
    ...stage,
    Icon: iconMap[stage.icon as keyof typeof iconMap],
    position: { top: 60 } // Default position, will be overridden by curveYPositions
  }));

  // strict(noUncheckedIndexedAccess) 대응: roadmap은 6단계로 고정이므로 non-null assertion으로 타입만 확정
  const getStage = (index: number): StageData => ROADMAP_DATA[index]!;
  // 점(원형)과 아이콘 박스(검정 사각) 사이 간격: "진짜 4px"을 보장하기 위해 SVG의 실제 렌더 좌표를 기준으로 계산
  const DOT_TO_ICON_GAP_PX = 50;

  // CurvedPath.tsx와 동일한 2차 베지어(Q) 라인/점 정의 (SVG viewBox 좌표)
  const journeyCurve = useMemo(() => {
    const P0 = { x: 10, y: 35 };
    const P1 = { x: 50, y: 25 };
    const P2 = { x: 90, y: 35 };
    const pointAtT = (t: number) => {
      const mt = 1 - t;
      const x = mt * mt * P0.x + 2 * mt * t * P1.x + t * t * P2.x;
      const y = mt * mt * P0.y + 2 * mt * t * P1.y + t * t * P2.y;
      return { x, y };
    };
    const T = [0, 0.2, 0.4, 0.6, 0.8, 1] as const;
    return { pointAtT, T };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SVG의 실제 렌더 좌표(CTM)를 사용해 6개 점의 픽셀 좌표를 계산 → 아이콘을 점 바로 아래(4px)에 배치
  useEffect(() => {
    const compute = () => {
      const wrapEl = journeyWrapRef.current;
      if (!wrapEl) return;

      const svgEl = wrapEl.querySelector('svg[data-journey-svg="true"]') as SVGSVGElement | null;
      if (!svgEl) return;

      const ctm = svgEl.getScreenCTM();
      if (!ctm) return;

      const wrapRect = wrapEl.getBoundingClientRect();
      const next: Array<{ x: number; y: number }> = [];

      journeyCurve.T.forEach((t) => {
        const { x, y } = journeyCurve.pointAtT(t);
        const p = svgEl.createSVGPoint();
        p.x = x;
        p.y = y;
        const sp = p.matrixTransform(ctm);
        next.push({ x: sp.x - wrapRect.left, y: sp.y - wrapRect.top });
      });

      setJourneyAnchorPx(next);
    };

    const raf = window.requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', compute);
    };
  }, [journeyCurve]);

  return (
    <div className="bg-white">
      {/* Hero Section - Kesta Wordmark on Red */}
      <section className="relative h-screen w-full overflow-hidden bg-kollab-red flex items-center justify-center">
        <motion.img
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          src="/assets/brands/kesta_wordmark_gray.png"
          alt="Kesta"
          className="w-[30%] h-auto object-contain"
        />
      </section>

      {/* Our Services Section */}
      <section className="bg-white py-20 md:py-32 px-6 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-sm font-black tracking-[0.3em] uppercase text-kollab-red mb-6">
            OUR SERVICES
          </h3>
          <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight mb-8 break-keep">
            Empowering K-Brands Through Retail, Marketing & Global Expansion.
          </h2>
          <p className="text-base md:text-lg text-black/80 leading-relaxed break-keep max-w-3xl mx-auto">
            {language === 'ko'
              ? '리테일을 넘어 글로벌 성장까지. KESTA는 브랜드의 성장 단계에 맞춘 다양한 솔루션을 제공합니다.'
              : 'KESTA provides integrated solutions that help Korean brands grow through curated retail experiences, strategic marketing, and global market expansion.'}
          </p>
        </motion.div>
      </section>

      {/* Brand Journey Section */}
      <section className="bg-white py-20 md:py-32 px-6 max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight mb-6 break-keep">
            {language === 'ko'
              ? 'Kesta의 브랜드 여정'
              : 'Kesta Brand Journey'}
          </h2>
          <p className="text-lg md:text-xl text-black/70 font-semibold max-w-3xl mx-auto break-keep">
            {language === 'ko'
              ? '성수에서 시작해 LA로, 브랜드의 글로벌 확장을 위한 6단계 프로세스'
              : 'From Seongsu to LA, a 6-step process for global brand expansion'}
          </p>
        </motion.div>

        {/* Roadmap Visualization - Arc Design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-4 md:py-6 relative bg-gradient-to-b from-white via-zinc-50/30 to-white rounded-2xl"
        >
          {/* Desktop View: The Arc */}
          <div ref={journeyWrapRef} className="hidden md:block relative w-full h-[450px] px-8">
            {/* SVG Connector Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <CurvedPath />
            </div>

            {/* 
              Cards positioned absolutely based on the curve geometry.
              
              ✨ 핵심: SVG 2차 베지어 곡선의 정확한 좌표 사용
              - 새로운 곡선: M 10,40 Q 50,10 90,40
              - viewBox: 0 0 100 50 (비율 2:1 - 원형에 가깝게)
              - 각 X 좌표에서 곡선 공식으로 정확한 Y값 계산
              - Node 1 & 5: 40% (시작/끝 - 동일한 baseline)
              - Node 2 & 4: 26.25% (대칭 - 동일 높이)
              - Node 3: 20% (정점)
              
              Transform: translate(-50%, -50%) - 아이콘 중심을 곡선 좌표에 정렬
            */}
            
            {/* Node 1 - Pop-up Store */}
            <div
              className="absolute transition-all duration-700 delay-[0ms] hover:z-50 z-10"
              style={{
                left: journeyAnchorPx[0]?.x != null ? `${journeyAnchorPx[0].x}px` : '10%',
                top: journeyAnchorPx[0]?.y != null ? `${journeyAnchorPx[0].y + DOT_TO_ICON_GAP_PX}px` : '35%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0
              }}
            >
              <StageCard data={getStage(0)} isEven={false} />
            </div>

            {/* Node 2 - Retail */}
            <div
              className="absolute transition-all duration-700 delay-[160ms] hover:z-50 z-10"
              style={{
                left: journeyAnchorPx[1]?.x != null ? `${journeyAnchorPx[1].x}px` : '26%',
                top: journeyAnchorPx[1]?.y != null ? `${journeyAnchorPx[1].y + DOT_TO_ICON_GAP_PX}px` : '31.8%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0
              }}
            >
              <StageCard data={getStage(1)} isEven={true} />
            </div>

            {/* Node 3 - Marketing */}
            <div
              className="absolute transition-all duration-700 delay-[320ms] hover:z-50 z-10"
              style={{
                left: journeyAnchorPx[2]?.x != null ? `${journeyAnchorPx[2].x}px` : '42%',
                top: journeyAnchorPx[2]?.y != null ? `${journeyAnchorPx[2].y + DOT_TO_ICON_GAP_PX}px` : '30.2%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0
              }}
            >
              <StageCard data={getStage(2)} isEven={false} />
            </div>

            {/* Node 4 - Global Distribution */}
            <div
              className="absolute transition-all duration-700 delay-[480ms] hover:z-50 z-10"
              style={{
                left: journeyAnchorPx[3]?.x != null ? `${journeyAnchorPx[3].x}px` : '58%',
                top: journeyAnchorPx[3]?.y != null ? `${journeyAnchorPx[3].y + DOT_TO_ICON_GAP_PX}px` : '30.2%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0
              }}
            >
              <StageCard data={getStage(3)} isEven={true} />
            </div>

            {/* Node 5 - TikTok Shop */}
            <div
              className="absolute transition-all duration-700 delay-[640ms] hover:z-50 z-10"
              style={{
                left: journeyAnchorPx[4]?.x != null ? `${journeyAnchorPx[4].x}px` : '74%',
                top: journeyAnchorPx[4]?.y != null ? `${journeyAnchorPx[4].y + DOT_TO_ICON_GAP_PX}px` : '31.8%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0
              }}
            >
              <StageCard data={getStage(4)} isEven={false} />
            </div>

            {/* Node 6 - Brand Consulting (Node 1과 정확히 동일한 높이) */}
            <div
              className="absolute transition-all duration-700 delay-[800ms] hover:z-50 z-10"
              style={{
                left: journeyAnchorPx[5]?.x != null ? `${journeyAnchorPx[5].x}px` : '90%',
                top: journeyAnchorPx[5]?.y != null ? `${journeyAnchorPx[5].y + DOT_TO_ICON_GAP_PX}px` : '35%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0
              }}
            >
              <StageCard data={getStage(5)} isEven={true} />
            </div>
          </div>

          {/* Mobile View: Vertical Timeline */}
          <div className="md:hidden flex flex-col items-center space-y-12 w-full mt-10">
            {ROADMAP_DATA.map((stage, index) => (
              <motion.div 
                key={stage.id} 
                variants={itemVariants}
                className="relative w-full flex justify-center"
              >
                {/* Vertical Connecting Line */}
                {index !== ROADMAP_DATA.length - 1 && (
                  <div className="absolute h-full w-[2px] bg-kollab-red/20 left-1/2 top-1/2 -z-10" />
                )}
                <StageCard data={stage} isEven={index % 2 === 0} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Platform;
