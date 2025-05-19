
"use client";

import { logout } from "@/features/auth/authService";
import { removeToken } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { Result, Button } from "antd";
import { useRouter } from "next/navigation";

export default function Error500Page() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const backHome = () => {
        logout();
        dispatch(removeToken())
        router.push('/login');
    }
    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Result
                status="500"
                title="500"
                subTitle="Oops! Something went wrong on the server."
                extra={
                    <Button type="primary" onClick={backHome}>
                        Back Home
                    </Button>
                }
            />
        </div>
    );
}
