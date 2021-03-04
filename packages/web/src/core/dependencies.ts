import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { History } from 'history';

export interface IStorage {
  getItem(key: string): string;
  setItem(key: string, item: string): void;
  clear(): void;
  removeItem(key: string): void;
}

export type AppApolloClient = ApolloClient<NormalizedCacheObject>;

export interface AppDependencies {
  storage: IStorage;
  session: IStorage;
  apolloClient: ApolloClient<NormalizedCacheObject>;
  history: History;
}
