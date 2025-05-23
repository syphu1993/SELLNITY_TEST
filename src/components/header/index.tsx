"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  FileZipOutlined,
  LogoutOutlined,
  ProductOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import React from "react";
import { ORDERS, PRODUCTS, SHOPS } from "@/constants/constantRoute";

type MenuItem = Required<MenuProps>["items"][number];

const NAV_ITEMS = [
  { key: PRODUCTS, label: "Products", icon: <ProductOutlined /> },
  { key: SHOPS, label: "Shops", icon: <ShopOutlined /> },
  { key: ORDERS, label: "Orders", icon: <FileZipOutlined /> },
];

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey = (() => {
    if (pathname.startsWith(`/${PRODUCTS}`)) return PRODUCTS;
    if (pathname.startsWith(`/${SHOPS}`)) return SHOPS;
    if (pathname.startsWith(`/${ORDERS}`)) return ORDERS;
    return "";
  })();

  const handleManagementRoute = (route: string) => {
    router.push(`/${route}`);
  };

  const dropdownMenu = [
    { key: "profile", label: "Profile", icon: <UserOutlined /> },
    { key: "logout", label: "Logout", icon: <LogoutOutlined /> },
  ];

  const items: MenuItem[] = NAV_ITEMS.map(({ key, label, icon }) => ({
    key,
    onClick: () => handleManagementRoute(key),
    icon: React.cloneElement(icon as React.ReactElement, {
      style: { color: "#000" },
    }),
    label: (
      <span className={`text-black ${selectedKey === key ? "font-bold" : ""}`}>
        {label}
      </span>
    ),
  }));

  return (
    <div className="bg-orange-500 px-6">
      <div className="flex items-center justify-between h-full">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          SELLNITY
        </div>

        <Menu
          style={{ backgroundColor: "transparent" }}
          className="w-3/4"
          mode="horizontal"
          items={items}
          selectedKeys={[selectedKey]}
        />

        <div className="flex gap-2">
          <Dropdown menu={{ items: dropdownMenu }} trigger={["click"]}>
            <Avatar className="cursor-pointer">U</Avatar>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
