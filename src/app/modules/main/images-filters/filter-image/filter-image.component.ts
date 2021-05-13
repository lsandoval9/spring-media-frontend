import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ImageStateService } from "src/app/core/services/image-state/image-state.service";

@Component({
    selector: "app-filter-image",
    templateUrl: "./filter-image.component.html",
    styleUrls: ["./filter-image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterImageComponent implements OnInit {

    @Input() originalImage: Blob | undefined | null;

    @Input() resultImage: Blob | undefined | null;

    @Input() isOriginalImageToggled: boolean|null|undefined;

    @Input() filterName: string|undefined|null;

    @Output() toggleImageEmitter = new EventEmitter<void>();

    constructor(public imageStateService: ImageStateService) {}

    ngOnInit(): void {
    }

    toggleImage() {

        this.toggleImageEmitter.emit();

    }
}
