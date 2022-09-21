const serverURL = 'https://localhost:3003';

if (user) {
  user.getIdToken(false).then(r => console.log(r));
}
