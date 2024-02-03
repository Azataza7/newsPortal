import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  mysql: {
    host: 'localhost',
    user: 'root',
    database: 'inventory_db',
    password: '4t3a2z1azver',
  }
};

export default config;