import { cmsMetadata, notFoundIfHidden } from '@/lib/cms/server';
import { ProjectLogisticsGrid, ProjectLogisticsHero } from '@/components/project-logistics';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('projects', '/projects');

export default async function ProjectLogisticsPage() {
  // Switched off in the CMS: "page not found".
  await notFoundIfHidden('projects');
  return (
    <CmsScope page="projects">
    <main>
      <ProjectLogisticsHero />
      <ProjectLogisticsGrid />
    </main>
    </CmsScope>
  );
}
