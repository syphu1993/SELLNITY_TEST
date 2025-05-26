"use client";

import {useLoading} from "@/context/LoadingContext";
import {Spin} from "antd";

export default function ContentContainer({ children }: { children: React.ReactNode }) {
    const {loading} = useLoading();
    return (
        <div className="w-full flex flex-col px-20 md:px-32 lg:px-48">
            {children}
            {loading && <div className={'fixed left-0 top-0 bg-red h-screen w-screen'}>
                <div className={'absolute left-0 top-0 bg-red h-screen w-screen bg-gray-400 opacity-30'}>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
                    <Spin size="large" />
                </div>
            </div>}
        </div>
    );
}
