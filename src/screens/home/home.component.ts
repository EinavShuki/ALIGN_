import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { TrafficLightsComponent } from '../../components/traffic-lights/traffic-lights.component';
import { RoadComponent } from '../../components/road/road.component';
import { NorthSouthComponent } from '../../components/north-south/north-south.component';
import { EastWestComponent } from '../../components/east-west/east-west.component';
import { TraficService } from '../../services/trafic-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NorthSouthComponent, EastWestComponent, CommonModule],
})
export class HomeComponent {
  protected _traficService = inject(TraficService);
}
