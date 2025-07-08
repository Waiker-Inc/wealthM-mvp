/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_OAPI_URL: string;
  readonly VITE_OAPI_PRODUCT_KEY: string;
  readonly VITE_OAPI_JWT: string;
  readonly VITE_WS_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
