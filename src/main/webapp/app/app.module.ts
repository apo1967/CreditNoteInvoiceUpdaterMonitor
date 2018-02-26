import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2Webstorage } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { CreditNoteInvoiceUpdaterMonitorSharedModule, UserRouteAccessService } from './shared';
import { CreditNoteInvoiceUpdaterMonitorAppRoutingModule} from './app-routing.module';
import { CreditNoteInvoiceUpdaterMonitorHomeModule } from './home/home.module';
import { CreditNoteInvoiceUpdaterMonitorAdminModule } from './admin/admin.module';
import { CreditNoteInvoiceUpdaterMonitorAccountModule } from './account/account.module';
import { CreditNoteInvoiceUpdaterMonitorEntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { StateStorageService } from './shared/auth/state-storage.service';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ErrorComponent
} from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        CreditNoteInvoiceUpdaterMonitorAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        CreditNoteInvoiceUpdaterMonitorSharedModule,
        CreditNoteInvoiceUpdaterMonitorHomeModule,
        CreditNoteInvoiceUpdaterMonitorAdminModule,
        CreditNoteInvoiceUpdaterMonitorAccountModule,
        CreditNoteInvoiceUpdaterMonitorEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        PaginationConfig,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                StateStorageService,
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class CreditNoteInvoiceUpdaterMonitorAppModule {}
