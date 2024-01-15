"use client";

import { useEffect, useState } from "react";
import { BarProps, HBarChart } from "./h-bar-chart";
import { Button } from "@nextui-org/react";
import { PDFView } from "./pdf-doc";
interface ChartProductYearContainerProps {
  title: string;
  fetchYearData: (request: { year: number }) => Promise<Record<string, number>>;
  color: BarProps["data"]["datasets"][0]["backgroundColor"];
}

export const ChartProductYearContainer = ({
  title,
  fetchYearData,
  color,
}: {
  fetchYearData: (request: { year: number }) => Promise<any>;
  title: string;
  color: BarProps["data"]["datasets"][0]["backgroundColor"];
}) => {
  const [inputYear, setInputYear] = useState(2024);
  const [yearMonthData, setYearMonthData] = useState({});

  const handleYearMonthData = async (year: number) => {
    const data = await fetchYearData({ year: year });
    if (data) setYearMonthData(data);
  };

  const columns = ["Producto", "Cantidad"];

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      handleYearMonthData(inputYear);
    }

    return () => {
      isMounted = false;
    };
  }, [inputYear]);

  // const downloadPdf = async () => {
  //   const blob = await generatePdf({
  //     year: inputYear,
  //     data: yearMonthData,
  //   });
  //   const link = document.createElement("a");
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = `reporte_${inputYear}.pdf`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <div>
      <div className="flex gap-10">
        <div className="flex  bg-slate-200 max-w-28 text-black rounded-md font-semibold h-10">
          <button
            className="px-2 bg-slate-400 rounded-l-md"
            onClick={() => {
              setInputYear(inputYear - 1);
            }}
          >
            {"<"}
          </button>
          <p className="flex items-center font-semibold px-3">{inputYear}</p>
          <button
            className="px-2 bg-slate-400 font-semibold rounded-r-md"
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
            PDFView(yearMonthData, title, inputYear, columns);
          }}
        >
          Descargar PDF
        </Button>
      </div>

      <HBarChart
        color={color}
        title={`${title} de ${inputYear}`}
        data={yearMonthData}
      />
    </div>
  );
};
