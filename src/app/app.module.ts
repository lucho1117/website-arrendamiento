import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { UserEditComponent } from './pages/register/user-edit/user-edit.component';
import { CommunicationComponent, ResponsesQuestion } from './pages/communication/communication.component';
import { InfoLocal, LocalitationComponent } from './pages/localitation/localitation.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LocalComponent } from './pages/local/local.component';
import { SectorEditComponent } from './pages/local/sector-edit/sector-edit.component';
import { LocalEditComponent } from './pages/local/local-edit/local-edit.component';
import { RolEditComponent } from './pages/register/rol-edit/rol-edit.component';
import { ToastrModule } from 'ngx-toastr';
import { QuestionEditComponent } from './pages/communication/question-edit/question-edit.component';
import { ResponseEditComponent } from './pages/communication/response-edit/response-edit.component';
import { ServicesComponent } from './pages/payment/services/services.component';
import { ServiceEditComponent } from './pages/payment/services/service-edit/service-edit.component';
import { LocalServiceComponent } from './pages/payment/local-service/local-service.component';
import { LocalServiceEditComponent } from './pages/payment/local-service/local-service-edit/local-service-edit.component';
import { CardTypeComponent } from './pages/payment/card-type/card-type.component';
import { CardTypeEditComponent } from './pages/payment/card-type/card-type-edit/card-type-edit.component';
import { PaymentServiceComponent, PaymentServiceLocal } from './pages/payment/payment-service/payment-service.component';
// Import pdfmake-wrapper and the fonts to use
import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { NewPassword } from './pages/user-profile/user-profile.component';
import { QuestionViewComponent } from './pages/communication/question-view/question-view.component';
import { InfoDataComponent } from './components/info-data/info-data.component';

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    MatDialogModule,
    ToastrModule . forRoot ( )
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserEditComponent,
    CommunicationComponent,
    LocalitationComponent,
    PaymentComponent,
    LocalComponent,
    SectorEditComponent,
    LocalEditComponent,
    RolEditComponent,
    QuestionEditComponent,
    ResponseEditComponent,
    ResponsesQuestion,
    InfoLocal,
    NewPassword,
    PaymentServiceLocal,
    ServicesComponent,
    ServiceEditComponent,
    LocalServiceComponent,
    LocalServiceEditComponent,
    CardTypeComponent,
    CardTypeEditComponent,
    PaymentServiceComponent,
    QuestionViewComponent,
    InfoDataComponent
  ],
  entryComponents: [
    ResponsesQuestion,
    PaymentServiceLocal,
    InfoLocal,
    NewPassword

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
