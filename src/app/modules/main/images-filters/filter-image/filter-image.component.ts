import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";

@Component({
    selector: "app-filter-image",
    templateUrl: "./filter-image.component.html",
    styleUrls: ["./filter-image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterImageComponent implements OnInit {

    @Input() originalImage: ImageI|undefined|null;

    @Input() resultImage: ImageI|undefined|null;

    @Input() isOriginalImageToggled!: boolean|null;

    constructor() {}

    ngOnInit(): void {
    }
}
