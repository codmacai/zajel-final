import { typo } from './typography';

/** Line + uppercase label, exactly as in the Industries reference. */
export default function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <p className={typo.eyebrow}>{children}</p>
    </div>
  );
}
