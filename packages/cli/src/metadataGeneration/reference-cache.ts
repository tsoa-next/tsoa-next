import type { Tsoa } from '@tsoa-next/runtime'
import type { MetadataGenerator } from './metadataGenerator'

type ReferenceCacheOwner = { readonly current: MetadataGenerator }

type ReferenceTypeCache = {
  referenceTypes: Tsoa.ReferenceTypeMap
  inProgressTypes: Record<string, Array<(realType: Tsoa.ReferenceType) => void>>
}

let referenceTypeCaches = new WeakMap<MetadataGenerator, ReferenceTypeCache>()

function getReferenceTypeCache(owner: ReferenceCacheOwner): ReferenceTypeCache {
  let cache = referenceTypeCaches.get(owner.current)
  if (!cache) {
    cache = { referenceTypes: {}, inProgressTypes: {} }
    referenceTypeCaches.set(owner.current, cache)
  }
  return cache
}

export function clearReferenceTypeCaches(): void {
  referenceTypeCaches = new WeakMap<MetadataGenerator, ReferenceTypeCache>()
}

export function getCachedReferenceType(owner: ReferenceCacheOwner, name: string): Tsoa.ReferenceType | undefined {
  return getReferenceTypeCache(owner).referenceTypes[name]
}

export function isReferenceTypeInProgress(owner: ReferenceCacheOwner, name: string): boolean {
  return Boolean(getReferenceTypeCache(owner).inProgressTypes[name])
}

export function beginReferenceType(owner: ReferenceCacheOwner, name: string): void {
  getReferenceTypeCache(owner).inProgressTypes[name] = []
}

export function discardInProgressReferenceType(owner: ReferenceCacheOwner, name: string): void {
  delete getReferenceTypeCache(owner).inProgressTypes[name]
}

export function completeReferenceType(owner: ReferenceCacheOwner, name: string, refType: Tsoa.ReferenceType) {
  if (getReferenceTypeCache(owner).inProgressTypes[name]) {
    for (const fn of getReferenceTypeCache(owner).inProgressTypes[name]) {
      fn(refType)
    }
  }
  getReferenceTypeCache(owner).referenceTypes[name] = refType

  delete getReferenceTypeCache(owner).inProgressTypes[name]
}

export function createCircularReference(owner: ReferenceCacheOwner, refName: string, refTypeName: string) {
  const referenceType = {
    dataType: 'refObject',
    refName: refTypeName,
  } as Tsoa.ReferenceType

  getReferenceTypeCache(owner).inProgressTypes[refName].push(realReferenceType => {
    Object.assign(referenceType, realReferenceType)
  })
  return referenceType
}
