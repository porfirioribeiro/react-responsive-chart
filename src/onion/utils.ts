export type Accessor<T = any> = (d: T, i: number) => number;

export const default_x: Accessor<any> = (d: any, i: number) => d.x;
export const default_y: Accessor<any> = (d: any, i: number) => d.y;

export type ExtentAccessor<T = any> = (d: T, i: number) => number | number[];

export function extent<T>(data: T[], a0: ExtentAccessor<T>): [number[]];
export function extent<T>(data: T[], a0: ExtentAccessor<T>, a1: ExtentAccessor<T>): [number[], number[]]; // prettier-ignore
export function extent<T>(data: T[], a0: ExtentAccessor<T>, a1: ExtentAccessor<T>, a2: ExtentAccessor<T>): [number[], number[],number[]]; // prettier-ignore
export function extent<T>(data: T[], ...accessors: ExtentAccessor<T>[]): number[][] {
  return data.reduce<number[][]>(
    (exts, d, i) =>
      exts.map(([min, max], n) => {
        const value = ([] as number[]).concat(accessors[n](d, i));
        return [Math.min(min, ...value), Math.max(max, ...value)];
      }),
    Array.from(accessors, () => [+Infinity, -Infinity]),
  );
}

export type LinearScale = ((num: number) => number) & { inverse: () => LinearScale };

export function linearScale(domain: [number, number], range: [number, number]): LinearScale {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const m = (r1 - r0) / (d1 - d0);

  return Object.assign((num: number) => r0 + (num - d0) * m, {
    inverse: () => linearScale(range, domain),
  });
}
