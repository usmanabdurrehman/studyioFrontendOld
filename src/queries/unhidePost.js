import { service } from "services";

export const unhidePost = async (postId) => {
  const { data } = await service({
    url: "/user/unhidePost",
    method: "put",
    data: { postId },
  });
  return data;
};
