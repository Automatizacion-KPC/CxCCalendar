export function sanitizeText(text: string): string {
  if (!text) return text;

  return text
    // 1. Descompone los caracteres combinados (NFD separa las letras de sus acentos)
    .normalize('NFD')
    // 2. Elimina los diacríticos / acentos
    .replace(/[\u0300-\u036f]/g, '')
    // 3. Convierte a mayúsculas
    .toUpperCase()
    // 4. Elimina cualquier caracter que NO sea letra (A-Z), número (0-9) o espacio
    .replace(/[^A-Z0-9\s_]/g, '')
    // 5. Elimina espacios dobles o bordes
    .trim();
}


export function sanitizeObject<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) return obj;

  const sanitized = Array.isArray(obj) ? [...obj] : { ...obj };

  for (const key of Object.keys(sanitized)) {
    const value = (sanitized as Record<string, any>)[key];

    if (typeof value === 'string') {
      (sanitized as Record<string, any>)[key] = sanitizeText(value);
    } else if (typeof value === 'object' && value !== null) {
      (sanitized as Record<string, any>)[key] = sanitizeObject(value);
    }
  }

  return sanitized as T;
}