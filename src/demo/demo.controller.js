import cars from './cars';

export const fetchCars = (req: Object, res: Object, next: Function) => {
  let final = [...cars];
  const { query } = req;

  if (query) {
    const filterKeys = Object.keys(query)
      .filter(key => key.toLowerCase().indexOf('_like') > -1)
      .map(key => key.substr(0, key.length - '_like'.length));

    if (query.q) {
      final = final.filter(obj => {
        const boolArray = Object.keys(obj).map(key => {
          return (
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(query.q.toLowerCase()) > -1
          );
        });

        return boolArray.find(el => el === true);
      });
    }

    if (filterKeys.length > 0) {
      final = final.filter(obj => {
        const boolArray = filterKeys.map(key => {
          return (
            obj[key]
              .toString()
              .toLowerCase()
              .indexOf(query[`${key}_like`].toLowerCase()) > -1
          );
        });

        return typeof boolArray.find(el => el === false) === 'undefined';
      });
    }

    if (query._sort) {
      final = final.sort((el1, el2) => {
        const condition =
          typeof el1[query._sort] === 'string'
            ? el1[query._sort].toLowerCase() < el2[query._sort].toLowerCase()
            : el1[query._sort] < el2[query._sort];
        if (condition) {
          if (query._order && query._order === 'desc') {
            return 1;
          }

          return -1;
        }
        if (el1[query._sort] > el2[query._sort]) {
          if (query._order && query._order === 'desc') {
            return -1;
          }

          return 1;
        }

        return 0;
      });
    }

    if (query._page) {
      let limit = 5;

      if (query._limit) {
        limit = parseInt(query._limit, 10);
      }
      final = final.slice(query._page * limit, query._page * limit + limit);
    }
  }

  res.json({ totalRecords: cars.length, data: final });
  next();
};
