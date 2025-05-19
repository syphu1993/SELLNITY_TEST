import "antd/dist/reset.css";
import "@styles/globals.scss";

import AntdProvider from "@components/AntdProvider";
import Header from "@/components/header";
import { AntdRegistry } from "@/components/AntdRegistry";
import AuthGuard from "@/components/AuthGuard";
import ReduxProvider from "@/components/Provider";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get('token')?.value;
  return (
    <html lang="en">
      <body
      >
        <ReduxProvider>
          <AuthGuard tokenC={token}>
            <AntdRegistry>
              <AntdProvider>
                <Header />
                {children}
              </AntdProvider>
            </AntdRegistry>
          </AuthGuard>
        </ReduxProvider>

      </body>
    </html>
  );
}
