declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    DB_PORT: string;
    DB_HOST: string;
    DB_DATABASE: string;
    DB_USER: string;
    DB_PASSWORD: string;
    HASH_SALT: number;
    JWT_SECRET: string;
  }
}
