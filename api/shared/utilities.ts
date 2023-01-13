export const addPathsToObjectsTree = (
  obj: any,
  path: string = '',
  pathString: string = ''
) => {
  obj.path = path || `data:${obj.id}`;
  obj.pathString = pathString ? pathString : '';
  Object.keys(obj).forEach((key: string) => {
    if (isObject(obj[key]) && !(obj[key] instanceof Date)) {
      console.log(key);
      addPathsToObjectsTree(
        obj[key],
        `${obj.path}.${key}`,
        obj.pathString ? `${obj.pathString}.${key}` : key
      );
    } else if (
      Array.isArray(obj[key]) &&
      obj[key].length > 0 &&
      isObject(obj[key][0])
    ) {
      obj[key] = obj[key].map((item: any, index: number) =>
        addPathsToObjectsTree(
          item,
          obj.path
            ? `${obj.path}.${key}:${item.id}`
            : `${path}.${key}:${item.id}`,
          obj.pathString
            ? `${obj.pathString}.${key}.${index}`
            : `${key}.${index}`
        )
      );
    } else {
      return obj;
    }
  });
  return obj;
};

export const isObject = (obj: any): boolean => {
  return (
    obj != null &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    !(obj instanceof Date)
  );
};

export const mergeEvents = (theObject, path, separator, data, action) => {
  let relativePath = '';

  try {
    separator = separator || '.';

    path
      ? path.split(separator).reduce(function (obj, property, index) {
          if (index === path.split('.').length - 1) {
            if (!property.match(/\[/gi)) {
              obj[property] = {
                ...obj[property],
                ...getNested(data, data.path.replace(/(\[.*?\])/gi, '0'), '.'),
              };
            } else {
              const exists = checkArrayExists(property, obj);
              if (action !== 'Deleted') {
                if (exists === -1) {
                  obj.push({
                    ...getNested(
                      data,
                      data.path.replace(/(\[.*?\])/gi, '0'),
                      '.'
                    ),
                  });
                } else {
                  obj[exists] = {
                    ...obj[exists],
                    ...getNested(
                      data,
                      data.path.replace(/(\[.*?\])/gi, '0'),
                      '.'
                    ),
                  };
                }
                console.log(-1, 'OBJECT', theObject);
              } else {
                setNestedValue(
                  theObject,
                  relativePath,
                  obj.filter(
                    (item) => item.id !== property.replace(/(^.*\[|\].*$)/g, '')
                  )
                );
              }
            }
          } else {
            if (!property.match(/\[/gi) && !obj[property]) {
              console.log(1, 'property location', property);
              relativePath = relativePath
                ? relativePath + '.' + property
                : property;
              console.log(-1, 'relative path', relativePath);
              console.log(
                0,
                'testing',
                path.split('.')[index + 1].match(/\[/gi) ? [] : {}
              );
              obj[property] = path.split('.')[index + 1].match(/\[/gi)
                ? []
                : {};
              return obj[property];
            } else if (!property.match(/\[/gi) && obj[property].length > 0) {
              relativePath = relativePath
                ? relativePath + '.' + property
                : property;
              console.log(-1, 'relative path', relativePath);
              return obj[property];
            } else if (property.match(/\[/gi)) {
              const isExists = checkArrayExists(property, obj);
              relativePath = relativePath + '.' + isExists;
              if (isExists > -1) {
                return obj[isExists];
              } else {
                console.log(-1, 'creating obj', relativePath);
                theObject[path.split('.')[index - 1]].push({
                  id: property.replace(/(^.*\[|\].*$)/g, ''),
                });
                return obj[path.split('.')[index - 1]];
              }
            } else {
              relativePath = relativePath
                ? relativePath + '.' + property
                : property;
              return obj[property];
            }
          }
        }, theObject)
      : theObject;

    return theObject;
  } catch (err) {
    return undefined;
  }
};

export const getNested = (theObject, path, separator) => {
  try {
    separator = separator || '.';

    return path
      ? path
          .replace('[', separator)
          .replace(']', '')
          .split(separator)
          .reduce(function (obj, property) {
            return obj[property];
          }, theObject)
      : theObject;
  } catch (err) {
    return undefined;
  }
};
export const checkArrayExists = (id, property) => {
  return property.findIndex((ob) => ob.id === id.replace(/(^.*\[|\].*$)/g, ''));
};

export const setNestedValue = (obj, path, value) => {
  let i;
  path = path.split('.');
  console.log(-1, 'path nested Value', path);
  console.log(0, 'path nested Value', obj);
  for (i = 0; i < path.length - 1; i++) obj = obj[path[i]];
  obj[path[i]] = value;
};
