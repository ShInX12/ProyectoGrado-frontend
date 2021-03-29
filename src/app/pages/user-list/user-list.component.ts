import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDTO } from '../../DTO/userDTO';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  public users: UserDTO[] = [];

  public loading = true;
  public noData = false;

  public page = 1;
  public from: number;
  public to: number;
  public totalCount: number;
  public totalPages: number;

  public userSub: Subscription;

  constructor(public router: Router,
              public userService: UserService,
              private modalService: ModalService) { }

  ngOnInit(): void {
    this.findUsers();
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

  public newUser(): void {
    this.modalService.openUser();
  }

  public navigate(uid: string): void {
    this.router.navigate(['../usuario', uid]);
  }

  public findUsers(): void {
    this.userSub = this.userService.findAllPaginatedDTO().subscribe(
      ({users, from, to, total_count, total_pages}) => {
        this.users = users;
        this.from = from;
        this.to = to;
        this.totalCount = total_count;
        this.totalPages = total_pages;

        if (users?.length === 0){
          this.noData = true;
        }
      }
    );
  }

  public changePage(newPage: number): void {
    this.page = newPage;
    if (this.page <= 0) {
      this.page = 1;
    } else if (newPage > this.totalPages) {
      this.page = this.totalPages;
    }
    this.findUsers();
  }

}
