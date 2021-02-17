import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
    
    @Output()
    toggleSideNavEmitter: EventEmitter<void> = new EventEmitter<void>();

    faBars: IconDefinition = faBars;

    githubIcon: IconDefinition = faGithub;

    constructor() {}

    ngOnInit(): void {}

    toggleSideNav = (): void => {
        this.toggleSideNavEmitter.emit();
    };
}
