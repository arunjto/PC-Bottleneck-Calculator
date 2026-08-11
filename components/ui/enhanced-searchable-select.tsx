'use client';

import React, { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react';
import {
  BadgeCheck,
  Check,
  ChevronDown,
  Cpu,
  Gamepad2,
  ImageIcon,
  Layers3,
  MemoryStick,
  Monitor,
  Search,
  Star,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Option {
  id: string;
  name: string;
  tier: string;
  benchmarkScore?: number;
  specs: string;
  price?: number;
}

interface EnhancedSearchableSelectProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  type: 'cpu' | 'gpu' | 'ram' | 'resolution' | 'game' | 'components' | 'efficiency';
  /** DOM id forwarded to the trigger element — links <label htmlFor> to this combobox */
  id: string;
  labelId?: string;
  descriptionId?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  openInstructions?: string;
  listLabel?: string;
  showTier?: boolean;
}

const getTypeIcon = (type: EnhancedSearchableSelectProps['type']) => {
  switch (type) {
    case 'cpu':
      return <Cpu className="h-5 w-5" />;
    case 'gpu':
      return <Monitor className="h-5 w-5" />;
    case 'ram':
      return <MemoryStick className="h-5 w-5" />;
    case 'resolution':
      return <ImageIcon className="h-5 w-5" />;
    case 'game':
      return <Gamepad2 className="h-5 w-5" />;
    case 'components':
      return <Layers3 className="h-5 w-5" />;
    case 'efficiency':
      return <BadgeCheck className="h-5 w-5" />;
    default:
      return <Star className="h-5 w-5" />;
  }
};

const getTierColor = (tier: string) => {
  switch (tier.toLowerCase()) {
    case 'enthusiast':
    case 'premium':
      return 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 text-purple-800 dark:text-purple-200';
    case 'high-end':
      return 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 text-blue-800 dark:text-blue-200';
    case 'mid-range':
    case 'standard':
      return 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-800 dark:text-green-200';
    case 'entry-level':
    case 'budget':
      return 'bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 text-yellow-800 dark:text-yellow-200';
    default:
      return 'bg-gradient-to-r from-gray-100 to-slate-100 dark:from-gray-800/40 dark:to-slate-800/40 text-gray-800 dark:text-gray-200';
  }
};

export function EnhancedSearchableSelect({
  options,
  value,
  onValueChange,
  placeholder,
  type,
  id,
  labelId,
  descriptionId,
  searchPlaceholder,
  noResultsText,
  openInstructions,
  listLabel,
  showTier = true,
}: EnhancedSearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = `${id}-listbox`;
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const normalizedSearchTerm = deferredSearchTerm.trim().toLowerCase();

  // Defer filtering and avoid mounting hundreds of rows on lower-end phones.
  const matchingOptions = useMemo(
    () =>
      options.filter(
        (option) =>
          option.name.toLowerCase().includes(normalizedSearchTerm) ||
          option.tier.toLowerCase().includes(normalizedSearchTerm) ||
          option.specs.toLowerCase().includes(normalizedSearchTerm)
      ),
    [normalizedSearchTerm, options]
  );
  const filteredOptions = useMemo(() => matchingOptions.slice(0, 60), [matchingOptions]);
  const hasMoreOptions = matchingOptions.length > filteredOptions.length;

  const selectedOption = useMemo(
    () => options.find((option) => option.id === value),
    [options, value]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          onValueChange(filteredOptions[highlightedIndex].id);
          setIsOpen(false);
          setSearchTerm('');
          setHighlightedIndex(-1);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (optionId: string) => {
    onValueChange(optionId);
    setIsOpen(false);
    setSearchTerm('');
    setHighlightedIndex(-1);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative w-full', isOpen ? 'z-50' : 'z-10')}
    >
      {/* id prop links <label htmlFor="..."> to this combobox trigger */}
      <div
            id={id}
            className={cn(
              'flex h-12 w-full items-center justify-between rounded-lg border border-input bg-gradient-to-r from-background to-muted/20 px-3 py-2 text-sm cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              isOpen && 'border-primary ring-2 ring-primary/20 shadow-lg'
            )}
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="combobox"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-label={labelId ? undefined : (openInstructions ?? `${placeholder}. Press Enter or Space to open dropdown. Use arrow keys to navigate.`)}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            aria-controls={isOpen ? listboxId : undefined}
            aria-activedescendant={highlightedIndex >= 0 ? `${id}-option-${filteredOptions[highlightedIndex]?.id}` : undefined}
          >
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <span className="text-lg flex-shrink-0" aria-hidden="true">{getTypeIcon(type)}</span>
              {selectedOption ? (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground truncate">
                      {selectedOption.name}
                    </span>
                    {showTier && selectedOption.tier && (
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0',
                          getTierColor(selectedOption.tier)
                        )}
                      >
                        {selectedOption.tier}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground truncate mt-0.5">
                    {selectedOption.specs}
                  </div>
                </div>
              ) : (
                <span className="text-muted-foreground flex-1 truncate">{placeholder}</span>
              )}
            </div>
            <ChevronDown
              className={cn('h-4 w-4 text-muted-foreground transition-transform duration-200', isOpen && 'rotate-180')}
              aria-hidden="true"
            />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-popover border border-border rounded-lg shadow-xl animate-in fade-in-0 zoom-in-95">
          <div className="p-3 border-b border-border relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <input
                  ref={inputRef}
                  type="text"
                  placeholder={searchPlaceholder ?? `Search ${type.toUpperCase()}s...`}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  onKeyDown={handleKeyDown}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-input rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200"
                  aria-label={searchPlaceholder ?? `Search ${type}s. Type to filter, use arrow keys to navigate results.`}
            />
          </div>
          <div
            className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent"
            role="listbox"
            id={listboxId}
            aria-label={listLabel ?? `List of available ${type}s`}
          >
            {filteredOptions.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">
                {(noResultsText ?? `No ${type}s found matching {query}`).replace('{query}', `"${searchTerm}"`)}
              </div>
            ) : (
              <div className="p-1">
                {filteredOptions.map((option, index) => (
                  <div
                    key={option.id}
                    id={`${id}-option-${option.id}`}
                    className={cn(
                      'flex items-center justify-between p-3 rounded-md cursor-pointer transition-all duration-150',
                      highlightedIndex === index && 'bg-accent text-accent-foreground',
                      value === option.id && 'bg-primary/10 text-primary font-medium',
                      'hover:bg-accent hover:text-accent-foreground'
                    )}
                    onClick={() => handleOptionClick(option.id)}
                    role="option"
                    aria-selected={value === option.id}
                    aria-label={`${option.name}${showTier && option.tier ? `, ${option.tier} tier` : ''}, ${option.specs}`}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className="text-base flex-shrink-0" aria-hidden="true">{getTypeIcon(type)}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm truncate">{option.name}</span>
                          {showTier && option.tier && (
                            <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0', getTierColor(option.tier))}>
                              {option.tier}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{option.specs}</div>
                        {option.benchmarkScore && <div className="text-xs text-primary font-medium mt-0.5">Score: {option.benchmarkScore}/100</div>}
                      </div>
                    </div>
                    {value === option.id && <Check className="h-4 w-4 text-primary" aria-hidden="true" />}
                  </div>
                ))}
                {hasMoreOptions && (
                  <div className="px-3 py-2 text-center text-xs text-muted-foreground" role="status">
                    Showing the first 60 matches. Refine your search to see more.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
