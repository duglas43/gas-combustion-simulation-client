import { isRejectedWithValue } from "@reduxjs/toolkit";
import { enqueueSnackbar } from "notistack";

export const errorThunkMiddleware =
  (store: any) => (next: any) => (action: any) => {
    if (!isRejectedWithValue(action)) {
      return next(action);
    }
    console.log(action);
    if (action.payload?.message) {
      enqueueSnackbar(action.payload.message, {
        variant: "warning",
      });
    }
    return next(action);
  };
