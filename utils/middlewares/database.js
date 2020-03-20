import mongoose from 'mongoose';
import populateTestDatabase from './../../__tests__/seed';

// populate database if test
const isTest = process.env.NODE_ENV === 'test';

const databaseConnection = handler => async (req, res) => {
  const [connection] = mongoose.connections;
  if (connection.readyState !== 1) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      });
      if (isTest) await populateTestDatabase();
    } catch (err) {
      console.log('Failed connection to MONGO DATABASE');
      console.error(err.message);
      throw new Error(err);
    }
  }
  return handler(req, res);
};

export default databaseConnection;
