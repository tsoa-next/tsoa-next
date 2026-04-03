import type { Node, EnumDeclaration, EnumMember } from 'typescript'
import { isEnumDeclaration, isEnumMember } from 'typescript'
import { Tsoa } from '@tsoa-next/runtime'

import { Transformer } from './transformer'
import { isExistJSDocTag } from '../../utils/jsDocUtils'
import { TypeResolver } from '../typeResolver'

export class EnumTransformer extends Transformer {
  public static mergeMany(many: Tsoa.RefEnumType[]): Tsoa.RefEnumType {
    let merged = this.merge(many[0], many[1])
    for (let i = 2; i < many.length; ++i) {
      merged = this.merge(merged, many[i])
    }
    return merged
  }

  public static merge(first: Tsoa.RefEnumType, second: Tsoa.RefEnumType): Tsoa.RefEnumType {
    if (!first) return second
    if (!second) return first

    const description = this.mergeDescription(first.description, second.description)
    const deprecated = first.deprecated || second.deprecated
    const enums = this.mergeOptionalArray(first.enums, second.enums) as Tsoa.RefEnumType['enums']
    const enumVarnames = this.mergeOptionalArray(first.enumVarnames, second.enumVarnames)
    const example = first.example ?? second.example
    const title = first.title ?? second.title
    const merged: Tsoa.RefEnumType = {
      dataType: 'refEnum',
      description,
      enums,
      enumVarnames,
      refName: first.refName,
      deprecated,
      example,
    }

    if (title !== undefined) {
      merged.title = title
    }

    return merged
  }

  public static transformable(declaration: Node): declaration is EnumDeclaration | EnumMember {
    return isEnumDeclaration(declaration) || isEnumMember(declaration)
  }

  public transform(resolver: TypeResolver, declaration: EnumDeclaration | EnumMember, enumName: string): Tsoa.RefEnumType {
    if (isEnumDeclaration(declaration)) {
      return this.transformDeclaration(resolver, declaration, enumName)
    }
    return this.transformMember(resolver, declaration, enumName)
  }

  private transformDeclaration(resolver: TypeResolver, declaration: EnumDeclaration, enumName: string): Tsoa.RefEnumType {
    const isNotUndefined = <T>(item: T): item is Exclude<T, undefined> => item !== undefined
    const enums = declaration.members.map(e => resolver.current.typeChecker.getConstantValue(e)).filter(isNotUndefined)
    const enumVarnames = declaration.members.map(e => e.name.getText()).filter(isNotUndefined)
    const title = resolver.getNodeTitle(declaration)
    const refEnum: Tsoa.RefEnumType = {
      dataType: 'refEnum',
      description: resolver.getNodeDescription(declaration),
      example: resolver.getNodeExample(declaration),
      enums,
      enumVarnames,
      refName: enumName,
      deprecated: isExistJSDocTag(declaration, tag => tag.tagName.text === 'deprecated'),
    }

    if (title !== undefined) {
      refEnum.title = title
    }

    return refEnum
  }

  private transformMember(resolver: TypeResolver, declaration: EnumMember, enumName: string): Tsoa.RefEnumType {
    return {
      dataType: 'refEnum',
      refName: enumName,
      enums: [resolver.current.typeChecker.getConstantValue(declaration)!],
      enumVarnames: [declaration.name.getText()],
      deprecated: isExistJSDocTag(declaration, tag => tag.tagName.text === 'deprecated'),
    }
  }

  private static mergeDescription(first?: string, second?: string) {
    if (first === undefined) {
      return second
    }

    if (second === undefined) {
      return first
    }

    return `${first}\n${second}`
  }

  private static mergeOptionalArray<T>(first?: T[], second?: T[]) {
    if (first === undefined) {
      return second
    }

    if (second === undefined) {
      return first
    }

    return [...first, ...second]
  }
}
