"use client";

import { setListSynchronous } from "@/features/products/productSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Card } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";

const { Meta } = Card;

interface ProductListProps {
  products: any[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const dispatch = useAppDispatch();
  const { listSynchronous, isSync } =
    useAppSelector((state) => state.products) || [];

  const handleCheckboxChange = (checked: boolean, item: any) => {
    if (checked) {
      dispatch(setListSynchronous(item.productId));
    }
  };
  useEffect(() => {
  }, [listSynchronous]);
  return (
    <div className="flex w-full flex-wrap">
      {products?.map((item, i) => (
        <div className="md:w-1/4 sm:w-1/2 p-3 relative" key={i}>
          {isSync && (
            <input
              type="checkbox"
              className="absolute top-6 right-6 z-10 w-5 h-5 accent-orange-500"
              onChange={(e) => handleCheckboxChange(e.target.checked, item)}
            />
          )}
          <Card
            hoverable
            className="w-full"
            cover={
              <div className="relative w-full sm:h-[240px] h-[300px] overflow-hidden">
                <Image
                  src={item.productImages[0].imageUrl}
                  alt="Banner"
                  fill
                  className="object-cover"
                />
              </div>
            }
          >
            <Meta title={item.productNameEn} description={item.productsku} />
            <p>Price: {item.variants[0].price.sellPrice}$</p>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
