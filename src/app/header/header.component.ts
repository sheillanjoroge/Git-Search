import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showDiv: boolean
  searchTerm: string
  router: Router
  mySubscription: any;
  private url: string
  searchText: string;

  constructor(router: Router, private githubService: GithubService) {
    this.router = router
    this.showDiv = false
    this.githubService.setSearchedRepoTerm(undefined)

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
        this.url = event.url
        console.log(this.url)
        this.setSearchText()
        
      }
    });
   }

  dropdownMenu(){
    this.showDiv = !this.showDiv
  }
  ngOnInit(): void { }
  
  searchGithub(form){    
    this.searchTerm = form.value.searchTerm
    form.resetForm()
    if(this.url == '/home'){
      console.log(this.searchTerm)
      this.githubService.setSearchedUserTerm(this.searchTerm)
      this.router.navigate(['/home'])
    }else{
      console.log(this.searchTerm)
      this.githubService.setSearchedRepoTerm(this.searchTerm)
      this.router.navigate(['/repositories'])
    }
  }

  setSearchText(){
    console.log(`This is the urL! ${this.url}`)
    if(this.url == '/home'){
      this.searchText = 'Search for user'
    }else{
      this.searchText = 'Search for repository'
    }
  }
}
  
  constructor() { }

  ngOnInit(): void {
  }

}
