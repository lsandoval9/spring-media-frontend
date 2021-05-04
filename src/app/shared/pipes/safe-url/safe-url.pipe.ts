import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import memo from "memo-decorator";

@Pipe({
    name: "safeUrl",
})
export class SafeUrlPipe implements PipeTransform {
    constructor(private readonly sanitizer: DomSanitizer) {}

    @memo()
    public transform(url: string|undefined): SafeResourceUrl {

        if (!url) {
            return "";
        }

        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
