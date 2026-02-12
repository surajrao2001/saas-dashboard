import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Spinner } from '@surajrao/my-ui-library';
import { toast } from 'sonner';
import { resetPassword } from '../../api/auth';
import { ROUTES } from '../../routes/routePaths';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { PasswordInput } from '../../components/auth/PasswordInput';
import { AUTH_MESSAGES } from '../../branding';

const schema = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  async function onSubmit(data: FormData) {
    if (!token) return;
    try {
      await resetPassword(token, data.password);
      toast.success('Password reset successfully. You can now sign in.');
      navigate(ROUTES.LOGIN);
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
          : 'Failed to reset password';
      toast.error(String(msg ?? 'Failed to reset password'));
    }
  }

  if (!token) {
    return (
      <AuthLayout
        title="Invalid reset link"
        subtitle="This password reset link is invalid or has expired."
        brandMessage={AUTH_MESSAGES.resetPassword}
      >
        <div className="auth-panel p-4 sm:p-6 lg:p-8">
          <p className="text-sm text-text-muted mb-5">
            Please request a new password reset link.
          </p>
          <Link to={ROUTES.FORGOT_PASSWORD}>
            <Button fullWidth>Request new link</Button>
          </Link>
          <p className="mt-5 text-sm text-center text-text-muted">
            <Link to={ROUTES.LOGIN} className="auth-link hover:underline inline-flex items-center tap-target py-2 -my-2">
              Back to sign in
            </Link>
          </p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Enter your new password below."
      brandMessage={AUTH_MESSAGES.resetPassword}
    >
      <div className="auth-panel p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="reset-password" className="auth-form-label">
              New password
            </label>
            <PasswordInput
              id="reset-password"
              placeholder="At least 6 characters"
              error={!!errors.password}
              fullWidth
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && <p className="auth-form-error">{errors.password.message}</p>}
          </div>
          <div>
            <label htmlFor="reset-confirm" className="auth-form-label">
              Confirm password
            </label>
            <PasswordInput
              id="reset-confirm"
              placeholder="Re-enter your password"
              error={!!errors.confirmPassword}
              fullWidth
              autoComplete="new-password"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="auth-form-error">{errors.confirmPassword.message}</p>}
          </div>
          <Button type="submit" fullWidth disabled={isSubmitting} className="min-h-11 sm:min-h-10">
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Resetting...
              </span>
            ) : (
              'Reset password'
            )}
          </Button>
        </form>
        <p className="mt-5 text-sm text-center text-text-muted">
          <Link to={ROUTES.LOGIN} className="auth-link hover:underline inline-flex items-center tap-target py-2 -my-2">
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
