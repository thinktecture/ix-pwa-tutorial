import {Component, OnDestroy, OnInit} from '@angular/core';
import {UpdateService} from '../../services/update.service';
import {PushNotificationService} from '../../../shared/services/pushNotification.service';
import {BlurService} from '../../services/blur.service';
import {Subscription} from 'rxjs';
import {ServiceWorkerService} from '../../../shared/services/serviceWorker.service';

@Component({
    selector: 'app-root',
    templateUrl: 'root.component.html',
})
export class RootComponent implements OnInit, OnDestroy {
    private _blurChangeSubscription: Subscription;

    public isBlurActive = false;

    constructor(private _serviceWorker: ServiceWorkerService,
                private _pushNotificationService: PushNotificationService,
                private _updateService: UpdateService,
                private _blurService: BlurService) {
    }

    public async ngOnInit(): Promise<void> {
        await this._pushNotificationService.register();
        this._updateService.register();
        this._blurService.onBlurChange.subscribe(blur => this.isBlurActive = blur);
    }

    public ngOnDestroy(): void {
        this._pushNotificationService.unregister();
        this._updateService.unregister();
        if (this._blurChangeSubscription) {
            this._blurChangeSubscription.unsubscribe();
        }
    }
}
