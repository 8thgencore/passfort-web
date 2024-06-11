import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios'
import { IHttpClient } from '@/services/http/IHttpClient'

export class HttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      ...config
    })
  }

  get instance(): AxiosInstance {
    return this.axiosInstance
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.get(url, { params })
    return response.data
  }

  async post<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.post(url, data)
    return response.data
  }

  async put<T>(url: string, data: any): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.put(url, data)
    return response.data
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.instance.delete(url)
    return response.data
  }
}
