import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Url } from 'url';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private githubUrl = 'https://api.github.com';
  private userName: String = '';
  private githubUserProfile: any;
  private githubUserFollowers;
  private githubUserFollowersinner;
  
  constructor(private http: HttpClient,) { }


  getUser(){
    return this.userName;
  }

  setUser(user_name: String){
    this.userName = user_name;
  }

  getGithubProfile(){
    return this.githubUserProfile;
  }

  getGithubFollowers(){
    return this.githubUserFollowers;
  }
  
  fetchGithubProfile(){
    return this.http.get(this.githubUrl+'/users/'+this.userName)
    .pipe(
      tap(githubUser => this.githubUserProfile = githubUser),
      catchError(this.handleError('getGithubProfile', []))
    );
  }

  fetchGithubFollowers() {
    return this.http.get(this.githubUrl+'/users/'+this.userName+'/followers')
    .pipe(
      tap(gitFollowers => this.githubUserFollowers = gitFollowers),
      catchError(this.handleError('fetchGithubFollowers', []))
    );
  }

  fetchGithubFollowersinner(name: string) {
    return this.http.get(this.githubUrl+'/users/'+name+'/followers')
    .pipe(
      catchError(this.handleError('fetchGithubFollowersinner', []))
    );
  }
  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.info(`HeroService: ${message}`);
  }
}
