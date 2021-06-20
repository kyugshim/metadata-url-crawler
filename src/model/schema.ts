import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import metaDoc from '../interfaces/interface';

const metaSchema: Schema = new Schema(
    {
        date: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        publisher: { type: String, required: true },
        title: { type: String, required: true },
        url: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

metaSchema.post<metaDoc>('save', function () {
    logging.info('Mongo', 'Checkout the data we just saved: ', this);
});

export default mongoose.model<metaDoc>('Metadata', metaSchema);
