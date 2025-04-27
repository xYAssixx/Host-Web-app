const fakeUsers = [
  { username: "admin", password: "admin", role: "admin" },
  { username: "teacher", password: "teacher", role: "teacher" },
  { username: "parent", password: "parent", role: "parent" },
];

const SESSION_KEY = "gt_user";

export default {
  login(username, password) {
    const user = fakeUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return Promise.resolve({ success: true, user });
    }
    return Promise.resolve({
      success: false,
      message: "Incorrect username or password",
    });
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getCurrentUser() {
    const raw = localStorage.getItem(SESSION_KEY);
    return JSON.parse(raw);
  },
};
