import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class GithubReposService {

  constructor(private http: HttpClient) { }

  getGithubPublicRepos() {
    const username= "sheillanjoroge";
    return this.http.get('https://api.github.com/users/${username}/repos');
  }
}
