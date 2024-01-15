"use client";

import { Loading } from "@/app/administrador/components/loading";
import { completePayByCard } from "@/app/api/useInvoices";
import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const invoiceId = useParams().invoiceId;
  const [isPaid, setIsPaid] = useState(false);
  const router = useRouter();

  const handleCompletePay = async () => {
    completePayByCard(+invoiceId).then((res) => {
      if (res) {
        setIsPaid(true);
        router.push("/cajero");
      } else {
        router.push("/cajero");
      }
    });
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      setTimeout(() => {
        handleCompletePay();
      }, 1800);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (isPaid) {
        toast.success("Pago realizado con éxito");
      }
    }

    return () => {
      isMounted = false;
    };
  }, [isPaid]);

  return (
    <div className="flex w-full min-h-screen justify-center items-center backdrop-blur-sm">
      <div className="w-3/12">
        <Card className="py-4">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">VISITA</p>
            <small className="text-default-500">{invoiceId}</small>
            <h3 className="font-bold text-2xl self-center">
              El pago se está procesando
            </h3>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <Loading />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Page;
