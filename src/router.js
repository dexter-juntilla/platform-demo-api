import cars from './demo/demo.routes';

export default (server: Function) => {
  cars(server);
};
