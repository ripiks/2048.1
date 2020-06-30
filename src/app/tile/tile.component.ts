import { Component, Input, NgZone, OnInit } from '@angular/core';
import { trigger, state, style, AnimationEvent, transition, animate } from '@angular/animations';
import { Tile } from '../tile';
import { GameControllerService } from '../services/gamecontroller.service';
import { GridComponent } from '../grid/grid.component';
import { GameService } from '../services/game.services';
import { GridService } from '../services/grid.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'tile',
  templateUrl: 'tile.component.html',
  styleUrls: ['tile.component.css'],
  animations: [
    trigger('movementSlides',
        GameControllerService.makeAnimations()
    ),
    trigger('enterAnimation', [
      state('in', style({transform: 'scale(1,1'})),
      transition('void => *', [
        style({ transform: 'scale(0,0'}),
      ])
    ]),
  ]
})
export class TileComponent implements OnInit {
  @Input() tile: Tile;
  fontSize = 'ja';

  // tslint:disable-next-line: variable-name
  constructor(private game: GameService, private _ngZone: NgZone){
  }
  ngOnInit(){
    if ( this.tile.val.toString().length < 3 ){
      this.fontSize = '55px';
    }
    else if ( this.tile.val.toString().length === 3){
      this.fontSize = '45px';
    }
    else if (this.tile.val.toString().length === 4){
      this.fontSize = '35px';
    }
  }

  public postAnimationHook(e: AnimationEvent): void {
    if (e.toState !== undefined) {
      this._ngZone.run(() => {
        this.game.postAnimationTileUpdate(this.tile.newFromPos, this.tile.newFromPos, this.tile.newVal);
      });
    }
    return;
  }

  public animationStarted(e: AnimationEvent): void{
    return;
  }
}
