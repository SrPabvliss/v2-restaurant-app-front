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
