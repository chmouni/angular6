import { Component, OnInit } from '@angular/core';
import { GithubService } from './../../services/github.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  private userName: String;
  private gitFollowers: any;
  private gitProfile: any
  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.userName = this.githubService.getUser();
    this.gitProfile = this.githubService.getGithubProfile();
    this.gitFollowers = this.githubService.getGithubFollowers();
  }

  setUserName(){
    this.githubService.setUser(this.userName);
  }

  getGithubFollowers(){
    this.githubService.fetchGithubFollowers()
    .subscribe(
      data => { 
        this.gitFollowers = data;
        }
      );
  }
}
