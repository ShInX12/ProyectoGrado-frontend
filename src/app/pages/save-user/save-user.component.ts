import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonalIdTypeService } from '../../services/personal-id-type.service';
import { UserTypeService } from '../../services/user-type.service';
import { environment } from '../../../environments/environment';
import { PersonalIdType } from '../../models/personalIdType';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { UserType } from '../../models/userType';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { showErrorAlert, showSuccesAlert } from '../../helpers/alerts';
import { UserDTO } from '../../DTO/userDTO';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.scss']
})
export class SaveUserComponent implements OnInit, OnDestroy {

  public user: User
    = new User('', '', '', '', '', '', '', '', true, environment.DEFAULT_DOCUMENT_TYPE, this.authService.company.uid, false,  '', false);

  @Output() newUser: EventEmitter<UserDTO> = new EventEmitter();

  public personalIdTypes: PersonalIdType[] = [];
  public userTypes: UserType[] = [];
  public person: User;
  public administratorCode: string;

  public saveUserForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    user_type_id: new FormControl(environment.USER_TYPE_ASISTENTE, [Validators.required]),
    enable: new FormControl(true),
    personal_id_type: new FormControl(environment.DEAFULT_PERSONAL_ID_TYPE),
    personal_id: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    phone: new FormControl('')
  });

  get name(): AbstractControl {
    return this.saveUserForm.get('name');
  }

  get user_type_id(): AbstractControl {
    return this.saveUserForm.get('user_type_id');
  }

  get email(): AbstractControl {
    return this.saveUserForm.get('email');
  }

  get password(): AbstractControl {
    return this.saveUserForm.get('password');
  }

  public subscriptions: Subscription[] = [];

  constructor(public modalService: ModalService,
              public userService: UserService,
              public authService: AuthService,
              public userTypeService: UserTypeService,
              public personalIdTypeService: PersonalIdTypeService) { }

  ngOnInit(): void {
    this.findPersonalIdTypes();
    this.findUserTypes();
    this.person = this.authService.person as User;
    this.administratorCode = environment.USER_TYPE_ADMINISTRADOR;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb?.unsubscribe());
  }

  public save(): void {

    this.user.name = this.saveUserForm.get('name').value;
    this.user.user_type_id = this.saveUserForm.get('user_type_id').value;
    this.user.enable = this.saveUserForm.get('enable').value;
    this.user.personal_id_type = this.saveUserForm.get('personal_id_type').value;
    this.user.personal_id = this.saveUserForm.get('personal_id').value;
    this.user.email = this.saveUserForm.get('email').value;
    this.user.password = this.saveUserForm.get('password').value;
    this.user.phone = this.saveUserForm.get('phone').value;

    const userSub = this.userService.save(this.user).subscribe(
      userDTO => {
        this.newUser.emit(userDTO);
        showSuccesAlert('Usuario guardado correctamente', () => this.closeModal());
      },
      error => showErrorAlert('No se pudo crear el usuario', error.error.message, () => {})
    );
    this.subscriptions.push(userSub);
  }

  public findPersonalIdTypes(): void {
    const personalIdSub = this.personalIdTypeService.findAll().subscribe(
      ({personal_id_types}) => this.personalIdTypes = personal_id_types,
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(personalIdSub);
  }

  public findUserTypes(): void {
    const userTypeSub = this.userTypeService.findAll().subscribe(
      ({user_types}) => {
        if (this.person?.user_type_id !== this.administratorCode){
          this.userTypes = user_types.filter(type => type.uid === environment.USER_TYPE_ASISTENTE);
        } else {
          this.userTypes = user_types;
        }
      },
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(userTypeSub);
  }

  public closeModal(): void {
    this.saveUserForm.reset({
      personal_id_type: environment.DEAFULT_PERSONAL_ID_TYPE,
      user_type_id: environment.USER_TYPE_ASISTENTE,
      enable: true
    });
    this.modalService.close();
  }

}
