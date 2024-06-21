import { Component } from '@angular/core';
import { TrafficLightsComponent } from '../../components/traffic-lights/traffic-lights.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TrafficLightsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
