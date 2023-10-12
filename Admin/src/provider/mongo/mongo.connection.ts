
import mongoose, { ConnectOptions, Connection, createConnection } from "mongoose";


class MongoConnection {

  private connect!: Connection;

  constructor() {
    this.initiateMongoConnection();
  }

  initiateMongoConnection() {
    if (!this.connect) {
      const options: ConnectOptions = {};
      this.connect = createConnection(this.getConnectionUri(), options);                     // options object is used to customize the behavior of your MongoDB connection as needed
      this.registerConnectionEvent();
      mongoose.set('debug', true);
    }
  }

  getConnectionUri() {
    return process.env.MONGO_URL;
  }

  registerConnectionEvent() {
    // this.connect.on('error', console.error.bind(console, 'MongoDb connection error: '));
    this.connect.on('error', () => {
      console.log('error in mongo')
    })
    this.connect.once('open', () => {
      console.log('MongoDB connected successfully!,\nconnected to ', this.getConnectionUri());
    })
  }

  getConnection(): Connection {
    return this.connect;
  }

}

export const mongoConnection = new MongoConnection();