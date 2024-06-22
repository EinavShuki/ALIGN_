import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RoadComponent } from '../road/road.component';
import { TrafficLightsComponent } from '../traffic-lights/traffic-lights.component';

@Component({
  selector: 'app-east-west',
  standalone: true,
  templateUrl: './east-west.component.html',
  styleUrl: './east-west.component.scss',
  imports: [RoadComponent, TrafficLightsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EastWestComponent {
  _carLeaves = input<boolean>(false);
  _carsAmount = input<number>(0);
}
