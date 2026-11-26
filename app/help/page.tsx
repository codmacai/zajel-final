import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';

export const generateMetadata = cmsMetadata('help', '/help', { noIndex: true });
export default async function HelpPage() {
  await notFoundIfHidden('help');
  return (
    <main>
      <h1>Help</h1>
    </main>
  );
}
