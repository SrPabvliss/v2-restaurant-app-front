"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  ChipProps,
  Button,
  getKeyValue,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { fetchGetAllInvoices } from "@/app/api/useInvoices";
import { IInvoice } from "@/app/types/invoice";
import { InvoicePdf } from "@/app/administrador/components/invoice-pdf";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
};
const COLUMNS = [
  {
    key: "id",
    label: "Número",
  },
  {
    key: "total",
    label: "Total",
  },
  {
    key: "state",
    label: "Estado",
  },
  {
    key: "paymentMethod",
    label: "Método de pago",
  },
  {
    key: "date",
    label: "Fecha",
  },
  {
    key: "employeeId",
    label: "Ced. Empleado",
  },
  {
    key: "customerId",
    label: "Ced. Cliente",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];
const InvoiceView = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [invoices, setInvoices] = useState<IInvoice[] | undefined>([]);

  const resolveRowComponentByColumnKey = (item: IInvoice, columnKey: Key) => {
    switch (columnKey) {
      case "state":
        return (
          <TableCell>
            {
              <Chip
                className="capitalize"
                color={
                  statusColorMap[
                    item.state === "CANCELADO" ? "active" : "paused"
                  ]
                }
                size="sm"
                variant="flat"
              >
                {item.state}
              </Chip>
            }
          </TableCell>
        );
      case "actions":
        return (
          <TableCell>
            <Button
              variant="shadow"
              color="primary"
              onClick={() => {
                InvoicePdf(item);
              }}
            >
              Descargar pdf
            </Button>
          </TableCell>
        );
      default:
        return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchingInvoices = async () => {
      if (!isMounted) return;
      setIsFetching(true);
      const result = await fetchGetAllInvoices();

      if (result) {
        setInvoices(result);
        setIsFetching(false);
      }
    };

    fetchingInvoices();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <div className="m-6">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={COLUMNS}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No existen facturas para mostrar"}
            isLoading={isFetching}
          >
            {invoices!.map((item) => (
              <TableRow key={item.id}>
                {(columnKey) => resolveRowComponentByColumnKey(item, columnKey)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceView;
