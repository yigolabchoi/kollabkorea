/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ImageSliderProps {
  triggerMarkerRef?: React.Ref<HTMLDivElement>;
}

/**
 * ImageSlider Component
 * 좌에서 우로 자동으로 흐르는 이미지 슬라이드
 * LA 팝업 이미지를 무한 반복 표시
 * 모바일: portrait, PC: landscape
 */

const KR_POPUP_IMAGES = [
  '/assets/photos/kr-popup/optimized/WHK06093_re2.jpg',
  '/assets/photos/kr-popup/optimized/WHK06122_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06128_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06131_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06159_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06186_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06467_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06486_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06507_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06520_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06542_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06612_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06627_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06631_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06675_re.jpg',
  '/assets/photos/kr-popup/optimized/WHK06685_re.jpg',
];

const ImageSlider: React.FC<ImageSliderProps> = ({ triggerMarkerRef }) => {
  // 모바일도 데스크탑과 동일하게 landscape 슬라이드를 사용
  const images = useMemo(() => KR_POPUP_IMAGES, []);
  
  // 이미지를 20번 복제하여 검정 배경이 절대 안 보이도록 완벽한 무한 루프
  const duplicatedImages = useMemo(() => Array(20).fill(images).flat(), [images]);
  const targetX = useMemo(() => `-${100 * images.length}%`, [images.length]);

  return (
    <section 
      className="w-full overflow-hidden py-0 md:py-0 bg-transparent"
    >
      <div className="relative h-[35.7vh] md:h-[40.95vh] bg-transparent">
        {/* Background transition marker aligned to the slider 25% position */}
        <div
          ref={triggerMarkerRef}
          aria-hidden
          className="absolute inset-x-0 top-0 h-px w-full pointer-events-none"
        />

        {/* 슬라이드 컨테이너 */}
        <motion.div
          className="flex absolute left-0 top-0 h-full gap-4 bg-transparent"
          animate={{
            x: [0, targetX],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 2200,
              ease: 'linear',
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={`slide-${index}`}
              className="flex-shrink-0 h-full px-2 bg-transparent"
            >
              <img
                src={src}
                alt={`KOLLAB KR popup moment ${(index % images.length) + 1}`}
                className="w-auto h-full rounded-2xl object-cover bg-transparent"
                loading={index < 6 ? 'eager' : 'lazy'}
                decoding="async"
                fetchPriority={index < 2 ? 'high' : 'auto'}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const MemoizedImageSlider = memo(ImageSlider);
MemoizedImageSlider.displayName = 'ImageSlider';
export default MemoizedImageSlider;

