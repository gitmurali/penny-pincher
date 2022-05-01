export const pieOptions = {
  plugins: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Total expenses",
    },
  },
};

export const barOptions = {
  plugins: {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Total expenses by Month",
    },
  },
};

export const labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function random_rgba() {
  return `rgb(${[1, 2, 3].map((x) => (Math.random() * 256) | 0)})`;
}