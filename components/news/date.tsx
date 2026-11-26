import { newsDateParts } from './format';

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
