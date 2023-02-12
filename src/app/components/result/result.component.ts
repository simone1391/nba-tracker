import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {NbaTrackerService} from "../../services/nba-tracker.service";
import {GetGamesModel} from "../../model/get-games.model";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Team} from "../../model/team.model";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule,RouterLink],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent {
  games: GetGamesModel | undefined;
  team: Team | undefined;

  constructor(private nbaTrackerService: NbaTrackerService,private ativatedRoute:ActivatedRoute) {
    this.ativatedRoute.paramMap.subscribe(param => {
      let idTeam = param.get('teamCode');
      if(idTeam){
        this.nbaTrackerService.getGames(Number(idTeam)).subscribe((res: GetGamesModel) => {
          this.games = res;
          this.team = this.games?.data[0].home_team.id === Number(idTeam) ? this.games?.data[0].home_team : this.games?.data[0].visitor_team
        });
      }
    });

  }

}
