import { Component, OnInit } from '@angular/core';
import { GithubReposService } from '..github/github.service';
import { Router } from '@angular/router';

import { User } from '../user'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user;

  constructor(public githubService: GithubService,private router: Router) { }

  ngOnInit(): void {

    console.log(this.githubService.getSearchedUserTerm())
    if(this.githubService.getSearchedUserTerm() == undefined){
      this.getDefaultUser()
    }else{
      this.getSearchedUser() 
    }  
  }

  async getDefaultUser(){
    try{
      this.user = await this.githubService.getUser('sheillanjoroge')
      this.githubService.setRepo(this.user.repos_url)
      console.log(this.user)
    }catch(err){
      this.user = err
    }
  }
  
  async getSearchedUser(){
    try{
      this.user = await this.githubService.getSearchedUser(this.githubService.getSearchedUserTerm())
      console.log(this.user)
    }catch(err){
      this.user = err
      console.log(this.user)
    }
  }

  navigateHome(){
    this.router.navigate(['/home'])
  }

  navigateRepos(){
    this.githubService.setRepo(this.user.repos_url)
    this.router.navigate(['/repositories'])
  }
}