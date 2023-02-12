import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GamesModel} from "../../model/games.model";
import {GetGamesModel} from "../../model/get-games.model";
import {Team} from "../../model/team.model";
import {CommonModule} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [CommonModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule, RouterLink],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit{

  @Input() games: GetGamesModel | undefined;

  @Input() idTeam: number | undefined;

  @Output() remove: EventEmitter<GetGamesModel> = new EventEmitter<GetGamesModel>();
  team: Team | undefined;
  avgPoints: number = 0;
  avgPointsConceded: number = 0;

  ngOnInit() {
    this.team = this.games?.data[0].home_team.id === this.idTeam ? this.games?.data[0].home_team : this.games?.data[0].visitor_team
    let i =0;
    this.games?.data.forEach(game => {
       if(game.home_team.id === this.idTeam){
          game.result= game.home_team_score>game.visitor_team_score ? 'W' : 'L';
          this.avgPoints+=game.home_team_score;
          this.avgPointsConceded+=game.visitor_team_score;
       }
      if(game.visitor_team.id === this.idTeam){
        game.result= game.visitor_team_score>game.home_team_score ? 'W' : 'L';
        this.avgPoints+=game.visitor_team_score;
        this.avgPointsConceded+=game.home_team_score;
      }
      i++;
    });
    this.avgPoints=this.avgPoints/i;
    this.avgPointsConceded=this.avgPointsConceded/i;
  }

  removeTeam(): void {
    this.remove.emit(this.games);
  }
}
