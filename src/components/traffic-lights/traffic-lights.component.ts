import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  WritableSignal,
} from '@angular/core';

@Component({
  selector: 'app-traffic-lights',
  standalone: true,
  imports: [],
  templateUrl: './traffic-lights.component.html',
  styleUrl: './traffic-lights.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrafficLightsComponent {
  _isGreen = input<boolean>(false);
}
