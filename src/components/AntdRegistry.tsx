'use client';

import React from "react";
import { useServerInsertedHTML } from "next/navigation";
import { StyleProvider, createCache, extractStyle } from "@ant-design/cssinjs";

const cache = createCache();

export function AntdRegistry({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    const styleText = extractStyle(cache, { plain: true });
    return <style id="antd" dangerouslySetInnerHTML={{ __html: styleText }} />;
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
