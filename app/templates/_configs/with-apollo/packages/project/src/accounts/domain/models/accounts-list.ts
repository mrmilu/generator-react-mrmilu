import { JsonObject, JsonProperty } from 'json2typescript';
import { SupportEntity } from './accounts';

@JsonObject('AccountsListDataEntity')
export class AccountsListDataEntity {
  @JsonProperty('image', String)
  avatar = '';
  @JsonProperty('type', String)
  email = '';
  @JsonProperty('name', String)
  first_name = '';
  @JsonProperty('id', String)
  id = '0';
  @JsonProperty('species', String)
  last_name = '';
}

@JsonObject('AccountsListResponseEntity')
export class AccountsListResponseEntity {
  @JsonProperty('data', [AccountsListDataEntity])
  data: AccountsListDataEntity[] = [];
  @JsonProperty('page', Number)
  page = 0;
  @JsonProperty('per_page', Number)
  per_page = 0;
  @JsonProperty('support', SupportEntity)
  support = new SupportEntity();
  @JsonProperty('total', Number)
  total = 0;
  @JsonProperty('total_pages', Number)
  total_pages = 0;
}
