import { service } from "services";

export const getUnseenNotificationsCount = async () => {
  const { data } = await service({
    url: `/user/getUnseenNotificationsCount`,
  });
  return data;
};
