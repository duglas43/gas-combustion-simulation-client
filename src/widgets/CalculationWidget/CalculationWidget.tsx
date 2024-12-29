import { FC } from "react";
import { Box, Typography } from "@mui/material";
import {
  CalculationForm,
  CalculationFormProps,
} from "../../entities/calculations";

export const CalculationWidget: FC<Omit<CalculationFormProps, "onSubmit">> = (
  calculationFormProps
) => {
  return (
    <Box>
      <CalculationForm
        {...calculationFormProps}
        onSubmit={(values) => {
          console.log({ values });
        }}
      />
    </Box>
  );
};
