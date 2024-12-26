export namespace ObjectUtils {

    export function isEmpty(obj: any): boolean {
        if (obj === null || obj === undefined) {// null和undefined
            return true;
        }

        if (typeof obj === 'object' && Object.keys(obj).length === 0) {// 数组和空对象
            return true;
        }

        return false;
    }

    export function deepClone(obj: any) {
        if (typeof obj !== 'object') {
            return obj;
        }

        let returnObj;
        if (Object.prototype.toString.call(obj) === '[object Array]') {// 数组
            returnObj = [];

            for (const k in obj) {
                returnObj.push(deepClone(obj[k]));
            }

        } else if (Object.prototype.toString.call(obj) === '[object Object]') {// 对象
            returnObj = {};
            for (const key in obj) {
                const v = obj[key];
                if (typeof v === 'object') {
                    returnObj[key] = deepClone(v);
                } else {
                    returnObj[key] = v;
                }
            }
        }

        return returnObj;
    }

}