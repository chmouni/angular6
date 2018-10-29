import { Component, OnInit } from '@angular/core';
import { GithubService } from './../../services/github.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private userName: String;
  private gitProfile:any;
  private gitFollowers:any;

  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.userName = this.githubService.getUser();
    this.gitProfile = this.githubService.getGithubProfile();
    this.gitFollowers = this.githubService.getGithubFollowers()
  }

  setUserName(){
    this.githubService.setUser(this.userName);
  }

  getGithubProfile(){
    this.githubService.fetchGithubProfile()
    .subscribe(profile => this.gitProfile = profile);
  }
   
}
