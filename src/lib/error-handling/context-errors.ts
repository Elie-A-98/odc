export class ContextError extends Error {
    constructor(contextName: string) {
        super(`${contextName} cannot be used outside of a provider`);
    }
}