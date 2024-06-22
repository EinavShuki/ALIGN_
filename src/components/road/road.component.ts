import { Component, computed, input } from '@angular/core';
import { CarComponent } from '../car/car.component';

@Component({
  selector: 'app-road',
  standalone: true,
  templateUrl: './road.component.html',
  styleUrl: './road.component.scss',
  imports: [CarComponent],
})
export class RoadComponent {
  _carsAmount = input<number>(0);
  protected _carsArr = computed(() =>
    Array.from({ length: this._carsAmount() }),
  );
}
