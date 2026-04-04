import mongoose from 'mongoose'
import Log from '../util/Log'

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI!)

  Log.i('MongoDB connected')
}
