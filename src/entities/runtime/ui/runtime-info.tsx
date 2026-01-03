import { FC } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { RuntimeDto, Status } from "../../../shared/api/openapi-generated";

export interface RuntimeInfoProps {
  runtime?: RuntimeDto;
}

const statusColor: Record<
  Status,
  "default" | "success" | "warning" | "error" | "info"
> = {
  [Status.Idle]: "default",
  [Status.Running]: "success",
  [Status.Transitioning]: "info",
  [Status.Paused]: "warning",
  [Status.Completed]: "info",
};

export const RuntimeInfo: FC<RuntimeInfoProps> = ({ runtime }) => {
  const formattedTime = runtime?.currentTime
    ? runtime.currentTime / 1000
    : "--:--:--";

  return (
    <Stack direction="row" spacing={3} alignItems="center">
      <Box>
        <Typography variant="caption" color="text.secondary">
          Simulation time
        </Typography>
        <Typography variant="h6" sx={{ fontVariantNumeric: "tabular-nums" }}>
          {formattedTime}
        </Typography>
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Status{" "}
        </Typography>
        <Chip
          size="small"
          label={runtime ? runtime.status : "UNKNOWN"}
          color={runtime ? statusColor[runtime.status] : "default"}
          sx={{ textTransform: "capitalize", fontWeight: 500 }}
        />
      </Box>

      <Box>
        <Typography variant="caption" color="text.secondary">
          Speed x
        </Typography>
        <Typography variant="body1">{runtime?.speedUpFactor ?? "-"}</Typography>
      </Box>
    </Stack>
  );
};
