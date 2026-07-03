import React from 'react';
import { motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Plus, Trash2, Star, Check, Loader2, UserCircle2, ClipboardList } from 'lucide-react';
import { supabase } from '../supabase';
import {
  interviewSections,
  interviewTypeLabels,
  type InterviewType,
  type InterviewSection,
} from '../lib/interviewSections';

export interface Interview {
  id: string;
  recruitId: string;
  type: InterviewType;
  interviewer: string | null;
  interviewDate: string | null;
  result: string | null;
  responses: Record<string, Record<string, string>>;
  created_at: string;
  updatedAt?: string | null;
}

interface Props {
  recruit: Record<string, any> & { id: string };
  interviewer: string;
  onClose: () => void;
  onChange?: () => void;
}

const RESULT_LABELS: Record<string, string> = { pass: '通過', hold: '保留', fail: '見送り' };

// 左の事前情報が全て空の skipIfEmpty ページを除外
const effectivePages = (type: InterviewType, recruit: Record<string, any>): InterviewSection[] =>
  interviewSections[type].filter((s) => {
    if (!s.skipIfEmpty) return true;
    return s.left.some((f) => (recruit[f.field] ?? '').toString().trim() !== '');
  });

export const InterviewWizard: React.FC<Props> = ({ recruit, interviewer, onClose, onChange }) => {
  const [interviews, setInterviews] = React.useState<Interview[]>([]);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [pageIndex, setPageIndex] = React.useState(0);
  const [responses, setResponses] = React.useState<Record<string, Record<string, string>>>({});
  const [interviewDate, setInterviewDate] = React.useState('');
  const [result, setResult] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  const candidateName = recruit.nameKanji || recruit.name || '応募者';

  const fetchInterviews = React.useCallback(async () => {
    const { data } = await supabase
      .from('interviews')
      .select('*')
      .eq('recruitId', recruit.id)
      .order('created_at', { ascending: true });
    setInterviews((data as Interview[]) || []);
    setLoading(false);
  }, [recruit.id]);

  React.useEffect(() => {
    fetchInterviews();
  }, [fetchInterviews]);

  const active = interviews.find((i) => i.id === activeId) || null;
  const pages = active ? effectivePages(active.type, recruit) : [];
  const section = pages[pageIndex];

  const openInterview = (iv: Interview) => {
    setActiveId(iv.id);
    setResponses(iv.responses || {});
    setInterviewDate(iv.interviewDate || '');
    setResult(iv.result || '');
    setPageIndex(0);
  };

  const createInterview = async (type: InterviewType) => {
    const { data } = await supabase
      .from('interviews')
      .insert({ recruitId: recruit.id, type, interviewer, responses: {} })
      .select()
      .single();
    if (data) {
      const iv = data as Interview;
      setInterviews((prev) => [...prev, iv]);
      openInterview(iv);
      onChange?.();
    }
  };

  const persist = React.useCallback(
    async (extra?: Partial<Interview>) => {
      if (!activeId) return;
      setSaving(true);
      const payload = {
        responses,
        interviewDate: interviewDate || null,
        result: result || null,
        interviewer,
        updatedAt: new Date().toISOString(),
        ...extra,
      };
      await supabase.from('interviews').update(payload).eq('id', activeId);
      setInterviews((prev) => prev.map((i) => (i.id === activeId ? { ...i, ...payload } as Interview : i)));
      setSaving(false);
    },
    [activeId, responses, interviewDate, result, interviewer]
  );

  const setAnswer = (sectionKey: string, fieldKey: string, value: string) => {
    setResponses((prev) => ({ ...prev, [sectionKey]: { ...(prev[sectionKey] || {}), [fieldKey]: value } }));
  };

  const goTo = async (idx: number) => {
    await persist();
    setPageIndex(Math.max(0, Math.min(pages.length - 1, idx)));
  };

  const closeToList = async () => {
    await persist();
    setActiveId(null);
    onChange?.();
  };

  const deleteInterview = async (id: string) => {
    if (!window.confirm('この面談記録を削除しますか？')) return;
    await supabase.from('interviews').delete().eq('id', id);
    setInterviews((prev) => prev.filter((i) => i.id !== id));
    if (activeId === id) setActiveId(null);
    onChange?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-brand-navy/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-brand-navy text-white shrink-0">
          <div className="flex items-center gap-3">
            <ClipboardList size={22} className="text-brand-blue" />
            <div>
              <h3 className="text-lg font-bold leading-tight">面談 — {candidateName}</h3>
              <p className="text-xs text-white/50">{recruit.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saving && <span className="text-xs text-white/60 flex items-center gap-1"><Loader2 size={12} className="animate-spin" />保存中</span>}
            <button onClick={async () => { if (activeId) await persist(); onClose(); }} className="p-2 hover:bg-white/10 rounded-full transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 size={32} className="animate-spin text-brand-blue" />
          </div>
        ) : !active ? (
          /* ===== セッション一覧 ===== */
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-gray-50">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex flex-wrap gap-3">
                <button onClick={() => createInterview('hiring')} className="flex items-center gap-2 px-5 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-md">
                  <Plus size={18} />採用面談を始める
                </button>
                <button onClick={() => createInterview('followup')} className="flex items-center gap-2 px-5 py-3 bg-white border-2 border-brand-blue text-brand-blue font-bold rounded-xl hover:bg-brand-blue/5 transition-all">
                  <Plus size={18} />稼働フォローを始める
                </button>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">面談記録（{interviews.length}件）</p>
                {interviews.length === 0 ? (
                  <p className="text-sm text-gray-400 italic py-8 text-center bg-white rounded-2xl border border-gray-100">まだ面談記録がありません。上のボタンから始めてください。</p>
                ) : (
                  interviews.map((iv) => (
                    <div key={iv.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 hover:border-brand-blue transition-all">
                      <button onClick={() => openInterview(iv)} className="flex items-center gap-4 flex-1 text-left">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${iv.type === 'hiring' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-amber-100 text-amber-700'}`}>
                          {interviewTypeLabels[iv.type]}
                        </span>
                        <div>
                          <p className="font-bold text-brand-navy text-sm">{iv.interviewDate || '日付未設定'}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <UserCircle2 size={12} />{iv.interviewer || '担当未設定'}
                            {iv.result && <span className="ml-2 px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">{RESULT_LABELS[iv.result] || iv.result}</span>}
                          </p>
                        </div>
                      </button>
                      <button onClick={() => deleteInterview(iv.id)} className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* ===== ページ送りウィザード ===== */
          <>
            {/* ステップ表示 + メタ */}
            <div className="px-5 py-3 border-b border-gray-100 bg-gray-50 shrink-0 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={closeToList} className="text-xs font-bold text-gray-400 hover:text-brand-navy flex items-center gap-1">
                  <ChevronLeft size={14} />面談一覧
                </button>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${active.type === 'hiring' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-amber-100 text-amber-700'}`}>
                  {interviewTypeLabels[active.type]}
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <label className="text-xs text-gray-400">面談日</label>
                  <input type="date" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} onBlur={() => persist()} className="px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-blue" />
                </div>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {pages.map((p, i) => (
                  <button
                    key={p.key}
                    onClick={() => goTo(i)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      i === pageIndex ? 'bg-brand-navy text-white' : i < pageIndex ? 'bg-brand-blue/10 text-brand-blue' : 'bg-white text-gray-400 border border-gray-200'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center ${i === pageIndex ? 'bg-white text-brand-navy' : 'bg-gray-100'}`}>{i + 1}</span>
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            {/* 本体: 左=事前情報 / 右=面談メモ */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
              <div className="overflow-y-auto p-6 border-r border-gray-100 bg-gray-50/50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">事前入力情報</p>
                {section.hint && <p className="text-xs text-gray-400 mb-4 -mt-2">{section.hint}</p>}
                <div className="space-y-3">
                  {section.left.length === 0 && <p className="text-sm text-gray-400 italic">（このページに事前情報はありません）</p>}
                  {section.left.map((f) => {
                    const val = (recruit[f.field] ?? '').toString();
                    if (!val.trim()) return null;
                    return (
                      <div key={f.field} className="space-y-0.5">
                        <p className="text-xs font-bold text-gray-400">{f.label}</p>
                        <p className="text-brand-navy text-sm whitespace-pre-wrap leading-relaxed">{val}</p>
                      </div>
                    );
                  })}
                  {section.left.every((f) => !(recruit[f.field] ?? '').toString().trim()) && section.left.length > 0 && (
                    <p className="text-sm text-gray-400 italic">事前情報の記載はありません</p>
                  )}
                </div>
              </div>

              <div className="overflow-y-auto p-6 bg-white">
                <p className="text-xs font-bold text-brand-blue uppercase tracking-wider mb-4">面談メモ</p>
                <div className="space-y-4">
                  {section.right.map((f) => {
                    const value = responses[section.key]?.[f.key] || '';
                    if (f.type === 'rating') {
                      const num = parseInt(value, 10) || 0;
                      return (
                        <div key={f.key} className="space-y-1.5">
                          <label className="text-xs font-bold text-gray-500">{f.label}</label>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <button
                                key={n}
                                type="button"
                                onClick={() => { setAnswer(section.key, f.key, String(n)); }}
                                className={`p-1.5 rounded-lg transition-all ${n <= num ? 'text-amber-400' : 'text-gray-200 hover:text-gray-300'}`}
                              >
                                <Star size={22} fill={n <= num ? 'currentColor' : 'none'} />
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    if (f.type === 'text') {
                      return (
                        <div key={f.key} className="space-y-1">
                          <label className="text-xs font-bold text-gray-500">{f.label}</label>
                          <input
                            value={value}
                            onChange={(e) => setAnswer(section.key, f.key, e.target.value)}
                            onBlur={() => persist()}
                            placeholder={f.placeholder}
                            className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue"
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={f.key} className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">{f.label}</label>
                        <textarea
                          value={value}
                          onChange={(e) => setAnswer(section.key, f.key, e.target.value)}
                          onBlur={() => persist()}
                          rows={3}
                          placeholder={f.placeholder || 'ここに聞き取った内容を記入...'}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue resize-none leading-relaxed"
                        />
                      </div>
                    );
                  })}

                  {/* 最終ページ: 結果 */}
                  {pageIndex === pages.length - 1 && (
                    <div className="pt-4 border-t border-gray-100 space-y-2">
                      <label className="text-xs font-bold text-gray-500">面談結果</label>
                      <div className="flex gap-2">
                        {(['pass', 'hold', 'fail'] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => { setResult(r); persist({ result: r }); }}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
                              result === r
                                ? r === 'pass' ? 'bg-green-500 text-white' : r === 'hold' ? 'bg-amber-500 text-white' : 'bg-red-500 text-white'
                                : 'bg-gray-50 text-gray-400 border border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {RESULT_LABELS[r]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* フッター */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between shrink-0">
              <button
                onClick={() => goTo(pageIndex - 1)}
                disabled={pageIndex === 0}
                className="px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition-all disabled:opacity-30 flex items-center gap-1"
              >
                <ChevronLeft size={16} />戻る
              </button>
              <span className="text-xs text-gray-400">{pageIndex + 1} / {pages.length}</span>
              {pageIndex === pages.length - 1 ? (
                <button onClick={closeToList} className="px-5 py-2 rounded-xl text-sm font-bold bg-brand-navy text-white hover:bg-opacity-90 transition-all flex items-center gap-1 shadow-md">
                  <Check size={16} />保存して一覧へ
                </button>
              ) : (
                <button onClick={() => goTo(pageIndex + 1)} className="px-5 py-2 rounded-xl text-sm font-bold bg-brand-blue text-white hover:bg-opacity-90 transition-all flex items-center gap-1 shadow-md">
                  次へ<ChevronRight size={16} />
                </button>
              )}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};
