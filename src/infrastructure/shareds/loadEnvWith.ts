export function LoadEnvWithExceptions<T>(key: string): T {
    const env = process.env[key];
    if (!env) throw new Error(`Error al cargar la variable [${key}]`);
    return env as T;
}

export function LoadEnvWithVoid<T>(key: string): T {
    return process.env[key] as T;
}