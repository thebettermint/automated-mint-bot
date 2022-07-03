import dotenv from 'dotenv';
dotenv.config();

const origins = [`http://localhost:4005`];

const routes = ['/link/*', '/ping/*'];

const constants = {
  routes,
  origins,
};

export default constants;
