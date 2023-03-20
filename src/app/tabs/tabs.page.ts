import { Component } from '@angular/core';
import { EventProviderService } from '../services/event-provider.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private event_provider : EventProviderService) {}

  ionViewWillEnter() {
    this.event_provider.hideFooter(true);
  }
  ionViewDidLeave() {
    this.event_provider.hideFooter(false);
  }

}
