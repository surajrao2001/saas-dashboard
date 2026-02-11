import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Spinner } from '@surajrao/my-ui-library';
import { toast } from 'sonner';
import { useRedux } from '../../hooks/useRedux';
import { login } from '../../api/auth';
import { setCredentials } from '../../redux/slices/authSlice';
import { ROUTES } from '../../routes/routePaths';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { AUTH_MESSAGES } from '../../branding';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const { dispatch } = useRedux();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await login(data.email, data.password);
      dispatch(setCredentials(res));
      toast.success('Welcome back');
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Login failed';
      toast.error(String(msg ?? 'Login failed'));
    }
  }

  return (
    <AuthLayout
      title="Sign in to your dashboard"
      subtitle="We'll never share your email. Enter your credentials to continue."
      brandMessage={AUTH_MESSAGES.login}
    >
      <div className="auth-panel p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="login-email" className="auth-form-label">
              Email
            </label>
            <Input
              id="login-email"
              type="email"
              placeholder="you@example.com"
              error={!!errors.email}
              fullWidth
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <p className="auth-form-error">{errors.email.message}</p>}
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <label htmlFor="login-password" className="auth-form-label">
                Password
              </label>
              <Link to={ROUTES.FORGOT_PASSWORD} className="auth-link text-sm hover:underline inline-flex items-center tap-target py-2 -my-2">
                Forgot password?
              </Link>
            </div>
            <PasswordInput
              id="login-password"
              placeholder="••••••••"
              error={!!errors.password}
              fullWidth
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
          </div>
          <Button type="submit" fullWidth disabled={isSubmitting} className="min-h-11 sm:min-h-10">
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Signing in...
              </span>
            ) : (
              'Sign in'
            )}
          </Button>
        </form>
        <p className="mt-5 text-sm text-center text-text-muted">
          Don&apos;t have an account?{' '}
          <Link to={ROUTES.REGISTER} className="auth-link hover:underline inline-flex items-center tap-target py-2 -my-2">
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
