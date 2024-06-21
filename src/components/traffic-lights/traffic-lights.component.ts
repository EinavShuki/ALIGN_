import {
  ChangeDetectionStrategy,
  Component,
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
  protected _isGreen: WritableSignal<boolean> = signal(false);
}
