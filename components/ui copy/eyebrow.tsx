import { typo } from './typography';

/** Line + uppercase label, exactly as in the Industries reference. */
export default function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span aria-hidden="true" className="h-[2px] w-6 bg-[#36B936] sm:w-8" />
      <p className={typo.eyebrow}>{children}</p>
    </div>
  );
}
