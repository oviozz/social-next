import mongoose, { Schema, Document } from "mongoose";
import {UserType} from "../schemas/user-schema.ts";

type UserDocumentType = UserType & Document;

const userModal = new Schema<UserDocumentType>({
   username: {
       type: String,
       required: true,
       unique: true,
       index: true,
       trim: true,
   },
    email: {
       type: String,
        required: true,
        unique: true
    },
    password: {
       type: String,
        required: true
    }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<UserDocumentType>("user", userModal);

