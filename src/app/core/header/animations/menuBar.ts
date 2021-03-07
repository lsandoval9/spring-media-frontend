import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from "@angular/animations";

export const menuBarAnimation: AnimationTriggerMetadata[] = [
    trigger("toggleMenuBar", [

        state(
            "open",
            style({
                backgroundColor: "#dc143c",
                transform: "rotate(90deg)",

            })
        ),

        state(
            "closed",
            style({
                backgroundColor: "#262626",
                transform: "rotate(0deg)",
            })
        ),

        transition("open <=> closed", [
            animate("0.22s")
        ])


    ]),
];
