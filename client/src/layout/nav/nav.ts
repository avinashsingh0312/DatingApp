import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private alert = inject(ToastService);
  protected cred: any = {};
  login() {
    this.accountService.login(this.cred).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.alert.success('Logged in successfully');
        this.cred = {};
      },
      error: (error) => this.alert.error(error.error),
    });
  }
  logout() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }
}
