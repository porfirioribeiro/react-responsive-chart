import React, { ReactNode, useMemo } from 'react';

import { panChart, panClip } from './pan.module.scss';
import { linearScale } from './utils';
import { ChartContext, ChartCtx } from './context';

type ChartProps = {
  clip?: boolean;
  className?: string;
  children: ReactNode;
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
};

export function Chart({
  children,
  className = '',
  clip,
  x1 = 0,
  y1 = 0,
  x2 = 1,
  y2 = 1,
}: ChartProps) {
  const scales = useMemo(() => getScales(x1, y1, x2, y2), [x1, y1, x2, y2]);

  const handleMousemove: React.MouseEventHandler = e => {
    const bcr = e.currentTarget.getBoundingClientRect();
    const left = e.clientX - bcr.left;
    const top = e.clientY - bcr.top;
    const x = scales.xScale((100 * left) / (bcr.right - bcr.left));
    const y = scales.yScale((100 * top) / (bcr.bottom - bcr.top));
    //console.log({ x, y });
  };

  return (
    <ChartContext.Provider value={scales}>
      <div
        className={`${panChart} ${clip ? panClip : ''} ${className}`}
        onMouseMove={handleMousemove}
      >
        {children}
      </div>
    </ChartContext.Provider>
  );
}

function getScales(x1: number, y1: number, x2: number, y2: number): ChartCtx {
  const xScale = linearScale([x1, x2], [0, 100]);
  const yScale = linearScale([y1, y2], [100, 0]);
  return { x1, y1, x2, y2, xScale, yScale };
}
