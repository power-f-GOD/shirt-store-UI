import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';

import { Action, APIBaseResponse, HttpStatusProps } from 'src/types';
import { API_BASE_URL, DEVELOPMENT, HTTP_BASE_URL } from 'src/constants';
import { dispatch } from 'src/redux/store';
import { snackbar } from 'src/redux/slices/misc';
import { log } from './misc';

export class Http {
  static token?: string | null = null;

  /**
   *
   * @param url url of destination e.g. /order/5df9e8t0wekc/ ... Base URL should not be included
   * @param requiresAuth if token/authentication will be required for the get action
   */
  static async get<T>(
    url: string,
    requiresAuth?: boolean
  ): Promise<APIBaseResponse<T>> {
    const response: AxiosResponse<APIBaseResponse<T>> = await axios(
      Http.returnRequestConfig('GET', `${API_BASE_URL}${url}`, requiresAuth)
    );
    const message = this.getResponseMessage(response.data.message);

    if (response.data.error) throw new Error(message);

    return {
      ...response.data,
      message
    };
  }

  /**
   *
   * @param url url of destination e.g. /public/images/image.png ... Base URL should not be included
   */
  static async getStatic<T>(url: string): Promise<APIBaseResponse<T>> {
    const response: AxiosResponse<APIBaseResponse<T>> = await axios(
      Http.returnRequestConfig('GET', `${HTTP_BASE_URL}/public${url}`, false)
    );
    const message = this.getResponseMessage(response.data.message);

    if (response.data.error) {
      dispatch(
        snackbar({
          message,
          open: true,
          severity: 'error',
          variant: 'filled'
        })
      );
    }

    return {
      ...response.data,
      message
    };
  }

  /**
   *
   * @param url (relative) url of destination e.g. /shirts/<shirt_id> ... Base URL should not be included
   * @param data data to be posted to destination
   * @param requiresAuth that is if token/authentication will be required for the get action
   */
  static async post<T, T2 = Record<string, any>>(
    url: string,
    data?: T2,
    requiresAuth?: boolean,
    restOptions?: Omit<
      AxiosRequestConfig,
      'url' | 'method' | 'data' | 'validateStatus'
    >
  ): Promise<APIBaseResponse<T>> {
    const { ...options } = restOptions || {};

    const response = await axios(
      Http.returnRequestConfig(
        'POST',
        `${API_BASE_URL}${url}`,
        requiresAuth,
        data,
        options
      )
    );
    const message = this.getResponseMessage(response.data.message);

    if (response.data.error) throw new Error(message);

    return {
      ...response.data,
      message
    };
  }

  static logError(
    error: any,
    action?: (arg: HttpStatusProps) => Action<HttpStatusProps>
  ) {
    const message = /network|connection|internet/i.test(error.message || error)
      ? "Hm.🤔 Something went wrong. Kindly check that you're connected to the internet."
      : error.message || error;

    if (message) {
      if (action) {
        dispatch(
          action({
            status: 'fulfilled',
            err: true
          })
        );
      }

      dispatch(
        snackbar({
          open: true,
          message: navigator.onLine
            ? `${message[0].toUpperCase()}${message.slice(1)}`
            : 'You are offline.',
          severity:
            navigator.onLine && !/network|connect|internet/i.test(message)
              ? 'error'
              : 'info',
          variant: 'filled'
        })
      );
    }

    if (DEVELOPMENT) {
      log(
        `[${action?.name || 'unknown'}] An error occured: `,
        error?.message || error
      );
    }
  }

  private static returnRequestConfig(
    method: AxiosRequestConfig['method'],
    url: string,
    requiresAuth?: boolean,
    data?: any,
    restOptions?: Omit<
      AxiosRequestConfig,
      'url' | 'method' | 'data' | 'validateStatus'
    >
  ): AxiosRequestConfig {
    return {
      ...(restOptions || {}),
      url,
      method,
      headers: {
        ...(restOptions?.headers || {}),
        ...(requiresAuth && Http.token
          ? { Authorization: `Bearer ${Http.token}` }
          : {}),
        'Content-Type': restOptions?.headers?.contentType || 'application/json'
      },
      data,
      validateStatus: (status) =>
        !/^(2|3|4|5)/.test(`${status}`) ? false : true
    };
  }

  private static getResponseMessage = (message?: string[] | string) => {
    const finalMessage =
      (!message
        ? message
        : Array.isArray(message)
        ? message.map((line) => line.replace(/^\w+(\.\d+)?\. /g, ' ').trim())[0]
        : message) || '';

    return finalMessage;
  };
}
