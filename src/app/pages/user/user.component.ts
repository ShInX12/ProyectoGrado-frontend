import { AfterContentInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { PersonalIdType } from '../../models/personalIdType';
import { PersonalIdTypeService } from '../../services/personal-id-type.service';
import { showErrorAlert, showSuccesAlert, showWarningDeleteAlert } from '../../helpers/alerts';
import { UserTypeService } from '../../services/user-type.service';
import { UserType } from '../../models/userType';
import { AngularFireStorage } from '@angular/fire/storage';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy, AfterContentInit {

  public params = this.activedRoute.params[`_value`];

  public user: User
    = new User('', '', '', '', '', '', '', '', true, '', '', false,  '', false);

  public personalIdTypes: PersonalIdType[] = [];
  public userTypes: UserType[] = [];
  public userTypeName = '';
  public personalIdName = '';

  public subscriptions: Subscription[] = [];

  constructor(public router: Router,
              public activedRoute: ActivatedRoute,
              public userService: UserService,
              public userTypeService: UserTypeService,
              public authService: AuthService,
              public personalIdTypeService: PersonalIdTypeService,
              private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.findUserById();
    this.findUserTypes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sb) => sb?.unsubscribe());
  }

  ngAfterContentInit(): void {
    this.findPersonalIdTypes();
  }

  public findUserById(): void {
    const findUserSub = this.userService.findById(this.params.id).subscribe(
      user => this.user = user,
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(findUserSub);
  }

  public findPersonalIdTypes(): void {
    const personalIdSub = this.personalIdTypeService.findAll().subscribe(
      ({personal_id_types}) => {
        this.personalIdTypes = personal_id_types;
        personal_id_types.forEach(id => {
          if (id.uid === this.user.personal_id_type){
            this.personalIdName = id.name;
          }
        });
      },
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(personalIdSub);
  }

  public findUserTypes(): void {
    const userTypeSub = this.userTypeService.findAll().subscribe(
      ({user_types}) => {
        this.userTypes = user_types;
        user_types.forEach(userType => {
          if (userType.uid === this.user.user_type_id){
            this.userTypeName = userType.name;
          }
        });
      },
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(userTypeSub);
  }

  public updateUser(): void {
    const updateUserSub = this.userService.update(this.user).subscribe(
      user => {
        this.user = user;
        showSuccesAlert('Usuario actualizado correctamente', () => {});
      },
      error => console.warn(error.error.message)
    );
    this.subscriptions.push(updateUserSub);
  }

  public deleteUser(): void {
    showWarningDeleteAlert(
      '¿Desea eliminar el usuario?', 'Esta acción no se puede deshacer', result => {
        if (result.isConfirmed){
          const deleteUserSub = this.userService.delete(this.user).subscribe(
            () => {
              if (this.user.photo_url.trim().length > 0) { this.fireStorage.refFromURL(this.user.photo_url).delete(); }
              showSuccesAlert(
                'Usuario eliminado',
                () => this.router.navigate(['../../usuarios'], { relativeTo: this.activedRoute })
              );
            },
            error => showErrorAlert('No se pudo eliminar el usuario', error, () => {})
          );
          this.subscriptions.push(deleteUserSub);
        }
      }
    );
  }

}
