import { Component } from '@angular/core';
import { GithubReposService } from './github-repos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'GitSearch';


  githubRepos :any = [];
  constructor(private githubService: GithubReposService) {
    
  }
  ngOnInit(): void {
    this.getRepos();
  }

  getRepos(){
    this.githubService.getGithubPublicRepos().subscribe(repos => {
      this.githubRepos = repos;

    });

  }
}
