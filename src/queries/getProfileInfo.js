import { service } from "services";

export const getProfileInfo = async (id) => {
  const { data } = await service({
    url: `/user/profile/${id}`,
  });
  return data;
};
