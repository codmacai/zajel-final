import { cmsMetadata } from '@/lib/cms/server';
import { ProjectLogisticsGrid, ProjectLogisticsHero } from '@/components/project-logistics';

export const generateMetadata = cmsMetadata('projects', '/projects');

export default function ProjectLogisticsPage() {
  return (
    <main>
      <ProjectLogisticsHero />
      <ProjectLogisticsGrid />
    </main>
  );
}
