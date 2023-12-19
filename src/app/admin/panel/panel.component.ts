import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ConnectionService } from 'src/app/shared/connection.service';
import { Routes } from 'src/app/shared/constansts';
import { ModalComponent } from '../shared/modal/modal.component';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap } from 'rxjs';
import { ChangesService } from 'src/app/shared/changes.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
})
export class PanelComponent implements OnInit {

  @ViewChild('snav') sidenav: MatSidenav | undefined;

  mobileQuery: MediaQueryList;
  selectedItemIndex: number | null = 0;
  inputFilter = new FormControl<string>('');
  currentRoute: string = '';
  showSearch: Boolean = true;
  isSidenavOpened = true;

  constructor(private router: Router, public dialog: MatDialog, private connectionService: ConnectionService, private media: MediaMatcher, private changeDetectorRef: ChangeDetectorRef, private changes: ChangesService, private route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isSidenavOpened = !this.mobileQuery.matches;

  }
  ngOnInit(): void {
    this.verifyRoute();
    this.applyFilter();
  }

  verifyRoute() {
    this.currentRoute = this.getChildRoute(this.route);
    this.showSearch = this.currentRoute === 'lista';

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.getChildRoute(this.route);
      this.showSearch = this.currentRoute === 'lista';
    });
  }

  private getChildRoute(route: ActivatedRoute): string {
    let child = route.firstChild;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else {
        return child.snapshot.url.map(segment => segment.path).join('/');
      }
    }
    return '';
  }

  logout(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: 'Sair',
        message: 'Tem certeza que deseja sair?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.connectionService.post(Routes.LOGOUT, {}).subscribe(data => {
          localStorage.removeItem('token');
          this.selectedItemIndex = null;
          this.router.navigate(['/login']);
        })
      }
    });
  }

  selectItem() {
    if (this.mobileQuery?.matches) {
      this.sidenav?.close();
    }
  }

  applyFilter() {
    this.inputFilter.valueChanges.pipe(
      debounceTime(800),
    ).subscribe(value => {
      this.changes.callSearch(value);
    });
  }
}
