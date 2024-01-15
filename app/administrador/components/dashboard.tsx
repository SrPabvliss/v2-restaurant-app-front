"use client";

import {
  fetchGetTotalByYear,
  fetchGetTotalByYearMonth,
} from "@/app/api/useInvoices";
import { ChartYearContainer } from "./chart-year-container";
import { ChartYearMonthContainer } from "./chart-month-container";
import {
  fetchGetProductsByYear,
  fetchGetProductsByYearAndMonth,
} from "@/app/api/useProducts";
import { fetchVisitsByYear, fetchVisitsByYearMonth } from "@/app/api/useVisits";
import { ChartProductContainer } from "./chart-product-container";
import { ChartProductYearContainer } from "./chart-product-year-container";

export const AdminDahsboard = () => {
  return (
    <div className="flex flex-col place-items-center min-h-screen w-full text-white">
      <p className="text-4xl font-semibold pb-3">Dahsboard</p>
      <div className="grid grid-cols-2 gap-4 w-full min-h-full">
        <ChartYearContainer
          fetchYearData={fetchGetTotalByYear}
          title="Ingresos"
          color={"rgba(97, 181, 45, 0.6)"}
        />
        <ChartYearMonthContainer
          fetchYearMonthData={fetchGetTotalByYearMonth}
          title="Ingresos"
          color={"rgba(170, 237, 107, 0.6)"}
        />
        <ChartProductYearContainer
          fetchYearData={fetchGetProductsByYear}
          title="Productos vendidos"
          color={"rgba(56, 98, 171, 0.6)"}
        />
        <ChartProductContainer
          fetchYearMonthData={fetchGetProductsByYearAndMonth}
          title="Productos vendidos"
          color={"rgba(59, 124, 237, 0.6)"}
        />
        <ChartYearContainer
          fetchYearData={fetchVisitsByYear}
          title="Visitas"
          color={"rgba(245, 200, 66, 0.6)"}
        />
        <ChartYearMonthContainer
          fetchYearMonthData={fetchVisitsByYearMonth}
          title="Visitas"
          color={"rgba(230, 193, 85, 0.6)"}
        />
      </div>
    </div>
  );
};
