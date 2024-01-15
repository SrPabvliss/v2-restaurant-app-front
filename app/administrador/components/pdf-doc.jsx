"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";

export const PDFView = (data, title, year, columns) => {
  const doc = new jsPDF();

  doc.setFontSize(35);
  doc.text(`${title}`, 35, 25);
  doc.setFontSize(20);
  doc.text(`${year}`, 90, 35);
  doc.autoTable({
    startY: 50,
    head: [columns],
    body: Object.entries(data),
  });
  doc.save(`${title}_${year}.pdf`);
};
