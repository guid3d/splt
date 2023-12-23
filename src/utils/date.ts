import "dayjs/locale/en";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";

dayjs.extend(calendar);

const DateToCalendar = ({ date }: { date: number }) => {
  return dayjs(date).calendar();
};

export { DateToCalendar };
