// File: src/app/match-predictor/match-predictor.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../services/firebase.service';
import { Player } from '../models/player.model';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-match-predictor',
  template: `
    <div>
      <h2>Match Predictor</h2>
      <button (click)="predictMatches()">Generate Matches</button>

      <div *ngIf="generatedMatches.length > 0">
        <h3>Generated Teams</h3>
        <div *ngFor="let match of generatedMatches">
          <p>
            Team 1: {{ match.teams[0].player1 }} & {{ match.teams[0].player2 }}
            vs.
            Team 2: {{ match.teams[1].player1 }} & {{ match.teams[1].player2 }}
          </p>
        </div>
      </div>
    </div>
  `,
})
export class MatchPredictorComponent implements OnInit {
  players: Player[] = [];
  generatedMatches: Match[] = [];
  historyMatrix: Map<string, Set<string>> = new Map(); // Track player pairings

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getPlayers().subscribe((players) => {
      this.players = players;
    });
  }

  predictMatches(): void {
    if (this.players.length < 4) {
      alert('At least 4 players are needed to form teams.');
      return;
    }

    const sortedPlayers = [...this.players].sort((a, b) => b.skillLevel - a.skillLevel);
    const mid = Math.floor(sortedPlayers.length / 2);

    // Split into two groups
    const groupA = sortedPlayers.slice(0, mid); // Stronger players
    const groupB = sortedPlayers.slice(mid); // Weaker players

    // Shuffle groups to avoid repetition
    this.shuffleArray(groupA);
    this.shuffleArray(groupB);

    const teams: { player1: string; player2: string; score: string }[] = [];

    // Form teams
    for (let i = 0; i < Math.min(groupA.length, groupB.length); i++) {
      const playerA = groupA[i];
      const playerB = groupB[i];

      // Ensure players haven't been teammates before
      if (this.hasPlayedTogether(playerA.name, playerB.name)) {
        continue; // Skip this pairing
      }

      teams.push({ player1: playerA.name, player2: playerB.name, score: '' });
      this.updateHistory(playerA.name, playerB.name);
    }

    // Record the match
    const match: Match = {
      date: new Date().toISOString(),
      teams: teams,
    };

    this.generatedMatches.push(match);
    this.firebaseService.addMatch(match);
  }

  hasPlayedTogether(player1: string, player2: string): boolean {
    const history1 = this.historyMatrix.get(player1) || new Set();
    const history2 = this.historyMatrix.get(player2) || new Set();

    return history1.has(player2) || history2.has(player1);
  }

  updateHistory(player1: string, player2: string): void {
    if (!this.historyMatrix.has(player1)) {
      this.historyMatrix.set(player1, new Set());
    }
    if (!this.historyMatrix.has(player2)) {
      this.historyMatrix.set(player2, new Set());
    }

    this.historyMatrix.get(player1)!.add(player2);
    this.historyMatrix.get(player2)!.add(player1);
  }

  shuffleArray(array: Player[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
