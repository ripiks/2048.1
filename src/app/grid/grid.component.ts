import { Component, OnInit, HostListener } from '@angular/core';
import { GameService } from '../game/game.service';
import { Tile } from '../game/game.model';

@Component({
  selector: 'ral-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
})
export class GridComponent implements OnInit {
  tiles: Tile[][];

  constructor(private gameService: GameService) {
    this.tiles = this.gameService.tiles;
  }

  ngOnInit() {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // left arrow	37
    // up arrow	38
    // right arrow	39
    // down arrow	40

    console.log(globalThis.keyCode);

    if (globalThis.keyCode === 37) {
      this.gameService.keyPressed();
    }

    if (globalThis.keyCode === 38) {
      this.gameService.keyPressed();
    }

    if (globalThis.keyCode === 39) {
      this.gameService.keyPressed();
    }

    if (globalThis.keyCode === 40) {
      this.gameService.keyPressed();
    }
  }
}
