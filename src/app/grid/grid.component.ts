import { Component, OnInit, HostListener } from '@angular/core';
import { GameService } from '../game/game.service';
import { Tile } from '../game/game.model';

@Component({
  selector: 'ral-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],¨
  
})
export class GridComponent implements OnInit {
  tiles: Tile[];

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

    console.log(event.keyCode);

    if (event.keyCode === 37) {
      this.gameService.nextStep('LEFT');
    }

    if (event.keyCode === 38) {
      this.gameService.nextStep('UP');
    }

    if (event.keyCode === 39) {
      this.gameService.nextStep('RIGHT');
    }

    if (event.keyCode === 40) {
      this.gameService.nextStep('DOWN');
    }
  }
}
