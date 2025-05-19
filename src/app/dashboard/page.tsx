import { Col, Row } from "antd";
import Image from "next/image";
import posterA from '@/assets/images/share-poster-1733971223947.jpg';
import posterB from '@/assets/images/share-poster-1733971496344.jpg';

export default function Dashboard() {
    return (
       <>
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 p-6 shadow-md rounded-lg border">
                <h2 className="text-center text-xl mb-4">Dashboard 1</h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                </Row>
            </div>
        </div>

        <div className="flex justify-center items-center h-screen">
            <div className="w-96 p-6 shadow-md rounded-lg border">
                <h2 className="text-center text-xl mb-4">Dashboard 1</h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                </Row>
            </div>
        </div>

        <div className="flex justify-center items-center h-screen">
            <div className="w-96 p-6 shadow-md rounded-lg border">
                <h2 className="text-center text-xl mb-4">Dashboard 1</h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                </Row>
            </div>
        </div>

        <div className="flex justify-center items-center h-screen">
            <div className="w-96 p-6 shadow-md rounded-lg border">
                <h2 className="text-center text-xl mb-4">Dashboard 1</h2>
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterA}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                    <Image
                            src={posterB}
                            alt="Banner"
                            width={800}
                            height={400}
                        />
                    </Col>
                </Row>
            </div>
        </div>
       </>
    );
}
