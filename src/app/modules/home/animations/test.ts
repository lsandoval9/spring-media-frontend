import {
    state,
    keyframes,
    animate,
    style,
    transition,
    trigger,
} from "@angular/animations";

export const testAnimation = [
    trigger("test", [
        state(
            "open",
            style({
                height: "200px",
                opacity: 1,
                backgroundColor: "yellow",
            })
        ),

        state(
            "closed",
            style({
                height: "100px",
                opacity: 0.5,
                backgroundColor: "green",
            })
        ),

        transition("open <=> closed", [animate("3s")]),
    ]),
];
