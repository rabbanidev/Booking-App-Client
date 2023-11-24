import moment from "moment";

export const dateFormate = (date: string, formate: string) => {
  return moment(date).format(formate);
};
