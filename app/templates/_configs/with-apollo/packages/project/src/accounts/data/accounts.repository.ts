import { JsonConvert } from 'json2typescript';
import HttpClient from '../../common/data/config';
import { AccountsListDataEntity, AccountsListResponseEntity } from '../domain/models/accounts-list';
import { rickAndMortyCharactersQuery } from './queries/rickAndMortyCharactersQuery';
import type { RickAndMortyCharactersQuery } from './queries/__generated__/RickAndMortyCharactersQuery';
import { AccountsGetDataEntity } from '../domain/models/accounts-get';
import type { RickAndMortyCharacterByIdQuery } from './queries/__generated__/RickAndMortyCharacterByIdQuery';
import { rickAndMortyCharacterByIdQuery } from './queries/rickAndMortyCharacterByIdQuery';

const jsonConverter = new JsonConvert();

export class AccountsRepository {
  static async getAccountsList(): Promise<AccountsListResponseEntity> {
    const res = await HttpClient.query<RickAndMortyCharactersQuery>(rickAndMortyCharactersQuery);
    const accountsList = new AccountsListResponseEntity();
    accountsList.data = res.characters?.results?.map((data) => jsonConverter.deserializeObject(data, AccountsListDataEntity)) ?? [];
    return accountsList;
  }

  static async getAccountId(id: string): Promise<AccountsGetDataEntity> {
    const { character } = await HttpClient.query<RickAndMortyCharacterByIdQuery>(rickAndMortyCharacterByIdQuery, { id });
    return jsonConverter.deserializeObject(character, AccountsGetDataEntity);
  }
}
