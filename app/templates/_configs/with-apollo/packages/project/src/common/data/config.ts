import { ConfigEnv } from '../config.env';
import { ApolloClient, DocumentNode, InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export function parseUrl(url: string, params: Record<string, string | number>) {
  let finalUrl = url;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      finalUrl = finalUrl.replace(`{${key}}`, value.toString());
    });
  }
  return finalUrl;
}

class HttpClient {
  private instance: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.instance = new ApolloClient({
      uri: ConfigEnv.API_URL,
      cache: new InMemoryCache()
    });
  }

  async query<T>(queryNode: DocumentNode): Promise<T> {
    const { data, errors, error } = await this.instance.query<T>({ query: queryNode });
    if (errors?.length) {
      return Promise.reject(errors);
    }
    if (error) {
      return Promise.reject(error);
    }
    return data;
  }
}

export default new HttpClient();
