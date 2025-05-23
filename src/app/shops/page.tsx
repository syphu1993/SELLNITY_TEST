"use client";
import ContentContainer from "@/components/content-container";
import DetailShop from "@/components/detail-shop";
import { fetchListShops } from "@/features/shops/shopThunks";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect } from "react";

export default function OrdersManagement() {
  const dispatch = useAppDispatch();

  const { shops, loading } = useAppSelector((state) => state.shops) || [];

  useEffect(() => {
    dispatch(fetchListShops());
  }, [dispatch]);

  return (
    <ContentContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {shops.map((shop: any, index) => (
          <DetailShop key={index} shop={shop} loading={loading} />
        ))}
      </div>
    </ContentContainer>
  );
}
