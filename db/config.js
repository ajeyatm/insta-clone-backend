import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.bold.underline
    )
  } catch (error) {
    console.log(`Error connecting DB >>> ${error.message}`.red.inverse)
    process.exit(1)
  }
}

export default connectDB
