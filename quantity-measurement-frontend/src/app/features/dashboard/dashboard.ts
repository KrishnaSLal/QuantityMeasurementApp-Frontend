import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, timeout, Observable } from 'rxjs';
import { QuantityInputDTO, QuantityMeasurementResponse } from '../../core/models/quantity.model';
import { QuantityService } from '../../core/services/quantity.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './dashboard.view.html',
  styleUrl: './dashboard.view.css'
})
export class DashboardComponent {
  readonly measurementTypes = ['Length', 'Weight', 'Temperature', 'Volume'];

  readonly measurementTypeMap: Record<string, string> = {
    Length: 'LengthUnit',
    Weight: 'WeightUnit',
    Temperature: 'TemperatureUnit',
    Volume: 'VolumeUnit'
  };

  readonly operationOptions = [
    { label: 'Comparison', value: 'compare', symbol: '=' },
    { label: 'Conversion', value: 'convert', symbol: '⇄' },
    { label: 'Arithmetic', value: 'add', symbol: '+' }
  ];

 readonly unitMap: Record<string, string[]> = {
  Length: ['FEET', 'INCHES', 'YARD', 'CENTIMETER', 'METER', 'KILOMETER'],
  Weight: ['GRAM', 'KILOGRAM', 'POUND'],   // ✅ updated
  Temperature: ['CELSIUS', 'FAHRENHEIT', 'KELVIN'],
  Volume: ['MILLILITRE', 'LITRE', 'GALLON']
};

  selectedType = 'Length';
  selectedOperation = 'add';

  value1 = 0;
  value2 = 0;
  unit1 = '';
  unit2 = '';
  resultUnit = '';

  loading = false;
  errorMessage = '';
  result: QuantityMeasurementResponse | null = null;

  constructor(
    private quantityService: QuantityService,
    private cd: ChangeDetectorRef
  ) {
    this.resetUnitsForType(this.selectedType);
  }

  get currentUnits(): string[] {
    return this.unitMap[this.selectedType] ?? [];
  }

  get selectedOperationSymbol(): string {
    return this.operationOptions.find(
      option => option.value === this.selectedOperation
    )?.symbol ?? '+';
  }

  get resultDisplay(): string {
    if (this.result?.resultString && this.result.resultString.trim() !== '') {
      return this.result.resultString;
    }

    if (
      typeof this.result?.resultValue === 'number' &&
      !isNaN(this.result.resultValue)
    ) {
      return this.result.resultValue.toFixed(3);
    }

    return '';
  }

  selectType(type: string): void {
    this.selectedType = type;
    this.resetUnitsForType(type);
    this.result = null;
    this.errorMessage = '';
  }

  selectOperation(operation: string): void {
    this.selectedOperation = operation;
    this.result = null;
    this.errorMessage = '';
  }

  submit(): void {
    this.loading = true;
    this.errorMessage = '';
    this.result = null;
    this.resultUnit = '';

    const measurementType = this.measurementTypeMap[this.selectedType];

    const payload: QuantityInputDTO = {
      thisQuantityDTO: {
        value: Number(this.value1),
        unit: String(this.unit1).trim().toUpperCase(),
        measurementType
      },
      thatQuantityDTO: {
        value: Number(this.value2),
        unit: String(this.unit2).trim().toUpperCase(),
        measurementType
      }
    };

    console.log('Payload being sent:', JSON.stringify(payload, null, 2));

    let request$: Observable<QuantityMeasurementResponse>;

    switch (this.selectedOperation) {
      case 'compare':
        request$ = this.quantityService.compare(payload);
        break;
      case 'convert':
        request$ = this.quantityService.convert(payload);
        break;
      case 'add':
        request$ = this.quantityService.add(payload);
        break;
      default:
        this.loading = false;
        this.errorMessage = 'Invalid operation selected.';
        return;
    }

    request$
      .pipe(
        timeout(10000),
        finalize(() => {
          this.loading = false;
          this.cd.detectChanges();
        })
      )
      .subscribe({
        next: (response: QuantityMeasurementResponse) => {
          console.log('Backend response:', response);
          this.result = response;
          this.resultUnit = response?.resultUnit ?? '';
          this.cd.detectChanges();
        },
        error: (error: any) => {
          console.error('Calculation error:', error);

          if (error?.name === 'TimeoutError') {
            this.errorMessage = 'Backend request timed out.';
            this.cd.detectChanges();
            return;
          }

          this.errorMessage =
            typeof error?.error === 'string'
              ? error.error
              : error?.error?.message || 'Operation failed. Check backend or input values.';
          this.cd.detectChanges();
        }
      });
  }

  private resetUnitsForType(type: string): void {
    const [firstUnit = '', secondUnit = ''] = this.unitMap[type] ?? [];
    this.unit1 = firstUnit;
    this.unit2 = secondUnit || firstUnit;
    this.resultUnit = '';
  }
}