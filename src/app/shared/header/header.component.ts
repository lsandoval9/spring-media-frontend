import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    AfterViewInit,
    Input,
    OnChanges,
    SimpleChanges,
} from "@angular/core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars, IconDefinition } from "@fortawesome/free-solid-svg-icons";

import { menuBarAnimation } from "./animations/menuBar";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
    animations: [menuBarAnimation],
})
export class HeaderComponent implements OnInit {
    @Output()
    toggleSideNavEmitter: EventEmitter<void> = new EventEmitter<void>();

    @Input() isMenuBarOpen: boolean | undefined;

    faBars: IconDefinition = faBars;

    githubIcon: IconDefinition = faGithub;

    constructor() {}

    ngOnInit(): void {}

    toggleSideNav = (): void => {
        this.toggleSideNavEmitter.emit();
    };
}
