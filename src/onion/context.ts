import { LinearScale } from './utils';
import { createContext } from 'react';

export interface ChartCtx {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  xScale: LinearScale;
  yScale: LinearScale;
}

export const ChartContext = createContext<ChartCtx | null>(null);
