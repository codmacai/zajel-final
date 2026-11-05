import { cmsMetadata } from '@/lib/cms/server';
import { ProjectLogisticsGrid, ProjectLogisticsHero } from '@/components/project-logistics';
import CmsScope from '@/components/cms/CmsScope';

export const generateMetadata = cmsMetadata('projects', '/projects');

export default function ProjectLogisticsPage() {
  return (
    <CmsScope page="projects">
    <main>
      <ProjectLogisticsHero />
      <ProjectLogisticsGrid />
    </main>
    </CmsScope>
  );
}
