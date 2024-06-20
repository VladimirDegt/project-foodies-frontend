import { clearToken } from "src/store/features/authSlice.js";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const customId = "toastId";

export const rtkQueryCatchError = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const { status, data } = action.payload;
    if (status === 401 && data?.message === "jwt expired") {
      store.dispatch(clearToken());
      toast.error("Session expired, please log in again", {
        toastId: customId,
      });
    }
  }

  return next(action);
};
