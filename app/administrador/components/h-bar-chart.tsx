import type { ChartData, ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";

export interface BarProps {
  options: ChartOptions<"bar">;
  data: ChartData<"bar">;
}

export const HBarChart = ({
  data,
  color,
  title,
}: {
  data: object;
  color: BarProps["data"]["datasets"][0]["backgroundColor"];
  title: string;
}) => {
  const options: BarProps["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y" as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
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

  const datas: BarProps["data"] = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data),
        borderColor: "white",
        backgroundColor: color,
      },
    ],
  };
  return (
    <div className="w-full" style={{ minHeight: "1200px" }}>
      <Bar options={options} data={datas} />
    </div>
  );
};
