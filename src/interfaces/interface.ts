import { Document } from 'mongoose';

export default interface metaDoc extends Document {
    date?: string;
    description?: string;
    image?: string;
    publisher?: string;
    title?: string;
    url: string;
}