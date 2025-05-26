import "antd/dist/reset.css";
import "@styles/globals.scss";

import AntdProvider from "@components/AntdProvider";
import Header from "@/components/header";
import { AntdRegistry } from "@/components/AntdRegistry";
import ReduxProvider from "@/components/Provider";
import {LoadingProvider} from "@/context/LoadingContext";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AntdRegistry>
            <AntdProvider>
              <Header />
              <LoadingProvider>
                {children}
              </LoadingProvider>
            </AntdProvider>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
