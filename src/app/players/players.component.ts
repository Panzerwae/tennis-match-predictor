// File: src/app/players/players.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Player } from '../models/player.model';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
    styleUrls: ['./players.component.scss'],
  // template: `
  //   <div>
  //     <h2>Player Management</h2>
  //     <form (submit)="addPlayer()">
  //       <input [(ngModel)]="newPlayer.name" placeholder="Player Name" required />
  //       <input
  //         type="number"
  //         [(ngModel)]="newPlayer.skillLevel"
  //         placeholder="Skill Level (1-10)"
  //         required
  //         min="1"
  //         max="10"
  //       />
  //       <button type="submit">Add Player</button>
  //     </form>

  //     <ul>
  //       <li *ngFor="let player of players">
  //         {{ player.name }} (Skill: {{ player.skillLevel }})
  //         <button (click)="deletePlayer(player.id)">Delete</button>
  //       </li>
  //     </ul>
  //   </div>
  // `,
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  newPlayer: Player = { name: '', skillLevel: 1, wins: 0, losses: 0 };

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getPlayers().subscribe((players) => {
      this.players = players;
    });
  }

  addPlayer(): void {
    this.firebaseService.addPlayer(this.newPlayer).then(() => {
      this.newPlayer = { name: '', skillLevel: 1, wins: 0, losses: 0 };
    });
  }

  deletePlayer(playerId: string | undefined): void {
    if (playerId) {
      this.firebaseService.deletePlayer(playerId);
    }
  }
}
