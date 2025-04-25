import AdminComponent from './components/admin/DashboardComponent.js';
import TeacherComponent from './components/teacher/DashboardComponent.js';
import ParentComponent from './components/parent/DashboardComponent.js';

export function initRouter(user) {
  const main = document.getElementById("main");
  const hash = window.location.hash || '#dashboard';

  const routes = {
    admin: AdminComponent,
    teacher: TeacherComponent,
    parent: ParentComponent
  };

  const Component = routes[user.role];
  if (Component && Component.render) {
    Component.render(hash, main);
  }

  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash;
    Component.render(newHash, main);
  });
}
