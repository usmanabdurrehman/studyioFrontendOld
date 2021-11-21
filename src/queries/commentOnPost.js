import { service } from "services";

export const commentOnPost = async (comment, postId) => {
  const { data } = await service({
    method: "post",
    url: "/user/comments",
    data: { comment, postId },
    withCredentials: true,
  });
  return data;
};
