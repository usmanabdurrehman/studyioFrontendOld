import { service } from "services";

export const logout = async () => {
  const { data } = await service({
    url: "/user/logout",
  });
  return data;
};
