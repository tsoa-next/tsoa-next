import { minimatch } from 'minimatch'
import { forEachChild, isClassDeclaration, type Program } from 'typescript'
import { getDecorators } from '../utils/decoratorUtils'
import type { MetadataGenerator } from './metadataGenerator'

export function appendSelectedControllerNodes(program: Program, current: Pick<MetadataGenerator, 'typeChecker' | 'controllerNodes'>, ignorePaths: string[] | undefined): void {
  program.getSourceFiles().forEach(sf => {
    if (sf.isDeclarationFile || program.isSourceFileFromExternalLibrary(sf)) {
      return
    }

    if (ignorePaths?.length) {
      for (const path of ignorePaths) {
        if (minimatch(sf.fileName, path)) {
          return
        }
      }
    }

    forEachChild(sf, node => {
      if (isClassDeclaration(node) && getDecorators(node, (identifier, canonicalName) => canonicalName === 'Route', current.typeChecker).length) {
        current.controllerNodes.push(node)
      }
    })
  })
}
