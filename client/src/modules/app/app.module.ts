import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTES} from './routes';
import {APP_SERVICES} from './services';
import {APP_COMPONENTS} from './components';
import {RootComponent} from './components/root/root.component';
import {APP_DIRECTIVES} from './directives';
import {SharedModule} from '../shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerService} from '../shared/services/serviceWorker.service';
import {InstallBannerService} from '../shared/services/installBanner.service';

@NgModule({
    declarations: [
        ...APP_COMPONENTS,
        ...APP_DIRECTIVES,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(ROUTES, { useHash: true }),
        SharedModule.forRoot(),
    ],
    bootstrap: [RootComponent],
    providers: APP_SERVICES,
})
export class AppModule {
    constructor(serviceWorker: ServiceWorkerService, installBannerService: InstallBannerService) {
        serviceWorker.register();
        installBannerService.start();
    }
}
