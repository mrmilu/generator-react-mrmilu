import { JsonObject, JsonProperty } from 'json2typescript';
import { SupportEntity } from './accounts';

@JsonObject('AccountsGetDataEntity')
export class AccountsGetDataEntity {
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

@JsonObject('AccountsGetResponseEntity')
export class AccountsGetResponseEntity {
  @JsonProperty('data', AccountsGetDataEntity)
  data = new AccountsGetDataEntity();
  @JsonProperty('support', SupportEntity)
  support = new SupportEntity();
}
