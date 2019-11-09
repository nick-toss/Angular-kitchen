import { trigger, state, style, transition, animate } from '@angular/animations'


export const appears = trigger('appears', [

    state('show', style({
        opacity: 1
    })),

    transition('void => show', [
        style({
            opacity: 0
        }),
        animate(500)
    ]),

    transition('show => void', animate(200,
        style({
             opacity: 0
        })
    ))

])