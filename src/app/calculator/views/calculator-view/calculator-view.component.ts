import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';

@Component({
  selector: 'calculator-view',
  standalone: true,
  imports: [CommonModule, CalculatorComponent],
  templateUrl: './calculator-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorViewComponent {}
