import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";

@Component({
    selector: "app-detector-card-result",
    templateUrl: "./detector-card-result.component.html",
    styleUrls: ["./detector-card-result.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectorCardResultComponent {

    @Input() result: detectorResultI|undefined|null;

    @Input() file: File|null|undefined;

    constructor(
        public detectorService: DetectorService,
        private shareService: ShareImageService,
        private router: Router) {}

    showWebpError(): boolean {
        if (this.result?.mimetype === "image/webp") {
            return true;
        }

        return false;
    }

    navigateToFilters(): void {

        if (!this.file || !this.result) {
            return
        }

        if (
            this.detectorService.isValidTypeOrMimetype(
                this.result?.mimetype,
                this.file
            )
        ) {

            this.shareService.pushImage(this.file);

            this.router.navigateByUrl("/filters");


        } else {

            this.file = this.detectorService.setImageExtension(
                this.result,
                this.file
            );

            this.shareService.pushImage(this.file);

            this.router.navigateByUrl("/filters");
        }
    }
}
