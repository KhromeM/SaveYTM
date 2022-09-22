const serverURL = 'http://localhost:3003';

export const giveOAuth = async (code, idToken) => {
  const body = JSON.stringify({ code: code, idToken });
  const path = serverURL + '/giveoauth';
  const res = await fetch(path, {
    method: 'POST',
    // mode: 'cors',
    // cache: 'no-cache',
    // credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const response = await res.json();
  return response;
};
