import { Loading } from "@/app/administrador/components/loading";
import React, { Suspense, lazy } from "react";

const Page = () => {
  const InvoiceView = lazy(
    () => import("@/app/administrador/components/invoices-view")
  );
  return (
    <div className="flex w-full justify-center">
      <Suspense fallback={<Loading />}>
        <InvoiceView />
      </Suspense>
    </div>
  );
};

export default Page;
