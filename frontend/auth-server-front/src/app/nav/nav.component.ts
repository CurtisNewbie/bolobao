import { Component, OnInit } from "@angular/core";
import { UserInfo } from "src/models/user-info";
import { UserService } from "../user.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
  isAdmin: boolean = false;
  userInfo: UserInfo = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (!this.userService.hasUserInfo()) {
      this.userService.fetchUserInfo();
    }
    this.userService.userInfoObservable.subscribe({
      next: (user) => {
        this.isAdmin = user.role === "admin";
        this.userInfo = user;
      },
    });
    this.userService.isLoggedInObservable.subscribe({
      next: (isLoggedIn) => {
        if (!isLoggedIn) {
          this.isAdmin = false;
          this.userInfo = null;
        }
      },
    });
    if (!this.userService.hasUserInfo()) {
      this.userService.fetchUserInfo();
    }
  }

  /** log out current user and navigate back to login page */
  logout(): void {
    this.userService.logout().subscribe({
      complete: () => {
        console.log("Logged out user, navigate back to login page");
      },
    });
  }
}
