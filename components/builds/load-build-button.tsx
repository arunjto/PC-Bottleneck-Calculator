'use client';

import { Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LoadBuildButton({
  cpu,
  gpu,
  ram,
  resolution,
  lang = 'en',
  label = 'Load this build in the calculator',
}: {
  cpu: string;
  gpu: string;
  ram: string;
  resolution: string;
  lang?: string;
  label?: string;
}) {
  const loadBuild = () => {
    const params = new URLSearchParams({ cpu, gpu, ram, resolution });
    window.location.assign(`/${lang}?${params.toString()}#calculator`);
  };

  return (
    <Button onClick={loadBuild} size="lg" className="w-full sm:w-auto">
      <Calculator className="mr-2 h-5 w-5" aria-hidden="true" />
      {label}
    </Button>
  );
}
