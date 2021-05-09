import { Component, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnDestroy {

  public showSuggest = false;
  public query = '';

  public searchSub: Subscription;

  @ViewChild('searchInput') searchInput;

  public clients = [];
  public users = [];

  constructor(public router: Router,
              public authService: AuthService,
              public activedRoute: ActivatedRoute,
              public searchService: SearchService) { }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  public search(): void {
    if (this.query.trim().length > 0) {

      this.searchSub = this.searchService.allByCompany(this.authService.company.uid, this.query).subscribe(
        ({clients, users}) => {
          this.clients = clients;
          this.users = users;
        },
        error => console.warn(error.error.message)
      );
    }
  }

  public navigate(entity: string, uid: string): void {
    this.router.navigate([entity, uid], { relativeTo: this.activedRoute });
    this.closeSuggest();
    this.query = '';
    this.users = [];
    this.clients = [];
  }

  public openSuggest(): void {
    this.showSuggest = true;
  }

  public closeSuggest(): void {
    this.showSuggest = false;
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement): void {
    const clickedInside = this.searchInput.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.closeSuggest();
    }
  }
}
