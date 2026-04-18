import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function LoginPage() {
  const { isAuthenticated, saveToken } = useAuth()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      saveToken(token)
      return
    }
    if (isAuthenticated) navigate('/')
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F2F2F7] font-sans">
      <div className="bg-white rounded-2xl p-12 shadow-sm text-center w-80">
        <div className="text-5xl mb-4">📋</div>
        <h1 className="text-2xl font-bold mb-2 text-[#1C1C1E]">eList</h1>
        <p className="text-sm text-[#8E8E93] mb-8">Gestionnaire de tâches</p>
        <a
          href={`${import.meta.env.VITE_API_URL}/auth/google`}
          className="block bg-[#007AFF] text-white py-3.5 rounded-xl text-sm font-semibold no-underline hover:bg-blue-600 transition-colors"
        >
          Se connecter avec Google
        </a>
      </div>
    </div>
  )
}
