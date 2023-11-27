import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 })),
  ]),
]);

export const loadingAnimation = trigger('loading', [
    state('loading', style({ opacity: 0.5 })),
    state('loaded', style({ opacity: 1 })),
    transition('loading => loaded', animate('300ms ease-in')),
  ]);