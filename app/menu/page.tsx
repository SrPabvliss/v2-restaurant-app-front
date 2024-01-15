"use client";
import Image from "next/image";
import { Suspense, lazy, useEffect, useState, useTransition } from "react";
import { useProductStore } from "../store/productStore";
import { IProductCategory, Product } from "../types/product";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { HomeIcon } from "@heroicons/react/20/solid";
import { ChevronDown } from "./components/icons";
import { CardProduct } from "./components/card-product";

const MenuPage = () => {
  const { productCategories, loadProducts, productsLoaded } = useProductStore();
  const [activeCategory, setActiveCategory] = useState<string>();

  const [isClient, setIsClient] = useState(false);

  const icons = {
    chevron: (
      <ChevronDown
        fill="currentColor"
        size={16}
        height={undefined}
        width={undefined}
      />
    ),
  };

  useEffect(() => {
    setIsClient(true);
    if (!productsLoaded) {
      loadProducts();
      setActiveCategory(productCategories?.[0].name);
    }
    setActiveCategory(productCategories?.[0].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadProducts, productsLoaded]);

  return (
    <div className="menu-page">
      {isClient && productCategories && (
        <>
          <Navbar position="sticky" isBordered className="navbar bg-[#fab052]">
            <NavbarContent className="pr-3" justify="start">
              <NavbarBrand>
                <Button variant="ghost" className="capitalize bg-slate-200">
                  <HomeIcon className="text-amber-950 h-7" />

                  <p className="text-amber-950 capitalize font-bold text-lg">
                    LA JEFECITA
                  </p>
                </Button>
              </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden md:flex" justify="end">
              {productCategories?.map((category) => (
                <NavbarItem
                  className="h-full p-0 m-0 outline-0 space-x-0"
                  key={category.id}
                >
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={
                      "capitalize h-full outline-0 -mx-2 rounded-sm transition " +
                      (activeCategory === category.name
                        ? "active text-slate-50 bg-[#bf5b63]"
                        : "text-amber-900 bg-[#fab052]")
                    }
                    color={undefined}
                  >
                    <p className=" capitalize font-bold text-large p-4">
                      {category.name}
                    </p>
                  </button>
                </NavbarItem>
              ))}
            </NavbarContent>
            <NavbarContent
              className="flex md:hidden align-middle"
              justify="end"
            >
              <Dropdown>
                <NavbarItem className="h-full p-3 m-0 outline-0 space-x-0">
                  <DropdownTrigger className="h-full">
                    <Button
                      className="flex h-full px-3 items-center rounded-md capitalize bg-[#915f1e] text-slate-50 data-[hover=true]:bg-transparent"
                      endContent={icons.chevron}
                    >
                      <p className="capitalize font-bold text-lg">Categorías</p>
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label="Categorías"
                  className="capitalize"
                  itemClasses={{
                    base: "gap-2",
                  }}
                >
                  {productCategories?.map((category) => (
                    <DropdownItem
                      key={category.id}
                      onClick={() => setActiveCategory(category.name)}
                      className={
                        "capitalize h-full transition " +
                        (activeCategory === category.name
                          ? "active text-slate-50 bg-[#bf5b63]"
                          : "text-amber-900 bg-[#fab052]")
                      }
                    >
                      <p className=" capitalize font-bold text-large p-4">
                        {category.name}
                      </p>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </Navbar>
          <div className="menu-content">
            {productCategories?.map((category) => (
              <div
                key={category.name}
                className={`category w-9/12 justify-self-center ${
                  activeCategory === category.name ? "active" : "hidden"
                }`}
              >
                <div
                  className="bg-center h-80 -mt-5 -mx-16 rounded-t-lg "
                  style={{ backgroundImage: `url('/images/hero.jpg')` }}
                ></div>
                <div className="flex -mx-16 top-0 left-0 text-2xl rounded-b-lg font-bold h-16 text-slate-50 justify-center align-middle items-center bg-[#bf5b63] ">
                  <h2>{category.name}</h2>
                </div>
                <div className="product-list">
                  {category.products.map((product) => (
                    <CardProduct product={product} key={product.id} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <style jsx>
        {`
          .navbar {
            display: flex;
            justify-content: space-around;
            margin-bottom: 20px;
          }
          .navbar button {
            cursor: pointer;
            padding: 10px;
            border: none;
          }
          .navbar button.active {
            border-bottom: 2px solid black;
          }
          .menu-content {
            position: relative;
            padding: 20px;
            display: grid;
            gap: 20px;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
          .category {
            top: 0;
            left: 0;
            transition: transform 0.5s ease;
            transform: translateY(100vh);
            visibility: hidden;
          }
          .category.active {
            transform: translateY(0);
            visibility: visible;
          }

          .product-list {
            display: flex;
            justify-content: center;
            padding: 20px;
            flex-wrap: wrap;
            gap: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default MenuPage;
