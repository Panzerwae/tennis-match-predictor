// File: src/app/models/player.model.ts
export interface Player {
    id?: string;          // Auto-generated by Firestore
    name: string;         // Player's name
    skillLevel: number;   // Skill level (1-10)
    wins: number;         // Total wins
    losses: number;       // Total losses
  }
  