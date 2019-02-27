import { fetchCars } from './demo.controller';

export default (server: Function) => {
  server.get('/cars', fetchCars);
};
