'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  icon?: string;
  iconColor?: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SelectDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm text-left transition-all hover:border-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
      >
        {selected?.icon && (
          <img
            src={`https://cdn.simpleicons.org/${selected.icon}/${selected.iconColor || '111111'}`}
            alt=""
            className="h-4 w-4 shrink-0"
          />
        )}
        <span className="flex-1 truncate text-zinc-700">
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-zinc-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-60 overflow-auto rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg shadow-zinc-200/50">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                option.value === value
                  ? 'bg-brand-50 text-brand-700 font-medium'
                  : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
              }`}
            >
              {option.icon && (
                <img
                  src={`https://cdn.simpleicons.org/${option.icon}/${option.iconColor || '888888'}`}
                  alt=""
                  className="h-4 w-4 shrink-0"
                />
              )}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
