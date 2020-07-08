import { Injectable } from '@angular/core';
import { Tile } from './game.model';

@Injectable({ providedIn: 'root' })
export class GameService {
  tiles: Tile[][] = [];
  grid;
  grid_new;
  score = 0;
  a = 4;
  blankGrid = () => {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
  }
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
  operate(row) {
    row = this.slide(row);
    row = this.combine(row);
    row = this.slide(row);
    return row;
  }
  combine(row) {
    for (let i = this.a - 1; i >= 1; i--) {
      const a = row[i];
      const b = row[i - 1];
      if (a === b) {
        row[i] = a + b;
        this.score += row[i];
        row[i - 1] = 0;
      }
    }
    return row;
  }
  slide(row) {
    let arr = row.filter((val) => val);
    const missing = 4 - arr.length;
    const zeros = Array(missing).fill(0);
    arr = zeros.concat(arr);
    return arr;
  }
  compare(a, b) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (a[i][j] !== b[i][j]) {
          return true;
        }
      }
    }
    return false;
  }
  copyGrid(grid) {
    const extra = this.blankGrid();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        extra[i][j] = grid[i][j];
      }
    }
    return extra;
  }
  flipGrid(grid) {
    for (let i = 0; i < 4; i++) {
      grid[i].reverse();
    }
    return grid;
  }
  transposeGrid(grid) {
    const newGrid = this.blankGrid();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        newGrid[i][j] = grid[j][i];
      }
    }
    return newGrid;
  }
// addNumber() {
//  let grid: number[][];
//  let grid_new;
//  const options = [];
//  for (let i = 0; i < 4; i++) {
//    for (let j = 0; j < 4; j++) {
//      if (grid[i][j] === 0) {
//        options.push({
//          x: i,
//          y: j,
//        });
//      }
//    }
//  }
//  if (options.length > 0) {
//    const spot = random(options);
//    const r = random(1);
//    grid[spot.x][spot.y] = r > 0.1 ? 2 : 4;
//    grid_new[spot.x][spot.y] = 1;
//  }
// 

  keyPressed() {
    let flipped = false;
    let rotated = false;
    let played = true;
    switch (globalThis.keyCode) {
      case 'DOWN_ARROW':
        break;
      case 'UP_ARROW':
        this.grid = this.flipGrid(this.grid);
        flipped = true;
        break;
      case 'RIGHT_ARROW':
        this.grid = this.transposeGrid(this.grid);
        rotated = true;
        break;
      case 'LEFT_ARROW':
        this.grid = this.transposeGrid(this.grid);
        this.grid = this.flipGrid(this.grid);
        rotated = true;
        flipped = true;
        break;
      default:
        played = false;
    }
    if (played) {
      const past = this.copyGrid(this.grid);
      for (let i = 0; i < 4; i++) {
        this.grid[i] = this.operate(this.grid[i]);
      }
      const changed = this.compare(past, this.grid);
      if (flipped) {
        this.grid = this.flipGrid(this.grid);
      }
      if (rotated) {
        this.grid = this.transposeGrid(this.grid);
      }
      if (changed) {
        // addNumber();
      }
    }
  }
}
