export const getDate = (obj) => {
  var date_in_milliseconds = obj;
  var human_readable_date = new Date(0);
  human_readable_date.setUTCMilliseconds(date_in_milliseconds);

  const ace = human_readable_date.toString().split(" ");

  return {
    day: ace[2],
    month: ace[1],
    year: ace[3],
  };
};
