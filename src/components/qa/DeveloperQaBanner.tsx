import { Bug, LogOut, RotateCcw, SlidersHorizontal } from 'lucide-react';
import type { AppLanguage } from '../../types/game';
import { GAME_COPY } from '../../data/i18n';
import type { QaSessionState } from '../../qa/qaSessionStorage';
import { QA_PRESET_CATALOG } from '../../qa/qaProgressPresetFactory';

interface DeveloperQaBannerProps {
  language: AppLanguage;
  session: QaSessionState;
  onOpenConsole: () => void;
  onResetQaSession: () => void;
  onExitQaMode: () => void;
}

export function DeveloperQaBanner({
  language,
  session,
  onOpenConsole,
  onResetQaSession,
  onExitQaMode,
}: DeveloperQaBannerProps) {
  const copy = GAME_COPY[language];
  const presetLabel =
    QA_PRESET_CATALOG.find((p) => p.id === session.presetId)?.label[language] ??
    (session.presetId === 'selected_activity'
      ? `E · ${session.activeTarget?.countryId.toUpperCase() ?? 'STAGE'} (${session.activeTarget?.stageId.toUpperCase() ?? 'BUILD'} · ${session.cefrMode.toUpperCase()})`
      : session.presetId);

  return (
    <div
      role="region"
      aria-label={copy.qaBannerTitle}
      data-testid="developer-qa-banner"
      className="fixed bottom-3 left-1/2 z-[45] w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 rounded-2xl border-2 border-[#F59E0B] bg-[#131E31]/95 px-3.5 py-2 text-[#FFFDF8] shadow-2xl backdrop-blur-md"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F59E0B] px-2 py-0.5 font-display text-[11px] font-extrabold text-[#131E31]">
            <Bug className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{copy.qaBannerTitle}</span>
          </span>
          <span className="text-xs font-bold text-[#FDE68A] truncate">
            {copy.qaBannerPresetLabel}: {presetLabel}
          </span>
          <span className="hidden sm:inline text-[11px] text-[#CBD5E1]">
            · {copy.qaBannerSyntheticTag}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onOpenConsole}
            className="inline-flex items-center gap-1 rounded-lg border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-white/20 cursor-pointer"
          >
            <SlidersHorizontal className="h-3 w-3 text-[#FDE68A]" aria-hidden="true" />
            <span>{copy.qaBannerReturnConsole}</span>
          </button>

          <button
            type="button"
            onClick={onResetQaSession}
            className="inline-flex items-center gap-1 rounded-lg border border-white/25 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-white/20 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3 text-[#5EEAD4]" aria-hidden="true" />
            <span>{copy.qaBannerResetSession}</span>
          </button>

          <button
            type="button"
            onClick={onExitQaMode}
            className="inline-flex items-center gap-1 rounded-lg bg-[#EF4444] px-2.5 py-1 text-[11px] font-extrabold text-white hover:bg-[#DC2626] cursor-pointer"
          >
            <LogOut className="h-3 w-3" aria-hidden="true" />
            <span>{copy.qaBannerExitMode}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
