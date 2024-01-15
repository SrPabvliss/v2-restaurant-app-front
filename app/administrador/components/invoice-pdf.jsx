"use client";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { formatCurrency } from "@/app/utils/formaters";

export const InvoicePdf = (data) => {
  const doc = new jsPDF();

  const orders = data.visit.masterOrders[0].orders;

  const products = orders.map((order) => {
    return [
      order.product.name,
      formatCurrency(order.product.price),
      order.quantity,
      formatCurrency(order.product.price * order.quantity),
    ];
  });

  doc.setFontSize(25);
  doc.text(`Factura #${data.id}`, 25, 25);
  doc.setFontSize(16);
  doc.text(`Fecha: ${data.date}`, 35, 35);
  doc.text(
    `Cliente: ${data.customer.firstName} ${
      data.customer.secondName ? data.customer.secondName : ""
    } ${data.customer.firstLastName} ${
      data.customer.secondLastName ? data.customer.secondLastName : ""
    }`,
    35,
    45
  );
  doc.text(`Cedula: ${data.customer.id}`, 35, 55);
  doc.text(`Dirección: ${data.customer.address}`, 35, 65);
  doc.text(`Teléfono: ${data.customer.phoneNumber}`, 35, 75);
  doc.text(`Email: ${data.customer.email}`, 35, 85);

  doc.autoTable({
    startY: 100,
    startX: 35,
    head: [["Producto", "Precio", "Cantidad", "Total"]],
    body: products,
    foot: [["Total", "", "", formatCurrency(data.total)]],
  });
  doc.save(`INVOICE_${data.id}_${data.customer.id}.pdf`);
};
