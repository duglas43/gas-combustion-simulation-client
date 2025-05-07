import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { FC } from "react";

export const AppLayout: FC = () => {
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Outlet />
    </Box>
  );
};
