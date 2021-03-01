import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }


  linkGeneration(host,port,apiPrefix, url) {
    let urlLink = `http://${host}:${port}${apiPrefix}${url}`;
    return urlLink;
  }
}


