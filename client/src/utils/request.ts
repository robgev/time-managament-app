import { get as getToken } from 'utils/token';

interface IRequest {
  route: string;
  method?: string;
  body?: Record<string, any>;
}

class Request {
  baseUrl: string;
  token: string | null;

  constructor() {
    this.baseUrl = "http://localhost:8080";
    this.token = getToken();
  }

  async _request(route: string, requestParams: RequestInit) {
    const request = await fetch(`${this.baseUrl}/${route}`, {
      ...requestParams,
      headers: {
        ...requestParams.headers,
        'Content-Type': 'application/json',
        'Accept': '*/*',
      }
    });
    const response = await request.json();

    return response
  }

  async createAuthorized({ route, method, body = {} } : IRequest) {
    const response = await this._request(route, {
      method,
      ...(method !== 'GET' ? { body: JSON.stringify(body) } : {}),
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    })

    return response;
  }

  async create({ route, method, body = {} } : IRequest) {
    const response = await this._request(route, {
      method,
      ...(method !== 'GET' ? { body: JSON.stringify(body) } : {})
    })

    return response;
  }

  async createExport({ route } : IRequest) {
    const request = await fetch(`${this.baseUrl}/${route}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        authorization: `Bearer ${this.token}`,
      }
    });
    const response = await request.blob();

    return response
  }

  setAuthToken(token: string | null) {
    this.token = token
  }
}

export default new Request();
