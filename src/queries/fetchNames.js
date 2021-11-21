import { service } from "services";

export const fetchNames = async (name) => {
  const { data } = await service({
    url: "/user/fetchNames",
    method: "post",
    data: { name },
  });
  return data;
};
