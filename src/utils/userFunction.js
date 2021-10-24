//get new user and update localStorage
export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
//get user from local storage
export const getUser = () => JSON.parse(localStorage.getItem("user"));
