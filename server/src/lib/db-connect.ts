import mongoose from "mongoose";
import {env} from "../config/env.ts";

let cachedDB: typeof mongoose | null = null;

export const dbConnect = async () => {

    if (cachedDB){
        console.log("Using already connected db connection");
        return cachedDB
    }

    try {
        cachedDB = await mongoose.connect(env.DB_URL, {
            dbName: "social-next"
        });
        return cachedDB;
    } catch (error) {
        console.error("Error connecting to database:", error);
        throw error;
    }
}