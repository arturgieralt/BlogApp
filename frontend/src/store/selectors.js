import { pipe, pathOr, any, isEmpty } from "ramda";

const isAdminRole = role => role === "Admin";
export const isAdmin = pipe(
  pathOr([], ["user", "claims", "userRoles"]),
  any(isAdminRole)
);

export const isActive = pathOr(false, ["user", "info", "isActive"]);

export const isHuman = pathOr(false, ["user", "isHuman"]);

export const isAuthorized = pipe(
  pathOr({}, ["user", "claims"]),
  isEmpty,
  x => !x
);

export const isAuthenticated = pipe(
  pathOr({}, ["user", "info"]),
  isEmpty,
  x => !x
);
