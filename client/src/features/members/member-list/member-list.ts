import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { MemberService } from '../../../core/service/member-service';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from "../member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList {
  private memberService = inject(MemberService);
  protected members$: Observable<Member[]>;  // Observable to hold member data

  constructor() {
    this.members$ = this.memberService.getMembers();
  }

}
