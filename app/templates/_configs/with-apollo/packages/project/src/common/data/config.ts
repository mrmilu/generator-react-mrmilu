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

  async query<T>(queryNode: DocumentNode, variables?: Record<string, any>): Promise<T> {
    const { data, errors, error } = await this.instance.query<T>({ query: queryNode, variables });
    if (errors?.length) {
      return Promise.reject(errors);
    }
    if (error) {
      return Promise.reject(error);
    }
    return data;
  }

  async mutate<T>(mutationNode: DocumentNode, variables?: Record<string, any>): Promise<T | null> {
    const { data, errors } = await this.instance.mutate<T>({ mutation: mutationNode, variables });
    if (errors?.length) {
      return Promise.reject(errors);
    }
    return data === undefined ? null : data;
  }
}

export default new HttpClient();
