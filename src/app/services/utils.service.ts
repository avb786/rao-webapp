import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  linkGeneration(host,port,apiPrefix, url) {
    let urlLink = `http://${host}:${port}${apiPrefix}${url}`;
    if (environment.production) urlLink = `https://${host}${apiPrefix}${url}`;
    return urlLink;
  }
}


