const permissions = {
  "articles:list": {
    type: "static",
    roles: ["User", "Admin", "Guest"]
  },
  "articles:add": {
    type: "static",
    roles: ["Admin"]
  },
  "articles:remove": {
    type: "static",
    roles: ["Admin"]
  },
  "articles:edit": {
    type: "static",
    roles: ["Admin"]
  },
  "comments:list": {
    type: "static",
    roles: ["User", "Admin", "Guest"]
  },
  "comments:add": {
    type: "static",
    roles: ["User", "Admin"]
  },
  "comments:remove": {
    type: "static",
    roles: ["Admin"]
  },
  "users:list": {
    type: "static",
    roles: ["User", "Admin", "Guest"]
  },
  "users:getSelf": {
    type: "static",
    roles: ["User", "Admin"]
  },
  "app:visit": {
    type: "static",
    roles: ["User", "Admin", "Guest"]
  },
  "user-page:visit": {
    type: "static",
    roles: ["User", "Admin"]
  },
  "avatar-upload": {
    type: "static",
    roles: ["User", "Admin"]
  },
  "comments:edit": {
    type: "dynamic",
    roles: ["User", "Admin"],
    check: ({ userId, commentAuthorId }) => {
      if (!userId || !commentAuthorId) return false;
      return userId === commentAuthorId;
    }
  }
};
export default permissions;
