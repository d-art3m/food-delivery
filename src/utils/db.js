import mongoose from 'mongoose';

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    throw new Error('Connection failed!');
  }
};

export default connect_db;
