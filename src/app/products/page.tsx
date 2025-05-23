"use client";

import { Button, Input, Select, Spin } from "antd";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  fetchListCategories,
  fetchListProducts,
} from "@/features/products/productThunks";
import {
  setIsSync,
  setSelectedCategory,
  setSelectedOpenKey,
} from "@/features/products/productSlice";
import MenuCategory from "@/components/menu-categories";
import { createMenuCategories } from "@/helps/createMenu";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import React, { ReactNode } from "react";
import { selectIsLoading } from "@/hooks/productSelectors";
import { DatePicker } from "antd";
import ProductList from "@/components/products-list";
import CategoryTabs from "@/components/tab-categories";
import { RequestSearch } from "@/types/requestSearch";
import { ALL } from "@/constants/constantRoute";
import dayjs from "dayjs";
import ContentContainer from "@/components/content-container";

const { RangePicker } = DatePicker;
export const iconMap: Record<string, ReactNode> = {
  sub1: <MailOutlined />,
  sub2: <AppstoreOutlined />,
  sub4: <SettingOutlined />,
};
export default function ProductsManagement() {
  const dispatch = useAppDispatch();

  const { products, categories, selectedCategory, loadingCategories, isSync } =
    useAppSelector((state) => state.products) || [];

  const isLoading = useAppSelector(selectIsLoading);

  const [searchName, setSearchName] = useState("");
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null]
  >([null, null]);

  const onChange = (key: string) => {
    dispatch(setSelectedOpenKey(key));
    dispatch(setSelectedCategory(key));
    resetParams();
    const params: RequestSearch | undefined =
      key === ALL ? undefined : { categoryId: key };
    dispatch(fetchListProducts(params));
  };

  useEffect(() => {
    dispatch(fetchListCategories());
    dispatch(fetchListProducts());
  }, [dispatch]);

  const handleSearch = () => {
    const [start, end] = dateRange ? dateRange : [];
    dispatch(
      fetchListProducts({
        categoryId: selectedCategory === ALL ? undefined : selectedCategory,
        name: searchName,
        startDate: start ? start.format("YYYY-MM-DD") : undefined,
        endDate: end ? end.format("YYYY-MM-DD") : undefined,
      })
    );
  };

  const resetParams = (): void => {
    setSearchName("");
    setDateRange([null, null]);
  };

  const handleSyncProduct = () => {
    dispatch(setIsSync(!isSync));
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <ContentContainer>
      <div className="w-full min-h[40] flex justify-center mt-4">
        <CategoryTabs
          onChange={onChange}
          loading={loadingCategories}
          selectedCategory={selectedCategory}
          categories={categories}
        />
      </div>
      <div className="w-full flex">
        <div className="w-1/4 p-3">
          <MenuCategory
            items={createMenuCategories(categories, iconMap)}
            selectedId={selectedCategory}
            onSelectParent={resetParams}
            onSelect={(key) => {
              resetParams();
              dispatch(setSelectedCategory(key));
              dispatch(fetchListProducts({ categoryId: key } as RequestSearch));
            }}
          />
        </div>
        <div
          className={`w-3/4 relative min-h-screen flex flex-col ${
            isLoading ? "items-center justify-center" : ""
          }`}
        >
          {isLoading ? (
            <Spin />
          ) : (
            <>
              <div className="p-3 flex w-full gap-4">
                <Input
                  placeholder="Name product"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <RangePicker
                  value={dateRange}
                  onChange={(dates) =>
                    setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
                  }
                />
                <Button type="primary" onClick={handleSearch}>
                  Search
                </Button>
              </div>

              <div className="p-3 flex flex-row w-full gap-4">
                <Button
                  className="w-[120px]"
                  onClick={handleSyncProduct}
                  color={`${isSync ? "primary" : "default"}`}
                  variant="outlined"
                >
                  {isSync ? "Off Sync" : "Sync Products"}
                </Button>
                {isSync && (
                  <Select
                    defaultValue="lucy"
                    style={{ width: 120 }}
                    onChange={handleChange}
                    options={[
                      { value: "jack", label: "Jack" },
                      { value: "lucy", label: "Lucy" },
                      { value: "Yiminghe", label: "yiminghe" },
                      { value: "disabled", label: "Disabled", disabled: true },
                    ]}
                  />
                )}
                {isSync && (
                  <Button type="primary" onClick={handleSearch}>
                    Submit
                  </Button>
                )}
              </div>

              <div className="flex w-full flex-wrap items-start">
                <ProductList products={products} />
              </div>
            </>
          )}
        </div>
      </div>
    </ContentContainer>
  );
}
