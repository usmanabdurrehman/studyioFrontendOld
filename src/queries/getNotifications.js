import { service } from "services";

export const getNotifications = async () => {
  const { data } = await service({
    url: "/user/notifications",
  });
  return data;
};
