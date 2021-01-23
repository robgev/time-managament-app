export interface SyntheticError extends Error {
  status: number,
  code: number,
  message: string,
  errors?: Array<string>
}
