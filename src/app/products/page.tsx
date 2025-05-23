"use client";

import { Card, Col, Input, Row, Spin, Tabs } from "antd";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  fetchListCategories,
  fetchListProducts,
} from "@/features/products/productThunks";
import { truncateLabel } from "../../helps/truncateLabel";
import { setSelectedCategory, setSelectedOpenKey } from "@/features/products/productSlice";
import MenuCategory from "@/components/menu-categories";
import { createMenuCategories } from "@/helps/createMenu";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import React, { ReactNode } from 'react';
import { selectIsLoading } from "@/hooks/productSelectors";
import { DatePicker, Space } from 'antd';
import ProductList from "@/components/products-list";
import CategoryTabs from "@/components/tab-categories";

const { Search } = Input;
const { Meta } = Card;


const { RangePicker } = DatePicker;
export const iconMap: Record<string, ReactNode> = {
  sub1: <MailOutlined />,
  sub2: <AppstoreOutlined />,
  sub4: <SettingOutlined />,
};
export default function ProductsManagement() {
  const dispatch = useAppDispatch();

  const { products, categories, selectedCategory, loadingCategories } =
    useAppSelector((state) => state.products) || [];

  const isLoading = useAppSelector(selectIsLoading);

  const onChange = (key: string) => {
    dispatch(setSelectedOpenKey(key))
    dispatch(setSelectedCategory(key));
    dispatch(fetchListProducts(key));
  };


  useEffect(() => {
    dispatch(fetchListCategories());
    dispatch(fetchListProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("producs", products);
    console.log("categories", categories);
    const x = createMenuCategories(categories, iconMap);
    console.log('xxxxxxxxxx', x);

  }, [products, categories]);

  return (
    <>
      <div className="w-full flex flex-col px-20 md:px-32 lg:px-48">
        <div className="w-full min-h[40] flex justify-center mt-4">
          {
           <CategoryTabs onChange={onChange} loading={loadingCategories} selectedCategory={selectedCategory} categories={categories} />
          }
        </div>
        <div className="w-full flex">
          <div className="w-1/4 p-3">
            <MenuCategory
              items={createMenuCategories(categories, iconMap)}
              selectedId={selectedCategory} onSelect={(key) => {
                dispatch(setSelectedCategory(key));
                dispatch(fetchListProducts(key));
              }} />
          </div>
          <div className={`w-3/4 relative min-h-screen flex flex-col ${isLoading ? "items-center justify-center" : ""
            }`}>

            {isLoading ? (
              <Spin />
            ) : (
              <>
                <div className="p-3 flex w-full gap-4">
                  <Search placeholder="input search text" enterButton="Search" size="large" loading={isLoading} />
                  <RangePicker />
                </div>
                <div className="flex w-full flex-wrap items-start">
                  <ProductList products={products} />
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
