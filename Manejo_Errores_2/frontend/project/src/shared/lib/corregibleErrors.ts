
const CORREGIBLES = ["CONFLICT", "VALIDATION"] as const

export type CorregiblesType = typeof CORREGIBLES[number];

export const comprobarCorregible = (code: string): boolean => {
    return (CORREGIBLES as readonly string[]).includes(code);
}