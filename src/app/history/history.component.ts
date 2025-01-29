import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  matches: Match[] = []; // All matches
  filteredMatches: Match[] = []; // Filtered matches
  selectedDate: string = ''; // Date filter
  searchPlayer: string = ''; // Player name filter

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadAllMatches();
  }

  // Load all matches initially
  loadAllMatches(): void {
    this.firebaseService.getMatches().subscribe((matches) => {
      this.matches = matches;
    });
  }

  // Filter history by selected date or player name
  filterHistory(): void {
    if (this.selectedDate) {
      // Filter by date
      const dateFilter = this.selectedDate.split('T')[0]; // Format: YYYY-MM-DD
      this.filteredMatches = this.matches.filter(
        (match) => match.date.split('T')[0] === dateFilter
      );
    } else if (this.searchPlayer) {
      // Filter by player name
      this.filteredMatches = this.matches.filter((match) =>
        match.teams.some(
          (team) =>
            team.player1.toLowerCase().includes(this.searchPlayer.toLowerCase()) ||
            team.player2.toLowerCase().includes(this.searchPlayer.toLowerCase())
        )
      );
    } else {
      // No filters: reset
      this.filteredMatches = this.matches;
    }
  }
}
