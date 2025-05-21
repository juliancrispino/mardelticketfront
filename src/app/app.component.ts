import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { StoreModule } from '@ngrx/store';
import { reduxReducer } from './redux/reducer';
import { HttpService } from './service/HttpService';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppNavigationLogic } from './logic/navigationLogic';
import { ServiceLogic } from './logic/serviceLogic';
import { SessionLogic } from './logic/sessionLogic';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forRoot({ _STATE_: reduxReducer }),
  ],
  providers: [
    HttpService,
    provideHttpClient(withInterceptorsFromDi()),
    AppNavigationLogic,
    ServiceLogic,
    SessionLogic,
  ],
  bootstrap: []
})
export class AppModule { }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mardelticketFront';
}
