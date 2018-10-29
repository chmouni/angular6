import { Component, OnInit } from '@angular/core';
import { GithubService } from './../../services/github.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  private userName: String;
  private gitProfile: any;
  constructor(private githubService: GithubService) { }

  ngOnInit() {
    this.userName = this.githubService.getUser();
    this.gitProfile = this.githubService.getGithubProfile();
  }

}
