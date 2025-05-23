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
            colorPrimary: '#f97316',
            colorBgContainer: '#ffffff',
            colorText: '#000000',
            colorBorder: '#000000',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
