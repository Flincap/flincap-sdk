import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface FlincapApiResponse<T> {
  data: T;
}

export interface FlincapError {
  message: string;
  code: string;
}

export class FlincapApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string, authToken?: string) {
    const config: AxiosRequestConfig = {
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (authToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }

    this.axiosInstance = axios.create(config);
  }

  public async getRate(selectedCrypt: string, selectedFiat: string): Promise<FlincapApiResponse<any>> {
    try {
      const response: AxiosResponse<FlincapApiResponse<any>> = await this.axiosInstance.get('/v1/get-rate', {
        params: {
          selectedCrypt,
          selectedFiat,
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  public async getExchange(): Promise<FlincapApiResponse<any>> {
    try {
      const response: AxiosResponse<FlincapApiResponse<any>> = await this.axiosInstance.get('/v1/get-exchange');

      return response.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  public async createTransaction(transactionData: any): Promise<FlincapApiResponse<any>> {
    try {
      const response: AxiosResponse<FlincapApiResponse<any>> = await this.axiosInstance.post('/v1/create-transaction', transactionData);

      return response.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  public async getTransaction(transactionId: string): Promise<FlincapApiResponse<any>> {
    try {
      const response: AxiosResponse<FlincapApiResponse<any>> = await this.axiosInstance.get(`/v1/get-transactions/${transactionId}`);

      return response.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  public async getTransactionHistory(transactionType: string, selectedFiat: string): Promise<FlincapApiResponse<any>> {
    try {
      const response: AxiosResponse<FlincapApiResponse<any>> = await this.axiosInstance.get('/api/v1/get-transactions', {
        params: {
          transactionType,
          selectedFiat,
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleRequestError(error);
    }
  }

  private handleRequestError(error: any): FlincapError {
    if (error.response && error.response.data) {
      return {
        message: error.response.data.message || 'Request failed',
        code: error.response.data.code || 'UNKNOWN_ERROR',
      };
    } else {
      return {
        message: error.message || 'Request failed',
        code: 'UNKNOWN_ERROR',
      };
    }
  }
}

export default FlincapApiClient;