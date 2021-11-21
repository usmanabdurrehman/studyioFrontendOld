import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useToasts } from "react-toast-notifications";

export default function AlertProvider({ children }) {
  const alert = useSelector((state) => state.alert);
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  useEffect(() => {
    alert.showAlert &&
      alert.text &&
      addToast(alert.text, {
        appearance: "error",
        autoDismiss: true,
        onDismiss: () => dispatch({ type: "HIDE_ALERT" }),
      });
  }, [alert]);
  return <div>{children}</div>;
}
