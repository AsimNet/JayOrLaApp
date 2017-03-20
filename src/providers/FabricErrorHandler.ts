import {Injectable} from "@angular/core";
import {Analytics} from "./analytics";
import {IonicErrorHandler } from 'ionic-angular';
import * as stacktrace from 'stacktrace-js';

@Injectable()
export class FabricErrorHandler extends IonicErrorHandler {
    
    constructor (public analytics: Analytics) {
        super();
    }

    handleError(error) {
        // do something with the exception
        console.log("Analytics: "+ this.analytics + " ERROR MESSAGE: "+ error.message);
        (<any>window).fabric.Crashlytics.addLog('crash triggered');
        stacktrace.get().then(
            trace => (<any>window).fabric.Crashlytics.sendNonFatalCrash(error.message, trace)
        );

        super.handleError(error);
    }
}