export interface ImageFilterApiParams {
    file?: Blob,
    src?: string,
    filter: "negative" | "ascii" | "sepia" | "grayscale" | "reflect" | "blur",
    value?: 1|2|3|4|5

}
