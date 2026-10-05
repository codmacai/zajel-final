export interface ProjectStat {
  value: string;
  label: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  stats: ProjectStat[];
}

export interface Project {
  title: string;
  place: string;
  caption: string;
  image: string;
  alt: string;
}
