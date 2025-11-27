import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from "../layout/nav/nav";
//import { AccountService } from '../core/service/account-service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //private accountService=inject(AccountService);
  protected router=inject(Router);

  // private http=inject(HttpClient); //构造函数注入
  // protected readonly title = "Dating app";  //signal('client');
  // //protected members:any; //当我们使用any类型时，实际上等于为这个属性关闭了TypeScript,
  // protected members = signal<User[]>([])

  //  ngOnInit(): void {
  //   this.http.get('https://localhost:5001/api/members').subscribe({
  //     //next: response => this.members=response,
  //     next: response => this.members.set(response),
  //     error:error => console.log(error),
  //     complete:()=> console.log("Completed the http request")
  //   })
  // }

  // async ngOnInit() {
  //   //this.members.set(await this.getMembers());
  //   // this.setCurrentUser();
  // }

  // setCurrentUser()
  // {
  //   const userString = localStorage.getItem('user');
  //   if(!userString) return;
  //   const user = JSON.parse(userString);
  //   //this.accountService.currentUser.set(user);
  // }


//  async getMembers()
//   {
//     try {
//       return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }    
//   }
  

}
