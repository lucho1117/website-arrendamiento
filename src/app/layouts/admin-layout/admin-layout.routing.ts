import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { UserEditComponent } from 'src/app/pages/register/user-edit/user-edit.component';
import { CommunicationComponent } from 'src/app/pages/communication/communication.component';
import { LocalitationComponent } from 'src/app/pages/localitation/localitation.component';
import { PaymentComponent } from 'src/app/pages/payment/payment.component';
import { LocalComponent } from 'src/app/pages/local/local.component';
import { SectorEditComponent } from 'src/app/pages/local/sector-edit/sector-edit.component';
import { LocalEditComponent } from 'src/app/pages/local/local-edit/local-edit.component';
import { RolEditComponent } from 'src/app/pages/register/rol-edit/rol-edit.component';
import { QuestionEditComponent } from 'src/app/pages/communication/question-edit/question-edit.component';
import { ResponseEditComponent } from 'src/app/pages/communication/response-edit/response-edit.component';
import { ServicesComponent } from 'src/app/pages/payment/services/services.component';
import { ServiceEditComponent } from 'src/app/pages/payment/services/service-edit/service-edit.component';
import { LocalServiceComponent } from 'src/app/pages/payment/local-service/local-service.component';
import { LocalServiceEditComponent } from 'src/app/pages/payment/local-service/local-service-edit/local-service-edit.component';
import { CardTypeComponent } from 'src/app/pages/payment/card-type/card-type.component';
import { CardTypeEditComponent } from 'src/app/pages/payment/card-type/card-type-edit/card-type-edit.component';
import { PaymentServiceComponent } from 'src/app/pages/payment/payment-service/payment-service.component';
import { QuestionViewComponent } from 'src/app/pages/communication/question-view/question-view.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile',   component: UserProfileComponent },

    { path: 'register',       component: RegisterComponent },
    { path: 'register/user-edit/:userId',       component: UserEditComponent },
    { path: 'register/rol-edit/:rolId',       component: RolEditComponent },

    { path: 'local',       component: LocalComponent },
    { path: 'local/local-edit/:localId',       component: LocalEditComponent },
    { path: 'local/sector-edit/:sectorId',       component: SectorEditComponent },

    { path: 'communication',       component: CommunicationComponent },
    { path: 'communication/question-edit/:questionId',       component: QuestionEditComponent },
    { path: 'communication/question-view/:questionId',       component: QuestionViewComponent },
    { path: 'communication/question-edit/:questionId/response-edit/:responseId',       component: ResponseEditComponent },

    { path: 'payment',       component: PaymentComponent },
    { path: 'payment/services', component: ServicesComponent},
    { path: 'payment/services/service-edit/:serviceId', component: ServiceEditComponent},
    { path: 'payment/local-services', component: LocalServiceComponent },
    { path: 'payment/local-services/local-service-edit/:localServiceId', component: LocalServiceEditComponent },
    { path: 'payment/card-types', component: CardTypeComponent },
    { path: 'payment/card-types/card-type-edit/:cardTypeId', component: CardTypeEditComponent },
    { path: 'payment/payment-services', component: PaymentServiceComponent },

    { path: 'localitation',       component: LocalitationComponent }
];
