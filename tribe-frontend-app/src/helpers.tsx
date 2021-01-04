export function getCookie(name: String) {
  const value = `; ${document.cookie}`;
  const parts: Array<any> = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}