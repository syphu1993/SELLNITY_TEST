'use client';
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#f97316',
        },
        components: {
          Button: {
            colorBgContainer: '#f97316',
            colorText: '#ffffff',
            colorBorder: '#f97316',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
