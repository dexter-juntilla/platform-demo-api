import { adminPassport } from '../middleWare/passport';
import { fetchCars, createCar } from './demo.controller';

export default (server: Function, firebase: Object, admin: Object) => {
  server.post('/car', adminPassport(admin), createCar(admin));
  server.get('/cars', fetchCars(admin));
};
