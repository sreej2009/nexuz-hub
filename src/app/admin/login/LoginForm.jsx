'use client';

import { useActionState } from 'react';
import { login } from '../actions';
import Icon from '@/components/ui/Icon';

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block">
        <span className="label mb-2 block text-ink/55">Password</span>
        <input name="password" type="password" autoComplete="current-password" required autoFocus className="field" />
      </label>
      {state?.error && (
        <p className="text-sm text-laser" role="alert">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-ink w-full">
        {pending ? 'Checking…' : 'Sign in'} {!pending && <Icon name="arrow" size={16} />}
      </button>
    </form>
  );
}
