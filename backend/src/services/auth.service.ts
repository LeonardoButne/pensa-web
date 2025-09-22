import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../domain/models/User';

export interface LoginData {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  role: string;
}

export class AuthService {
  static async login(loginData: LoginData): Promise<{ token: string; user: UserResponse }> {
    const { email, password } = loginData;

    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Credenciais inválidas');
    }

    user.update({ lastLogin: new Date() });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role, lastpasswordchange: user.lastpasswordchange },
      process.env.JWT_SECRET!,
      {
        expiresIn: '24h',
      },
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  static async getUserById(userId: number): Promise<UserResponse> {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  static async updateProfile(userId: number, profileData: UpdateProfileData): Promise<User> {
    const { name, email } = profileData;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email já existe');
      }
    }

    // Update user data
    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    await user.update(updateData);
    return user;
  }

  static async changePassword(userId: number, passwordData: ChangePasswordData): Promise<void> {
    const { currentPassword, newPassword } = passwordData;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Senha atual incorreta');
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await User.update({ password: hashedNewPassword, lastpasswordchange: new Date() }, { where: { id: userId } });
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}
