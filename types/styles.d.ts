declare module '*.css' {
  const css: { [key: string]: string };
  export = css;
}

declare module '*.scss' {
  const styles: { [key: string]: string };
  export = styles;
}
