import {GamesModel} from "./games.model";
import {Meta} from "./meta.model";

export interface GetGamesModel {
  idTeam?: number;
  data: GamesModel[];
  meta: Meta;
}
