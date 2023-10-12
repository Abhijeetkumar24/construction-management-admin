import dotenv from 'dotenv'
dotenv.config();

export const portNumber = process.env.PORT;
export const authContext = '/admin/auth';
export const adminContext = '/admin';
export const atlasContext = '/atlas'