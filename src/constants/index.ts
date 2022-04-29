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
  var o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}