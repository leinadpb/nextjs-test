import { KpiType } from "@prisma/client";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

export const formatDate = (date: string | Date, short: boolean = false) => {
  return new Date(date ?? "").toLocaleDateString(
    "en-US",
    !short
      ? {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      : { year: "numeric", month: "numeric", day: "numeric" }
  );
};

export const parseValueBaseOnType = (value: string, type: KpiType): string => {
  switch (type) {
    case "TEXT":
      return value;
    case "CURRENCY":
      return formatter.format(Number(value));
    case "MB":
      return `${value}mb`;
    case "GB":
      return `${value}gb`;
    case "DATE":
      return formatDate(value);
    case "NUMBER":
      return Number(value).toLocaleString("en-US", {
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    default:
      return value;
  }
};
