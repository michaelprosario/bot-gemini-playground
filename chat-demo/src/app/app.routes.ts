import { Routes } from '@angular/router';
import { SpockChatViewComponent } from './spock-chat-view/spock-chat-view.component';
import { BenFranklinViewComponent } from './ben-franklin-view/ben-franklin-view.component';

export const routes: Routes = [
    { path: '', component: SpockChatViewComponent },
    { path: 'ben', component: BenFranklinViewComponent },
    { path: 'spock', component: SpockChatViewComponent },

];
