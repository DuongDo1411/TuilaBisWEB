"use client";

import { CheckCircle, Target } from "@phosphor-icons/react";
import { goals } from "@/content/goals";
import { type Dictionary, type Locale, numberLocale } from "@/i18n/dictionaries";
import { Panel } from "@/components/ui/Panel";

export function GoalBoard({ lang, t, className }: { lang: Locale; t: Dictionary; className?: string }) {
  const format = new Intl.NumberFormat(numberLocale[lang]);

  return (
    <Panel
      title={t.goals.title}
      subtitle={t.goals.subtitle}
      icon={<Target aria-hidden="true" weight="bold" className="size-5" />}
      tone="butter"
      className={className}
    >
      <ol className="flex flex-col gap-3">
        {goals.map((goal) => {
          const pct = goal.progress
            ? Math.min(100, Math.round((goal.progress.current / goal.progress.target) * 100))
            : null;
          return (
            <li key={goal.id} className="rounded-2xl border-2 border-line bg-surface p-4">
              <div className="flex items-start gap-3">
                {goal.done ? (
                  <CheckCircle aria-hidden="true" weight="fill" className="mt-0.5 size-6 shrink-0 text-accent-vivid" />
                ) : (
                  <Target aria-hidden="true" weight="bold" className="mt-0.5 size-6 shrink-0 text-primary-strong" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <p className="font-bold leading-snug">{goal.title[lang]}</p>
                    {goal.done && (
                      <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-bold text-accent-strong">
                        {t.goals.done}
                      </span>
                    )}
                  </div>
                  {goal.description && (
                    <p className="mt-1 text-sm leading-relaxed text-fg-muted">{goal.description[lang]}</p>
                  )}
                  {goal.progress && pct !== null && (
                    <div className="mt-3">
                      <div
                        role="progressbar"
                        aria-label={goal.title[lang]}
                        aria-valuemin={0}
                        aria-valuemax={goal.progress.target}
                        aria-valuenow={Math.min(goal.progress.current, goal.progress.target)}
                        aria-valuetext={`${format.format(goal.progress.current)} / ${format.format(goal.progress.target)} (${pct}%)`}
                        className="h-3 overflow-hidden rounded-full bg-surface-raised ring-2 ring-line"
                      >
                        <div
                          className="h-full origin-left rounded-full bg-gradient-to-r from-primary-soft to-primary"
                          style={{ transform: `scaleX(${pct / 100})` }}
                        />
                      </div>
                      <p className="mt-1.5 flex justify-between text-xs font-semibold text-fg-muted tabular-nums">
                        <span>
                          {format.format(goal.progress.current)} / {format.format(goal.progress.target)}
                        </span>
                        <span className="font-bold text-primary-strong">{pct}%</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </Panel>
  );
}
