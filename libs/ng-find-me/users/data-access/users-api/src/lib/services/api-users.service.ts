/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ApiUserSummary } from '../models/api-user-summary';

@Injectable({
  providedIn: 'root',
})
export class ApiUsersService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /**
   * Path part for operation usersGet
   */
  static readonly UsersGetPath = '/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersGet$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersGet$Plain$Response(params?: {}): Observable<
    StrictHttpResponse<Array<ApiUserSummary>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiUsersService.UsersGetPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'text',
          accept: 'text/plain',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<ApiUserSummary>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersGet$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersGet$Plain(params?: {}): Observable<Array<ApiUserSummary>> {
    return this.usersGet$Plain$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<ApiUserSummary>>) =>
          r.body as Array<ApiUserSummary>
      )
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `usersGet$Json()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersGet$Json$Response(params?: {}): Observable<
    StrictHttpResponse<Array<ApiUserSummary>>
  > {
    const rb = new RequestBuilder(
      this.rootUrl,
      ApiUsersService.UsersGetPath,
      'get'
    );
    if (params) {
    }

    return this.http
      .request(
        rb.build({
          responseType: 'json',
          accept: 'text/json',
        })
      )
      .pipe(
        filter((r: any) => r instanceof HttpResponse),
        map((r: HttpResponse<any>) => {
          return r as StrictHttpResponse<Array<ApiUserSummary>>;
        })
      );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `usersGet$Json$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  usersGet$Json(params?: {}): Observable<Array<ApiUserSummary>> {
    return this.usersGet$Json$Response(params).pipe(
      map(
        (r: StrictHttpResponse<Array<ApiUserSummary>>) =>
          r.body as Array<ApiUserSummary>
      )
    );
  }
}
