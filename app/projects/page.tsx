import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { ProjectLogisticsGrid, ProjectLogisticsHero } from '@/components/project-logistics';

export const metadata: Metadata = pageMetadata({
  title: "Project Logistics",
  description:
    "Oversized and project cargo logistics across the UAE — engineered routes, cleared permits, and delivered project moves across air, sea, and land.",
  path: '/projects',
});

export default function ProjectLogisticsPage() {
  return (
    <main>
      <ProjectLogisticsHero />
      <ProjectLogisticsGrid />
    </main>
  );
}
