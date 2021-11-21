import { service } from "services";

export const likePost = async (postId) => {
  const { data } = await service({
    method: "post",
    url: "/user/likes",
    data: { postId },
    withCredentials: true,
  });
  return data;
};
