import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private githubUrl = 'https://api.github.com';
  private githubProfile: any;

  constructor(private http: HttpClient,) { }
  private userName: String = '';
  private githubUserProfile: any;

  getUser(){
    return this.userName;
  }

  setUser(user_name: String){
    this.userName = user_name;
  }

  getGithubProfile(){
    return this.githubUserProfile;
  }

  fetchGithubProfile(){
    return this.http.get(this.githubUrl+'/users/'+this.userName)
    .pipe(
      tap(githubUser => this.githubUserProfile = githubUser),
      catchError(this.handleError('getGithubProfile', []))
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
