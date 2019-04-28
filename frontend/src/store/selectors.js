import { pipe, pathOr, any, isEmpty } from "ramda";

const isAdminRole = role => role === "Admin";
export const isAdmin = pipe(
  pathOr([], ["user", "claims", "userRoles"]),
  any(isAdminRole)
);

export const isActive = pathOr(false, ["user", "claims", "isActive"]);

export const isAuthenticated = pipe(
  pathOr({}, ["user", "claims"]),
  isEmpty,
  x => !x
);
