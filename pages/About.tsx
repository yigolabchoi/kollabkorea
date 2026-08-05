/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { aboutContentEn } from '../content/about.en';
import { aboutContentKo } from '../content/about.ko';
import BlindLine from '../components/BlindLine';
import ScrollIndicator from '../components/ScrollIndicator';
import { headerVariants, blindGroupVariants } from '../utils/animations';
import type { NavigationProps } from '../types';

const About: React.FC<NavigationProps> = ({ onNavigate }) => {
  const { language } = useLanguage();
  const content = language === 'en' ? aboutContentEn : aboutContentKo;

  // Scroll progress bar
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  return (
    <div className="bg-white" ref={scrollRef}>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[90] h-0.5 bg-black/10">
        <motion.div className="h-full bg-black origin-left" style={{ scaleX: progressX }} />
      </div>

      {/* Header - About Kesta intro */}
      <header className="bg-white px-6 pt-12 pb-28 md:pt-18 md:pb-40 max-w-5xl mx-auto relative">
        {content.introSection ? (
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 md:mb-20 relative"
          >
            <motion.div variants={blindGroupVariants} className="space-y-8 mt-8 md:mt-12">
              <h3 className="text-sm font-black tracking-[0.3em] uppercase text-kollab-red">
                <BlindLine>{content.introSection.label}</BlindLine>
              </h3>
              <div className="space-y-6">
                {content.introSection.paragraphs.map((p, i) => (
                  <p
                    key={`intro-${i}`}
                    className={`text-xl md:text-3xl font-semibold text-black leading-[1.4] tracking-tight ${
                      language === 'ko' ? 'break-keep' : ''
                    }`}
                  >
                    <BlindLine>{p}</BlindLine>
                  </p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}

        {/* Subtle scroll indicator */}
        <ScrollIndicator className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2" />
      </header>

      {/* Our Vision */}
      {content.visionSection ? (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white py-20 md:py-28 px-6 max-w-5xl mx-auto text-center"
        >
          <h3 className="text-sm font-black tracking-[0.3em] uppercase text-kollab-red mb-6">
            {content.visionSection.label}
          </h3>
          <h2 className="text-3xl md:text-5xl font-black text-black tracking-tight leading-tight mb-8 break-keep">
            {content.visionSection.headline.map((line, i) => (
              <span key={i}>
                {line}
                {i < content.visionSection!.headline.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {content.visionSection.paragraphs.map((p, i) => (
              <p
                key={`vision-${i}`}
                className={`text-base md:text-lg text-black/80 leading-relaxed ${
                  language === 'ko' ? 'break-keep' : ''
                }`}
              >
                {p}
              </p>
            ))}
          </div>
        </motion.section>
      ) : null}

      {/* What We Do */}
      {content.whatWeDo ? (
        <section className="bg-white py-20 md:py-28 px-6 max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-black tracking-[0.3em] uppercase text-kollab-red mb-10 md:mb-14 text-center"
          >
            {content.whatWeDo.label}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {content.whatWeDo.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="border border-black/10 rounded-2xl p-7 md:p-8 hover:border-kollab-red transition-colors duration-300"
              >
                <h4 className="text-base md:text-lg font-black tracking-tight uppercase mb-3">
                  {item.title}
                </h4>
                <p className={`text-sm md:text-base text-black/70 leading-relaxed ${language === 'ko' ? 'break-keep' : ''}`}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Why Kesta */}
      {content.whyKesta ? (
        <section className="bg-white py-20 md:py-28 px-6 max-w-6xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-black tracking-[0.3em] uppercase text-kollab-red mb-10 md:mb-14 text-center"
          >
            {content.whyKesta.label}
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-10 max-w-3xl mx-auto">
            {content.whyKesta.items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start gap-4"
              >
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-kollab-red text-white flex items-center justify-center text-sm font-black">
                  ✔
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-extrabold tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className={`text-sm md:text-base text-black/70 leading-relaxed ${language === 'ko' ? 'break-keep' : ''}`}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      ) : null}

      {/* READY TO GO GLOBAL? (unchanged) */}
      {content.readyBanner ? (
        <section className="relative py-16 md:py-24 min-h-[420px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          <motion.div
            variants={blindGroupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative z-10 text-center text-[#EDEBE4] space-y-8 px-6 max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight">
              {content.readyBanner.title.split('\n').map((line, i) => (
                <BlindLine key={`ready-title-${i}`}>{line}</BlindLine>
              ))}
            </h2>
            <p className={`text-lg md:text-xl font-semibold text-[#EDEBE4]/85 tracking-normal ${language === 'ko' ? 'break-keep' : ''}`}>
              <BlindLine>{content.readyBanner.line}</BlindLine>
            </p>

            {/* APPLY NOW 버튼 - 섹션 내부로 이동 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="pt-4"
            >
              <motion.button
                onClick={() => onNavigate?.('CONTACT')}
                className="px-14 py-6 text-base font-extrabold tracking-[0.22em] bg-white text-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: 'transparent',
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  transition: { duration: 0.3 }
                }}
              >
                {language === 'ko' ? 'APPLY NOW' : 'APPLY NOW'}
              </motion.button>
            </motion.div>
          </motion.div>
        </section>
      ) : null}
    </div>
  );
};

export default About;
