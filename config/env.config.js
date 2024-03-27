import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 8080;
export const MONGOURL = process.env.MONGOURL || "";
export const NODE_ENV = process.env.NODE_ENV;
export const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET || "";
