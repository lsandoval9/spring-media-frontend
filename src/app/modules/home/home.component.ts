import {
    Component,
    OnInit,
    AfterViewInit,
    AfterContentInit,
    ChangeDetectorRef,
} from "@angular/core";

import {
    trigger,
    transition,
    state,
    style,
    animate,
    keyframes,
} from "@angular/animations";
import { testAnimation } from "./animations/test";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"],
    animations: testAnimation,
})
export class HomeComponent implements OnInit{
    public state = "inactive";

    isOpen = true;

    constructor() {
    }

    ngOnInit(): void {}
      

    toggle = (): void  => {
        this.isOpen = !this.isOpen;
    }
    
}
