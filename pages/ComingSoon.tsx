/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

// NewbackRed.png 자체 배경색(#ce161c)과 동일하게 맞춰서
// 이미지 비율이 화면과 다를 때 생기는 레터박스 영역도 이질감 없이 이어지도록 함.
const KESTA_RED = '#ce161c';

const ComingSoon: React.FC = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: KESTA_RED }}
    >
      <img
        src="/assets/NewbackRed.png"
        alt="KESTA — A New Era Begins. The Global Platform for Korean Brands. Coming Soon at www.kesta.kr (Formerly KOLLAB)"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default ComingSoon;
