// Events with any CMS edits (Events → Events list). Server only.
import { getSection } from '@/lib/cms/server';
import { EVENTS_LIST, type ZajelEvent } from './data';

export async function getEvents(): Promise<ZajelEvent[]> {
  return (await getSection('events.list', EVENTS_LIST))?.events ?? [];
}

export async function findEvent(slug: string): Promise<ZajelEvent | undefined> {
  return (await getEvents()).find((e) => e.slug === slug);
}
