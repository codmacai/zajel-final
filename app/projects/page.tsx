import type { Metadata } from 'next';
import { ProjectLogisticsGrid, ProjectLogisticsHero } from '@/components/project-logistics';

export const metadata: Metadata = {
  title: 'Project Logistics | Zajel',
  description:
    'Oversized and project cargo logistics across the UAE — engineered routes, cleared permits, and delivered project moves across air, sea, and land.',
};

export default function ProjectLogisticsPage() {
  return (
    <main>
      <ProjectLogisticsHero />
      <ProjectLogisticsGrid />
    </main>
  );
}
