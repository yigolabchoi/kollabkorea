
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { brandsContentEn } from '../content/brands.en';
import { brandsContentKo } from '../content/brands.ko';
import { highlightBrandName } from '../utils/text';
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

const Brands: React.FC<BrandsProps> = () => {
  const { language } = useLanguage();
  const content = language === 'ko' ? brandsContentKo : brandsContentEn;

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
    { logo: '/assets/brands/company/(1).png', name: 'Brand 1' },
    { logo: '/assets/brands/company/(2).png', name: 'Brand 2' },
    { logo: '/assets/brands/company/(3).png', name: 'Brand 3' },
    { logo: '/assets/brands/company/(4).png', name: 'Brand 4' },
    { logo: '/assets/brands/company/(5).png', name: 'Brand 5' },
    { logo: '/assets/brands/company/(6).png', name: 'Brand 6' },
    { logo: '/assets/brands/company/(7).png', name: 'Brand 7' },
    { logo: '/assets/brands/company/(8).png', name: 'Brand 8' },
    { logo: '/assets/brands/company/(9).png', name: 'Brand 9' },
    { logo: '/assets/brands/company/(10).png', name: 'Brand 10' },
    { logo: '/assets/brands/company/(11).png', name: 'Brand 11' },
    { logo: '/assets/brands/company/(12).png', name: 'Brand 12' },
    { logo: '/assets/brands/company/(13).png', name: 'Brand 13' },
    { logo: '/assets/brands/company/(14).png', name: 'Brand 14' },
    { logo: '/assets/brands/company/(15).png', name: 'Brand 15' },
    { logo: '/assets/brands/company/(16).png', name: 'Brand 16' },
    { logo: '/assets/brands/company/(17).png', name: 'Brand 17' },
  ];

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

      {/* KESTA partners - 고정 로고 그리드 */}
      <div className="mt-16 md:mt-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className={`mb-10 md:mb-12 text-center text-xl md:text-3xl font-semibold text-black ${
            language === 'ko' ? 'tracking-[0.01em] break-keep' : 'tracking-[0.02em]'
          }`}
        >
          {renderBrandNameBold(language === 'ko' ? 'Kesta 파트너사' : 'Kesta Partners')}
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {companyLogos.map((item, index) => (
            <div
              key={`company-${index}`}
              className="flex-shrink-0 w-[68px] h-[68px] sm:w-[82px] sm:h-[82px] md:w-[96px] md:h-[96px] bg-white flex items-center justify-center"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="w-full h-full object-contain p-3"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* KESTA 공식 파트너 - 고정 로고 그리드 */}
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
          {renderBrandNameBold(language === 'ko' ? 'Kesta 공식 파트너' : 'Kesta Official Partners')}
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {laPartners.map((item, index) => (
            <div
              key={`la-${index}`}
              className="flex-shrink-0 w-[62px] h-[62px] sm:w-[74px] sm:h-[74px] md:w-[88px] md:h-[88px] bg-white flex items-center justify-center"
            >
              <img
                src={item.logo}
                alt={item.name}
                className="w-full h-full object-contain p-2.5"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
