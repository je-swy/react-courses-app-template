// this file is needed to import image files in TypeScript
// without type errors, {} - type definition for image modules

declare module '*.gif' {
  const value: string; // type of the imported value
  export default value; // export the value as default
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}