import axios from 'axios'

export const REACT_APP_CONTENT = 'http://10.0.2.2:1337'

/**
 * @class Contains different attributes which are additional features of a request
 * @property {object}  headers - `headers` are custom headers to be sent.
 * @property {object}  params - `params` are the URL parameters to be sent with the request. Must be a plain object or a URLSearchParams object
 * @property {string}  responseType - `responseType` indicates the type of data that the server will respond with
 * @property {boolean}  withCredentials - `withCredentials` indicates whether or not cross-site Access-Control requests.
 */
class Options {
    headers?: { [header: string]: string | string[] }
    params?: { [param: string]: string | string[] } | URLSearchParams
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' = 'json'
    withCredentials?: boolean = false
}

/**
 * Enum for request method.
 * @readonly
 * @enum {string}
 */
enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

/**
 * Performs HTTP requests.
 * This service method are static so are available without make a instance of this class, with methods to perform HTTP requests.
 * Each request method has multiple signatures, and the return type varies based on
 * the signature that is called (mainly the values of `responseType`).
 *
 * Note that the `responseType` *options* value is a String that identifies the single data type of the response.
 * The value of `responseType` cannot be a union, as the combined signature could imply.
 * The value of `responseType` is by default `JSON`
 *
 */
export default class HttpClient {
    /** * Constructs a `GET` request .
     * @param url     The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return response body in the requested type by default JSON.
     * */
    static get(url: string, options?: Options): Promise<any> {
        return request(RequestMethod.GET, url, undefined, options)
    }
    /**
     * Constructs a POST request that interprets the body as a JSON object and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The content to replace with.
     * @param options The HTTP options to send with the request.
     *
     * @return response body in the requested type by default JSON.
     */
    static post(url: string, body: any, options?: Options): Promise<any> {
        return request(RequestMethod.POST, url, body, options)
    }
    /**
     * Constructs a `PATCH` request that interprets the body as a JSON object
     * and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to edit.
     * @param options The HTTP options to send with the request.
     *
     * @return response body in the requested type by default JSON.
     */
    static patch(url: string, body: any, options?: Options): Promise<any> {
        return request(RequestMethod.PATCH, url, body, options)
    }
    /**
     * Constructs a `PATCH` request that interprets the body as a JSON object
     * and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param body The resources to add/update.
     * @param options The HTTP options to send with the request.
     *
     * @return response body in the requested type by default JSON.
     */
    static put(url: string, body: any, options: Options): Promise<any> {
        return request(RequestMethod.PUT, url, options)
    }
    /**
     * Constructs a `DELETE` request that interprets the body as a JSON object
     * and returns the full event stream.
     *
     * @param url The endpoint URL.
     * @param options The HTTP options to send with the request.
     *
     * @return response body in the requested type by default JSON.
     */
    static delete(url: string, options: Options): Promise<any> {
        return request(RequestMethod.DELETE, url, undefined, options)
    }
}
/**
 * A constructor function that generates by means of the library that is being used the corresponding request through a method, url and options.
 *
 * The definition of will be implemented, will be varied depending on the library used
 *
 * @param method  The HTTP method.
 * @param url     The endpoint URL.
 * @param options The HTTP options to send with the request.
 *
 * */
function request(method: RequestMethod, url: string, body: any, options?: Options) {
    /**
     * In this line the object that will be sent in the request will be defined, which will be different depending on the library that is implemented.
     * Ex with Axios : { url, method , data: options.body ,... another params }
     * Ex with node-fetch : { url, method , body : options.body , ... another params }
     */
    /* HERE STARTS YOUR CODE */
    // This time we are using Axios,  https://www.npmjs.com/package/axios#request-config
    const dirtyConfig: Object = {
        method,
        url,
        data: body,
        params: options?.params,
        headers: options?.headers,
        withCredentials: options?.withCredentials,
        responseType: options?.responseType,
        timeout: 0
    }

    /* HERE ENDS YOUR CODE */
    const cleanConfig = cleanConfigHttp(dirtyConfig)
    return axios(cleanConfig)
}

/**
 * Receives an object and deletes the properties that are empty or invalid
 *
 * @param source The object that needs to be cleaned
 *
 * @return response body cleaned, ready to be sended to the HTTP Client.
 */

function cleanConfigHttp(source: any) {
    let target = {}
    Object.keys(source).forEach((key: string) => {
        if (source[key] != null && source[key] !== undefined) {
            target = { ...target, [key]: source[key] }
        }
    })
    return target
}
