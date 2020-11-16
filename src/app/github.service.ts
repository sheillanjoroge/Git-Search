import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  http: HttpClient
  private user
  isUserChecked: boolean
  private searchedTerm: string
  private searchedRepo: string
  private searchTermChange: Subject<string> = new Subject<string>()
  private searchRepoChange: Subject<string> = new Subject<string>()
  private repoChange: Subject<string> = new Subject<string>()
  private repo: string;

  constructor(private httpService: HttpClient) { 
    this.http = httpService
    this.searchTermChange.subscribe(data=>{
      this.searchedTerm = data
    })
    this.repoChange.subscribe(data=>{
      this.repo = data
    })

    this.searchRepoChange.subscribe(data=>{
      this.searchedRepo = data
    })
  }

  getUser(user): Promise<Object>{
    const userPromise = new Promise((resolve, reject)=>{
      this.http.get(`${environment.endpoint}/users/${user}`).subscribe((data)=>{
        resolve(data)
      },(err)=>{
        reject(err)
      })
    })
    
    return userPromise
    
  }
  
  async getSearchedUser(searchTerm: string){
    let userPromise;
    const searchPromise = new Promise((resolve, reject)=>{
      this.http.get(`${environment.endpoint}/search/users?q=${searchTerm}`).subscribe((data)=>{
        let user: string = data['items'][0].url
        user = user.substr(29)
        resolve(user)
      }, (err)=>{
        reject(err)
      })
    })

    await searchPromise.then((user)=>{
      userPromise = this.getUser(user)
      .catch((err)=>{
        console.log(`${err} Something wrong happened searching for the user!`)
      })
    })
    return userPromise
  }

  async getSearchedRepo(searchTerm: string){
    let userPromise;
    const searchPromise = new Promise((resolve, reject)=>{
      this.http.get(`${environment.endpoint}/search/repositories?q=${searchTerm}`).subscribe((data)=>{
        let repo: string = data['items'][0].url
        console.log( `The url is ${repo}`)
        resolve(repo)
      }, (err)=>{
        reject(err)
      })
    })

    await searchPromise.then((repo)=>{
      console.log(`This is what we expecting ${repo}`)
      userPromise = this.getRepos(repo)
      .catch((err)=>{
        console.log(`${err} Something wrong happened searching for the user!`)
      })
    })
    return userPromise
  }
  getRepos(url){
    const reposPromise = new Promise((resolve, reject)=>{
      this.http.get(url).subscribe((data)=>{
        resolve(data)
      }, (err)=>{
        reject(`${err}, Something wrong happened`)
      })
    })
    return reposPromise
  }
  getUserStatus(){
    return this.user
  }
  getSearchedUserTerm(){
    return this.searchedTerm
  }
  setSearchedUserTerm(searchItem){
    this.searchedTerm = searchItem
    console.log(`We are in here and the data is ${searchItem}`)
    this.searchTermChange.next(this.searchedTerm)
  }

  getSearchedRepoTerm(){
    return this.searchedRepo
  }
  setSearchedRepoTerm(searchItem){
    this.searchedRepo = searchItem
    this.searchRepoChange.next(this.searchedRepo)
  }
  getRepo(){
    return this.repo
  }
  setRepo(repo){
    this.repo = repo
    this.repoChange.next(this.repo)
  }
}