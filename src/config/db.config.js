export const config = {
    passport: {
      secret: 'node.js_sample_secret_key_123',
      expiresIn: 10000,
    },
    env: {
      port: 8080,
      mongoDBUri:
        process.env.ENV === 'prod'
          ? 'mongodb+srv://<user>:<password>@<cloud_cluster_db_path>'
          : 'mongodb://localhost/freshmenu_db',
      mongoHostName: process.env.ENV === 'prod' ? 'mongodbAtlas' : 'localhost',
    },
  };
  
export const underscoreId = '_id';
  