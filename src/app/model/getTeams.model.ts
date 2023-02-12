import {Team} from "./team.model";
import {Meta} from "./meta.model";

export interface GetTeamsModel {
  data: Team[];
  meta: Meta;
}
