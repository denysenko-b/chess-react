import { Colors } from './Colors';
import { King } from './figures/King';
export class Player {
    color: Colors;
    kingIsUnderAttack: boolean = false;
    loser: boolean = false;

    constructor(color: Colors) {
        this.color = color;
    }

    public checkmate() {
        if (this.kingIsUnderAttack) {
            this.loser = true;
        }
        this.kingIsUnderAttack = true;
    }
}
