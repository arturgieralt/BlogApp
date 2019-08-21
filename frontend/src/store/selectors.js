import { pipe, pathOr, any, isEmpty } from "ramda";

const isAdminRole = role => role === "Admin";
export const isAdmin = pipe(
  pathOr([], ["user", "info", "roles"]),
  any(isAdminRole)
);

export const isActive = pathOr(false, ["user", "info", "isActive"]);

export const isHuman = pathOr(false, ["user", "isHuman"]);

export const isAuthenticated = pipe(
  pathOr({}, ["user", "info"]),
  isEmpty,
  x => !x
);
