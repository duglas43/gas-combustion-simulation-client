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
        <iframe
          src={
            "http://localhost:3000/embed/dashboard/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZSI6eyJkYXNoYm9hcmQiOjJ9LCJwYXJhbXMiOnt9LCJleHAiOjE3MzYyMjY5MDYsImlhdCI6MTczNjIyNjMwNX0.4reM4R6YWf59AqwfrVtUDknEuuYJ4tL-rtVD2Pk50fY#bordered=true&titled=true"
          }
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </Grid2>
    </Grid2>
  );
};
