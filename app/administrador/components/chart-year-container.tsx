"use client";

import { useEffect, useState } from "react";
import { MonthChart } from "./month-chart";
import { LineProps } from "./day-chart";
import { genMonthPdf } from "./months-pdf-doc";
import { Button } from "@nextui-org/react";

export const ChartYearContainer = ({
  title,
  fetchYearData,
  color,
}: {
  fetchYearData: (year: { year: number }) => Promise<any>;
  title: string;
  color: LineProps["data"]["datasets"][0]["backgroundColor"];
}) => {
  const [inputYear, setInputYear] = useState(2024);
  const [yearData, setYearData] = useState({});
  const columns = ["Mes", "Cantidad"];

  const handleYearData = async (year: number) => {
    const data = await fetchYearData({ year: year });
    if (data) setYearData(data);

    console.log(data);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      handleYearData(inputYear);
    }

    return () => {
      isMounted = false;
    };
  }, [inputYear]);

  return (
    <div>
      <div className="flex gap-10">
        <div className="flex bg-slate-200 max-w-28 text-black rounded-md font-semibold h-10">
          <button
            className=" px-2 bg-slate-400 rounded-l-md"
            onClick={() => {
              setInputYear(inputYear - 1);
            }}
          >
            {"<"}
          </button>
          <p className="flex font-semibold px-3 items-center">{inputYear}</p>
          <button
            className=" px-2 bg-slate-400 font-semibold rounded-r-md"
            onClick={() => {
              setInputYear(inputYear + 1);
            }}
          >
            {">"}
          </button>
        </div>
        <Button
          className="bg-slate-400"
          onClick={() => {
            genMonthPdf(yearData, title, inputYear, columns);
          }}
        >
          Descargar PDF
        </Button>
      </div>

      <MonthChart
        color={color}
        title={title + " de " + inputYear}
        data={yearData}
      />
    </div>
  );
};
