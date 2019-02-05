export function validateUsername(username: string) {
  return username.length < 30 && username.length > 4;
}
