'use client';
import { ConfigProvider } from 'antd';
import { ReactNode } from 'react';

export default function AntdProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000',
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
