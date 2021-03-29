import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';
import { PersonalIdType } from '../../models/personalIdType';
import { Subscription } from 'rxjs';
import { ModalService } from '../../services/modal.service';
import { UserService } from '../../services/user.service';
import { PersonalIdTypeService } from '../../services/personal-id-type.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css']
})
export class SaveUserComponent implements OnInit, OnDestroy {

  public user: User = new User(
    '', '', '', false, '', '', '', '', '', '', true, environment.DEFAULT_DOCUMENT_TYPE, this.authService.company.uid);

  public personalIdTypes: PersonalIdType[] = [];

  public userSub: Subscription;
  public personalIdSub: Subscription;

  constructor(public modalService: ModalService,
              public userService: UserService,
              public authService: AuthService,
              public personalIdTypeService: PersonalIdTypeService) { }

  ngOnInit(): void {
    this.findPersonalIdTypes();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.personalIdSub?.unsubscribe();
  }

  public save(): void {
    this.userSub = this.userService.save(this.user).subscribe(
      value => console.log(value),
      error => console.log(error)
    );
  } // TODO: Agregar demás campos, mandar el usuario en admin false

  public findPersonalIdTypes(): void {
    this.personalIdSub = this.personalIdTypeService.findAll().subscribe(
      ({personal_id_types}) => this.personalIdTypes = personal_id_types,
      error => console.log(error.error.message)
    );
  }

  public closeModal(): void {
    this.user.name = '';
    // TODO: Agregar las que faltan
    this.modalService.close();
  }

}
