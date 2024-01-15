"use client";

import { Bar } from "react-chartjs-2";

import { useEffect, useState } from "react";
import { DayChart } from "./day-chart";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { months } from "../constants/months";
import { BarProps, HBarChart } from "./h-bar-chart";
import { PDFView } from "./pdf-doc";

export const ChartProductContainer = ({
  title,
  fetchYearMonthData,
  color,
}: {
  fetchYearMonthData: (request: {
    year: number;
    month: number;
  }) => Promise<any>;
  title: string;
  color: BarProps["data"]["datasets"][0]["backgroundColor"];
}) => {
  const [inputYear, setInputYear] = useState(2024);
  const [inputMonth, setInputMonth] = useState(1);
  const [yearMonthData, setYearMonthData] = useState({});
  const columns = ["Producto", "Cantidad"];

  const handleYearMonthData = async (year: number, month: number) => {
    const data = await fetchYearMonthData({ year: year, month: month });
    if (data) setYearMonthData(data);
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      handleYearMonthData(inputYear, inputMonth);
    }

    return () => {
      isMounted = false;
    };
  }, [inputYear, inputMonth]);

  return (
    <div>
      <div className="flex space-x-6">
        <div className="flex bg-slate-200 max-w-28 text-black rounded-md font-semibold">
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
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="text-white bg-amber-500 bg-opacity-60"
            >
              {months[inputMonth - 1]}
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            {months.map((month, index) => (
              <DropdownItem
                key={index}
                onClick={() => {
                  setInputMonth(index + 1);
                }}
              >
                {month}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Button
          className="bg-slate-400"
          onClick={() => {
            PDFView(
              yearMonthData,
              title + " " + months[inputMonth - 1],
              inputYear,
              columns
            );
          }}
        >
          {" "}
          Descargar PDF
        </Button>
      </div>

      <HBarChart
        color={color}
        title={`${title} de ${months[inputMonth]} de ${inputYear}`}
        data={yearMonthData}
      />
    </div>
  );
};
