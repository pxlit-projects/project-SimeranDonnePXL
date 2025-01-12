import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../shared/services/auth-service.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean = false;
  loginService:AuthServiceService = inject(AuthServiceService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.loginService.loginState$.subscribe((state) => {
      this.isLoggedIn = state;
    });
  }

  logout() : void{
    this.loginService.logout();
    this.router.navigate(["/posts"])
  }
}
