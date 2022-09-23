export enum Method {
    Get = 'Get',
    Post = 'Post',
    Put = 'Put',
    Patch = 'Patch',
    Delete = 'Delete'
}

type Options = {
    method: Method;
    data?: any;
};

function queryStringify(url: string, data = {}) {
    if (!Object.keys(data).length) {
        return url
    }
    const path = Object.entries(data).map(([key, value]) => `${key}=${value}`).join("&");

    return `?${path}`

}

export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';

    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    public get<Response>(path = '/', data?: any): Promise<Response> {
        return this.request<Response>(this.endpoint + queryStringify(path, data));
    }

    public post<Response = void>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Post,
            data,
        });
    }

    public put<Response = void>(path: string, data: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Put,
            data,
        });
    }

    public patch<Response = void>(path: string, data: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Patch,
            data,
        });
    }

    public delete<Response>(path: string, data?: unknown): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: Method.Delete,
            data
        });
    }

    // eslint-disable-next-line class-methods-use-this
    private request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
        const { method, data } = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            xhr.onreadystatechange = (e) => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            // eslint-disable-next-line prefer-promise-reject-errors
            xhr.onabort = () => reject({ reason: 'abort' });
            // eslint-disable-next-line prefer-promise-reject-errors
            xhr.onerror = () => reject({ reason: 'network error' });
            // eslint-disable-next-line prefer-promise-reject-errors
            xhr.ontimeout = () => reject({ reason: 'timeout' });

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }


            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === Method.Get || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
