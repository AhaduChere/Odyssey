export default defineNuxtRouteMiddleware((to) => {
  const user = useState("user");

  const publicPages = ["/Auth"];
  const isPublic = publicPages.includes(to.path);

  if (!user.value && !isPublic) {
    return navigateTo("/Auth");
  }

  if (user.value && isPublic) {
    return navigateTo("/");
  }
});
