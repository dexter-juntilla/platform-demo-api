import { buildFireStoreQuery } from '../../util/common';

export const createCar = (admin: Object) => async (
  req: Object,
  res: Object,
) => {
  try {
    const db = admin.firestore();
    const { brand, color } = req.body;

    const carsCountRef = db.collection('aggregation').doc('cars');

    const carRef = db.collection('cars').doc();

    await db.runTransaction(transaction =>
      transaction.get(carsCountRef).then(carsCountDoc => {
        if (!carsCountDoc.exists) {
          throw Error('Document does not exist!');
        }

        const newCount = carsCountDoc.data().count + 1;

        transaction.update(carsCountRef, { count: newCount });
        transaction.set(carRef, { brand, color });
      }),
    );

    res.status(200).json({ message: 'ok' });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const fetchCars = (admin: Object) => async (
  req: Object,
  res: Object,
) => {
  try {
    const db = admin.firestore();
    const { query } = req;

    const carsCount = await db
      .collection('aggregation')
      .doc('cars')
      .get();

    const { count } = carsCount.data();

    let carsQuery = db.collection('cars');

    carsQuery = buildFireStoreQuery(query, carsQuery);

    const carsResult = await carsQuery.get();

    const cars = [];

    carsResult.forEach(doc => {
      cars.push(doc.data());
    });

    res.json({ totalRecords: count, data: cars });
  } catch (err) {
    res.status(500).send(err);
  }
};
