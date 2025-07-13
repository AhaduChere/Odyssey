export const useLogin = async (email: string, password: string) => {
  return await $fetch('/api/login', {
    method: 'POST',
    body: { email, password },
  })
}
