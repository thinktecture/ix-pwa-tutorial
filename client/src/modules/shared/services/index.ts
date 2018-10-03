import {FeatureService} from './feature.service';
import {TodoService} from './todo.service';
import {PushNotificationService} from './pushNotification.service';
import {DatabaseService} from './database.service';
import {NotificationService} from './notification.service';
import {ShareService} from './share.service';
import {AppStateService} from './appState.service';
import {ApiService} from './api.service';
import {SyncService} from './sync.service';
import {ServiceWorkerService} from './serviceWorker.service';
import {InstallBannerService} from './installBanner.service';

export const SHARED_SERVICES = [
    FeatureService,
    PushNotificationService,
    TodoService,
    ApiService,
    SyncService,
    DatabaseService,
    NotificationService,
    ShareService,
    AppStateService,
    ServiceWorkerService,
    InstallBannerService,
];
