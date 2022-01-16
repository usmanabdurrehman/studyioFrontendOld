import React, { useEffect, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useToasts } from 'react-toast-notifications';

const AlertProvider = memo(({ children }) => {
  const alert = useSelector((state) => state.alert);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  useEffect(() => {
    alert.showAlert
      && alert.alertInfo
      && addToast(alert.alertInfo.msg, {
        appearance: alert.alertInfo.type,
        autoDismiss: true,
        onDismiss: () => dispatch({ type: 'HIDE_ALERT' }),
      });
  }, [addToast, dispatch, alert]);
  return <div>{children}</div>;
});

export default AlertProvider;
