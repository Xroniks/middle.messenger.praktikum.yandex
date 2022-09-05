const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

function queryStringify(url: string, data = {}) {
    debugger;
    if (!Object.keys(data).length) {
        return url
    }
    const path = Object.entries(data).map(([key, value]) => {
        return `${key}=${value}`
    }).join("&");

    return `?${path}`

}


class HTTPTransport {
    get = (url: string, options: any = {}) => {

        return this.request(queryStringify(url, options.data), { ...options, method: METHODS.GET }, options.timeout);
    };

    delete = (url: string, options: any = {}) => {

        return this.request(queryStringify(url, options.data), { ...options, method: METHODS.DELETE }, options.timeout);
    };

    put = (url: string, options: any = {}) => {

        return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
    };

    post = (url: string, options: any = {}) => {

        return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
    };

    request = (url: string, options: any, timeOut = 5000) => {
        const { method, data = {}, headers = {} } = options;

        return new Promise((resolve, reject) => {

            const xhr = new XMLHttpRequest();
            xhr.timeout = timeOut;
            xhr.open(method, url);

            for (const key in headers) {
                xhr.setRequestHeader(key, headers[key]);
            }

            xhr.onload = function () {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === 'GET' || method === "DELETE") {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        }
        )
    };
};

export default new HTTPTransport();