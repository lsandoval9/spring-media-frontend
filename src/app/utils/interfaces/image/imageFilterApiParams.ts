export interface ImageFilterApiParams {
    file?: Blob,
    src?: string,
    filter: "negative" | "ascii" | "sepia" | "grayscale" | "reflect" | "blur" | string,
    value?: string,
    color?: string

}
