import type { Metadata } from 'next';
import AssistantApp from '@/components/assistant/AssistantApp';

export const metadata: Metadata = {
  title: 'Fecto Smart Assistant',
  description:
    'Ask about cement quantities, mix ratios, curing schedules, waterproofing and more. Powered by AI with offline calculators for bags and curing.',
};

export default function AssistantPage() {
  return <AssistantApp />;
}

