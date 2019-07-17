import { Application } from 'express';
import { RouteMapping } from './../setup/routes';
import { errorHandling } from './decorators';

export default function registerRoutes(
    app: Application,
    mapping: RouteMapping
) {
    Object.keys(mapping).forEach(route => {
        const methods = mapping[route];
        const httpVerbs = Object.keys(methods);

        httpVerbs.reduce((acc, el) => {
            const routeSetup = methods[el];
            let routeChain = [errorHandling(routeSetup.controller)];
            if (routeSetup.middlewares !== undefined) {
                routeChain = [...routeSetup.middlewares, ...routeChain];
            }

            return (acc as any)[el](...routeChain);
        }, app.route(route));
    });
}
