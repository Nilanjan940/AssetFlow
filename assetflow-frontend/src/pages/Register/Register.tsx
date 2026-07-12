import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, Building, Loader2 } from 'lucide-react';
import { Button } from '@/components/common/Button/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card/Card';
import { register } from '@/store/slices/auth.slice';
import { AppDispatch, RootState } from '@/store';
import { cn } from '@/utils/helpers';

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'Please confirm your password'),
    departmentId: z.string().min(1, 'Please select a department'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        departmentId: data.departmentId,
      })).unwrap();
      navigate('/login', { state: { message: 'Registration successful! Please login.' } });
    } catch (error) {
      setError('root', { message: error as string });
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
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className={cn(
                      'w-full pl-10 pr-3 py-2 rounded-md border bg-background text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-primary',
                      errors.firstName ? 'border-destructive' : 'border-input'
                    )}
                    {...registerField('firstName')}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className={cn(
                      'w-full pl-10 pr-3 py-2 rounded-md border bg-background text-sm',
                      'focus:outline-none focus:ring-2 focus:ring-primary',
                      errors.lastName ? 'border-destructive' : 'border-input'
                    )}
                    {...registerField('lastName')}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

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
                  {...registerField('email')}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="departmentId" className="text-sm font-medium">
                Department
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <select
                  id="departmentId"
                  className={cn(
                    'w-full pl-10 pr-3 py-2 rounded-md border bg-background text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    errors.departmentId ? 'border-destructive' : 'border-input'
                  )}
                  {...registerField('departmentId')}
                >
                  <option value="">Select Department</option>
                  <option value="eng">Engineering</option>
                  <option value="mkt">Marketing</option>
                  <option value="sales">Sales</option>
                  <option value="hr">Human Resources</option>
                  <option value="finance">Finance</option>
                </select>
              </div>
              {errors.departmentId && (
                <p className="text-sm text-destructive">{errors.departmentId.message}</p>
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
                  placeholder="Min 8 characters"
                  className={cn(
                    'w-full pl-10 pr-10 py-2 rounded-md border bg-background text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    errors.password ? 'border-destructive' : 'border-input'
                  )}
                  {...registerField('password')}
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className={cn(
                    'w-full pl-10 pr-10 py-2 rounded-md border bg-background text-sm',
                    'focus:outline-none focus:ring-2 focus:ring-primary',
                    errors.confirmPassword ? 'border-destructive' : 'border-input'
                  )}
                  {...registerField('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            {errors.root && (
              <p className="text-sm text-destructive text-center">{errors.root.message}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};