import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Passenger } from '../../models/passenger.interface';
import { Baggage } from '../../models/baggage.interface';

@Component({
    selector:'passenger-form',
    styleUrls: ['passenger-form.component.scss'],
    template: `
        <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
            <div>
                Passenger Name: <input 
                    type="text"
                    name="fullname"
                    #fullname="ngModel"
                    [ngModel]="detail?.fullname"
                    required>
                <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
                    Passenger name is required
                </div>
            </div>
            <div>
                Passenger ID: <input 
                    type="number"
                    name="id"
                    #id="ngModel"
                    [ngModel]="detail?.id"
                    required>
                <div *ngIf="id.errors?.required && id.dirty" class="error">
                    Passenger ID is required
                </div>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="checkedIn"
                        [ngModel]="detail?.checkedIn"
                        (ngModelChange)="toggleCheckIn($event)">
                </label>

                <div *ngIf="form.value.checkedIn">
                    Check In Date:
                    <input 
                        type="number"
                        name="checkInDate"
                        [ngModel]="detail?.checkedInDate">
                </div>

                <div>
                    Luggage:
                    <select
                        name="baggage"
                        [ngModel]="detail?.baggage">
                        <option
                            *ngFor="let item of baggage"
                            [value]="item.key"
                            [selected]="item.key === detail?.baggage">
                            {{item.value}}
                        </option>
                        <!-- Alternative using ngValue -->
                        <!--<option
                            *ngFor="let item of baggage"
                            [ngValue]="item.key">
                            {{item.value}}
                        </option>-->
                    </select>
                </div>
            </div>
            <button type="submit" [disabled]="form.invalid">
                Update Passenger
            </button>
        </form>
    `
})

export class PassengerFormComponent {
    @Input()
    detail: Passenger

    @Output()
    update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

    baggage: Baggage[] = [{
        key: 'none',
        value: 'No baggage'
    },{
        key: 'hand-only',
        value: 'Hand baggage'
    },{
        key: 'hold-only',
        value: 'Hold baggage'
    },{
        key: 'hand-hold',
        value: 'Hand and Hold Baggage'
    }];

    toggleCheckIn(checkedIn: boolean){
        if(checkedIn){
            this.detail.checkedInDate = Date.now();
        }
    }

    handleSubmit(passenger: Passenger, isValid: boolean){
        if(isValid){
            this.update.emit(passenger);
        }
    }
}