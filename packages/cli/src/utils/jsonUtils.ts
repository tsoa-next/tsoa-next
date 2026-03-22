export function safeFromJson(json: string): unknown {
  try {
    return JSON.parse(json)
  } catch {
    return undefined
  }
}
