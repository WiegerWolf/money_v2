// src/components/UplotChart.tsx
import UplotReact from 'uplot-react';
import { Options } from 'uplot';
import 'uplot/dist/uPlot.min.css';

interface UplotChartProps {
  data: [number[], number[]]; // Assuming two series: x-axis (time) and y-axis data
}

export function UplotChart({ data }: UplotChartProps) {
  const options: Options = {
    width: 600,
    height: 200,
    series: [
      {},
      {
        stroke: "steelblue",
        fill: "rgba(0,0,255,0.1)",
      }
    ],
  };

  return <UplotReact options={options} data={data} />;
}