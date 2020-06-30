import { Injectable } from '@angular/core';
import { Tile } from './game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  tiles: Tile[] = [];

  constructor() {
    for (let i = 0; i < 16; i++) {
      this.tiles.push({
        id: i,
        value: 0,
      });
    }
  }

  nextStep(direction: string) {
    switch (direction) {
      case 'UP':
        this.goUP();
      case 'LEFT':
        this.goLeft();
      case 'DOWN':
        this.goDown();
      case 'RIGHT':
        this.goRight();
    }
  }
  goDown(){

  }
  goUP(){

  }
  goLeft(){

  }
  goRight(){

  }
}
