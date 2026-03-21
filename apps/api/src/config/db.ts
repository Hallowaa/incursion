import mongoose from 'mongoose'

export async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI!)
  // eslint-disable-next-line no-console
  console.log('MongoDB connected')
}
