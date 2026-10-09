export interface BodyInterpretationOwner {
  requestHasBody(headers: Record<string, unknown>): boolean
  requestUsesTransferEncoding(headers: Record<string, unknown>): boolean
  normalizeRequestBody(body: unknown, headers: Record<string, unknown>): unknown
  isRecord(value: unknown): value is Record<string, unknown>
}

export function requestHasBody(headers: Record<string, unknown>): boolean {
  const contentLength = headers['content-length']

  if (Array.isArray(contentLength)) {
    return contentLength.some(value => Number(value) > 0)
  }

  if (typeof contentLength === 'string') {
    return Number(contentLength) > 0
  }

  if (typeof contentLength === 'number') {
    return contentLength > 0
  }

  return false
}

export function requestUsesTransferEncoding(headers: Record<string, unknown>): boolean {
  return headers['transfer-encoding'] !== undefined
}

export function normalizeRequestBody(owner: BodyInterpretationOwner, body: unknown, headers: Record<string, unknown>): unknown {
  if (owner.requestHasBody(headers) || owner.requestUsesTransferEncoding(headers)) {
    return body
  }

  return undefined
}

export function getBodyProperty(owner: BodyInterpretationOwner, body: unknown, headers: Record<string, unknown>, propertyName: string): unknown {
  const normalizedBody = owner.normalizeRequestBody(body, headers)

  if (!owner.isRecord(normalizedBody)) {
    return undefined
  }

  const descriptor = Object.getOwnPropertyDescriptor(normalizedBody, propertyName)
  return descriptor ? descriptor.value : undefined
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
