import { FC, useMemo } from "react";
import Plot from "react-plotly.js";
import { ObservationsListDto } from "../../../shared/api/openapi-generated";

export interface EfficiencyChartProps {
  data?: ObservationsListDto;
}

export const EfficiencyChart: FC<EfficiencyChartProps> = ({ data }) => {
  const {
    historicalTimes,
    historicalEfficiency,
    forecastTimes,
    forecastEfficiency,
    currentPoint,
  } = useMemo(() => {
    const historicalTimes = data?.historical.map((o) => o.timestamp) ?? [];
    const historicalEfficiency =
      data?.historical.map((o) => o.efficiency) ?? [];

    const forecastTimes = data?.forecast.map((o) => o.timestamp) ?? [];
    const forecastEfficiency = data?.forecast.map((o) => o.efficiency) ?? [];

    const currentPoint = data?.current
      ? {
          x: [data.current.timestamp],
          y: [data.current.efficiency],
        }
      : undefined;

    return {
      historicalTimes,
      historicalEfficiency,
      forecastTimes,
      forecastEfficiency,
      currentPoint,
    };
  }, [data]);

  return (
    <Plot
      data={[
        {
          x: historicalTimes,
          y: historicalEfficiency,
          type: "scatter",
          mode: "lines",
          line: {
            color: "#1976d2",
            width: 2,
          },
        },
        {
          x: forecastTimes,
          y: forecastEfficiency,
          type: "scatter",
          mode: "lines",
          line: {
            color: "#9c27b0",
            width: 2,
            dash: "dash",
          },
        },
        ...(currentPoint
          ? [
              {
                x: currentPoint.x,
                y: currentPoint.y,
                type: "scatter",
                mode: "markers",
                marker: {
                  color: "#ff5722",
                  size: 10,
                  symbol: "diamond",
                  line: { color: "#ffffff", width: 2 },
                },
              },
            ]
          : []),
      ]}
      layout={{
        autosize: true,
        margin: { l: 50, r: 10, t: 40, b: 40 },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        legend: {
          visible: false,
        },
        xaxis: {
          title: "Time",
          showgrid: true,
          zeroline: false,
        },
        yaxis: {
          title: "Efficiency",
          showgrid: true,
          zeroline: false,
        },
      }}
      style={{ width: "100%", height: "100%" }}
      config={{ displayModeBar: false, responsive: true }}
    />
  );
};
