import {Inject, Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {WINDOW} from './window.token';
import {FeatureService} from './feature.service';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';
import {ServiceWorkerService} from './serviceWorker.service';
import {environment} from '../../../environments/environment';
import {NotificationPermission} from './notificationPermission';

@Injectable()
export class PushNotificationService {
    private _pushSubscription: PushSubscription;

    constructor(
        @Inject(WINDOW) window, private _featureService: FeatureService,
        private _apiService: ApiService,
        private _serviceWorker: ServiceWorkerService
    ) {
    }

    public async register(): Promise<void> {
        if (!this._featureService.detectFeature(BrowserFeatureKey.PushAPI)) {
            return;
        }

        const permission = await Notification.requestPermission();
        if (permission === NotificationPermission.granted) {
            this._serviceWorker.serviceWorkerRegistration.subscribe(async (serviceWorkerRegistration) => {
                if (serviceWorkerRegistration) {
                    const pushOptions: PushSubscriptionOptionsInit = { userVisibleOnly: true };
                    let key = atob(environment.push.publicKey.replace(/_/g, '/').replace(/-/g, '+'));
                    let applicationServerKey = new Uint8Array(new ArrayBuffer(key.length));
                    for (let i = 0; i < key.length; i++) {
                        applicationServerKey[i] = key.charCodeAt(i);
                    }
                    pushOptions.applicationServerKey = applicationServerKey;

                    try {
                        this._pushSubscription = await serviceWorkerRegistration.pushManager.subscribe(pushOptions);
                        this._apiService.post('push/register', this._pushSubscription).subscribe();
                    } catch (e) {
                        console.log('Push can\'t be registered.', e);
                    }
                }
            });
        }
    }

    public async unregister(): Promise<boolean> {
        if (this._pushSubscription) {
            return await this._pushSubscription.unsubscribe();
        }
    }
}
