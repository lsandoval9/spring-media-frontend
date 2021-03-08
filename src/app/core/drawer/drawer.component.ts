import { Component, OnInit } from "@angular/core";
import { faGithub, faSlideshare } from "@fortawesome/free-brands-svg-icons";
import { faAddressCard, faChevronRight, faFileImage, faSlidersH, IconDefinition } from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: "app-drawer",
    templateUrl: "./drawer.component.html",
    styleUrls: ["./drawer.component.scss"],
})
export class DrawerComponent implements OnInit {

    githubIcon: IconDefinition = faGithub;

    fileImageIcon: IconDefinition = faFileImage;

    sliderIcon: IconDefinition = faSlidersH;

    addressCardIcon: IconDefinition = faAddressCard;

    rightArrowIcon: IconDefinition = faChevronRight;


    constructor() {}

    ngOnInit(): void {}
}
