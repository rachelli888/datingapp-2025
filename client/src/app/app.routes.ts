import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { MemberList } from '../features/members/member-list/member-list';
import { Lists } from '../features/lists/lists';
import { Messages } from '../features/messages/messages';
import { authGuard } from '../core/guards/auth-guard';
import { TestErrors } from '../features/test-errors/test-errors';
import { MemberPhotos } from '../features/members/member-photos/member-photos';
import { memberResolver } from '../features/members/member-resolver';

export const routes: Routes = [
    { path: '', component: Home },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            { path: 'members', component: MemberList },
            { 
                path: 'members/:id', 
                resolve: {member: memberResolver},
                runGuardsAndResolvers: 'always',
                component: MemberDetailed,
                children : [
                    {path:'',redirectTo:'profile',pathMatch:'full'},
                    {path:'profile',component:MemberDetailed,title:'Profile'},
                    {path:'photos',component:MemberPhotos,title:'Photos'},
                    {path:'messages',component:Messages,title:'Messages'},
                ]
            },
            { path: 'lists', component: Lists },
            { path: 'messages', component: Messages },
        ]
    },
    {path:'errors',component: TestErrors},
    { path: '**', component: Home }
];
