import { FC, useMemo } from "react";
import { Box, Grid2, Paper, Typography } from "@mui/material";
import {
  useObservationsControllerFindQuery,
  useRuntimeControllerGetCurrentRuntimeQuery,
} from "../../shared/api/openapi-generated";
import { EfficiencyChart } from "../../entities/observations";
import Plot from "react-plotly.js";

export const ChartsWidget: FC = () => {
  const { data: runtime } = useRuntimeControllerGetCurrentRuntimeQuery();
  const now = runtime?.currentTime ?? 0;
  const from = 0;

  const { data, isLoading, isError } = useObservationsControllerFindQuery(
    {
      from,
      to: now,
    },
    {
      pollingInterval: 5000,
    }
  );

  const currentEfficiency = data?.current?.efficiency ?? null;

  const gaugeData = useMemo(() => {
    if (currentEfficiency == null) {
      return [];
    }

    return [
      {
        type: "indicator" as const,
        mode: "gauge+number",
        value: currentEfficiency,
        title: { text: "Current efficiency, %" },
        gauge: {
          axis: { range: [0, 100] },
          bar: { color: "#ff5722" },
          steps: [
            { range: [0, 80], color: "#ffebee" },
            { range: [80, 90], color: "#fff3e0" },
            { range: [90, 100], color: "#e8f5e9" },
          ],
          threshold: {
            line: { color: "#ff5722", width: 4 },
            thickness: 0.85,
            value: currentEfficiency,
          },
        },
        number: {
          suffix: "%",
        },
      },
    ];
  }, [currentEfficiency]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Grid2 container spacing={2} sx={{ flex: 1 }}>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              height: 300,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6">Current efficiency</Typography>
            <Box sx={{ flex: 1, minHeight: 250 }}>
              {currentEfficiency == null ? (
                <Typography variant="body2" color="text.secondary">
                  No data
                </Typography>
              ) : (
                <Plot
                  data={gaugeData}
                  layout={{
                    autosize: true,
                    margin: { l: 20, r: 20, t: 40, b: 20 },
                    paper_bgcolor: "rgba(0,0,0,0)",
                    plot_bgcolor: "rgba(0,0,0,0)",
                  }}
                  style={{ width: "100%", height: "100%" }}
                  config={{ displayModeBar: false, responsive: true }}
                />
              )}
            </Box>
          </Paper>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6 }}>
          <Paper
            elevation={1}
            sx={{
              p: 2,
              display: "flex",
              height: 300,
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6">Efficiency dynamics</Typography>
            <Box sx={{ flex: 1, height: 100 }}>
              {isLoading && <Typography variant="body2">Loading...</Typography>}
              {isError && (
                <Typography variant="body2" color="error">
                  Failed to load observations
                </Typography>
              )}
              {!isLoading && !isError && <EfficiencyChart data={data} />}
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
};
