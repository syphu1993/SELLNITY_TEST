import { Category } from "./category"

export interface Product {
    productName: string,
    img: string,
    price: number,
    category: Category,
    unit: string,
    discount: number,
    description: string,
    productCod: string
}

export enum Payment {
    COMPLETED = 'Đã thanh toán',
    PENDING = 'Chưa thanh toán',
}

export enum OrderStatus {
    CREATED = 'Đã tạo',
    PENDING_PAYMENT = 'Chờ thanh toán',
    PAID = 'Đã thanh toán',
    PROCESSING = 'Đang xử lý',
    SHIPPING = 'Đang giao hàng',
    DELIVERED = 'Đã giao hàng',
    CANCELED = 'Đã huỷ',
    RETURNING = 'Hoàn trả',
    REFUNDED = 'Đã hoàn tiền',
    FAILED = 'Thất bại',
}

export interface OrderDetail {
    // orderCode: string,
    product: Product,
    quantity: number,
}

export interface Order {
    orderCode: string,
    orderDate: string,
    payment: Payment,
    status: OrderStatus,
    details: OrderDetail[],
    total: number,
    note: string,
    shipAddress: string,
    userInfo: {
        name: string,
        phoneNumber: string,
    }
}