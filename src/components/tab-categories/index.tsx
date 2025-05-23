"use client";

import { Tabs, Skeleton } from "antd";
import { truncateLabel } from "@/helps/truncateLabel";

interface CategoryTabsProps {
    categories: { categoryId: string | number; categoryName: string }[];
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
    if (loading) {
        return (
            <div className="w-full flex justify-center mt-4 px-4">
                <div className="w-full">
                    <Skeleton.Input
                        active
                        size="large"
                        block
                        style={{ height: 40 }}
                    />
                </div>
            </div>
        );
    }

    const items = [
        {
            label: "All",
            key: "all",
        },
        ...categories.map((item) => ({
            label: truncateLabel(item.categoryName),
            key: `${item.categoryId}`,
        })),
    ];

    return (
        <div className="w-full flex justify-center mt-4 px-4">
            <Tabs activeKey={selectedCategory} onChange={onChange} type="card" items={items[0].key === 'all' && items.length === 1 ? [] : items} />
        </div>
    );
}
