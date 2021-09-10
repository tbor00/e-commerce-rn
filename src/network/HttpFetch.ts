import HttpClient from './HttpClient'

const HttpFetch = async (method: string, url: string, body?: any, token?: string | undefined) => {
    try {
        let params
        if (body) {
            params = {
                method: method,
                headers: token
                    ? {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`
                      }
                    : {
                          'Content-Type': 'application/json'
                      },
                body: JSON.stringify(body)
            }
        } else {
            params = {
                method: method,
                headers: token
                    ? {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`
                      }
                    : {
                          'Content-Type': 'application/json'
                      }
            }
        }

        const response = await fetch(url, params)
        const data = await response.json()
        return data
    } catch (err) {
        return err
    }
}

export const REACT_APP_CONTENT = 'http://10.0.2.2:1337'

export default HttpFetch
