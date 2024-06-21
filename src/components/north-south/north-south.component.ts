import { Component } from '@angular/core';
import { TrafficLightsComponent } from '../traffic-lights/traffic-lights.component';
import { RoadComponent } from '../road/road.component';

@Component({
  selector: 'app-north-south',
  standalone: true,
  templateUrl: './north-south.component.html',
  styleUrl: './north-south.component.scss',
  imports: [TrafficLightsComponent, RoadComponent],
})
export class NorthSouthComponent {}