import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { QuantityInputDTO, QuantityMeasurementResponse } from '../models/quantity.model';

@Injectable({
  providedIn: 'root'
})
export class QuantityService {
  private quantityUrl = `${environment.apiBaseUrl}/quantities`;

  constructor(private http: HttpClient) {}

  compare(payload: QuantityInputDTO): Observable<QuantityMeasurementResponse> {
    return this.http.post<QuantityMeasurementResponse>(`${this.quantityUrl}/compare`, payload);
  }

  convert(payload: QuantityInputDTO): Observable<QuantityMeasurementResponse> {
    return this.http.post<QuantityMeasurementResponse>(`${this.quantityUrl}/convert`, payload);
  }

  add(payload: QuantityInputDTO): Observable<QuantityMeasurementResponse> {
    return this.http.post<QuantityMeasurementResponse>(`${this.quantityUrl}/add`, payload);
  }

  divide(payload: QuantityInputDTO): Observable<QuantityMeasurementResponse> {
    return this.http.post<QuantityMeasurementResponse>(`${this.quantityUrl}/divide`, payload);
  }
}