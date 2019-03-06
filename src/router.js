import cars from './demo/demo.routes';

export default (server: Function, firebase: Object, admin: Object) => {
  cars(server, firebase, admin);
};
