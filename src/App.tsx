import * as React from 'react';
import { Svg, SvgLine, Chart, Accessor, extent, default_x, default_y, ChartContext } from './onion';
import './styles.css';

const points = [
  { x: 0, y: 0, n: 5 },
  { x: 1, y: 1, n: 9 },
  { x: 2, y: -1, n: -10 },
  { x: 3, y: 9, n: 9 },
  { x: 4, y: 16, n: 6 },
  { x: 5, y: 25, n: 5 },
  { x: 6, y: 36, n: 3 },
  { x: 7, y: 49, n: 19 },
  { x: 8, y: 64, n: 44 },
  { x: 9, y: 81, n: 8 },
  { x: 10, y: 12, n: 10 },
  { x: 20, y: 10, n: 19 },
];

const b = points.reduce(
  (acc, d) => ({
    x1: Math.min(acc.x1, d.x),
    x2: Math.max(acc.x1, d.x),
    y1: Math.min(acc.y1, d.y, d.n),
    y2: Math.max(acc.y2, d.y, d.n),
  }),
  {
    x1: +Infinity,
    x2: -Infinity,
    y1: +Infinity,
    y2: -Infinity,
  },
);

const nAcess: Accessor = d => d.n;
const [xExtent, yxtent, zextent] = extent(points, default_x, default_y, nAcess);
console.log(xExtent, yxtent, zextent);
console.log(extent(points, default_x, d => [d.n, d.y]));

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <div style={{ height: '200px', margin: '10px' }}>
        <Chart {...b}>
          <Svg>
            <SvgLine data={points} className="data" fill="none" stroke="red" />
            <SvgLine data={points} yAcessor={nAcess} className="data" fill="none" stroke="blue" />
          </Svg>
          <EventRects data={points} />
        </Chart>
      </div>
    </div>
  );
}

interface EventRectsProps<T> {
  data: T[];
}
function EventRects<T>({ data }: EventRectsProps<T>) {
  const { xScale, yScale } = React.useContext(ChartContext)!;
  const margin = 15;
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', display: 'flex' }}>
      {data.map((d, i, arr) => {
        const y = yScale(default_y(d, i));
        const currX = xScale(default_x(d, i));
        const prevX = i > 0 ? xScale(default_x(arr[i - 1], i - 1)) : 0;
        const nextX = i < arr.length - 1 ? xScale(default_x(arr[i + 1], i + 1)) : 100;
        //console.log(prevX, currX, nextX, nextX - currX, nextX - prevX);

        //const width = 100 / (arr.length - 1);
        const width = (currX - prevX) / 2 + (nextX - currX) / 2;
        const mar = i === 0 || i === arr.length - 1 ? margin : 0;

        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                textAlign: 'center',
                left: `calc(${currX}% - 5px)`,
                top: `calc(${y}% - 5px)`,
                width: '10px',
                height: '10px',
                backgroundColor: 'red',
                borderRadius: '100%',
              }}
            />
            <div
              style={{
                marginTop: `${-margin}px`,
                marginBottom: `${-margin}px`,
                marginLeft: i > 0 ? 0 : `-${margin}px`,
                marginRight: i < arr.length - 1 ? 0 : `-${margin}px`,
                width: `calc(${width}% + ${mar}px)`,
                backgroundColor: `rgba(${Math.random() * 255},${Math.random() *
                  255},${Math.random() * 255})`,
                opacity: 0.1,
              }}
              onMouseEnter={() => console.log(i)}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
