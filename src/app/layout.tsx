import "antd/dist/reset.css";
import "@styles/globals.scss";

import AntdProvider from "@components/AntdProvider";
import Header from "@/components/header";
import { AntdRegistry } from "@/components/AntdRegistry";
import ReduxProvider from "@/components/Provider";

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
              {children}
            </AntdProvider>
          </AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
