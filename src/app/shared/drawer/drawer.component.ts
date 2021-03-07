import { Component, OnInit } from "@angular/core";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-drawer",
    templateUrl: "./drawer.component.html",
    styleUrls: ["./drawer.component.scss"],
})
export class DrawerComponent implements OnInit {

    githubIcon: IconDefinition = faGithub;

    constructor() {}

    ngOnInit(): void {}
}
