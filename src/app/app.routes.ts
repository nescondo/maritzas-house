import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { AboutUs } from './components/about-us/about-us';
import { ContactInfo } from './components/contact-info/contact-info';

export const routes: Routes = [
    { path: '', component: Home}, //default
    { path: 'aboutus', component: AboutUs},
    { path: 'contactinfo', component: ContactInfo}
];
