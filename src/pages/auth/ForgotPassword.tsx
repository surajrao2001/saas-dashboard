import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Spinner } from '@surajrao/my-ui-library';
import { toast } from 'sonner';
import { forgotPassword } from '../../api/auth';
import { ROUTES } from '../../routes/routePaths';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AUTH_MESSAGES } from '../../branding';

const schema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormData = z.infer<typeof schema>;

export function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: '' },
  });

  async function onSubmit(data: FormData) {
    try {
      const res = await forgotPassword(data.email);
      toast.success(res.message);
      if (res.resetLink) {
        const token = new URL(res.resetLink).searchParams.get('token') || res.resetLink.split('token=')[1] || '';
        if (token) navigate(`${ROUTES.RESET_PASSWORD}?token=${encodeURIComponent(token)}`);
      }
    } catch (err: unknown) {
      const msg =
        err && typeof err === 'object' && 'response' in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
          : 'Failed to send reset link';
      toast.error(String(msg ?? 'Failed to send reset link'));
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to reset your password."
      brandMessage={AUTH_MESSAGES.forgotPassword}
    >
      <div className="auth-panel p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="forgot-email" className="auth-form-label">
              Email
            </label>
            <Input
              id="forgot-email"
              type="email"
              placeholder="you@example.com"
              error={!!errors.email}
              fullWidth
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <p className="auth-form-error">{errors.email.message}</p>}
          </div>
          <Button type="submit" fullWidth disabled={isSubmitting} className="min-h-11 sm:min-h-10">
            {isSubmitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <Spinner size="sm" />
                Sending...
              </span>
            ) : (
              'Send reset link'
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
