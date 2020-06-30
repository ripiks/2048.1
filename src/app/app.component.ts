import { Component } from '@angular/core';
import { GameService } from './services/game.services';
import { GridService } from './services/grid.service';
import { DIRECTIONS } from './enums/directions';

@Component({
  selector: 'moje-appka',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [GridService, GameService],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '(window:keydown)': 'handleKeyboardEvents($event)'
  }
})

export class AppComponent {
  constructor(public game: GameService) {
    this.createNewGame();
  }

  createNewGame(): void {
    console.log( 'Zacni novou hru :) ');
    this.game.newGame();
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    // tslint:disable-next-line: deprecation
    const key = event.which || event.keyCode;
    if (key){
        event.preventDefault();
        this.game.merge(DIRECTIONS[key]);
    }
  }
}
