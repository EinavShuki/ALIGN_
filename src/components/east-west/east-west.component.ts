import { Component } from '@angular/core';
import { RoadComponent } from '../road/road.component';
import { TrafficLightsComponent } from '../traffic-lights/traffic-lights.component';

@Component({
  selector: 'app-east-west',
  standalone: true,
  templateUrl: './east-west.component.html',
  styleUrl: './east-west.component.scss',
  imports: [RoadComponent, TrafficLightsComponent],
})
export class EastWestComponent {}
