"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { months } from "../constants/months";

export const genMonthPdf = (data, title, year, columns) => {
  const preparedData = Object.entries(data).map(([key, value]) => {
    return [months[key], value];
  });

  const doc = new jsPDF();

  doc.setFontSize(40);
  doc.text(`${title}`, 35, 25);
  doc.setFontSize(20);
  doc.text(`${year}`, 90, 35);
  doc.autoTable({
    startY: 50,
    head: [columns],
    body: preparedData,
  });
  doc.save(`${title}_${year}.pdf`);
};
