import { Injectable } from '@angular/core';
import { AnimationMetadata, trigger, state, style, transition, animate } from '@angular/animations';
@Injectable()
export class GameControllerService {
    public static makeAnimations(): Array<AnimationMetadata> {
        const list: Array<AnimationMetadata> = [];
        for (let i = -3; i <= 3; i++ ){
            for (let j = -3; j <= 3; j++ ){
                list.push(
                    state(
                        'tile' + i.toString() + j.toString(),
                        style({ top: i * 115, left: j * 115})
                    )
                );
            }
        }
        list.push(transition('* => *', animate('2s')));
        return list;
    }
    public static attachControler(): void {
        document.addEventListener('keydown', this.processKeyPress);
    }
    public static detachController(): void {
        document.removeEventListener('keydown', this.processKeyPress);
    }
    private static processKeyPress(evt: KeyboardEvent): void {
        // tslint:disable-next-line: deprecation
        switch (evt.keyCode) {
            case 37:
                H.processLeftArrow();
                break;
            case 38:
                H.processUpArrow();
                break;
            case 39:
                H.processRightArrow();
                break;
            case 40:
                H.processDownArrow();
                break;
        }
    }
    constructor(){
    }
}

class H {
    public static processLeftArrow(): void {
        alert('kliknuls vlevo');
    }
    public static processUpArrow(): void {
        alert('kliknuls nahoru');
    }
    public static processRightArrow(): void{
        alert('kliknuls do prava');
    }
    public static processDownArrow(): void {
        alert('kliknuls dolu');
    }
}