// File: src/app/history/history.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-history',
  template: `
    <div>
      <h2>Match History</h2>
      <div *ngFor="let match of matches">
        <h3>Date: {{ match.date }}</h3>
        <p *ngFor="let team of match.teams">
          Team 1: {{ team.player1 }} & {{ team.player2 }}
        </p>
      </div>
    </div>
  `,
})
export class HistoryComponent implements OnInit {
  matches: Match[] = [];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.firebaseService.getMatches().subscribe((matches) => {
      this.matches = matches;
    });
  }
}
