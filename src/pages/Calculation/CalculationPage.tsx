import { FC } from "react";
import { Grid2 } from "@mui/material";
import { CalculationWidget } from "../../widgets/CalculationWidget/CalculationWidget";

export const CalculationPage: FC = () => {
  return (
    <Grid2
      container
      spacing={2}
      sx={{
        height: "100%",
        width: "100%",
      }}
    >
      <Grid2
        size={{ xs: 12, md: 6 }}
        sx={{
          width: "100%",
        }}
      >
        <CalculationWidget />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6 }} sx={{ width: "100%" }}>
        <CalculationWidget />
      </Grid2>
    </Grid2>
  );
};
