import {
    animate,
    keyframes,
    state,
    style,
    transition,
    trigger,
} from "@angular/animations";

export const loaderAnimation = [
    trigger("toggleLoader", [
        state(
            "loading",
            style({
                opacity: "1",
                backgroundColor: "black",
                color: "white"
            })
        ),

        state(
            "complete",
            style({
                display: "none",
            })
        ),

        transition("loading <=> complete", [
            animate(
                100,
                keyframes([
                    style({
                        backgroundColor: "#DC143C",
                        color: "gray",
                        offset: 0.6
                    }),

                    style({
                        backgroundColor: "#DC143C",
                        color: "black",
                        offset: 0.99
                    })
                ])
            ),
        ]),
    ]),
];
