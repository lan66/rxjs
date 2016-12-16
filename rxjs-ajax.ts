/**
 * Created by Administrator on 2016/12/16.
 */
import { User } from './struct/user'
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/map'
import 'core-js/es6/promise'

// function getX<T>():
// console.log(ajax.get('./data/rxjs-ajax.json')
//     .map(res =>{return res.response;}));
// ajax.get('./data/rxjs-ajax.json')
//     .map(res =>{return res.response;})
//     .subscribe(data =>{
//         let users:User[] = <User[]>(data)
//         console.log(users[0]);
//         // console.log( users[0] instanceof User);
//     });

export class Users{
    getUsers(url:string){
        return ajax.get(url)
            .map(res =>{ return res.response});
            // .subscribe(data =>{
            //     let users:User[] = <User[]>(data.response)
            //     console.log(users[0]);
            //     // console.log( users[0] instanceof User);
            // });
    }
}
var users = new Users;
let url = './data/rxjs-ajax.json';
users.getUsers(url).subscribe(data =>{
    console.log(data[0]);
});
