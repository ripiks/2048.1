import { Injectable } from '@angular/core';
import { Tile } from './game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  // blankGrid() {
  //   return [
  //     [0, 0, 0, 1],
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0],
  //   ];
  // }
  
  tiles: Tile[][] = [];

  grid;
  grid_new;
  score = 0;
  a = 4;


  constructor() {
    for (let i = 0; i < this.a; i++) {
      this.tiles.push([]);
      for (let k = 0; k < this.a; k++) {
        this.tiles[i].push({
          id: i * this.a + k,
          value: 0,
        });
      }
    }
  }

  nextStep(direction: string) {
    switch (direction) {
      case 'UP':
      // this.goUP();
      case 'LEFT':
      // this.goLeft();
      case 'DOWN':
      // this.goDown();
      case 'RIGHT':
      //this.goRight();
    }
  }

  combine(row) {
    for (let i = this.a - 1; i >= 1; i--) {
      let a = row[i];
      let b = row[i - 1];
      if (a == b) {
        row[i] = a + b;
        this.score += row[i];
        row[i - 1] = 0;
      }
    }
    return row;
  }
}

