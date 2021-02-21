import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  public showSuggest = false;
  public query = '';

  public searchSub: Subscription;

  @ViewChild('searchInput') searchInput;

  public clients = [];
  public processes = [];

  constructor(public router: Router,
              public searchService: SearchService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  public search(): void {
    if (this.query.trim().length > 0) {

      this.searchSub = this.searchService.all(this.query).subscribe(
        ({clients, processes}) => {
          this.clients = clients;
          this.processes = processes;
        },
        error => console.log(error.error.message)
      );
    }
  }

  public navigate(entity: string, uid: string): void {
    this.router.navigate([entity, uid]);
    this.closeSuggest();
    this.query = '';
    this.processes = [];
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
