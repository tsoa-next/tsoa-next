import { Config, Tsoa } from '@tsoa-next/runtime'
import { createProgram, type ClassDeclaration, type CompilerOptions, type Program, type TypeChecker } from 'typescript'
import { appendSelectedControllerNodes } from './controller-discovery'
import { checkForMethodSignatureDuplicates, checkForPathParamSignatureDuplicates } from './route-collisions'
import { importClassesFromDirectories } from '../utils/importClassesFromDirectories'
import { assertValidateDecoratorTargets } from '../utils/validateDecoratorUtils'
import { ControllerGenerator } from './controllerGenerator'
import { GenerateMetadataError } from './exceptions'

export class MetadataGenerator {
  public readonly controllerNodes = new Array<ClassDeclaration>()
  public readonly typeChecker: TypeChecker
  private readonly program: Program
  private referenceTypeMap: Tsoa.ReferenceTypeMap = {}
  private modelDefinitionPosMap: { [name: string]: Array<{ fileName: string; pos: number }> } = {}
  private expressionOrigNameMap: Record<string, string> = {}

  constructor(
    entryFile: string,
    private readonly compilerOptions?: CompilerOptions,
    private readonly ignorePaths?: string[],
    controllers?: string[],
    private readonly rootSecurity: Tsoa.Security[] = [],
    public readonly defaultNumberType: NonNullable<Config['defaultNumberType']> = 'double',
    esm = false,
  ) {
    this.program = controllers ? this.setProgramToDynamicControllersFiles(controllers, esm) : createProgram([entryFile], compilerOptions || {})
    this.typeChecker = this.program.getTypeChecker()
  }

  public Generate(): Tsoa.Metadata {
    assertValidateDecoratorTargets(this.program, this.typeChecker)
    this.extractNodeFromProgramSourceFiles()

    const controllers = this.buildControllers()

    this.checkForMethodSignatureDuplicates(controllers)
    this.checkForPathParamSignatureDuplicates(controllers)

    return {
      controllers,
      referenceTypeMap: this.referenceTypeMap,
    }
  }

  private setProgramToDynamicControllersFiles(controllers: string[], esm: boolean) {
    const allGlobFiles = importClassesFromDirectories(controllers, esm ? ['.mts', '.ts', '.cts'] : ['.ts'])
    if (allGlobFiles.length === 0) {
      throw new GenerateMetadataError(`[${controllers.join(', ')}] globs found 0 controllers.`)
    }

    return createProgram(allGlobFiles, this.compilerOptions || {})
  }

  private extractNodeFromProgramSourceFiles() {
    appendSelectedControllerNodes(this.program, this, this.ignorePaths)
  }

  private checkForMethodSignatureDuplicates(controllers: Tsoa.Controller[]) {
    checkForMethodSignatureDuplicates(controllers)
  }

  private checkForPathParamSignatureDuplicates(controllers: Tsoa.Controller[]) {
    checkForPathParamSignatureDuplicates(controllers)
  }

  public TypeChecker() {
    return this.typeChecker
  }

  public AddReferenceType(referenceType: Tsoa.ReferenceType) {
    if (!referenceType.refName) {
      throw new Error('no reference type name found')
    }
    this.referenceTypeMap[referenceType.refName] = referenceType
  }

  public GetReferenceType(refName: string) {
    return this.referenceTypeMap[refName]
  }

  public CheckModelUnicity(refName: string, positions: Array<{ fileName: string; pos: number }>) {
    const originalPositions = this.modelDefinitionPosMap[refName]
    if (originalPositions === undefined) {
      this.modelDefinitionPosMap[refName] = positions
      return
    }

    const hasSamePositions = originalPositions.length === positions.length && positions.every(pos => originalPositions.find(origPos => pos.pos === origPos.pos && pos.fileName === origPos.fileName))

    if (!hasSamePositions) {
      throw new Error(`Found 2 different model definitions for model ${refName}: orig: ${JSON.stringify(originalPositions)}, act: ${JSON.stringify(positions)}`)
    }
  }

  public CheckExpressionUnicity(formattedRefName: string, refName: string) {
    const originalRefName = this.expressionOrigNameMap[formattedRefName]
    if (originalRefName === undefined) {
      this.expressionOrigNameMap[formattedRefName] = refName
      return
    }

    if (originalRefName !== refName) {
      throw new Error(`Found 2 different type expressions for formatted name "${formattedRefName}": orig: "${originalRefName}", act: "${refName}"`)
    }
  }

  private buildControllers() {
    if (this.controllerNodes.length === 0) {
      throw new Error('no controllers found, check tsoa configuration')
    }
    return this.controllerNodes
      .map(classDeclaration => new ControllerGenerator(classDeclaration, this, this.rootSecurity))
      .filter(generator => generator.IsValid())
      .map(generator => generator.Generate())
  }
}
