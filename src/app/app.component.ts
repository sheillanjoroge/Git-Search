import { Component } from '@angular/core';
import { GithubReposService } from './github-repos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GitSearch';


  githubRepos = [];
  constructor(private githubService: GithubReposService) {}

  getRepos(){
    this.githubService.getGithubPublicRepos().subscribe(repos => {

    });
    
  }
}
