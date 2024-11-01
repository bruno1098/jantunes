'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      // Aqui você deve implementar sua lógica de autenticação
      // Por enquanto, vamos usar credenciais fixas para demonstração
      if (email === 'admin@admin.com' && password === 'admin') {
        // Salvar token/estado de autenticação
        localStorage.setItem('isAuthenticated', 'true')
        router.push('/admin/produtos')
      } else {
        setError('Email ou senha inválidos')
      }
    } catch (error) {
      setError('Erro ao fazer login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">
            Login Administrativo
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                placeholder="a@a.a"
                className="bg-white dark:bg-gray-800"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                placeholder="********"
                className="bg-white dark:bg-gray-800"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}