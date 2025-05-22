"use client";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import {
  FileZipOutlined,
  LogoutOutlined,
  ProductOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu, MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

export default function Header() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const selectedKey = (() => {
    if (pathname.startsWith("/products")) return "product";
    if (pathname.startsWith("/shops")) return "shop";
    if (pathname.startsWith("/orders")) return "order";
    return ""; 
  })();
  const handleHomeClick = () => router.push("/");
  const handleManagementRoute = (route: string) => router.push(route);

  const dropdownMenu = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  const items: MenuItem[] = [
    {
      label: "Products",
      key: "product",
      onClick: () => handleManagementRoute("products"),
      icon: <ProductOutlined />,
    },
    {
      label: "Shops",
      key: "shop",
      onClick: () => handleManagementRoute("shops"),
      icon: <ShopOutlined />,
    },
    {
      label: "Orders",
      key: "order",
      onClick: () => handleManagementRoute("orders"),
      icon: <FileZipOutlined />,
    },
  ];

  return (
    <div className="bg-orange-500 px-6">
      <div className="flex items-center justify-between h-full">
        <div
          className="text-xl font-bold cursor-pointer"
          onClick={handleHomeClick}
        >
          SELLNITY
        </div>
        <Menu
          style={{ backgroundColor: "transparent" }}
          className="w-1/2 bg-transparent"
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
