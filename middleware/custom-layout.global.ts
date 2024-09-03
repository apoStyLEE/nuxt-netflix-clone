export default defineNuxtRouteMiddleware((to) => {
  // Set the layout on the route you are navigating _to_
  const baseLayoutPaths = ["/profile", "/login"];

  if (baseLayoutPaths.includes(to.path)) {
    setPageLayout("base");
    return;
  }

  if (to.path.startsWith("/admin")) {
    setPageLayout("admin");
    return;
  }
});
