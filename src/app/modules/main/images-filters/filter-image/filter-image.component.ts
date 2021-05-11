import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ImageStateService } from "src/app/core/services/image-state/image-state.service";
import { ImageI } from "src/app/utils/interfaces/image/image.interface";

@Component({
    selector: "app-filter-image",
    templateUrl: "./filter-image.component.html",
    styleUrls: ["./filter-image.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterImageComponent implements OnInit {

    originalImage= this.imageStateService.originalImageSubject;

    resultImage = this.imageStateService.resultImageSubject;

    isOriginalImageToggled = this.imageStateService.isOriginalImageToggledSubject;

    @Output() toggleImageEmitter = new EventEmitter<void>();

    constructor(public imageStateService: ImageStateService) {}

    ngOnInit(): void {
    }

    toggleImage() {

        this.toggleImageEmitter.emit();

    }
}
