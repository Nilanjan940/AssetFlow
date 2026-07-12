import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { setUser } from '@/store/slices/auth.slice';
import { AppDispatch, RootState } from '@/store';
import { cn } from '@/utils/helpers';
import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

// Mock user database for demo
const MOCK_USERS = {
  'admin@assetflow.com': {
    id: '1',
    email: 'admin@assetflow.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'ADMIN',
    departmentId: 'eng',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'priya@assetflow.com': {
    id: '2',
    email: 'priya@assetflow.com',
    firstName: 'Priya',
    lastName: 'Sharma',
    role: 'DEPARTMENT_HEAD',
    departmentId: 'eng',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'rahul@assetflow.com': {
    id: '3',
    email: 'rahul@assetflow.com',
    firstName: 'Rahul',
    lastName: 'Sharma',
    role: 'ASSET_MANAGER',
    departmentId: 'mkt',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  'sarah@assetflow.com': {
    id: '4',
    email: 'sarah@assetflow.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'EMPLOYEE',
    departmentId: 'fin',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@assetflow.com',
      password: 'password123',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = MOCK_USERS[data.email as keyof typeof MOCK_USERS];
    
    if (user && data.password === 'password123') {
      // Store token in localStorage (mock)
      localStorage.setItem('accessToken', 'mock-jwt-token');
      localStorage.setItem('refreshToken', 'mock-refresh-token');
      
      // Set user in Redux
      dispatch(setUser(user));
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate('/dashboard');
    } else {
      setError('root', { 
        message: 'Invalid credentials. Please try again.' 
      });
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-500/10 via-background to-primary-500/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-3xl font-bold text-primary">AF</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Enter your credentials to access AssetFlow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  className={cn(
                    'w-full pl-10 pr-3 py-2 rounded-md border bg-background text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    errors.email ? 'border-destructive' : 'border-input'
                  )}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={cn(
                    'w-full pl-10 pr-10 py-2 rounded-md border bg-background text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    errors.password ? 'border-destructive' : 'border-input'
                  )}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            {errors.root && (
              <p className="text-sm text-destructive text-center">{errors.root.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="text-xs text-muted-foreground text-center border-t pt-2">
            <span className="block font-medium text-primary">Demo Credentials:</span>
            <span className="block">admin@assetflow.com / password123</span>
            <span className="block text-muted-foreground">(Works without backend)</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};