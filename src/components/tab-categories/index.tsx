"use client";

import { Tabs, Skeleton } from "antd";
import { truncateLabel } from "@/helps/truncateLabel";
import { ALL } from "@/constants/constantRoute";
import { Category } from "@/types/category";

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onChange: (key: string) => void;
  loading: boolean;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onChange,
  loading,
}: CategoryTabsProps) {
  const items = [
    {
      label: "All",
      key: ALL,
    },
    ...categories
      .filter((item) => !!item.categoryId && !!item.categoryName)
      .map((item) => ({
        label: truncateLabel(item.categoryName),
        key: `${item.categoryId}`,
      })),
  ];
  if (loading) {
    return (
      <div className="w-full flex justify-start mt-4 ">
        <div className="w-full">
          <Skeleton.Input active size="large" block style={{ height: 40 }} />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-start mt-4 px-3">
      <Tabs
        activeKey={selectedCategory}
        onChange={onChange}
        type="card"
        items={items[0].key === ALL && items?.length === 1 ? [] : items}
      />
    </div>
  );
}
