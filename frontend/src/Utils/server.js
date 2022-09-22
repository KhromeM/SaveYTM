const serverURL = 'http://localhost:3003';

export const giveOAuth = async (code, idToken) => {
  const body = JSON.stringify({ code, idToken });
  const path = serverURL + '/giveoauth';
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const response = await res.json();
  return response;
};

export const getOAuthLink = async idToken => {
  const body = JSON.stringify({ idToken });
  const path = serverURL + '/getoauthlink';
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const response = await res.json();
  return response;
};

export const update = async idToken => {
  const body = JSON.stringify({ idToken });
  const path = serverURL + '/update';
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });
  const response = await res.json();
  return response;
};
