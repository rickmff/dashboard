import { redirect } from 'next/navigation';
import { defaultLocale } from '@/i18n/settings';

export default function DashboardRedirect() {
  // This page will never be rendered because we redirect in the middleware
  redirect(`/${defaultLocale}/dashboard`);
}