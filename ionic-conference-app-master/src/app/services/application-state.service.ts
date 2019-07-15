import { Injectable, HostListener } from '@angular/core';


@Injectable()
export class ApplicationStateService {

    private mensajes: [];

    private mobileResolution: boolean;

    private minMidth = 768;
    private maxWidth = 1199;
    /* Medium Devices, .visible-md-* */
    private medWidth = 992;

    constructor() {
        if (window.innerWidth < this.medWidth) {
            this.mobileResolution = true;
        } else {
            this.mobileResolution = false;
        }
        this.initMensajes();
    }

    private validateInnerWidth(event): boolean {
        if (event) { console.log('Layout :: width ' + event.target.innerWidth); }
        if (window.innerWidth < this.medWidth) {
            this.mobileResolution = true;
        } else {
            this.mobileResolution = false;
        }
        return this.mobileResolution;
    }

    public isMobileResolution(): boolean {
        return this.validateInnerWidth(null);
    }

    @HostListener('window:resize', ['$event'])
    public resizeEvent(event): void {
        this.validateInnerWidth(event);
    }


    private initMensajes(): void {
        if (this.mensajes === undefined) {
        }
    }
}
