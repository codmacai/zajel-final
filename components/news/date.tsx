import { newsDateParts } from './format';

/**
 * A date like "14 May 2026", written as separate words so the site's Arabic translation
 * turns the month into Arabic ("14 مايو 2026").
 */
export default function NewsDate({ iso, short = false }: { iso: string; short?: boolean }) {
  const parts = newsDateParts(iso, short);
  return (
    <time dateTime={iso}>
      {parts ? (
        <>
          {parts[0]} {parts[1]} {parts[2]}
        </>
      ) : (
        iso
      )}
    </time>
  );
}
