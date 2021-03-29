import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';
import { PersonalIdType } from '../../models/personalIdType';
import { PersonalIdTypeService } from '../../services/personal-id-type.service';
import { showErrorAlert, showSuccesAlert, showWarningDeleteAlert } from '../../helpers/alerts';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {

  public params = this.activedRoute.params[`_value`];

  public user: User = new User('', '', '', false, '', '', '', '', '', '', true, '', '');

  public personalIdTypes: PersonalIdType[] = [];

  public findUserSub: Subscription;
  public updateUserSub: Subscription;
  public deleteUserSub: Subscription;
  public personalIdSub: Subscription;

  constructor(public router: Router,
              public activedRoute: ActivatedRoute,
              public userService: UserService,
              public personalIdTypeService: PersonalIdTypeService) { }

  ngOnInit(): void {
    this.findUserById();
    this.findPersonalIdTypes();
  }

  ngOnDestroy(): void {
    this.findUserSub?.unsubscribe();
    this.updateUserSub?.unsubscribe();
    this.deleteUserSub?.unsubscribe();
    this.personalIdSub?.unsubscribe();
  }

  public findUserById(): void {
    this.findUserSub = this.userService.findById(this.params.id).subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      },
      error => console.log(error)
    );
  } // TODO: Hacer que solo se pueda editar si es admin (el activo), solo el admin puede cambiar el rol de usuario
  // agregar los demas campos, agregar validaciones nuevas

  public findPersonalIdTypes(): void {
    this.personalIdSub = this.personalIdTypeService.findAll().subscribe(
      ({personal_id_types}) => this.personalIdTypes = personal_id_types,
      error => console.log(error.error.message)
    );
  }

  public updateUser(): void {
    this.updateUserSub = this.userService.update(this.user).subscribe(
      user => {
        this.user = user;
        console.log(this.user);
      },
      error => console.log(error)
    );
  }

  public deleteUser(): void {
    showWarningDeleteAlert(
      '¿Desea eliminar el cliente?', 'Esta acción no se puede deshacer', result => {
        if (result.isConfirmed){
          this.deleteUserSub = this.userService.delete(this.user).subscribe(
            value => showSuccesAlert('Usuario eliminado', () => this.router.navigateByUrl('/usuarios')),
            error => showErrorAlert('No se pudo eliminar el usuario', error.error.message, () => {})
          );
        }
      }
    );
  }

}
