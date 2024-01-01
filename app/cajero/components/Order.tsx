import { useOrdersStore } from "@/app/store/orderStore";
import { useTableStore } from "@/app/store/tableWsStore";
import { IMasterOrder, Order as IOrder } from "@/app/types/order";
import { IVisit } from "@/app/types/visit";
import { formatCurrency } from "@/app/utils/formaters";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import {
  Card,
  Divider,
  CardBody,
  CardHeader,
  Modal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const Order = ({ visit }: { visit: IVisit }) => {
  const router = useRouter();
  const { handleEmptyTable } = useTableStore();
  const [isClient, setIsClient] = useState(false);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useMemo(() => {
    let total = 0;

    visit.masterOrders?.forEach((masterOrder: IMasterOrder) => {
      masterOrder?.orders?.forEach((order: IOrder) => {
        total += order.quantity * order.product.price;
      });
    });

    setTotal(total);
  }, [visit]);

  const handleEndVisit = (visitId: number) => {
    handleEmptyTable(visitId);
    toast.info("Cobro iniciado", {
      position: "top-center",
      autoClose: 2000,
    });
    router.push(`/cajero/${visitId}`);
  };

  if (!isClient) {
    return <div></div>;
  }

  return (
    <div className="w-full ">
      {isClient && (
        <div>
          <Popover placement="right">
            <PopoverTrigger>
              <Card
                className="border-none bg-background/90 dark:bg-default-100/50"
                key={visit.id}
                isPressable
              >
                <CardHeader className="pt-4 pl-4 bg-amber-500 bg-opacity-80">
                  <p className="font-bold text-xl">Visita #{visit.id}</p>
                </CardHeader>
                <Divider />
                <CardBody>
                  <div className="flex">
                    <div className="flex-1 flex flex-col p-4">
                      <p className="pb-3">
                        <span className="font-semibold">
                          Total de la orden: {""}
                        </span>
                        <span className="font-semibold text-lg bg-purple-200">
                          {formatCurrency(total)}
                        </span>
                      </p>
                      <p>
                        <span className="font-semibold">Mesa no</span>{" "}
                        {visit.table.id}
                      </p>
                    </div>
                    <div className=" flex justify-end items-center w-1/6">
                      <ChevronRightIcon className="w-6 h-6 text-slate-400" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2 flex flex-col justify-center items-center ">
                <div className="text-medium font-bold">Iniciar cobro?</div>
                <div className="text-small">
                  No se podrán generar
                  <br />
                  más ordenes.
                </div>
                <Button
                  className="mt-2 self-center"
                  color="primary"
                  onClick={() => handleEndVisit(visit.id)}
                >
                  Continuar
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};

export default Order;
