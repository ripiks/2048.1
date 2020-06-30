import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Tile } from './../tile';
import { GameControllerService } from '../services/gamecontroller.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css'],
  providers: [GameControllerService]
})

export class GridComponent {
  @Input() tiles: Tile[];

  constructor() { }
}
