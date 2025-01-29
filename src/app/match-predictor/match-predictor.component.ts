import { Component, OnInit } from '@angular/core';
import { FirebaseService} from '../services/firebase.service';
import { Match } from '../models/match.model';

@Component({
  selector: 'app-match-predictor',
  templateUrl: './match-predictor.component.html',
  styleUrls: ['./match-predictor.component.scss'],
})
export class MatchPredictorComponent implements OnInit {
  matches: Match[] = []; // Today's matches

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadTodaysMatches();
  }

  // Load today's matches based on the current date
  loadTodaysMatches(): void {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    this.firebaseService.getMatchesByDate(today).subscribe((matches) => {
      this.matches = matches;
    });
  }

  // Save the updated match (with scores)
  saveMatch(match: Match): void {
    if (!match.id) {
      alert('Match ID missing! Cannot save this match.');
      return;
    }

    this.firebaseService.updateMatch(match.id, match).then(() => {
      alert('Match scores updated successfully!');
    });
  }
}
