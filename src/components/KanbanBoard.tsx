import React from 'react';
import { ClipboardList, GripVertical, Phone, Briefcase } from 'lucide-react';

interface RecruitLike {
  id: string;
  name: string;
  nameKanji?: string;
  phone?: string;
  jobId?: string | null;
  jobTitle?: string;
  status: string;
}

interface JobLike {
  id: string;
  title: string;
}

interface Props {
  recruits: RecruitLike[];
  jobs: JobLike[];
  interviewCounts: Record<string, number>;
  onStatusChange: (id: string, status: string) => void;
  onOpenInterview: (recruit: RecruitLike) => void;
}

const COLUMNS: { status: string; label: string; accent: string; dot: string }[] = [
  { status: 'pending', label: '応募', accent: 'border-t-blue-400', dot: 'bg-blue-400' },
  { status: 'interviewing', label: '面談中', accent: 'border-t-amber-400', dot: 'bg-amber-400' },
  { status: 'hired', label: '採用', accent: 'border-t-green-500', dot: 'bg-green-500' },
  { status: 'rejected', label: '不採用', accent: 'border-t-gray-400', dot: 'bg-gray-400' },
];

export const KanbanBoard: React.FC<Props> = ({ recruits, jobs, interviewCounts, onStatusChange, onOpenInterview }) => {
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [overCol, setOverCol] = React.useState<string | null>(null);

  const jobTitle = (r: RecruitLike) => jobs.find((j) => j.id === r.jobId)?.title || r.jobTitle || '';

  const handleDrop = (status: string) => {
    if (draggingId) {
      const r = recruits.find((x) => x.id === draggingId);
      if (r && r.status !== status) onStatusChange(draggingId, status);
    }
    setDraggingId(null);
    setOverCol(null);
  };

  return (
    <div className="flex-1 p-4 sm:p-6 overflow-x-auto bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 min-w-[280px]">
        {COLUMNS.map((col) => {
          const items = recruits.filter((r) => (r.status || 'pending') === col.status);
          return (
            <div
              key={col.status}
              onDragOver={(e) => { e.preventDefault(); setOverCol(col.status); }}
              onDragLeave={() => setOverCol((c) => (c === col.status ? null : c))}
              onDrop={() => handleDrop(col.status)}
              className={`bg-white rounded-2xl border-t-4 ${col.accent} border border-gray-100 shadow-sm flex flex-col transition-all ${
                overCol === col.status ? 'ring-2 ring-brand-blue ring-offset-2' : ''
              }`}
            >
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                  <span className="font-bold text-brand-navy text-sm">{col.label}</span>
                </div>
                <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-xs font-bold">{items.length}</span>
              </div>

              <div className="p-3 space-y-2 flex-1 min-h-[120px]">
                {items.length === 0 && (
                  <p className="text-xs text-gray-300 text-center py-8 italic">ここにドラッグ</p>
                )}
                {items.map((r) => {
                  const count = interviewCounts[r.id] || 0;
                  return (
                    <div
                      key={r.id}
                      draggable
                      onDragStart={() => setDraggingId(r.id)}
                      onDragEnd={() => { setDraggingId(null); setOverCol(null); }}
                      className={`group bg-white border border-gray-200 rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-brand-blue hover:shadow-md transition-all ${
                        draggingId === r.id ? 'opacity-40' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical size={14} className="text-gray-300 mt-0.5 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-brand-navy text-sm truncate">{r.nameKanji || r.name}</p>
                          {jobTitle(r) && (
                            <p className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                              <Briefcase size={11} />{jobTitle(r)}
                            </p>
                          )}
                          {r.phone && (
                            <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                              <Phone size={11} />{r.phone}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                        {count > 0 ? (
                          <span className="text-xs font-bold text-brand-blue flex items-center gap-1">
                            <ClipboardList size={12} />面談 {count}回
                          </span>
                        ) : (
                          <span className="text-xs text-gray-300">面談記録なし</span>
                        )}
                        <button
                          onClick={() => onOpenInterview(r)}
                          className="px-2.5 py-1 bg-brand-blue/10 text-brand-blue text-xs font-bold rounded-lg hover:bg-brand-blue hover:text-white transition-all"
                        >
                          面談する
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
