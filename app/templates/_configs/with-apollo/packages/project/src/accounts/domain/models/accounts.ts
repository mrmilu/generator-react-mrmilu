import { JsonObject, JsonProperty } from 'json2typescript';

@JsonObject('SupportEntity')
export class SupportEntity {
  @JsonProperty('text', String)
  text = '';
  @JsonProperty('url', String)
  url = '';
}
