import { ChevronDown } from 'lucide-react';
import type { ReactNode } from 'react';

interface SelectFieldProps {
  label: string;
  hint?: string;
}

export function SelectField({ label, hint }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#0A4D26]/90">
        {label} <span className="text-[#36B936]">*</span>
      </label>
      <div className="relative">
        <select className="w-full appearance-none rounded-xl border border-[#0A4D26]/10 bg-[#FAFBF8] p-3.5 text-[13px] text-[#0A4D26]/50 outline-none focus:border-[#36B936]/40">
          <option>Select a {label.toLowerCase()}</option>
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0A4D26]/30">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
      {hint && <p className="text-[11px] font-light italic text-[#0A4D26]/40">{hint}</p>}
    </div>
  );
}

interface InputFieldProps {
  label: string;
  placeholder: string;
  hint?: string;
}

export function InputField({ label, placeholder, hint }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-[#0A4D26]/90">
        {label} <span className="text-[#36B936]">*</span>
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#0A4D26]/10 bg-[#FAFBF8] p-3.5 text-[13px] text-[#0A4D26] outline-none placeholder:text-[#0A4D26]/30 focus:border-[#36B936]/40"
      />
      {hint && <p className="text-[11px] font-light italic text-[#0A4D26]/40">{hint}</p>}
    </div>
  );
}

interface SidebarActionProps {
  icon: ReactNode;
  label: string;
}

export function SidebarAction({ icon, label }: SidebarActionProps) {
  return (
    <button className="group flex w-full items-center gap-3 rounded-xl border border-[#0A4D26]/5 p-3.5 text-[13px] font-light text-[#0A4D26] transition-all hover:bg-[#FAFBF8]">
      <span className="shrink-0 text-[#0A4D26]/30 transition-colors group-hover:text-[#36B936]">{icon}</span>
      {label}
    </button>
  );
}
