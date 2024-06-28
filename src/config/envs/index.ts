import dotenv from 'dotenv-flow';

export const config = dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const envs = process.env;
