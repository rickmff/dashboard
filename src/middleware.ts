// This file is intentionally empty as we no longer need middleware for locale redirection
// We're using localStorage for locale management instead of URL paths

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware doesn't do any redirections for locales anymore
// It's just a minimal implementation to avoid the error
export function middleware(request: NextRequest) {
  return NextResponse.next();
}