import {
    animate,
    animateChild,
    group,
    keyframes,
    query,
    stagger,
    style,
    transition,
    trigger,
} from "@angular/animations";

let optional = { optional: true };

export const sliderAnimation = trigger("slideInOut", [
    transition("* <=> *", [
        query(
            ":enter",
            [animate("0ms 0ms ease", style(
                { 
                    opacity: 0, 
                    position: "fixed" ,
                    width: "100%",
                    transitionTimingFunction: "ease-out"
                }))],
            optional
        ),

        query(
            ":enter",
            [stagger(0, [
                animate('550ms 0ms cubic-bezier(0.35, 0, 0.25, 1)', keyframes([
                    style({ opacity: .1, transform: "translateX(-500px)"}),
                    style({ opacity: .2, transform: "translateX(-300px)"}),
                    style({ opacity: .3, transform: "translateX(-30px)"}),
                    style({ opacity: 1, transform: "translateX(0)"}),
                ]))
              ])],
            optional
        ),
    ]),
]);

/* function slideTo(direction: string) {

    console.log("animate")

    const optional = { optional: true };

    return [
        query(
            ":leave",
            [
                style({
                    display: "none",
                    position: "absolute"
                }),
            ],
            optional
        ),

        query(":enter", [style({
                position: "absolute",
                right: "200%"
            })
        ], optional),

        group([
            query(
                ":leave",
                [animate("600ms ease-out", style({ opacity: 0 }))],
                optional
            ),
            query(":enter", [
                animate("2s ease-out",  keyframes([
                    style({ right: '100%' }),
                    style({ right: '50%' }),
                    style({ transform: 'rotateX(160deg)' })
                  ])),
            ], optional),
        ]),
    ];
}
 */
