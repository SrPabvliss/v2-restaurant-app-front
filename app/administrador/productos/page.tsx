"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
  Chip,
  ChipProps,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  getKeyValue,
  Input,
  Divider,
} from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { useProductStore } from "@/app/store/productStore";
import { updateProduct } from "../../api/useProducts";
import { toast } from "react-toastify";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
};
const COLUMNS = [
  {
    key: "name",
    label: "Nombre",
  },
  {
    key: "price",
    label: "Precio",
  },
  {
    key: "availability",
    label: "Disponible",
  },
  {
    key: "actions",
    label: "Acciones",
  },
];
const ProductsView = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { productCategories, setProducts, loadProducts } = useProductStore();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const filteredProducts = allProducts
    .filter((product) => {
      return product.name.toLowerCase().includes(searchText.toLowerCase());
    })
    .sort((a, b) => a.name.localeCompare(b.name));
  const [isClient, setIsClient] = useState(false);

  const fetchUpdateProduct = async (productId: number) => {
    try {
      await updateProduct(productId);
      toast.success("Producto actualizado con éxito");
      loadProducts();
    } catch (error) {
      toast.error("Ocurrió un error al actualizar el producto");
    }
  };

  const resolveRowComponentByColumnKey = (item: Product, columnKey: Key) => {
    switch (columnKey) {
      case "availability":
        return (
          <TableCell>
            {
              <Chip
                className="capitalize"
                color={statusColorMap[item.availability ? "active" : "paused"]}
                size="sm"
                variant="flat"
              >
                {item.availability ? "Si" : "No"}
              </Chip>
            }
          </TableCell>
        );
      case "actions":
        return (
          <TableCell>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light">...</Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key={item.availability ? "desactivate" : "activate"}
                  className={item.availability ? "text-danger" : "text-success"}
                  color={item.availability ? "danger" : "success"}
                  onClick={() => fetchUpdateProduct(item.id)}
                >
                  {item.availability
                    ? "Marcar como no disponible"
                    : "Marcar como disponible"}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </TableCell>
        );
      default:
        return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
    }
  };

  useEffect(() => {
    setAllProducts([]);

    productCategories?.forEach((category) => {
      if (category.products) {
        setAllProducts((prev) => {
          const newProducts = category.products
            .map((product) => {
              // Agregar el categoryId a cada producto
              return { ...product, categoryId: category.id };
            })
            .filter(
              (product) =>
                !prev.some((prevProduct) => prevProduct.id === product.id)
            );
          return [...prev, ...newProducts];
        });
      }
    });
    setIsClient(true);
  }, [productCategories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      {isClient && (
        <div className="m-6">
          <Divider className="bg-white" />
          <h1 className="text-2xl font-semibold text-white text-center py-4">
            Gestionar Productos
          </h1>
          <Divider className="bg-white mb-8" />
          <Input
            placeholder="Buscar producto"
            value={searchText}
            onChange={handleSearchChange}
            className="my-4"
          />
          <Table
            aria-label="Example table with dynamic content"
            className="max-h-[700px] overflow-y-auto"
          >
            <TableHeader columns={COLUMNS}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody
              emptyContent={"No existen datos sobre productos"}
              isLoading={isFetching}
            >
              {filteredProducts.map((item) => (
                <TableRow key={item.id}>
                  {(columnKey) =>
                    resolveRowComponentByColumnKey(item, columnKey)
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default ProductsView;
