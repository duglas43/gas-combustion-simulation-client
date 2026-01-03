import { FC } from "react";
import { Box } from "@mui/material";
import { CreateStateForm, CreateStateFormProps } from "../../entities/state";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  CreateStateDto,
  useSimulationControllerCreateMutation,
} from "../../shared/api/openapi-generated";

export const CreateStateWidget: FC<Omit<CreateStateFormProps, "onSubmit">> = (
  calculationFormProps
) => {
  const selectedSpeed = useSelector(
    (state: RootState) => state.runtimeUi.selectedSpeed
  );
  const [createState] = useSimulationControllerCreateMutation();
  const handleSubmit = async (values: CreateStateDto) => {
    await createState({
      createSimulationDto: {
        state: values,
        runtime: {
          speedUpFactor: selectedSpeed,
        },
      },
    });
  };
  return (
    <Box>
      <CreateStateForm {...calculationFormProps} onSubmit={handleSubmit} />
    </Box>
  );
};
