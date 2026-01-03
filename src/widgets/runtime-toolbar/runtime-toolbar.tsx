import { FC, useMemo } from "react";
import {
  AppBar,
  Button,
  Stack,
  Toolbar,
  TextField,
  MenuItem,
} from "@mui/material";
import {
  useRuntimeControllerGetCurrentRuntimeQuery,
  useSimulationControllerPauseMutation,
  useSimulationControllerStartMutation,
  useSimulationControllerStopMutation,
  Status,
} from "../../shared/api/openapi-generated";
import { RuntimeInfo } from "../../entities/runtime";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { setSelectedSpeed } from "../../app/store/runtimeSlice";

export const RuntimeToolbar: FC = () => {
  const dispatch = useDispatch();
  const selectedSpeed = useSelector(
    (state: RootState) => state.runtimeUi.selectedSpeed
  );

  const { data: runtime } = useRuntimeControllerGetCurrentRuntimeQuery(
    undefined,
    {
      pollingInterval: 200,
    }
  );
  const [startSimulation, { isLoading: isStarting }] =
    useSimulationControllerStartMutation();
  const [pauseSimulation, { isLoading: isPausing }] =
    useSimulationControllerPauseMutation();
  const [stopSimulation, { isLoading: isStopping }] =
    useSimulationControllerStopMutation();

  const isRunning = runtime?.status === Status.Running;
  const isPaused = runtime?.status === Status.Paused;

  const isDisabledAll = useMemo(
    () => isStarting || isPausing || isStopping,
    [isStarting, isPausing, isStopping]
  );

  const handleStart = async () => {
    await startSimulation();
  };

  const handlePause = async () => {
    await pauseSimulation();
  };

  const handleStop = async () => {
    await stopSimulation();
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!Number.isNaN(value)) {
      dispatch(setSelectedSpeed(value));
    }
  };

  const speedOptions = [0.5, 1, 2, 5, 10];

  return (
    <AppBar
      position="static"
      color="default"
      elevation={1}
      sx={{
        mb: 2,
        backgroundColor: "white",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <RuntimeInfo runtime={runtime} />

          <TextField
            select
            size="small"
            label="Speed"
            value={selectedSpeed}
            onChange={handleSpeedChange}
            sx={{ minWidth: 120 }}
          >
            {speedOptions.map((speed) => (
              <MenuItem key={speed} value={speed}>
                x{speed}
              </MenuItem>
            ))}
          </TextField>
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            color="success"
            onClick={handleStart}
            disabled={isDisabledAll || isRunning}
          >
            Start
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={handlePause}
            disabled={isDisabledAll || !isRunning}
          >
            Pause
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleStop}
            disabled={isDisabledAll || (!isRunning && !isPaused)}
          >
            Stop
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
