declare module 'postcss-px-to-viewport';

declare module '*.webp' {
  const src: string; // 图片导入后本质是一个 URL 字符串
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}
