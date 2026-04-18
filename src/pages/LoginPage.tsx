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
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F2F2F7',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        }}>
            <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '48px',
                boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                textAlign: 'center',
                width: '320px',
            }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px', color: '#1C1C1E' }}>eList</h1>
                <p style={{ fontSize: '14px', color: '#8E8E93', margin: '0 0 32px' }}>
                    Gestionnaire de tâches
                </p>
                <a
                    href={`${import.meta.env.VITE_API_URL}/auth/google`}
                    style={{
                        display: 'block',
                        backgroundColor: '#007AFF',
                        color: '#FFFFFF',
                        padding: '14px',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontSize: '15px',
                        fontWeight: 600,
                    }}
                >
                    Se connecter avec Google
                </a>
            </div>
        </div>
    )
}