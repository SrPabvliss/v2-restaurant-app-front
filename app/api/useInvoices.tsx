import { PAYMENT_METHOD_ENUM } from "../administrador/constants/payment-methods";
import { IInvoice } from "../types/invoice";
import { formatDate } from "../utils/formaters";

export const fetchGetTotalByYear = async (year: { year: number }) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/get-total-by-year`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(year),
      }
    );

    if (!response.ok) {
      console.log("Error al obtener los totales.");
      return;
    }
    const data = await response.json();
    const totals: { [key: number]: number } = data;

    if (!totals) {
      console.log("No se cargaron los totales");
      return;
    }

    return totals;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetTotalByYearMonth = async (request: {
  year: number;
  month: number;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/get-total-by-month`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      console.log("Error al obtener los totales.");
      return;
    }
    const data = await response.json();
    const totals: { [key: number]: number } = data;

    if (!totals) {
      console.log("No se cargaron los totales");
      return;
    }

    return totals;
  } catch (error) {
    console.log(error);
  }
};

export const handlePayment = async (request: {
  visitId: number;
  paymentMethod: PAYMENT_METHOD_ENUM;
  employeeId: string;
  customerId: string;
}) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/pay`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      console.log("Error al realizar el pago.");
      return;
    }
    const data = await response.json();

    if (!data) {
      console.log("No se realizo el pago");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const completePayByCard = async (invoiceId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices/complete-pay-by-card?invoiceId=${invoiceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al completar el pago.");
      return;
    }
    const data = await response.json();

    if (!data) {
      console.log("No se completó el pago");
      return;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchGetAllInvoices = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/invoices`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("Error al obtener las facturas.");
      return;
    }
    const data = await response.json();

    if (!data) {
      console.log("No se cargaron las facturas");
      return;
    }

    const res = (data as IInvoice[]).map((invoice) => {
      return {
        ...invoice,
        date: formatDate(invoice.visit.exit),
        customerId: invoice.customer.id,
        employeeId: invoice.employee.id,
      };
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
