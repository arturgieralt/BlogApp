import PropTypes from "prop-types";
import React from "react";
import * as R from "ramda";
import { getUserRoles } from "./selectors";
import permissions from "../../config/permissions";

const check = (user, permission, data) => {
  const userRoles = getUserRoles(user);

  if (R.isEmpty(userRoles)) {
    return false;
  }

  const permissionData = permissions[permission];
  if (R.isNil(permissionData)) {
    // role is not present in the rules
    return false;
  }

  const { type, roles } = permissionData;

  const hasARole = R.pipe(
    R.intersection(roles),
    R.length,
    R.equals(0),
    R.not
  )(userRoles);

  if (!hasARole) {
    return false;
  }

  if (type === "dynamic") {
    return permissionData.check(data);
  }

  return true;
};

const Can = ({ permission, data, Component, NoAccessComponent }) =>
  function WrappedCan({ user }) {
    return check(user, permission, data) ? (
      <Component />
    ) : (
      <NoAccessComponent />
    );
  };

Can.propTypes = {
  permission: PropTypes.string.isRequired,
  data: PropTypes.object,
  Component: PropTypes.func.isRequired,
  NoAccessComponent: PropTypes.func.isRequired
};

Can.defaultProps = {
  data: {}
};

export default Can;
