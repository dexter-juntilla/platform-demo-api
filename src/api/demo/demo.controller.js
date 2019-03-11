import { buildFireStoreQuery } from '../../util/common';

export const createCar = (admin: Object) => (req: Object, res: Object) => {
  try {
    const db = admin.firestore();
    const { brand, color } = req.body;

    db.collection('cars').add({ brand, color });

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

    carsQuery = buildFireStoreQuery(query, carsQuery);

    carsQuery
      .get()
      .then(snapshot => {
        const cars = [];

        snapshot.forEach(doc => {
          cars.push(doc.data());
        });

        res.json({ totalRecords: 100, data: cars });
      })
      .catch(err => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.status(500).send(err);
  }
};
