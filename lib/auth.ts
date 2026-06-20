import { prisma } from '@/lib/prisma'
import { NextRequest } from 'next/server'

// 从 cookie 获取 JWT token
function getTokenFromCookie(request: NextRequest): string | null {
  const token = request.cookies.get('token')?.value
  return token || null
}

// 验证 JWT token
async function verifyToken(token: string): Promise<any | null> {
  if (!token) return null
  
  try {
    // 这里应该有 JWT 验证逻辑
    // 简化版：假设 token 有效，返回第一个用户（实际应该解析 token 获取 userId）
    const user = await prisma.user.findFirst()
    return user
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// 获取当前用户
export async function getCurrentUser(request: NextRequest): Promise<any | null> {
  const token = getTokenFromCookie(request)
  if (!token) return null
  
  return verifyToken(token)
}

// 获取当前用户（无请求上下文，用于服务端组件）
export async function getCurrentUserServer(): Promise<any | null> {
  // 简化版：返回第一个用户
  return prisma.user.findFirst()
}

// 检查用户是否有权限
export function checkUserPermission(user: any | null, requiredRole?: string): boolean {
  if (!user) return false
  
  // 如果没有指定角色，只要有用户就通过
  if (!requiredRole) return true
  
  // 检查角色（简化版）
  return user.role === requiredRole
}