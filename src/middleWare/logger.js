export default (req: Object, res: Object, next: Function) => {
  const { method, url, body, query } = req;
  const dateTime = new Date().toISOString();
  const data = method === 'GET' ? query : body;

  console.info(
    `${dateTime} method: ${method} route: ${url} payload: ${JSON.stringify(
      data,
    )}`,
  );
  next();
};
