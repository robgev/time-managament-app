
export const set = (token: string) => {
  localStorage.setItem('sessionToken', token);
}

export const get = () => localStorage.getItem('sessionToken');

export const remove = () => {
  localStorage.removeItem('sessionToken');
}
