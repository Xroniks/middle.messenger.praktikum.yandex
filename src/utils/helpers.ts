/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
export type Indexed<T = any> = {
    [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (const p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
            continue;
        }

        try {
            if (rhs[p].constructor === Object) {
                rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
}


function compare(a1: any, a2: any) {
    return a1.length === a2.length && a1.every((v: any, i: any) => v === a2[i])
}

function isObject(yourVariable: any) {
    return typeof yourVariable === 'object' &&
        !Array.isArray(yourVariable) &&
        yourVariable !== null
}

export function isEqual(a: Record<string, any>, b: Record<string, any>): boolean {
    if (a === null || b === null) {
        return false;
    }
    const lkeys = Object.keys(a);
    const rkeys = Object.keys(b);
    if (lkeys.length !== rkeys.length) {
        return false
    }

    return Object.keys(a).reduce((out: boolean, key: string) => {
        if (!rkeys.includes(key)) {
            out = false
            return out
        } if (isObject(a[key]) && isObject(b[key])) {
            if (Object.keys(a[key]).length === 0 && Object.keys(b[key]).length === 0) {
                return out
            }
            return isEqual(a[key] as object, b[key] as object) ? out : false
        } if (!isObject(a[key]) && !isObject(b[key])) {
            if (Array.isArray(a[key]) && Array.isArray(b[key])) {
                return compare(a[key], b[key])
            }
            if (a[key] === b[key]) {
                return out
            }
            out = false
            return out
        }
        out = false
        return out
    }, true)

}
