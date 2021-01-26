interface IRequest {
  route: string;
  method?: string;
  body?: Record<string, any>;
}

interface IAuthorizedRequest extends IRequest {
  token: string;
}

class Request {
  baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8080";
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

  async createAuthorized({ route, token, method, body = {} } : IAuthorizedRequest) {
    const response = await this._request(route, {
      method,
      body: JSON.stringify(body),
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    return response;
  }

  async create({ route, method, body = {} } : IRequest) {
    const response = await this._request(route, {
      method,
      body: JSON.stringify(body),
    })

    return response;
  }
}

export default new Request();
