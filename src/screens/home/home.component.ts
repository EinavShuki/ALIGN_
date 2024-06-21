import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TrafficLightsComponent } from '../../components/traffic-lights/traffic-lights.component';
import { RoadComponent } from '../../components/road/road.component';
import { NorthSouthComponent } from '../../components/north-south/north-south.component';
import { EastWestComponent } from '../../components/east-west/east-west.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TrafficLightsComponent,
    RoadComponent,
    NorthSouthComponent,
    EastWestComponent,
  ],
})
export class HomeComponent {}
