import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

export async function connect(uri: string, options?: mongoose.ConnectOptions): Promise<void> {
    await mongoose.connect(uri, options);
    return logger('connect', 'Connected to database');
};