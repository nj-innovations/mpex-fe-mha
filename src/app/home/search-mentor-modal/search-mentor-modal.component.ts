import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../core/local-storage.service';
import { Sector } from '../../models/Sector';
import { SearchMentorModalService } from './search-mentor-modal.service';

@Component({
	selector: 'app-search-mentor-modal',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './search-mentor-modal.component.html',
	styleUrl: './search-mentor-modal.component.css'
})
export class SearchMentorModalComponent implements OnInit {
	searchMentorForm!: FormGroup;
	sectorData: Sector[] = [];
	isLoaded = false;
	
	get mentorFormArray() {
		return this.searchMentorForm.controls['sector'] as FormArray;
	}

	constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder,
		public sessionStorage: LocalStorageService, public searchService: SearchMentorModalService) {
	}

	ngOnInit() {
		const st = this.searchService.getSelectedSectors();
		this.searchMentorForm = this.formBuilder.group({
			sector: new FormArray([])
		});
		this.sectorData = this.sessionStorage.getSectors()
		if(st.length < 1){
			this.sectorData.forEach(() => 
				this.mentorFormArray.push(new FormControl(true))
			);
		} else {
			this.sectorData.forEach((i) => {
				this.mentorFormArray.push(new FormControl(st.includes(i.id)))
			});
		}
		this.isLoaded = true;
	}
	
	CheckAllSector(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.searchMentorForm.value.sector.forEach((checked: boolean, i: number) => {
			this.searchMentorForm.value.sector[i]= true;
			this.mentorFormArray.controls[i].setValue(true);
		});
	}

	UncheckAllSector(event: Event): void {
		event.preventDefault();
		event.stopPropagation();
		this.searchMentorForm.value.sector.forEach((checked: boolean, i: number) => {
			this.searchMentorForm.value.sector[i]= false;
			this.mentorFormArray.controls[i].setValue(false);
		});
	}

	SubmitSearch(): void {
		const selectedSectors = this.searchMentorForm.value.sector
		.map((checked: boolean, i: number) => checked ? this.sectorData[i].id : null)
		.filter((v:number) => v !== null);
		this.searchService.setSelectedSectors(selectedSectors);
		this.activeModal.close();
	}
}
