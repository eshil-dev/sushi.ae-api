import 'dotenv/config';

export const config = {
    passport: {
      secret: 'node.js_sample_secret_key_123',
      expiresIn: 10000,
    },
    env: {
      port: process.env.PORT || 8090 /*the port of defualt in case port is not inside env file*/,
      mongoDBUri:
        process.env.ENV === 'prod'
          ? `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.dlq10.mongodb.net/?retryWrites=true&w=majority`
          : 'mongodb://localhost/freshmenu_db',
      mongoHostName: process.env.ENV === 'prod' ? 'mongodbAtlas' : 'localhost',
    },
  };
  console.log('on env:',process.env.ENV)
export const underscoreId = '_id';
  