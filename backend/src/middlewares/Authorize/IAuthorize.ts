export interface IAuthorizeMiddleware {
    authorize: (roles?: string[], scopes?: string[]) => any[];
}