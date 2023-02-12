import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from "@angular/material/select";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {GamesComponent} from "../games/games.component";
import {AppModule} from "../../app.module";
import {Team} from "../../model/team.model";
import {GetGamesModel} from "../../model/get-games.model";
import {NbaTrackerService} from "../../services/nba-tracker.service";
import {GetTeamsModel} from "../../model/getTeams.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule, GamesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  teams: Team[] | undefined;
  selectedTeam: Team | undefined;

  games: GetGamesModel[] = [];

  idTeam: number | undefined;

  constructor(private nbaTrackerService:NbaTrackerService) {
    this.nbaTrackerService.getTeams().subscribe((res: GetTeamsModel) => {
      this.teams=res.data;
      this.selectedTeam = this.nbaTrackerService.selectedTeam;
      this.idTeam = this.nbaTrackerService.selectedTeam?.id
    })
  }

  ngOnInit(): void {
    this.games = this.nbaTrackerService.games;
    }

  trackTeam(): void {
    this.nbaTrackerService.selectedTeam=this.selectedTeam;
    this.idTeam = this.selectedTeam?.id!;
    this.nbaTrackerService.getGames(this.idTeam).subscribe((res: GetGamesModel) => {
      res.idTeam = this.idTeam;
      this.nbaTrackerService.games.push(res);
    })
  }

  remove(event: GetGamesModel) {
    const index = this.games.indexOf(event, 0);
    if (index > -1) {
      this.games.splice(index, 1);
    }
  }
}
