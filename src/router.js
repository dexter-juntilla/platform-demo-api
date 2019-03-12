import cars from './api/demo/demo.routes';

export default (server: Function, admin: Object) => {
  cars(server, admin);
};
