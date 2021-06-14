import mongoose from 'mongoose';

const Guild = new mongoose.Schema({
    id: { type: String },
    prefix: { type: String }
});

export const guild = mongoose.model('Guild', Guild);