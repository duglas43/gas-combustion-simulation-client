import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { FC } from "react";
import { RuntimeToolbar } from "../runtime-toolbar";

export const AppLayout: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <RuntimeToolbar />
      <Box
        sx={{
          flex: 1,
          p: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
