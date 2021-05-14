import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { DetectorService } from "src/app/core/http/detector/detector.service";
import { ShareImageService } from "src/app/core/services/share-image/share-image.service";
import { detectorResultI } from "src/app/utils/interfaces/detectorResult.inteface";
import memo from "memo-decorator"

@Component({
    selector: "app-detector-card-result",
    templateUrl: "./detector-card-result.component.html",
    styleUrls: ["./detector-card-result.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetectorCardResultComponent implements OnChanges, OnInit {
    @Input() result: detectorResultI | undefined | null;

    @Input() inputFile: File | null | undefined;

    constructor(
        public detectorService: DetectorService,
        private shareService: ShareImageService,
        private router: Router
    ) {}

    @memo()
    showWebpError(): boolean {
        if (this.result?.mimetype === "image/webp") {
            return true;
        }

        return false;
    }

    ngOnChanges() {
        console.log(this.inputFile);
    }

    ngOnInit() {
        console.log(this.inputFile)
    }

    navigateToFilters(): void {
        if (!this.inputFile || !this.result) {
            return;
        }

        if (
            this.detectorService.isValidTypeOrMimetype(
                this.result?.mimetype,
                this.inputFile
            )
        ) {
            this.shareService.pushImage(this.inputFile);

            this.router.navigateByUrl("/filters");
        } else {
            this.inputFile = this.detectorService.setImageExtension(
                this.result,
                this.inputFile
            );

            this.shareService.pushImage(this.inputFile);

            this.router.navigateByUrl("/filters");
        }
    }
}
