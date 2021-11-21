import { service } from "services";

export const seeNotifications = async () => {
  const { data } = await service({
    url: "/user/seeNotifications",
  });
  return data;
};
