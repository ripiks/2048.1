import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { gameReducer } from './reducers/game.reducer';
import { GameService } from './services/game.services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TileComponent } from './tile/tile.component';
import { GridComponent } from './grid/grid.component';


@NgModule({
  declarations: [
    AppComponent,
    TileComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
