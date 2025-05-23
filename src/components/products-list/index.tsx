"use client";

import { Card } from "antd";
import Image from "next/image";
import React from "react";

const { Meta } = Card;

interface ProductListProps {
  products: any[]; 
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="flex w-full flex-wrap">
      {products?.map((item, i) => (
        <div className="md:w-1/4 sm:w-1/2 p-3" key={i}>
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
            <Meta
              title={item.productNameEn}
              description={item.productsku}
            />
            <p>Price: {item.variants[0].price.sellPrice}$</p>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
