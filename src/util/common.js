export const getNextCharacterAlphabetically = (str: string) =>
  str.substring(0, str.length - 1) +
  String.fromCharCode(str.charCodeAt(str.length - 1) + 1);

export const buildFireStoreQuery = (query: Object, fireQuery: Object): any => {
  let newFireQuery = fireQuery;

  if (query) {
    const filterKeys = Object.keys(query)
      .filter(key => key.toLowerCase().indexOf('_like') > -1)
      .map(key => key.substr(0, key.length - '_like'.length));

    if (query._sort) {
      if (query._order && query._order === 'desc') {
        newFireQuery = newFireQuery.orderBy(query._sort, 'desc');
      } else {
        newFireQuery = newFireQuery.orderBy(query._sort);
      }
    }

    if (filterKeys.length > 0) {
      filterKeys.forEach(field => {
        const key = `${field}_like`;
        newFireQuery = newFireQuery.where(field, '>=', query[key]);
        newFireQuery = newFireQuery.where(
          field,
          '<',
          getNextCharacterAlphabetically(query[key]),
        );
      });
    }

    if (query._page) {
      let limit = 5;

      if (query._limit) {
        limit = parseInt(query._limit, 10);
      }

      newFireQuery = newFireQuery.limit(limit).offset(query._page * limit);
    }
  }
  return newFireQuery;
};
