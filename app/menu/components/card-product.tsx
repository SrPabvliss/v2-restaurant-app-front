import { Product } from "@/app/types/product";
import Image from "next/image";
import { formatCurrency } from "../../utils/formaters";

export const CardProduct = ({ product }: { product: Product }) => (
  <div
    key={product.id}
    className="border-2 p-8 bg-amber-500 bg-opacity-55 rounded-md text-white fill-current hover:bg-amber-600 hover:bg-opacity-75 transition cursor-pointer flex flex-col justify-between w-[265px] h-[380px]"
  >
    <div className="flex w-[200px] h-[200px]">
      <Image
        src={`/images/products/${product.id}.jpg`}
        alt={product.name}
        width={200}
        height={200}
        objectFit="cover"
        className="rounded-md shadow-md"
      />
    </div>
    <div>
      <h3 className="w-full text-center font-bold text-2xl py-3">
        {product.name}
      </h3>
      <p className="flex font-semibold text-start justify-start">
        Precio: {formatCurrency(product.price)}
      </p>
    </div>
  </div>
);
