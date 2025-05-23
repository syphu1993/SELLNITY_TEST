"use client";

import React from "react";
import { Avatar, Badge, Card } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { Shop } from "@/types/shop";

type ShopCardProps = {
  shop: Shop;
  loading: boolean;
};

const DetailShop: React.FC<ShopCardProps> = ({ shop, loading }) => {
  return (
    <Card
      loading={loading}
      className="rounded-2xl shadow-md p-4 hover:shadow-lg transition-all"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar size={40}>{shop?.name?.charAt(0) ?? "?"}</Avatar>
          <div>
            <h2 className="text-xl font-semibold">{shop.name}</h2>
            <Badge className="bg-blue-100 text-blue-700">{shop.platform}</Badge>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>
            Số đơn hàng: <span className="font-medium">{shop.orders}</span>
          </p>
          <p>
            Sản phẩm đã đồng bộ:{" "}
            <span className="font-medium">{shop.products}</span>
          </p>
          <p className="flex items-center gap-1">
            Trạng thái kết nối:
            {shop.connected ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <CloseCircleTwoTone twoToneColor="#ff4d4f" />
            )}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DetailShop;
