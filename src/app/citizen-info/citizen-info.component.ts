import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Citizen } from '../shared/models/citizen.model';
import { GovernmentSupport } from '../shared/models/gov-support.model';
import { SocialWorker } from '../shared/models/social-worker.model';
import { State } from '../shared/models/state.model';
import { CitizenInfoService } from './citizen-info.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'citizen-info',
  templateUrl: './citizen-info.component.html',
  styleUrls: ['./citizen-info.component.scss'],
})
export class CitizenInfoComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  curpFilter = new FormControl();
  nameFilter = new FormControl();
  socialWorkerFC = new FormControl();
  globalFilter = '';
  states: State[] = [];
  tabs: { name: string; routeName: string; disabled: boolean }[] = [
    { name: 'Registrar Ciudadano', routeName: 'register', disabled: false },
    { name: 'Editar Ciudadadano', routeName: 'edit', disabled: true },
    {
      name: 'Registrar Trabajador Social',
      routeName: 'register-social',
      disabled: false,
    },
  ];

  displayedColumns: string[] = [
    'nombre',
    'curp',
    'estatus',
    'accept',
    'socialWorker',
    'edit',
  ];
  dataSource;
  citizens: Array<Citizen> = [];
  filterCitizen = {
    name: '',
    curp: '',
  };
  editEmployee: any;
  formEdit: FormGroup;
  editCitizen: any;

  //Social workers vars

  socialWorkers: Array<SocialWorker>;
  socialWorker: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private citizenInfoService: CitizenInfoService,
    private httpClientService: HttpClient
  ) {}

  ngOnInit() {
    const url = environment.API_URL + '/person';
    this.httpClientService.get(url).subscribe(
      (response: Array<any>) => {
        console.log(response);
        this.citizens = response;
        this.dataSource = new MatTableDataSource<Citizen>(this.citizens);
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = this.customFilterPredicate();
      },
      (error) => {
        console.error(error);
      }
    );

    this.route.data.subscribe((data) => (this.states = data.states));
    this.initFormGroups();

    //Request to receive social workers!!!!

    let url2 = environment.API_URL + '/social_workers';
    this.httpClientService.get(url2).subscribe(
      (response: Array<any>) => {
        console.log(response);
        this.socialWorkers = response;
      },
      (error) => {
        console.error(error);
      }
    );

    this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
      this.filterCitizen['name'] = nameFilterValue;
      this.dataSource.filter = JSON.stringify(this.filterCitizen);
    });

    this.curpFilter.valueChanges.subscribe((curpFilterValue) => {
      this.filterCitizen['curp'] = curpFilterValue;
      this.dataSource.filter = JSON.stringify(this.filterCitizen);
    });

    this.socialWorkerFC.valueChanges.subscribe((assignedSocialWorker) => {});
  }

  changeD(c, event) {
    console.log(c, event);
  }

  private initFormGroups() {
    this.socialWorker = this.fb.group({
      assignedSocialWorker: null,
    });

    this.formEdit = this.fb.group(
      {
        birthDate: [null, Validators.required],
        birthStateId: [null, Validators.required],
        dependantQty: [null, Validators.required],
        firstname: [null, Validators.required],
        govSupport: this.fb.array([]),
        hasJob: [null, Validators.required],
        hasOtherSupport: [null, Validators.required],
        isSingle: [null, Validators.required],
        maternalLastname: [null, Validators.required],
        lastPaycheckQty: [null],
        paternalLastname: [null, Validators.required],
      },
      { validators: [this.requiredPaycheckQty] }
    );
  }


  getS(socialWorkers, citizen) {
    console.log(socialWorkers, citizen);
    return this.socialWorkers
  }

  //// stuff for filtering

  customFilterPredicate() {
    const myFilterPredicate = (data: any, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch =
          data.name
            .toString()
            .trim()
            .toLowerCase()
            .indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return (
        data.curp.toString().trim().indexOf(searchString.curp) !== -1 &&
        data.name
          .toString()
          .trim()
          .toLowerCase()
          .indexOf(searchString.name.toLowerCase()) !== -1
      );
    };
    return myFilterPredicate;
  }

  applyFilter(filter) {
    this.globalFilter = filter;
    console.log(this.filterCitizen);
    this.dataSource.filter = JSON.stringify(this.filterCitizen);
  }

  onEditCitizen(citizen: Citizen) {
    this.router.navigate(['edit', citizen.curp], { relativeTo: this.route });
  }

  requiredPaycheckQty(form: FormGroup): ValidationErrors {
    const hasJob = form.get('hasJob').value === 'true';
    const lastPaycheckQty = form.get('lastPaycheckQty').value;
    if (hasJob) {
      const isNullOrEmpty = lastPaycheckQty == null || lastPaycheckQty === '';
      return isNullOrEmpty ? { requiredPaycheckQty: true } : null;
    } else {
      return null;
    }
  }

  onSubmitEdit() {
    const value = this.formEdit.value;
    const citizen: Citizen = {
      birthDate: value.birthDate,
      birthStateId: value.birthStateId,
      dependantQty: value.dependantQty,
      firstname: value.firstname,
      govSupport: value.govSupport,
      hasJob: value.hasJob === 'true',
      hasOtherSupport: value.hasOtherSupport === 'true',
      isSingle: value.isSingle === 'true',
      maternalLastname: value.maternalLastname,
      lastPaycheckQty: value.lastPaycheckQty,
      paternalLastname: value.paternalLastname,
      assignedSocialWorker: value.assignedSocialWorker,
    };
    console.log(citizen);

    //REQUEST TO SET CITIZEN
  }

  private _updateCiudadano() {
    // this.admin.updateCiudadano(this.editEmployee.docId, this.editEmployee)
    //   .then(success => { }, error => console.error(error));
  }

  pushGovSupportForm() {
    const form = this.fb.group(
      {
        supportType: [null, Validators.required],
        otherSupportName: [null],
      },
      { validators: [this.requiredOtherSupportName] }
    );
    this.getGovSupportArray().push(form);
  }

  getGovSupportArray(): FormArray {
    return this.formEdit.get('govSupport') as FormArray;
  }

  requiredOtherSupportName(form: FormGroup): ValidationErrors {
    const isOtherSupport = form.get('supportType').value === 'other';
    const otherSupportName = form.get('otherSupportName').value;
    if (isOtherSupport) {
      const isNullOrEmpty = otherSupportName == null || otherSupportName === '';
      return isNullOrEmpty ? { requiredOtherSupportName: true } : null;
    } else {
      return null;
    }
  }

  onHasOtherSupportChange(event: MatRadioChange) {
    const hasOtherSupport = event.value === 'true';
    if (hasOtherSupport) {
      this.pushGovSupportForm();
    } else {
      this._emptyGovSupportArray();
    }
  }

  private _emptyGovSupportArray() {
    this.getGovSupportArray().controls.forEach((control) =>
      this.getGovSupportArray().removeAt(0)
    );
  }

  deleteSupport(index: number) {
    this.getGovSupportArray().removeAt(index);
    if (this.getGovSupportArray().length <= 0) {
      this.formEdit.get('hasOtherSupport').setValue('false');
    }
  }

  //   buttons handlers changing tab stuff

  onCitizenAccept(element) {
    console.log(element);
    alert("Se enviara apoyo al ciudadano");
    // REQUEST TO ACCEPT SUPPORT TO CITIZEN
  }

  onAssignSocialWorker(element) {
    console.log(element);
    alert("Se asigno nuevo trabajador social");
        // REQUEST TO ASSIGN SOCIAL WORKER

  }
}
