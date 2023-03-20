import { Component } from '@angular/core';
import { EventProviderService } from './services/event-provider.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isHideFooter : boolean = false;
  constructor(private event_provider : EventProviderService) {
    this.event_provider.hidefooter.subscribe((res:boolean) => {
      this.isHideFooter = res;
    })
  }


}
