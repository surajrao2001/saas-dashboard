import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Spinner } from '@surajrao/my-ui-library';
import { toast } from 'sonner';
import { useRedux } from '../../hooks/useRedux';
import { register as registerApi } from '../../api/auth';
import { setCredentials } from '../../redux/slices/authSlice';
import { ROUTES } from '../../routes/routePaths';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { AUTH_MESSAGES } from '../../branding';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const { dispatch } = useRedux();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', name: '' },
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await registerApi(data.email, data.password, data.name ?? undefined);
      dispatch(setCredentials(res));
      toast.success('Account created');
      navigate(ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : 'Registration failed';
      toast.error(String(msg ?? 'Registration failed'));
    }
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Fill in your details to get started. We'll never share your email."
      brandMessage={AUTH_MESSAGES.register}
    >
      <div className="auth-panel p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="register-name" className="auth-form-label">
              Name (optional)
            </label>
            <Input
              id="register-name"
              type="text"
              placeholder="Your name"
              fullWidth
              autoComplete="name"
              {...register('name')}
            />
          </div>
          <div>
            <label htmlFor="register-email" className="auth-form-label">
              Email
            </label>
            <Input
              id="register-email"
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
            <label htmlFor="register-password" className="auth-form-label">
              Password
            </label>
            <PasswordInput
              id="register-password"
              placeholder="At least 6 characters"
              error={!!errors.password}
              fullWidth
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
          </div>
          <Button type="submit" fullWidth disabled={isSubmitting} className="min-h-11 sm:min-h-10">
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Creating account...
              </span>
            ) : (
              'Create account'
            )}
          </Button>
        </form>
        <p className="mt-5 text-sm text-center text-text-muted">
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} className="auth-link hover:underline inline-flex items-center tap-target py-2 -my-2">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
