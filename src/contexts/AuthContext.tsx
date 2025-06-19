
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'seeker' | 'owner';
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, userType: 'seeker' | 'owner', phone?: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate authentication check on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('bachelorious_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Simulate user lookup (in real app, this would be an API call)
      const users = JSON.parse(localStorage.getItem('bachelorious_users') || '[]');
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('bachelorious_user', JSON.stringify(userWithoutPassword));
        toast({
          title: "Welcome back!",
          description: "Successfully logged in to Bachelorious.",
        });
        return true;
      } else {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, userType: 'seeker' | 'owner', phone?: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const users = JSON.parse(localStorage.getItem('bachelorious_users') || '[]');
      
      // Check if user already exists
      if (users.find((u: any) => u.email === email)) {
        toast({
          title: "Registration failed",
          description: "An account with this email already exists.",
          variant: "destructive",
        });
        return false;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        userType,
        phone
      };
      
      users.push(newUser);
      localStorage.setItem('bachelorious_users', JSON.stringify(users));
      
      // Auto login
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('bachelorious_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: "Welcome to Bachelorious!",
        description: "Your account has been created successfully.",
      });
      return true;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bachelorious_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
