import { Component, OnInit, Input } from '@angular/core';
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

  signOutHandler() {
    this.sessionService.signOut();
    this.router.navigate(['/sign-in'], undefined);
  }

}
