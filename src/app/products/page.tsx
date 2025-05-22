"use client";

import { Card, Col, Row, Spin, Tabs } from "antd";
import Image from "next/image";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  fetchListCategories,
  fetchListProducts,
} from "@/features/products/productThunks";
import { truncateLabel } from "../../helps/truncateLabel";
import { setSelectedCategory } from "@/features/products/productSlice";
const { Meta } = Card;

export default function ProductsManagement() {
  const dispatch = useAppDispatch();
  const { products, categories, loading, selectedCategory } =
    useAppSelector((state) => state.products) || [];
  const onChange = (key: string) => {
    console.log(key);
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
  }, [products, categories]);

  if (loading) {
    return <Spin size="large" tip="Đang tải..." fullscreen />;
  }
  return (
    <>
      {!loading && categories.length > 1 && (
        <div className="w-full flex justify-center mt-4">
          <Tabs
            activeKey={selectedCategory}
            onChange={onChange}
            type="card"
            items={[
              {
                label: "All",
                key: "all",
              },
              ...(categories?.map((item) => ({
                label: truncateLabel(item.categoryName),
                key: `${item.categoryId}`,
              })) || []),
            ]}
          />
        </div>
      )}
      <div className="w-full flex justify-center py-4 px-20 md:px-48 lg:px-60">
        <div className="flex w-full flex-wrap">
          {products?.map((item, i) => (
            <div className="md:w-1/4 sm:w-1/2 p-3" key={i}>
              <Card
                hoverable
                className="w-full"
                cover={
                  <div className="relative w-full h-[320px] overflow-hidden">
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
      </div>

      {/* <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 shadow-md rounded-lg border">
          <h2 className="text-center text-xl mb-4">Dashboard 1</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
          </Row>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 shadow-md rounded-lg border">
          <h2 className="text-center text-xl mb-4">Dashboard 1</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
          </Row>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 shadow-md rounded-lg border">
          <h2 className="text-center text-xl mb-4">Dashboard 1</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
          </Row>
        </div>
      </div>

      <div className="flex justify-center items-center h-screen">
        <div className="w-96 p-6 shadow-md rounded-lg border">
          <h2 className="text-center text-xl mb-4">Dashboard 1</h2>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterA} alt="Banner" width={800} height={400} />
            </Col>
            <Col xs={24} sm={12} md={6} lg={6}>
              <Image src={posterB} alt="Banner" width={800} height={400} />
            </Col>
          </Row>
        </div>
      </div> */}
    </>
  );
}
