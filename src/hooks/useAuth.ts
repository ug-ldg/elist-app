export function useAuth() {
  const token = localStorage.getItem('token')

  function saveToken(token: string) {
    localStorage.setItem('token', token)
    window.location.href = '/'
  }

  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return { token, saveToken, logout, isAuthenticated: !!token }
}