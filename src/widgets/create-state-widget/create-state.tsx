import { FC } from "react";
import { Box } from "@mui/material";
import { CreateStateForm, CreateStateFormProps } from "../../entities/state";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  CreateStateDto,
  Status,
  useRuntimeControllerGetCurrentRuntimeQuery,
  useSimulationControllerCreateMutation,
  useSimulationControllerUpdateMutation,
} from "../../shared/api/openapi-generated";

export const CreateStateWidget: FC<Omit<CreateStateFormProps, "onSubmit">> = (
  calculationFormProps
) => {
  const selectedSpeed = useSelector(
    (state: RootState) => state.runtimeUi.selectedSpeed
  );
  const { data: runtime } = useRuntimeControllerGetCurrentRuntimeQuery();
  const [createState] = useSimulationControllerCreateMutation();
  const [updateState] = useSimulationControllerUpdateMutation();
  const handleSubmit = async (values: CreateStateDto) => {
    if (runtime && runtime.status !== Status.Idle) {
      await updateState({
        updateSimulationDto: {
          state: values,
          runtime: { speedUpFactor: selectedSpeed },
        },
      });
      return;
    }
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
