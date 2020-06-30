import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GridService } from './grid.service';
import { ITile } from './../interfaces/ITile';
import { Tile } from './../tile';
import { IGame } from './../interfaces/IGame';
import { DIRECTIONS } from './../enums/directions';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';

@Injectable()
export class GameService {
    public tiles: Observable<ITile[]>;
    public currentScore: Observable<number>;
    public bestScore: Observable<number>;
    public isGameOver: Observable<boolean>;

    constructor(
        // tslint:disable-next-line: variable-name
        private _gService: GridService,
        // tslint:disable-next-line: variable-name
        private _store: Store<any>
         ) {
        this._loadGame();
    }
private _loadGame(): void {

    const store$ = this._store.select<IGame>('game');
    this.currentScore = store$.map(({currentScore}: IGame) => currentScore);
    this.bestScore = store$.map(({bestScore}: IGame) => bestScore);
    this.tiles = store$.map(({tiles}: IGame) => tiles);
}

newGame(): void {
    this._gService.buildEmptyBoard();
    this._gService.initBoard();
    this._store.dispatch({type: 'NOVA_HRA', payload: {tiles : this._gService.tiles}});
}

updateScore(newVal: number){
    this._store.dispatch({type: 'update_score', payload: {newVal: 2}});
}
merge(key: string): void{
    let score = 0;
    const scope = this;

    if (key === 'levá'){
        score = this._gService.moveLeft();
    } else if (key === 'pravá'){
        score = this._gService.moveRight();
    } else if ( key === 'nahoru'){
        score = this._gService.moveUp();
    } else if (key === 'dolu'){
        score = this._gService.moveDown();
    } else {
    }
    if (score){
        this._store.dispatch({type: 'pridej_score', payload: {score: score}});
    }
    if (this._gService.getEmptyCells().length){
        // tslint:disable-next-line: only-arrow-functions
        GridService.waitForAnimations.then(function(data){
            console.log(data);
            scope._gService.fillRandom();
        });
    }
}

postAnimationTileUpdate(newFromPos: number, newToPos: number, newVal: number): void{
    const fromPos = this._gService.tiles[newFromPos];
    this._gService.tiles[newFromPos] = new Tile(fromPos.x, fromPos.y, 0);
    this._gService.tiles[newToPos].setVal(newVal);
    GridService.decrementAnimationCounter();

}}
