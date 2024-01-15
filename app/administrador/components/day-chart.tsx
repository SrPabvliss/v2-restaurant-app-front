import type { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import { months } from "../constants/months";

export interface LineProps {
  options: ChartOptions<"line">;
  data: ChartData<"line">;
}

export const DayChart = ({
  data,
  color,
  title,
}: {
  data: object;
  color: LineProps["data"]["datasets"][0]["backgroundColor"];
  title: string;
}) => {
  const options: LineProps["options"] = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 28,
          },
          color: "white",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
          font: {
            size: 18,
            weight: "bold",
          },
        },
        grid: {
          color: "gray",
          lineWidth: 1,
        },
      },
      x: {
        ticks: {
          color: "white",
          font: {
            size: 18,
            weight: "bold",
          },
        },
        grid: {
          color: "gray",
          lineWidth: 1,
        },
      },
    },
  };

  const datas: LineProps["data"] = {
    labels: Object.keys(data),
    datasets: [
      {
        fill: true,
        label: title,
        data: Object.values(data),
        borderColor: "white",
        backgroundColor: color,
      },
    ],
  };
  return (
    <div className="w-full h-full">
      <Line data={datas} options={options} />
    </div>
  );
};
