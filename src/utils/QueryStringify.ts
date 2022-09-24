

export default function queryStringify(url: string, data = {}) {
    if (!Object.keys(data).length) {
        return url;
    }
    const path = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');

    return `?${path}`;
}