import { prisma } from '@/lib/prisma'
import { User as PrismaUser, Role } from '@/app/generated/prisma/client'

// 获取所有用户
export async function getUsers(): Promise<PrismaUser[]> {
  return prisma.user.findMany()
}

// 获取用户 by ID
export async function getUserById(id: string): Promise<PrismaUser | null> {
  return prisma.user.findUnique({
    where: { id }
  })
}

// 获取用户 by email
export async function getUserByEmail(email: string): Promise<PrismaUser | null> {
  return prisma.user.findUnique({
    where: { email }
  })
}

// 创建用户
export async function createUser(data: {
  email: string
  name: string
  password: string
  role?: Role
}): Promise<PrismaUser> {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: data.password, // 实际应该加密
      role: data.role || 'USER'
    }
  })
}

// 更新用户
export async function updateUser(id: string, data: Partial<PrismaUser>): Promise<PrismaUser | null> {
  return prisma.user.update({
    where: { id },
    data
  })
}

// 删除用户
export async function deleteUser(id: string): Promise<PrismaUser | null> {
  return prisma.user.delete({
    where: { id }
  })
}