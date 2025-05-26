"use client";
import ContentContainer from "@/components/content-container";
import { Button, Drawer, Input, Popconfirm, Select, Tag } from "antd";
import { Table } from "antd/lib";

import { DeleteFilled, SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useLoading } from "@/context/LoadingContext";
import { ColumnType } from "rc-table";
import { Order, OrderDetail, OrderStatus, Payment, Product } from "@/types/product";

const imgs = [
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT08tub39TK6o9-ouwBt9-FgrHa-F0HU17fhQ&s",
  "https://product.hstatic.net/1000369857/product/quan_short_ni__xam_nhat_3_296b12717c9d4fd49219422cc6449048.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqXqj0fIXSSBUMKrnRazAJWJvRC3jplah2Q&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsZY1DJ0_iNu2ePKwdLsH83mNx4p-0S9uMFw&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgUHPpSOWW_9aGTHbOvEawPIPio9fFVt0w7w&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuXMgABX5bMR90krwMYTMwARJ9FutFx1w5bg&s",
  "https://product.hstatic.net/200000863757/product/z5863095660113_5a62aab16d240c39a11a1b72ffd0f126_5f97ff7009144767850c962d56add4e0.jpg",
];

declare global {
  interface Array<T> {
    getRandomValue(): T;
  }
}

Array.prototype.getRandomValue = function <T>(): T {
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
};

const getRandomProduct = (): Product => ({
  productName: "Trà Sữa Truyền Thống",
  price: 35000,
  img: imgs.getRandomValue(),
  category: { categoryId: "1", categoryName: "Áo" },
  unit: "ly",
  discount: 0,
  description: "Trà sữa vị truyền thống thơm ngon",
  productCod: "TS001",
});

const getOrderStatusColor = (status: string): string => {
  switch (status) {
    case OrderStatus.CREATED:
      return "default";
    case OrderStatus.PENDING_PAYMENT:
      return "orange";
    case OrderStatus.PAID:
      return "green";
    case OrderStatus.PROCESSING:
      return "blue";
    case OrderStatus.SHIPPING:
      return "cyan";
    case OrderStatus.DELIVERED:
      return "purple";
    case OrderStatus.CANCELED:
      return "red";
    case OrderStatus.RETURNING:
      return "magenta";
    case OrderStatus.REFUNDED:
      return "gold";
    case OrderStatus.FAILED:
      return "volcano";
    default:
      return "gray";
  }
};

interface SearchInterface {
  searchText: string;
  payment: null | Payment;
  status: null | OrderStatus;
}

const getDataSource = (search: SearchInterface): Order[] => {
  const list: Order[] = [];
  const payment = search.payment ?? Payment.PENDING;
  const status = search.status ?? OrderStatus.CREATED;
  console.log(payment, status);
  for (let i = 0; i < 10; i++) {
    const details = [];
    const limited = [0, 1, 2].getRandomValue();
    for (let j = 0; j <= limited; j++) {
      details.push({
        product: getRandomProduct(),
        quantity: [1, 2].getRandomValue(),
      });
    }

    list.push({
      orderCode: "ORD00" + i,
      orderDate: "2025-05-20",
      payment: payment,
      status: status,
      details: details,
      total: 70000,
      note: "Giao trước 12h",
      shipAddress: "123 Lý Thường Kiệt, Q.10, TP.HCM",
      userInfo: {
        name: "Nguyễn Văn A",
        phoneNumber: "0909123456",
      },
    });
  }
  return list;
};
export default function OrdersManagement() {
  const { setLoading } = useLoading();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDetail, setOrderDetail] = useState<Order | null>(null);
  const [searchData, setSearchData] = useState<SearchInterface>({
    searchText: "",
    payment: null,
    status: null,
  });
  useEffect(() => {
    fetch();
  }, []);

  // get orders
  const fetch = async () => {
    try {
      console.log(searchData);
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setOrders(getDataSource(searchData));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnType<Order>[] = [
    {
      title: "Mã order",
      dataIndex: "orderCode",
      key: "orderCode",
      width: 80,
      align: "right",
    },
    {
      title: "Người tạo",
      dataIndex: "userInfo.name",
      key: "userInfo.name",
      render: (text: string, record: Order) => (
        <div className={"flex flex-col"}>
          <span> {record.userInfo.name}</span>
          <span> {record.userInfo.phoneNumber}</span>
        </div>
      ),
    },
    {
      title: "Địa chỉ ship",
      dataIndex: "shipAddress",
      key: "shipAddress",
      align: "left",
    },
    {
      title: "Danh sách sản phẩm",
      dataIndex: "details",
      key: "details",
      render: (details: OrderDetail[]) => (
        <div className={"flex flex-col gap-3"}>
          {details.map((item: OrderDetail, index: number) => (
            <div key={index} className={"flex flex-row items-center gap-2"}>
              <img className={"w-[40px]"} src={item.product.img} />
              <span className={"font-semibold"}>
                {" "}
                {item.product.productName}
              </span>{" "}
              x <span className={"font-semibold"}>{item.quantity}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Thanh toán",
      dataIndex: "payment",
      key: "payment",
      width: 120,
      render: (payment: string) => (
        <div className={"flex flex-col"}>
          <Tag color={payment === "COMPLETED" ? "green" : "orange"}>
            {payment === "COMPLETED" ? "Đã thanh toán" : "Chưa thanh toán"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: OrderStatus) => (
        <div className={"flex flex-col"}>
          <Tag color={getOrderStatusColor(status)}>{status}</Tag>
        </div>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
      key: "total",
      align: "right",
      render: (total: number) => total.toLocaleString("vi-VN") + " ₫",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (total: number, record: Order) => (
        <div className={"flex flex-row gap-2 justify-center"}>
          <Button
            size={"small"}
            type="primary"
            shape="circle"
            icon={<SearchOutlined />}
            onClick={() => openDrw(record)}
          />

          <Popconfirm
            placement="topLeft"
            title={"Xác nhận xóa??"}
            description={`Bạn muốn xóa order : ${record.orderCode} không?`}
            okText="Xóa"
            cancelText="Không"
            onConfirm={() => openDrw(record)}
          >
            <Button
              size={"small"}
              type="primary"
              shape="circle"
              icon={<DeleteFilled />}
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const openDrw = (order: Order) => {
    setOpenDrawer(true);
    setOrderDetail(order);
  };
  const closeDrw = () => setOpenDrawer(false);

  const renderOrderDetailContent = () => {
    if (!orderDetail) return <div></div>;
    return (
      <div className={"flex flex-col gap-2"}>
        <div className={"mb-3"}>
          {/*header*/}
          <div className={"text-base font-semibold mb-1"}>
            Thông tin người order
          </div>
          {/*content*/}
          <div className={"ml-3 flex flex-col gap-2"}>
            <div className={"flex flex-row justify-between"}>
              <span className={"text-gray-500"}>Tên</span>
              <span className={"font-bold"}>{orderDetail?.userInfo.name}</span>
            </div>
            <div className={"flex flex-row justify-between"}>
              <span className={"text-gray-500"}>Số điện thoại</span>
              <span className={"font-bold"}>
                {orderDetail?.userInfo.phoneNumber}
              </span>
            </div>
            <div className={"flex flex-row justify-between"}>
              <span className={"text-gray-500"}>Địa chỉ nhận ship</span>
              <span className={"font-bold"}>{orderDetail?.shipAddress}</span>
            </div>
          </div>
        </div>

        <div className={" mb-3"}>
          {/*header*/}
          <div className={"text-base font-semibold  mb-1"}>
            Thông tin sản phẩm
          </div>
          {/*content*/}
          <div className={"ml-3 flex flex-col gap-2"}>
            {orderDetail.details.map((od: OrderDetail, idx: number) => (
              <div key={idx} className={"flex flex-row justify-between"}>
                <div className={"flex-1 flex flex-row gap-2 items-center"}>
                  <img src={od.product.img} className={"w-[40px]"} />
                  <span className={"font-bold text-gray-500"}>
                    {idx + 1}. {od.product.productName}
                  </span>
                  <span>x</span>
                  <span className={"font-bold text-gray-500"}>
                    {od?.quantity}
                  </span>
                </div>
                <span className={"font-bold text-gray-500"}>
                  {(od?.quantity * od.product.price).toLocaleString("VN")}
                </span>
              </div>
            ))}
            <div
              className={"flex flex-row justify-between align-center text-md"}
            >
              <span className={"font-bold text-gray-500"}>Tổng</span>
              <span className={"font-bold font-bold"}>
                {orderDetail.total.toLocaleString("VN")} VND
              </span>
            </div>
          </div>
        </div>

        <div className={" mb-3"}>
          {/*header*/}
          <div className={"text-base font-semibold  mb-1 "}>
            Giá trị đơn hàng
          </div>
          {/*content*/}
          <div className={"ml-3 flex flex-col gap-2"}>
            <div
              className={"flex flex-row justify-between align-center text-md"}
            >
              <span className={"text-gray-500 "}>Phí sản phẩm</span>
              <span className={"text-gray-500 font-bold"}>
                {orderDetail.total.toLocaleString("VN")}
              </span>
            </div>
            <div
              className={"flex flex-row justify-between align-center text-md"}
            >
              <span className={"text-gray-500"}>Phí vận chuyển</span>
              <span className={"font-bold text-gray-500"}>15.000</span>
            </div>
            <div
              className={"flex flex-row justify-between align-center text-md"}
            >
              <span className={"text-gray-500"}>Phụ phí</span>
              <span className={"font-bold text-gray-500"}>0</span>
            </div>
            <div
              className={"flex flex-row justify-between align-center text-md"}
            >
              <span className={"text-gray-500"}>Giảm giá</span>
              <span className={"font-bold text-gray-500"}>0</span>
            </div>
            <div
              className={"flex flex-row justify-between align-center text-md"}
            >
              <span className={"text-gray-500"}>Tổng</span>
              <span className={"font-bold text-[18px]"}>
                {(orderDetail.total + 15000).toLocaleString("VN")} VND
              </span>
            </div>
          </div>
        </div>

        <div className={"mb-3"}>
          {/*header*/}
          <div className={"text-base font-semibold mb-1"}>
            Trạng thái đơn hàng
          </div>
          {/*content*/}
          <div className={"ml-3 flex flex-col gap-2"}>
            <div
              className={"flex flex-row justify-between align-center text-md"}
            >
              <span className={"text-gray-500 "}>Trạng thái đơn hàng</span>
              <div className={"text-gray-500 font-bold"}>
                <Tag
                  style={{ marginRight: 0 }}
                  color={getOrderStatusColor(orderDetail.status)}
                >
                  {orderDetail.status}
                </Tag>
              </div>
            </div>
            <div
              className={"flex flex-row justify-between align-center text-md"}
            >
              <span className={"text-gray-500"}>Trạng thái thanh toán</span>
              <span className={"font-bold text-gray-500"}>
                <Tag
                  style={{ marginRight: 0 }}
                  color={
                    orderDetail.payment === Payment.COMPLETED
                      ? "green"
                      : "orange"
                  }
                >
                  {orderDetail.payment === Payment.COMPLETED
                    ? "Đã thanh toán"
                    : "Chưa thanh toán"}
                </Tag>
              </span>
            </div>
          </div>
        </div>

        <div className={"mb-3"}>
          {/*header*/}
          <div className={"text-base font-semibold mb-2"}>Ghi chú đơn hàng</div>
          {/*content*/}
          <div className={"ml-3 flex flex-col gap-2"}>
            <TextArea rows={4} disabled value={orderDetail.note} />
          </div>
        </div>
      </div>
    );
  };

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchData({ ...searchData, searchText: e.target.value });
  };

  const handleChangePaymentStatus = (v: string) => {
    setSearchData({
      ...searchData,
      payment: Payment[v as keyof typeof Payment] || null,
    });
  };

  const handleChangeOrderStatus = (v: string) => {
    setSearchData({ ...searchData, status: OrderStatus[v as keyof typeof OrderStatus] });
  };

  return (
    <ContentContainer>
      <div className={"py-4 flex flex-col gap-4"}>
        {/*search*/}
        <div className={"flex flex-row justify-start gap-2"}>
          <Input
            onChange={handleChangeSearchText}
            placeholder={"Nhập mã Order/ Tên / SDT để tìm kiếm"}
            className={"!w-[250px]"}
          />
          <Select
            allowClear
            onChange={handleChangePaymentStatus}
            className={"w-[150px]"}
            placeholder={"Trạng thái thanh toán"}
          >
            {Object.keys(Payment).map((value) => (
              <Select.Option
                key={value}
                value={value}
              >
                {Payment[value as keyof typeof Payment]}
              </Select.Option>
            ))}
          </Select>
          <Select
            allowClear
            onChange={handleChangeOrderStatus}
            className={"w-[150px]"}
            placeholder={"Trạng thái"}
          >
            {Object.keys(OrderStatus).map((value) => (
              <Select.Option
                key={value}
                value={value}
              >
                {OrderStatus[value as keyof typeof OrderStatus]}
              </Select.Option>
            ))}
          </Select>
          <Button
            type="primary"
            shape="circle"
            color={"blue"}
            onClick={fetch}
            icon={<SearchOutlined />}
          />
        </div>

        {/*table*/}
        <div className={""}>
          <Table
            bordered
            size={"small"}
            dataSource={orders}
            onChange={() => fetch()}
            pagination={{
              total: 50,
              pageSize: 10,
            }}
            columns={columns}
          />
        </div>

        {/*drawer*/}
        <Drawer
          title={`THÔNG TIN ORDER : ${orderDetail?.orderCode}`}
          placement={"right"}
          width={500}
          onClose={closeDrw}
          open={openDrawer}
          footer={
            <div className={"flex flex-row justify-end"}>
              <Button
                className={"w-[100px]"}
                color={"primary"}
                onClick={closeDrw}
              >
                Đóng
              </Button>
            </div>
          }
        >
          {renderOrderDetailContent()}
        </Drawer>
      </div>
    </ContentContainer>
  );
}
