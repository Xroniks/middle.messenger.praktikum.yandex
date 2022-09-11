import queryStringify from "./QueryStringify"

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

interface IOptions {
    method: string;
    data?: any;
    headers: Record<string, string>;
    timeOut: number;
};

// function queryStringify(url: string, data = {}) {
//     if (!Object.keys(data).length) {
//         return url;
//     }
//     const path = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');

//     return `?${path}`;
// }

function request(url: string, options: IOptions, timeOut = 5000) {
    const { method, data = {}, headers = {} } = options;

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.timeout = timeOut;
        xhr.open(method, url);

        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key]);
        });

        xhr.onload = () => {
            resolve(xhr);
        };

        xhr.onabort = reject;
        xhr.onerror = reject;
        xhr.ontimeout = reject;

        if (method === 'GET' || method === 'DELETE') {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(data));
        }
    });
}

export default {
    get: (url: string, options: any = {}) => request(queryStringify(url, options.data), { ...options, method: METHODS.GET }, options.timeout),

    delete: (url: string, options: any = {}) => request(queryStringify(url, options.data), { ...options, method: METHODS.DELETE }, options.timeout),

    put: (url: string, options: any = {}) => request(url, { ...options, method: METHODS.PUT }, options.timeout),

    post: (url: string, options: any = {}) => request(url, { ...options, method: METHODS.POST }, options.timeout),

    request,
};
