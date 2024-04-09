import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request) {
  const supabase = createClient()

  const data = await request.json()

  const userData = {
    email: data.email,
    password: data.password
  }

  const { error } = await supabase.auth.signUp(userData)

  if (error) {
    return NextResponse.json({
      status: 401,
      message: 'Invalid Credentials'
    }, { status: 401 })
  }

  return NextResponse.json({
    status: 200,
    message: 'Login successful'
  }, { status: 200 })
}