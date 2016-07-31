import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

/*
  Generated class for the Docker provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Docker {

  constructor(private http: Http) {

  }

  getAllContainers(): Observable<any> {
    return this.http.get('/allContainers')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getAllImages(): Observable<any> {
    return this.http.get('/allImages')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getContainer(id: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { id: id };

    return this.http.post('/containerInfo', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getImage(id: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { id: id };

    return this.http.post('/getImage', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  startContainer(id: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { id: id };

    return this.http.post('/startContainer', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  stopContainer(id: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { id: id };

    return this.http.post('/stopContainer', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeContainer(id: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { id: id };

    return this.http.post('/removeContainer', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  removeImage(id: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { id: id };

    return this.http.post('/removeImage', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  createContainer(image: string, command: string, name: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { image: image, command: command, name: name };

    return this.http.post('/createContainer', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  pullImage(imageName: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = { image: imageName };

    return this.http.post('/pullImage', body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleError(error: any) {
    console.error(error); // log to console instead
    return Observable.throw(error);
  }

}

