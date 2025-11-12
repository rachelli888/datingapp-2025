import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom, single } from 'rxjs';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  private http=inject(HttpClient); //构造函数注入
  protected readonly title = "Dating app";  //signal('client');
  //protected members:any; //当我们使用any类型时，实际上等于为这个属性关闭了TypeScript,
  protected members = signal<any>([])

  //  ngOnInit(): void {
  //   this.http.get('https://localhost:5001/api/members').subscribe({
  //     //next: response => this.members=response,
  //     next: response => this.members.set(response),
  //     error:error => console.log(error),
  //     complete:()=> console.log("Completed the http request")
  //   })
  // }

  async ngOnInit() {
    this.members.set(await this.getMembers())
  }

 async getMembers()
  {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.log(error);
      throw error;
    }    
  }
  

}
