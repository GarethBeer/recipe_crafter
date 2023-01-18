


export const getNested = (theObject: any, path: string, separator: string = '.') => {
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

export const setNestedValue = (obj: any, path: any, value: any = null, array: any = false) => {
    let i;
    path = path.split('.');
    for (i = 0; i < path.length - 1; i++) obj = obj[path[i]];
  
    if (array) {
        return obj[path[i]]
    }
    obj[path[i]] = value
};

export const addPathsToObjectsTree = (obj: any, path: string = '', pathString: string = '') => {
    if (typeof obj === 'string') {
      return obj
    }
      obj.path = path || `data:${obj.id}`
      obj.pathString = pathString ? pathString : ''
    Object.keys(obj).forEach((key: string) => {
        if (isObject(obj[key]) && !(obj[key] instanceof Date)) {
          obj[key] = addPathsToObjectsTree(
            obj[key],
            `${obj.path}.${key}`,
            obj.pathString ? `${obj.pathString}.${key}` : key
          );
  
        } else
          if (Array.isArray(obj[key]) && obj[key].length > 0 && isObject(obj[key][0])) {
            obj[key] = obj[key].map((item: any, index: number) => addPathsToObjectsTree(
              item,
              obj.path ? `${obj.path}.${key}:${item.id}` : `${path}.${key}:${item.id}`,
              obj.pathString ? `${obj.pathString}.${key}.${index}` : `${key}.${index}`))
          } else {
            return obj
          }
      })
    return obj
  }

  export const reducePathToOneItem = (path: string) => {
    if (!path) {
      return path;
    }
    return path
      .split('.')
      .map((el) => {
        if (!isNaN(parseInt(el))) {
          el = '0';
        }
        return el;
      })
      .join('.');
  };

  // object checkers
  export const isEmptyObject = (obj: any) => {
    return isObject(obj) && isEmpty(obj);
  };

  export const isEmpty = (obj: any): boolean => {
    return Object.keys(obj).length === 0;
  };
  
  
  export const isObject = (obj: any): boolean => {
    return obj != null && typeof obj === 'object' && !Array.isArray(obj) && !(obj instanceof Date);
  };

export const findChanges: any = (prev: any, curr: any) => {
/*     console.log('PREV', prev, 'CURR', curr) */
    if (prev === curr) return {};
    if (!isObject(prev) || !isObject(curr)) return curr
  ;
  
    const deletedValues = Object.keys(prev).reduce((acc: any, key: any) => {
      if (!hasOwnProperty(curr, key)) {
        acc[key] = undefined;
      }
      return acc;
    }, {});
  
    if (isDate(prev) || isDate(curr)) {
      if (prev.valueOf() === curr.valueOf()) return {};
      return curr;
    }
  
  
  
    return Object.keys(curr).reduce((acc: any, key: any) => {
      if (!hasOwnProperty(prev, key)) {
        acc[key] = curr[key]; // return added r key
        return acc;
      }
      let difference;
  
      if (Array.isArray(curr[key])) {
        const res = curr[key]
          .map((item: any, index: number) => {
            return findChanges(prev[key][index], item);
          })
          .filter((item: any) => {
            return !containsOnlyPath(item) && !isEmptyObject(item);
          });
        difference = [...res].length > 0 ? [...res] : [];
      } else {
        difference = findChanges(prev[key], curr[key]);
      }
  
      if (
        isEmptyObject(difference) &&
        !isDate(difference) &&
        (isEmptyObject(prev[key]) || !isEmptyObject(curr[key]))
      ) {
        return acc; // return no diff
      }
      if (difference === null || difference === undefined || (isObject(difference) && containsOnlyPath(difference))) {
        return acc
      }
      if (Array.isArray(difference) && difference.length === 0) {
    return acc
  }
  
      acc[key] = difference; // return updated key
      return acc; // return updated key
    }, deletedValues);
  };

  export const hasOwnProperty = (obj: any, key: any) => {
    return Object.prototype.hasOwnProperty.call(obj, key);
  };
  
  export const isDate = (date: any) => {
    return date instanceof Date;
  };

  export const containsOnlyPath = (obj:any) => {
    const newObj = Object.assign({}, obj);
    delete newObj['path']
    delete newObj['pathString']
    delete newObj['meta_data']
    return isEmptyObject(newObj)
  }
  