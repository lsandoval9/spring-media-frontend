import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faBars, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Observer } from "rxjs";
import { ToggleLoadingBarService } from "../services/toggle-loading-bar/toggle-loading-bar.service";

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

    isLoading!: boolean;

    loadingObserver: Observer<boolean> = {
        next: (value: boolean) => {
            this.isLoading = value;
        },
        error: (err) => {
            console.log(err);
        },
        complete: () => {
            console.log("exiting loading bar");
        },
    };

    constructor(private isLoadingService: ToggleLoadingBarService) {}

    ngOnInit(): void {
        this.isLoadingService
        .getSubject()
        .subscribe(this.loadingObserver);
    }

    toggleSideNav = (): void => {
        this.toggleSideNavEmitter.emit();
    };
}
