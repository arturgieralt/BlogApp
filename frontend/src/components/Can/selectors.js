import { pathOr } from "ramda";

export const getUserRoles = pathOr([], ["info", "roles"]);
