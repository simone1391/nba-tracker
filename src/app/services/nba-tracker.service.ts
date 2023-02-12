import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GetTeamsModel} from "../model/getTeams.model";
import {Observable} from "rxjs";
import {GetGamesModel} from "../model/get-games.model";
import {DatePipe} from "@angular/common";
import {Team} from "../model/team.model";

@Injectable({
  providedIn: 'root'
})
export class NbaTrackerService {

  private url = 'https://free-nba.p.rapidapi.com';
  private _games: GetGamesModel[] = [];
  private _selectedTeam: Team | undefined;
  constructor(private httpClient: HttpClient,private datePipe: DatePipe) {
  }

  getTeams(): Observable<GetTeamsModel> {
    return this.httpClient.get<GetTeamsModel>(this.url+'/teams', {
        headers: {
          'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
      }
    );
  }

  getGames(teamsId: number): Observable<GetGamesModel> {
    return this.httpClient.get<GetGamesModel>(this.url+'/games?page=0&'+this.getPast12Days()+'per_page=12&team_ids[]='+teamsId, {
        headers: {
          'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
          'X-RapidAPI-Host': 'free-nba.p.rapidapi.com'
        }
      }
    );
  }

  private getPast12Days(): string{
    let urlDates='';
    let now = new Date();
    urlDates+='dates[]='+this.datePipe.transform(now,'yyyy-MM-dd')+'&';
    for(let i=1;i<12;i++){
      let d = new Date();
      d.setDate(d.getDate() - i);
      urlDates+='dates[]='+this.datePipe.transform(d,'yyyy-MM-dd')+'&';
    }
    return urlDates;
  }
  get selectedTeam(): Team | undefined {
    return this._selectedTeam;
  }

  set selectedTeam(value: Team | undefined) {
    this._selectedTeam = value;
  }
  get games(): GetGamesModel[] {
    return this._games;
  }

  set games(value: GetGamesModel[]) {
    this._games = value;
  }
}
