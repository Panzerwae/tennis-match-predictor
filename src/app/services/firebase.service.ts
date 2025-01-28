import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Player } from '../models/player.model'; // Import Player model
import { Match } from '../models/match.model'; // Import Match model
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private firestore: AngularFirestore) {}

  // CRUD for Players
  getPlayers(): Observable<Player[]> {
    return this.firestore.collection<Player>('players').valueChanges({ idField: 'id' });
  }

  addPlayer(player: Player): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('players').doc(id).set({ ...player, id });
  }

  deletePlayer(playerId: string): Promise<void> {
    return this.firestore.collection('players').doc(playerId).delete();
  }

  // CRUD for Matches
  getMatches(): Observable<Match[]> {
    return this.firestore.collection<Match>('matches').valueChanges({ idField: 'id' });
  }

  addMatch(match: Match): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('matches').doc(id).set({ ...match, id });
  }
}
