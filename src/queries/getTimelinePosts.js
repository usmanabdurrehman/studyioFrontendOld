import { service } from "services";

export const getTimelinePosts = async () => {
  const { data } = await service({
    url: "/user/timelinePosts",
  });
  return data;
};
