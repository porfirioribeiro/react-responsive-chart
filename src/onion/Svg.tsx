import React, { ReactNode } from 'react';

import { panSvg, panClip } from './pan.module.scss';

type SvgProps = { clip?: boolean; className?: string; children: ReactNode };

export function Svg({ children, className = '', clip }: SvgProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`${panSvg} ${clip ? panClip : ''} ${className}`}
    >
      {children}
    </svg>
  );
}
