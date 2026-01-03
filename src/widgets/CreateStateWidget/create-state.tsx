import { FC } from "react";
import { Box } from "@mui/material";
import { CreateStateForm, CreateStateFormProps } from "../../entities/state";

export const CreateStateWidget: FC<Omit<CreateStateFormProps, "onSubmit">> = (
  calculationFormProps
) => {
  return (
    <Box>
      <CreateStateForm
        {...calculationFormProps}
        onSubmit={(values) => {
          console.log({ values });
        }}
      />
    </Box>
  );
};
