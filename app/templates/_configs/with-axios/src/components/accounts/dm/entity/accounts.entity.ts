import { JsonObject, JsonProperty } from 'json2typescript';
import type { Support } from '../accounts.types';

@JsonObject('SupportEntity')
export class SupportEntity implements Support {
  @JsonProperty('text', String)
  text = '';
  @JsonProperty('url', String)
  url = '';
}
