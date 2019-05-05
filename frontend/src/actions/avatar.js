export const AVATAR_UPLOAD_REQUEST = "[AVATAR]_UPLOAD_REQUEST";
export const AVATAR_UPLOAD_SUCCESS = "[AVATAR]_UPLOAD_SUCCESS";
export const AVATAR_UPLOAD_FAILURE = "[AVATAR]_UPLOAD_FAILURE";

export const uploadAvatar = avatar => ({
  type: AVATAR_UPLOAD_REQUEST,
  avatar
});

export const uploadAvatarSuccess = () => ({
  type: AVATAR_UPLOAD_SUCCESS
});

export const uploadAvatarFailure = error => ({
  type: AVATAR_UPLOAD_FAILURE,
  error
});
