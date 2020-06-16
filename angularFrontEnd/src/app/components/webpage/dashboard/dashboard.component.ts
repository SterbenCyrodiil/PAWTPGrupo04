import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(public sessionService: SessionService, public router: Router) { }

  ngOnInit() {
    this.sessionService.sessionUser().subscribe((user) => {
      this.user = user;
      if (!this.user) { // # redirecionamento para login se não existe um utilizador em sessão
        const options = this.sessionService.expired ? { queryParams: { expired: 'true' } } : { queryParams: { redirected: 'true' } }
        this.router.navigate(['/sign-in'], options);
      }
    })
  }

  navigate(where: String) {
    switch(where) {
      case 'PROFILE':
        if (this.router.url === '/dashboard') this.router.navigate([this.user.cc, 'user-info']);
        else this.router.navigate(['..', this.user.cc, 'user-info']);
        break;
      case 'STATS':
        if (this.router.url === '/dashboard') this.router.navigate(['statistics']);
        else this.router.navigate(['..', 'statistics']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }

  signOutHandler() {
    this.sessionService.signOut();
    this.router.navigate(['/sign-in'], undefined);
  }

}
