import { cmsMetadata } from '@/lib/cms/server';

export const generateMetadata = cmsMetadata('help', '/help', { noIndex: true });
export default function HelpPage() {
  return (
    <main>
      <h1>Help</h1>
    </main>
  );
}
