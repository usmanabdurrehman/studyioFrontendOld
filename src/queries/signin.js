import { service } from "services";

export const signin = async (fields) => {
  const { data } = await service({
    url: "/signin",
    method: "post",
    data: fields,
  });
  return data;
};
