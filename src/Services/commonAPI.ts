import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
export const commonAPI = async (
    httpRequest:HttpRequestMethod, 
    url: string, 
    reqBody: string, 
    reqHeader?: Record<string, string>
): Promise<AxiosResponse | any> => {
    const reqConfig: AxiosRequestConfig = {
        method: httpRequest,
        url,
        data: reqBody,
        headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
    };
    
    try {
        const result = await axios(reqConfig);
        return result; // Successful response
    } catch (err) {
        return err; // Error response
    }
}