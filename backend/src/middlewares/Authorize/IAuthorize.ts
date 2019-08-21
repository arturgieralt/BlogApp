export interface IAuthorizeMiddleware {
    authorize: (roles?: string[]) => any[];
}
