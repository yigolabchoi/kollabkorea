/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

interface Project {
  id: string;
  title: string;
  category: string;
  dateKo: string;
  dateEn: string;
  status?: string;
  images: { src: string; alt: string }[];
}

const PROJECTS: Project[] = [
  {
    id: 'hyundai-seoul',
    title: 'THE HYUNDAI SEOUL',
    category: 'Beauty Pop-up',
    dateKo: '2026.08.11 - 2026.08.23',
    dateEn: '2026.08.11 - 2026.08.23',
    images: [
      { src: '/assets/photos/projects/hyundai-seoul-1.jpeg', alt: 'THE HYUNDAI SEOUL pop-up rendering' },
      { src: '/assets/photos/projects/hyundai-seoul-2.jpeg', alt: 'THE HYUNDAI SEOUL grand open poster' },
      { src: '/assets/photos/projects/hyundai-seoul-3.jpeg', alt: 'THE HYUNDAI SEOUL brand lineup' }
    ]
  },
  {
    id: 'gimpo',
    title: 'HYUNDAI PREMIUM OUTLET',
    category: 'K-LAND Campaign',
    dateKo: '2026.09.10 - 2026.09.22',
    dateEn: '2026.09.10 - 2026.09.22',
    status: 'COMING SOON',
    images: [
      { src: '/assets/photos/projects/gimpo-1.jpeg', alt: 'Hyundai Premium Outlet Kesta storefront' },
      { src: '/assets/photos/projects/gimpo-2.jpeg', alt: 'Hyundai Premium Outlet Gimpo courtyard' }
    ]
  },
  {
    id: 'seongsu',
    title: 'SEONGSU KOLLAB POP-UP',
    category: 'Brand Experience',
    dateKo: '2026.03.13 - 2026.06.09',
    dateEn: '2026.03.13 - 2026.06.09',
    images: [
      { src: '/assets/photos/projects/seongsu-1.jpeg', alt: 'Seongsu KOLLAB pop-up storefront' },
      { src: '/assets/photos/projects/seongsu-2.jpeg', alt: 'Seongsu KOLLAB pop-up interior' },
      { src: '/assets/photos/projects/seongsu-3.jpeg', alt: 'Seongsu KOLLAB scoop event' }
    ]
  }
];

const Space: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="bg-white px-6 max-w-7xl mx-auto pt-12 md:pt-18 pb-24">
      {/* Page title block (matches Brands page pattern) */}
      <div className="bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-left text-3xl md:text-6xl font-bold text-black leading-[0.95] tracking-normal"
        >
          THE<br />PROJECTS
        </motion.h2>
        <div className="mt-12 h-px w-full bg-black" />
      </div>

      {/* Project entries */}
      <div className="mt-20 md:mt-28 space-y-24 md:space-y-32">
        {PROJECTS.map((project, idx) => (
          <motion.section
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Image gallery */}
            <div
              className={`grid gap-2 ${
                project.images.length === 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'
              }`}
            >
              {project.images.map((image, i) => (
                <div
                  key={image.src}
                  className={`relative overflow-hidden bg-zinc-100 aspect-[4/5] ${
                    project.images.length === 3 && i === 0 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>

            {/* Caption block */}
            <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
              <div>
                <h3 className="text-2xl md:text-4xl font-black text-black tracking-tight uppercase">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm md:text-base font-semibold text-kollab-red uppercase tracking-[0.1em]">
                  {project.category}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm md:text-base font-semibold text-black/60 tracking-wide">
                  {language === 'ko' ? project.dateKo : project.dateEn}
                </span>
                {project.status && (
                  <span className="px-3 py-1 text-xs font-black uppercase tracking-[0.15em] bg-kollab-red text-white">
                    {project.status}
                  </span>
                )}
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default Space;
