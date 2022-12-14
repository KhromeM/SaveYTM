const serverURL = 'https://saveytm.uc.r.appspot.com/';
// const serverURL = 'http://localhost:8080';
const serverURL2 = 'https://saveytm1.uc.r.appspot.com';
// const serverURL2 = 'http://localhost:3004';

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

export const upload = async (playlist, idToken) => {
  const body = JSON.stringify({ playlist, idToken });
  const path = serverURL2 + '/upload';
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
