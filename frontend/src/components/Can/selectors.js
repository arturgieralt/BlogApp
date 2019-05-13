import { pathOr } from "ramda";

export const getUserRoles = pathOr([], ["claims", "userRoles"]);
