import { FC, useMemo } from "react";
import Plot from "react-plotly.js";
import type { Data, Layout } from "plotly.js";
import { ObservationsListDto } from "../../../shared/api/openapi-generated";

export interface LineChartProps {
  data?: ObservationsListDto;
  fieldName:
    | "efficiency"
    | "furnaceExitTemperature"
    | "firstConvectivePackageExitTemperature"
    | "secondConvectivePackageExitTemperature"
    | "economizerExitTemperature"
    | "flueGasTemperature"
    | "fuelConsumption"
    | "totalLosses";
  title: string;
  yAxisTitle: string;
}

export const LineChart: FC<LineChartProps> = ({
  data,
  fieldName,
  title,
  yAxisTitle,
}) => {
  const {
    historicalTimes,
    historicalValues,
    forecastTimes,
    forecastValues,
    currentPoint,
  } = useMemo(() => {
    const historicalTimes =
      data?.historical.map((o) => o.timestamp / 1000) ?? [];
    const historicalValues =
      data?.historical.map((o) => o[fieldName] as number) ?? [];

    const forecastTimes = data?.forecast.map((o) => o.timestamp / 1000) ?? [];
    const forecastValues =
      data?.forecast.map((o) => o[fieldName] as number) ?? [];

    const current = data?.current;
    const currentPoint = current
      ? {
          x: [current.timestamp / 1000],
          y: [current[fieldName] as number],
        }
      : undefined;

    return {
      historicalTimes,
      historicalValues,
      forecastTimes,
      forecastValues,
      currentPoint,
    };
  }, [data, fieldName]);

  const plotData: Data[] = [
    {
      x: historicalTimes,
      y: historicalValues,
      type: "scatter",
      mode: "lines",
      name: "Historical",
      line: {
        color: "#1976d2",
        width: 2,
      },
    },
    {
      x: forecastTimes,
      y: forecastValues,
      type: "scatter",
      mode: "lines",
      name: "Forecast",
      line: {
        color: "#9c27b0",
        width: 2,
        dash: "dash",
      },
    },
  ];

  if (currentPoint) {
    plotData.push({
      x: currentPoint.x,
      y: currentPoint.y,
      type: "scatter",
      mode: "markers",
      name: "Current",
      marker: {
        color: "#ff5722",
        size: 10,
        symbol: "diamond",
        line: { color: "#ffffff", width: 2 },
      },
    });
  }

  const layout: Partial<Layout> = {
    title: { text: title },
    autosize: true,
    margin: { l: 70, r: 10, t: 40, b: 70 },
    paper_bgcolor: "rgba(0,0,0,0)",
    plot_bgcolor: "rgba(0,0,0,0)",
    xaxis: {
      title: { text: "Time" },
      showgrid: true,
      zeroline: false,
    },
    yaxis: {
      title: { text: yAxisTitle },
      showgrid: true,
      zeroline: false,
    },
    legend: {
      visible: false,
    } as any,
  };

  return (
    <Plot
      data={plotData}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
      config={{ displayModeBar: false, responsive: true }}
    />
  );
};
