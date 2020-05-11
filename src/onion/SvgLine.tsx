import React, { useContext, useMemo } from 'react';
import { Accessor, default_x, default_y } from './utils';
import { ChartContext } from './context';

type SvgLineProps = { data: any[]; xAccessor?: Accessor; yAcessor?: Accessor } & React.SVGProps<
  SVGPathElement
>;

export function SvgLine({
  data,
  xAccessor = default_x,
  yAcessor = default_y,
  ...props
}: SvgLineProps) {
  const { xScale, yScale } = useContext(ChartContext)!;

  let d = useMemo(
    () =>
      'M' + data.map((d, i) => `${xScale(xAccessor(d, i))},${yScale(yAcessor(d, i))}`).join('L'),
    [xAccessor, yAcessor, data, xScale, yScale],
  );

  return <path d={d} {...props} />;
}
