"use client"
import { signup } from '@/app/login/action'
import { redirect, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

export default function LoginPage() {

  const { toast } = useToast()

  const router = useRouter()

  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const login = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      console.log(response)

      if (response.ok) {
        toast({
          variant: "success",
          title: "Login successful",
          description: "You are now logged in",
        })
        router.push('/')
      } else {
        toast({
          title: "Login failed",
          description: "Please check your email and password",
        })
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your email and password",
      })
    }
  }

  return (
    <form onSubmit={login}>
      <label htmlFor="email">Email:</label>
      <input className="bg-slate-600" id="email" name="email" type="email" required onChange={handleChange} value={form.email} />
      <label htmlFor="password">Password:</label>
      <input className="bg-slate-600" id="password" name="password" type="password" required onChange={handleChange} value={form.password} />
      <button>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}