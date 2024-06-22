import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TrafficLightsComponent } from '../traffic-lights/traffic-lights.component';
import { RoadComponent } from '../road/road.component';

@Component({
  selector: 'app-north-south',
  standalone: true,
  templateUrl: './north-south.component.html',
  styleUrl: './north-south.component.scss',
  imports: [TrafficLightsComponent, RoadComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NorthSouthComponent {
  _carLeaves = input<boolean>(false);
  _carsAmount = input<number>(0);
}
