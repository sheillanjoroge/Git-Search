import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { GithubService } from '../github/github.service';

import { Repo } from '../repo'
@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

  reposLink: string  
  repos
  repository
  constructor(private githubService: GithubService,private router: Router) { }

  ngOnInit(): void {
    if(this.githubService.getSearchedRepoTerm() == undefined){
      if(this.githubService.getRepo() == undefined){
        this.reposLink = 'https://api.github.com/users/GrishonNganga/repos'
        this.displayRepos()
      }else{
      this.reposLink = this.githubService.getRepo()
      this.displayRepos()
      }
    
    }else{
      this.getSearchedRepo()
      
    }
    
    
    
    console.log(this.reposLink)
  }

  async getSearchedRepo(){
    try{
      this.repository = await this.githubService.getSearchedRepo(this.githubService.getSearchedRepoTerm())
      console.log(this.repository)
    }catch(err){
      this.repository = err
      console.log(this.repository)
    }
    
  }
  async displayRepos(){
    this.repos = await this.githubService.getRepos(this.reposLink)
    console.log(this.repos)
  }

  navigateHome(){
    this.router.navigate(['/home'])
  }

  navigateRepos(){
    
    this.router.navigate(['/repositories'])
  }
}