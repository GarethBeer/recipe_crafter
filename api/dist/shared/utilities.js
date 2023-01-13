"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setNestedValue = exports.checkArrayExists = exports.getNested = exports.mergeEvents = exports.isObject = exports.addPathsToObjectsTree = void 0;
const addPathsToObjectsTree = (obj, path = '', pathString = '') => {
    obj.path = path || `data:${obj.id}`;
    obj.pathString = pathString ? pathString : '';
    Object.keys(obj).forEach((key) => {
        if ((0, exports.isObject)(obj[key]) && !(obj[key] instanceof Date)) {
            console.log(key);
            (0, exports.addPathsToObjectsTree)(obj[key], `${obj.path}.${key}`, obj.pathString ? `${obj.pathString}.${key}` : key);
        }
        else if (Array.isArray(obj[key]) &&
            obj[key].length > 0 &&
            (0, exports.isObject)(obj[key][0])) {
            obj[key] = obj[key].map((item, index) => (0, exports.addPathsToObjectsTree)(item, obj.path
                ? `${obj.path}.${key}:${item.id}`
                : `${path}.${key}:${item.id}`, obj.pathString
                ? `${obj.pathString}.${key}.${index}`
                : `${key}.${index}`));
        }
        else {
            return obj;
        }
    });
    return obj;
};
exports.addPathsToObjectsTree = addPathsToObjectsTree;
const isObject = (obj) => {
    return (obj != null &&
        typeof obj === 'object' &&
        !Array.isArray(obj) &&
        !(obj instanceof Date));
};
exports.isObject = isObject;
const mergeEvents = (theObject, path, separator, data, action) => {
    let relativePath = '';
    try {
        separator = separator || '.';
        path
            ? path.split(separator).reduce(function (obj, property, index) {
                if (index === path.split('.').length - 1) {
                    if (!property.match(/\[/gi)) {
                        obj[property] = Object.assign(Object.assign({}, obj[property]), (0, exports.getNested)(data, data.path.replace(/(\[.*?\])/gi, '0'), '.'));
                    }
                    else {
                        const exists = (0, exports.checkArrayExists)(property, obj);
                        if (action !== 'Deleted') {
                            if (exists === -1) {
                                obj.push(Object.assign({}, (0, exports.getNested)(data, data.path.replace(/(\[.*?\])/gi, '0'), '.')));
                            }
                            else {
                                obj[exists] = Object.assign(Object.assign({}, obj[exists]), (0, exports.getNested)(data, data.path.replace(/(\[.*?\])/gi, '0'), '.'));
                            }
                            console.log(-1, 'OBJECT', theObject);
                        }
                        else {
                            (0, exports.setNestedValue)(theObject, relativePath, obj.filter((item) => item.id !== property.replace(/(^.*\[|\].*$)/g, '')));
                        }
                    }
                }
                else {
                    if (!property.match(/\[/gi) && !obj[property]) {
                        console.log(1, 'property location', property);
                        relativePath = relativePath
                            ? relativePath + '.' + property
                            : property;
                        console.log(-1, 'relative path', relativePath);
                        console.log(0, 'testing', path.split('.')[index + 1].match(/\[/gi) ? [] : {});
                        obj[property] = path.split('.')[index + 1].match(/\[/gi)
                            ? []
                            : {};
                        return obj[property];
                    }
                    else if (!property.match(/\[/gi) && obj[property].length > 0) {
                        relativePath = relativePath
                            ? relativePath + '.' + property
                            : property;
                        console.log(-1, 'relative path', relativePath);
                        return obj[property];
                    }
                    else if (property.match(/\[/gi)) {
                        const isExists = (0, exports.checkArrayExists)(property, obj);
                        relativePath = relativePath + '.' + isExists;
                        if (isExists > -1) {
                            return obj[isExists];
                        }
                        else {
                            console.log(-1, 'creating obj', relativePath);
                            theObject[path.split('.')[index - 1]].push({
                                id: property.replace(/(^.*\[|\].*$)/g, ''),
                            });
                            return obj[path.split('.')[index - 1]];
                        }
                    }
                    else {
                        relativePath = relativePath
                            ? relativePath + '.' + property
                            : property;
                        return obj[property];
                    }
                }
            }, theObject)
            : theObject;
        return theObject;
    }
    catch (err) {
        return undefined;
    }
};
exports.mergeEvents = mergeEvents;
const getNested = (theObject, path, separator) => {
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
    }
    catch (err) {
        return undefined;
    }
};
exports.getNested = getNested;
const checkArrayExists = (id, property) => {
    return property.findIndex((ob) => ob.id === id.replace(/(^.*\[|\].*$)/g, ''));
};
exports.checkArrayExists = checkArrayExists;
const setNestedValue = (obj, path, value) => {
    let i;
    path = path.split('.');
    console.log(-1, 'path nested Value', path);
    console.log(0, 'path nested Value', obj);
    for (i = 0; i < path.length - 1; i++)
        obj = obj[path[i]];
    obj[path[i]] = value;
};
exports.setNestedValue = setNestedValue;
//# sourceMappingURL=utilities.js.map