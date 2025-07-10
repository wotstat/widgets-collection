

export async function channelKey(privateKey: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(privateKey);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const base64String = btoa(String.fromCharCode(...hashArray));
  return base64String.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
}