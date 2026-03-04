
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { brandsContentEn } from '../content/brands.en';
import { brandsContentKo } from '../content/brands.ko';
import { highlightBrandName } from '../utils/text';
import { useFacebookPixel } from '../hooks/useFacebookPixel';
import type { BrandPartner } from '../types';

interface BrandsProps {
  navigateTo: (page: string) => void;
}

const renderBrandNameBold = (text: string): React.ReactNode => {
  const parts = highlightBrandName(text);
  return parts.map((part, i) => {
    if (part.bold) {
      return (
        <span key={`brand-${i}`} className="font-extrabold">
          {part.text}
        </span>
      );
    }
    return <React.Fragment key={`text-${i}`}>{part.text}</React.Fragment>;
  });
};

const Brands: React.FC<BrandsProps> = ({ navigateTo }) => {
  const { language } = useLanguage();
  const content = language === 'ko' ? brandsContentKo : brandsContentEn;
  const marqueeDurationSec = 80;
  const companyMarqueeDurationSec = 45;

  // Facebook Pixel for conversion tracking
  const { events } = useFacebookPixel();

  // LA Partner logos - 40개 중 3개 제외 (풀무원, 시디즈, 농심)
  const excludedLogos = [21, 23, 29];
  const laPartners: BrandPartner[] = Array.from({ length: 40 }, (_, i) => ({
    logo: `/BrandLogo/la-popup-logo${String(i + 1).padStart(2, '0')}.png`,
    name: `Brand ${i + 1}`
  })).filter((_, i) => !excludedLogos.includes(i + 1));

  // KOLLAB KOREA company logos
  const companyLogos: BrandPartner[] = [
    { logo: '/assets/brands/company/0062_로고.png', name: '0062' },
    { logo: '/assets/brands/company/더마룹_OGET-LOGO.png', name: 'OGET' },
    { logo: '/assets/brands/company/마이쇼퍼_로고투명.png', name: '마이쇼퍼' },
    { logo: '/assets/brands/company/메리고라운드_오드실크_로고.png', name: '오드실크' },
    { logo: '/assets/brands/company/미미스컴퍼니_Logo.png', name: '미미스컴퍼니' },
    { logo: '/assets/brands/company/채널브릿지_로고.png', name: '채널브릿지' },
    { logo: '/assets/brands/company/그라스마티네_로고.png', name: '그라스마티네' },
    { logo: '/assets/brands/company/깜빡_logo.png', name: '깜빡' },
    { logo: '/assets/brands/company/우아하게_로고.png', name: '우아하게' },
    { logo: '/assets/brands/company/더포춘_픽셀퓨어-로고(말풍선).png', name: '픽셀퓨어' },
    { logo: '/assets/brands/company/웰비즈_로고.png', name: '웰비즈' },
    { logo: '/assets/brands/company/로고PNG_넥스텝_포뉴레브.png', name: '포뉴레브' },
    { logo: '/assets/brands/company/[팔색미인]로고.png', name: '팔색미인' },
    { logo: '/assets/brands/company/BTS-l-STONEHENgE-LOGO.png', name: 'STONEHENGE' },
    { logo: '/assets/brands/company/코리아나_로고.png', name: '코리아나' },
    { logo: '/assets/brands/company/muzmak_logo_01.png', name: 'muzmak' },
    { logo: '/assets/brands/company/olliwello_2.png', name: 'olliwello' },
  ];

  // LA 파트너 두 줄 분배
  const midPoint = Math.ceil(laPartners.length / 2);
  const firstRow = laPartners.slice(0, midPoint);
  const secondRow = [...laPartners.slice(midPoint)].reverse();
  const firstRowDuplicated = [...firstRow, ...firstRow, ...firstRow];
  const secondRowDuplicated = [...secondRow, ...secondRow, ...secondRow];

  // KOLLAB KOREA 두 줄 분배
  const companyMidPoint = Math.ceil(companyLogos.length / 2);
  const companyFirstRow = companyLogos.slice(0, companyMidPoint);
  const companySecondRow = [...companyLogos.slice(companyMidPoint)].reverse();
  const companyFirstRowDuplicated = [...companyFirstRow, ...companyFirstRow, ...companyFirstRow];
  const companySecondRowDuplicated = [...companySecondRow, ...companySecondRow, ...companySecondRow];

  // 실제 트랙 폭(px) 측정 refs
  const firstRowTrackRef = useRef<HTMLDivElement | null>(null);
  const secondRowTrackRef = useRef<HTMLDivElement | null>(null);
  const companyFirstRowTrackRef = useRef<HTMLDivElement | null>(null);
  const companySecondRowTrackRef = useRef<HTMLDivElement | null>(null);

  const [firstCyclePx, setFirstCyclePx] = useState<number>(0);
  const [secondCyclePx, setSecondCyclePx] = useState<number>(0);
  const [companyFirstCyclePx, setCompanyFirstCyclePx] = useState<number>(0);
  const [companySecondCyclePx, setCompanySecondCyclePx] = useState<number>(0);

  // 1사이클(px) 측정: 3번 복제했으므로 scrollWidth / 3
  useEffect(() => {
    const measure = () => {
      if (firstRowTrackRef.current) setFirstCyclePx(firstRowTrackRef.current.scrollWidth / 3);
      if (secondRowTrackRef.current) setSecondCyclePx(secondRowTrackRef.current.scrollWidth / 3);
      if (companyFirstRowTrackRef.current) setCompanyFirstCyclePx(companyFirstRowTrackRef.current.scrollWidth / 3);
      if (companySecondRowTrackRef.current) setCompanySecondCyclePx(companySecondRowTrackRef.current.scrollWidth / 3);
    };

    const t = window.setTimeout(measure, 0);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [firstRowDuplicated.length, secondRowDuplicated.length, companyFirstRowDuplicated.length, companySecondRowDuplicated.length]);
  
  
  return (
    <div className="px-6 max-w-7xl mx-auto pt-12 md:pt-18 pb-24">
      {/* Hero title block (centered text + full-width line aligned to grid edges) */}
      <div className="bg-white text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-left text-3xl md:text-6xl font-bold text-black leading-[0.95] tracking-normal"
        >
          {content.hero.titleLines[0]}<br />{content.hero.titleLines[1]}
        </motion.h2>
        <div className="mt-12 h-px w-full bg-black" />
      </div>

      {/* Hero deck (below the line, centered above the grid) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`mt-12 md:mt-16 mb-8 md:mb-10 text-center text-xl md:text-3xl font-semibold text-black ${
          language === 'ko' ? 'tracking-[0.01em] break-keep' : 'tracking-[0.02em]'
        }`}
      >
        {renderBrandNameBold(content.hero.deck)}
      </motion.p>

      {/* CTA Text - 입점 유도 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 md:mt-16 mb-8 md:mb-12 text-center"
      >
        <p className={`text-base md:text-xl font-semibold text-black/70 leading-relaxed ${language === 'ko' ? 'break-keep' : ''}`}>
          {language === 'ko' 
            ? 'Seoul에서 시작해 LA로, 당신의 브랜드를 글로벌 무대로 연결합니다.'
            : 'From Seoul to LA, connecting your brand to the global stage.'}
        </p>
        <motion.button
          onClick={() => {
            // Track brand application start
            events.brandApplicationStart();
            navigateTo('CONTACT');
          }}
          className="mt-6 px-10 py-3 text-sm font-extrabold tracking-[0.2em] bg-transparent text-black border-2 border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
        >
          {language === 'ko' ? 'APPLY NOW' : 'APPLY NOW'}
        </motion.button>
      </motion.div>

      {/* KOLLAB KOREA partners - 흐르는 로고 마키 */}
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className={`mb-10 md:mb-12 text-center text-xl md:text-3xl font-semibold text-black ${
            language === 'ko' ? 'tracking-[0.01em] break-keep' : 'tracking-[0.02em]'
          }`}
        >
          {renderBrandNameBold(language === 'ko' ? 'KOLLAB KOREA 파트너사' : 'KOLLAB KOREA Partners')}
        </motion.p>

        {/* 첫 번째 줄: 좌 → 우 */}
        <div className="relative overflow-hidden mb-2">
          <motion.div
            className="flex gap-2"
            ref={companyFirstRowTrackRef}
            animate={companyFirstCyclePx > 0 ? { x: [0, -companyFirstCyclePx] } : { x: 0 }}
            transition={{
              x: {
                duration: companyMarqueeDurationSec,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
          >
            {companyFirstRowDuplicated.map((item, index) => (
              <div
                key={`company-row1-${index}`}
                className="flex-shrink-0 w-[120px] h-[120px] md:w-[145px] md:h-[145px] bg-white flex items-center justify-center"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-contain p-5"
                />
              </div>
            ))}
          </motion.div>
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* 두 번째 줄: 우 → 좌 */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-2"
            ref={companySecondRowTrackRef}
            animate={companySecondCyclePx > 0 ? { x: [-companySecondCyclePx, 0] } : { x: 0 }}
            transition={{
              x: {
                duration: companyMarqueeDurationSec,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
          >
            {companySecondRowDuplicated.map((item, index) => (
              <div
                key={`company-row2-${index}`}
                className="flex-shrink-0 w-[120px] h-[120px] md:w-[145px] md:h-[145px] bg-white flex items-center justify-center"
              >
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full object-contain p-5"
                />
              </div>
            ))}
          </motion.div>
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>

      {/* KOLLAB LA partners (with infinite scroll animation) */}
      <div className="mt-24 md:mt-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className={`mb-10 md:mb-12 text-center text-xl md:text-3xl font-semibold text-black ${
            language === 'ko' ? 'tracking-[0.01em] break-keep' : 'tracking-[0.02em]'
          }`}
        >
          {renderBrandNameBold(language === 'ko' ? 'KOLLAB LA 협력사' : content.laPartnersTitle || 'KOLLAB LA Partners')}
        </motion.p>

        {/* 첫 번째 줄: 좌 → 우 */}
        <div 
          className="relative overflow-hidden mb-2"
        >
          <motion.div
            className="flex gap-2"
            ref={firstRowTrackRef}
            animate={firstCyclePx > 0 ? { x: [0, -firstCyclePx] } : { x: 0 }}
            transition={{
              x: {
                duration: marqueeDurationSec,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
          >
            {firstRowDuplicated.map((item, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-[150px] h-[150px] md:w-[180px] md:h-[180px] bg-white flex items-center justify-center"
              >
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            ))}
          </motion.div>
          
          {/* 좌측 그라데이션 */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          
          {/* 우측 그라데이션 */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* 두 번째 줄: 우 → 좌 */}
        <div 
          className="relative overflow-hidden"
        >
          <motion.div
            className="flex gap-2"
            ref={secondRowTrackRef}
            animate={secondCyclePx > 0 ? { x: [-secondCyclePx, 0] } : { x: 0 }}
            transition={{
              x: {
                duration: marqueeDurationSec,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
          >
            {secondRowDuplicated.map((item, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-[150px] h-[150px] md:w-[180px] md:h-[180px] bg-white flex items-center justify-center"
              >
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            ))}
          </motion.div>
          
          {/* 좌측 그라데이션 */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          
          {/* 우측 그라데이션 */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>

    </div>
  );
};

export default Brands;
