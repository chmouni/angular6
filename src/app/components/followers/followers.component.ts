import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GithubService } from './../../services/github.service';
import { copyStyles } from '@angular/animations/browser/src/util';
import { Hash } from 'crypto';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  private userName: String;
  private gitFollowers: any;
  private gitProfile: any;
  private gitFollowersinner: any;

  constructor(private githubService: GithubService, private cd: ChangeDetectorRef) {}

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

  getGithubFollowersinner(follower: any){
    this.githubService.fetchGithubFollowersinner(follower.login)
    .subscribe(
        data => {
          follower.gitFollowers = data;
        }
      );
  }
}
