'use client';

import { useFormStatus } from 'react-dom';

// Submit button that asks for confirmation first (used for deletes).
export default function ConfirmButton({ message, children, className = '' }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {pending ? 'Working…' : children}
    </button>
  );
}
