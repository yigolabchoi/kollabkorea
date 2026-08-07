
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

  // Kesta 파트너사 company logos
  const companyLogos: BrandPartner[] = [
    { logo: '/assets/brands/kesta-partners/partner--3.png', name: 'Brand -3' },
    { logo: '/assets/brands/kesta-partners/partner--2.png', name: 'Brand -2' },
    { logo: '/assets/brands/kesta-partners/partner--1.png', name: 'Brand -1' },
    { logo: '/assets/brands/kesta-partners/partner-0.png', name: 'Brand 0' },
    { logo: '/assets/brands/kesta-partners/partner-1-엑소코바이오.png', name: '엑소코바이오' },
    { logo: '/assets/brands/kesta-partners/partner-2-믹순.png', name: '믹순' },
    { logo: '/assets/brands/kesta-partners/partner-3-닥터상떼.png', name: '닥터상떼' },
    { logo: '/assets/brands/kesta-partners/partner-4-디웨더.png', name: '디웨더' },
    { logo: '/assets/brands/kesta-partners/partner-5-프레비츠.png', name: '프레비츠' },
    { logo: '/assets/brands/kesta-partners/partner-6-이엘뷰티바이오.png', name: '이엘뷰티바이오' },
    { logo: '/assets/brands/kesta-partners/partner-7-디아더무드.png', name: '디아더무드' },
    { logo: '/assets/brands/kesta-partners/partner-8-라라레서피.png', name: '라라레서피' },
    { logo: '/assets/brands/kesta-partners/partner-8-어때.png', name: '어때' },
    { logo: '/assets/brands/kesta-partners/partner-9-립힙.png', name: '립힙' },
    { logo: '/assets/brands/kesta-partners/partner-10-모에뜨.png', name: '모에뜨' },
    { logo: '/assets/brands/kesta-partners/partner-11-뮤즈마크.png', name: '뮤즈마크' },
    { logo: '/assets/brands/kesta-partners/partner-12-꾹꾹.png', name: '꾹꾹' },
    { logo: '/assets/brands/kesta-partners/partner-13-데일리위시스.png', name: '데일리위시스' },
    { logo: '/assets/brands/kesta-partners/partner-14-메리퓨어.png', name: '메리퓨어' },
    { logo: '/assets/brands/kesta-partners/partner-15-라움.png', name: '라움' },
    { logo: '/assets/brands/kesta-partners/partner-16-메디펫케어.png', name: '메디펫케어' },
    { logo: '/assets/brands/kesta-partners/partner-17-쏘그레인.png', name: '쏘그레인' },
    { logo: '/assets/brands/kesta-partners/partner-19-인요에.png', name: '인요에' },
    { logo: '/assets/brands/kesta-partners/partner-20-아티케.png', name: '아티케' },
    { logo: '/assets/brands/kesta-partners/partner-21-휘페르.png', name: '휘페르' },
    { logo: '/assets/brands/kesta-partners/partner-22.png', name: 'Brand 22' },
    { logo: '/assets/brands/kesta-partners/partner-24.png', name: 'Brand 24' },
    { logo: '/assets/brands/kesta-partners/partner-25.png', name: 'Brand 25' },
    { logo: '/assets/brands/kesta-partners/partner-26.png', name: 'Brand 26' },
    { logo: '/assets/brands/kesta-partners/partner-27.png', name: 'Brand 27' },
    { logo: '/assets/brands/kesta-partners/partner-28.png', name: 'Brand 28' },
    { logo: '/assets/brands/kesta-partners/partner-29.png', name: 'Brand 29' },
    { logo: '/assets/brands/kesta-partners/partner-30.png', name: 'Brand 30' },
    { logo: '/assets/brands/kesta-partners/partner-31.png', name: 'Brand 31' },
    { logo: '/assets/brands/kesta-partners/partner-32.png', name: 'Brand 32' },
    { logo: '/assets/brands/kesta-partners/partner-33.png', name: 'Brand 33' },
    { logo: '/assets/brands/kesta-partners/partner-34.png', name: 'Brand 34' },
    { logo: '/assets/brands/kesta-partners/partner-35.png', name: 'Brand 35' },
    { logo: '/assets/brands/kesta-partners/partner-36.png', name: 'Brand 36' },
    { logo: '/assets/brands/kesta-partners/partner-37.png', name: 'Brand 37' },
    { logo: '/assets/brands/kesta-partners/partner-38.png', name: 'Brand 38' },
    { logo: '/assets/brands/kesta-partners/partner-39.png', name: 'Brand 39' },
    { logo: '/assets/brands/kesta-partners/partner-40.png', name: 'Brand 40' },
    { logo: '/assets/brands/kesta-partners/partner-41.png', name: 'Brand 41' },
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

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
          {companyLogos.map((item, index) => (
            <div
              key={`company-${index}`}
              className="aspect-square bg-white flex items-center justify-center"
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
          {renderBrandNameBold(language === 'ko' ? '공식파트너 KOLLAB LA' : 'Official Partners KOLLAB LA')}
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
          {laPartners.map((item, index) => (
            <div
              key={`la-${index}`}
              className="aspect-square bg-white flex items-center justify-center"
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
