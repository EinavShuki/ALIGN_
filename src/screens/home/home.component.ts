import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
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
export class HomeComponent implements OnInit {
  protected _traficService = inject(TraficService);
  protected _showcars: boolean = false;
  protected _carsNs: number = 0;
  protected _carsEw: number = 0;

  constructor() {
    this._traficService.generateActiveRoad();
    setInterval(() => {
      if (this._traficService.timesArray.length) {
        this._traficService.generateActiveRoad();
      }
    }, 2000);
  }

  ngOnInit(): void {
    if (this._traficService.timesArray.length) {
      setTimeout(() => {
        this._showcars = true;
        this._carsNs = this._traficService
          .nsRoad()
          .get(this._traficService.timesArray[0])!;
        this._carsEw = this._traficService
          .nsRoad()
          .get(this._traficService.timesArray[0])!;
      }, this._traficService.timesArray[0] * 1000);
    }
  }
}
