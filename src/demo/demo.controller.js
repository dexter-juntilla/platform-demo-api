import cars from './cars';

export const createCar = (admin: Object) => (req: Object, res: Object) => {
  try {
    const db = admin.firestore();

    db.collection('cars').add({});

    res.status(200).json({ message: 'ok' });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const fetchCars = (admin: Object) => (req: Object, res: Object) => {
  try {
    const db = admin.firestore();
    const { query } = req;

    let carsQuery = db.collection('cars');

    if (query) {
      const filterKeys = Object.keys(query)
        .filter(key => key.toLowerCase().indexOf('_like') > -1)
        .map(key => key.substr(0, key.length - '_like'.length));

      if (filterKeys.length > 0) {
        filterKeys.forEach(field => {
          const key = `${field}_like`;
          carsQuery = carsQuery.where(field, '>=', query[key]);
        });
      }

      if (query._sort) {
        if (query._order && query._order === 'desc') {
          carsQuery = carsQuery.orderBy(query._sort, 'desc');
        } else {
          carsQuery = carsQuery.orderBy(query._sort);
        }
      }

      // if (query._page) {
      //   let limit = 5;

      //   if (query._limit) {
      //     limit = parseInt(query._limit);
      //   }

      //   //   final = final.slice(query._page * limit, query._page * limit + limit);
      // }
    }

    carsQuery.get().then(snapshot => {
      const cars = [];

      snapshot.forEach(doc => {
        cars.push(doc.data());
      });

      res.json({ totalRecords: 100, data: cars });
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
