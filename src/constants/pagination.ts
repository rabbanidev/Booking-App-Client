export const commonSorting = [
  { label: "A-Z", value: "a-z", sortOrder: "asc", sortBy: "createdAt" },
  { label: "Z-A", value: "z-a", sortOrder: "desc", sortBy: "createdAt" },
];

export const serviceSorting = [
  ...commonSorting,
  {
    label: "Price Lowest",
    value: "price lowest",
    sortOrder: "asc",
    sortBy: "price",
  },
  {
    label: "Price Highest",
    value: "price highest",
    sortOrder: "desc",
    sortBy: "price",
  },
];

export const paginationLimits = [
  {
    label: "5/page",
    value: 5,
  },
  {
    label: "10/page",
    value: 10,
  },
  {
    label: "20/page",
    value: 20,
  },
  {
    label: "50/page",
    value: 50,
  },
];
