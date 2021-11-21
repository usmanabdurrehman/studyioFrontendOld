import { service } from "services";

export const unlikePost = async (postId) => {
  const { data } = await service({
    method: "delete",
    url: "/user/likes",
    data: { postId },
    withCredentials: true,
  });
  return data;
};
