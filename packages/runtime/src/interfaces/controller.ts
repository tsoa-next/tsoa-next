import type { OutgoingHttpHeaders } from 'node:http'

type HeaderNames = keyof OutgoingHttpHeaders
type HeaderValue<H extends HeaderNames> = OutgoingHttpHeaders[H]

/**
 * Base controller class that lets actions override the eventual status code and headers.
 */
export class Controller {
  private statusCode?: number = undefined
  private headers = {} as { [name: string]: string | string[] | undefined }

  /** Sets the HTTP status code that the generated route handler should return. */
  public setStatus(statusCode: number) {
    this.statusCode = statusCode
  }

  /** Returns the HTTP status code set through {@link setStatus}, if any. */
  public getStatus() {
    return this.statusCode
  }

  public setHeader<H extends HeaderNames>(name: H, value?: HeaderValue<H>): void
  public setHeader(name: string, value?: string | string[]): void

  /** Stores a response header value that the generated route handler should emit. */
  public setHeader(name: string, value?: string | string[]) {
    this.headers[name] = value
  }

  /** Returns a previously assigned response header value. */
  public getHeader(name: string) {
    return this.headers[name]
  }

  /** Returns all response headers assigned on the controller instance. */
  public getHeaders() {
    return this.headers
  }
}
