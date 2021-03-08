import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "readableSize",
})
export class ReadableSizePipe implements PipeTransform {
    transform(size: number): string {

        if ((size / 1_000_000) >= 1) {

            return `${(size / 1_000_000).toFixed(2)} MB`;

        } else if ((size / 1_000) >= 1) {

            return `${(size / 1_000).toFixed(2)} KB`;

        }

        return `${size} Bytes`;
    }
}
