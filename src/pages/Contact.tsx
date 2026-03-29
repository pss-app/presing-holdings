import React from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2, Briefcase, MapPin, Camera } from 'lucide-react';
import { db, storage, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType, query, where, onSnapshot, ref, uploadBytes, getDownloadURL } from '../firebase';

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string;
  location: string;
  employmentType: string;
  salary: string;
}

const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all";
const labelClass = "text-sm font-bold text-brand-navy";
const sectionClass = "border-t border-gray-100 pt-8 space-y-6";

export const Contact = () => {
  const [activeTab, setActiveTab] = React.useState<'contact' | 'recruit'>('contact');
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = React.useState<string>('');
  const [photoFile, setPhotoFile] = React.useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = React.useState<string | null>(null);
  const formRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const q = query(collection(db, 'jobs'), where('status', '==', 'active'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
      setJobs(data);
    }, (err) => {
      console.error('Error fetching jobs:', err);
    });
    return () => unsubscribe();
  }, []);

  const scrollToForm = (jobId?: string) => {
    if (jobId) setSelectedJobId(jobId);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (evt) => setPhotoPreview(evt.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      if (activeTab === 'contact') {
        const contactData = {
          companyName: formData.get('companyName') as string,
          name: formData.get('name') as string,
          email: formData.get('email') as string,
          content: formData.get('content') as string,
          createdAt: serverTimestamp(),
        };
        await addDoc(collection(db, 'contacts'), contactData);
      } else {
        // Upload photo if provided
        let photoUrl = '';
        if (photoFile) {
          try {
            const storageRef = ref(storage, `recruit-photos/${Date.now()}-${photoFile.name}`);
            const snapshot = await uploadBytes(storageRef, photoFile);
            photoUrl = await getDownloadURL(snapshot.ref);
          } catch (uploadErr) {
            console.error('Photo upload error:', uploadErr);
            // Continue without photo if upload fails
          }
        }

        const nameKanji = formData.get('nameKanji') as string;
        const recruitData: Record<string, any> = {
          jobId: selectedJobId || null,
          name: nameKanji,
          nameKanji,
          nameKana: formData.get('nameKana') as string,
          gender: formData.get('gender') as string,
          birthDate: (() => { const v = formData.get('birthDate') as string; if (!v) return ''; const [y,m,d] = v.split('-'); return `${y}年${parseInt(m)}月${parseInt(d)}日`; })(),
          age: (() => { const v = formData.get('birthDate') as string; if (!v) return ''; const b = new Date(v); const today = new Date(); let age = today.getFullYear() - b.getFullYear(); if (today < new Date(today.getFullYear(), b.getMonth(), b.getDate())) age--; return `${age}歳`; })(),
          address: formData.get('address') as string,
          hasCar: formData.get('hasCar') as string,
          phone: formData.get('phone') as string,
          email: formData.get('email') as string,
          lineId: formData.get('lineId') as string,
          referredBy: formData.get('referredBy') as string,
          nearestStation: formData.get('nearestStation') as string,
          transportToStation: formData.get('transportToStation') as string,
          qualifications: formData.get('qualifications') as string,
          availableFrom: formData.get('availableFrom') as string,
          availablePeriod: formData.get('availablePeriod') as string,
          availableShift: formData.get('availableShift') as string,
          educationDate: formData.get('educationDate') as string,
          educationName: formData.get('educationName') as string,
          education: `${formData.get('educationDate') || ''} ${formData.get('educationName') || ''}`.trim(),
          work1Company: formData.get('work1Company') as string,
          work1JobType: formData.get('work1JobType') as string,
          work1Content: formData.get('work1Content') as string,
          work1Period: (() => { const fmtM = (v: string) => { if (!v) return ''; const [y,m] = v.split('-'); return `${y}年${parseInt(m)}月`; }; const f = formData.get('work1PeriodFrom') as string; const t = formData.get('work1PeriodTo') as string; return [fmtM(f), fmtM(t)].filter(Boolean).join('〜'); })(),
          work1Details: formData.get('work1Details') as string,
          work2Company: formData.get('work2Company') as string,
          work2JobType: formData.get('work2JobType') as string,
          work2Content: formData.get('work2Content') as string,
          work2Period: (() => { const fmtM = (v: string) => { if (!v) return ''; const [y,m] = v.split('-'); return `${y}年${parseInt(m)}月`; }; const f = formData.get('work2PeriodFrom') as string; const t = formData.get('work2PeriodTo') as string; return [fmtM(f), fmtM(t)].filter(Boolean).join('〜'); })(),
          work2Details: formData.get('work2Details') as string,
          work3Company: formData.get('work3Company') as string,
          work3JobType: formData.get('work3JobType') as string,
          work3Content: formData.get('work3Content') as string,
          work3Period: (() => { const fmtM = (v: string) => { if (!v) return ''; const [y,m] = v.split('-'); return `${y}年${parseInt(m)}月`; }; const f = formData.get('work3PeriodFrom') as string; const t = formData.get('work3PeriodTo') as string; return [fmtM(f), fmtM(t)].filter(Boolean).join('〜'); })(),
          work3Details: formData.get('work3Details') as string,
          selfPr: formData.get('selfPr') as string,
          emergencyFurigana: formData.get('emergencyFurigana') as string,
          emergencyName: formData.get('emergencyName') as string,
          emergencyRelation: formData.get('emergencyRelation') as string,
          emergencyTel: formData.get('emergencyTel') as string,
          bankName: formData.get('bankName') as string,
          bankBranch: formData.get('bankBranch') as string,
          bankType: formData.get('bankType') as string,
          bankNumber: formData.get('bankNumber') as string,
          bankHolder: formData.get('bankHolder') as string,
          status: 'pending',
          createdAt: serverTimestamp(),
        };
        if (photoUrl) recruitData.photoUrl = photoUrl;

        await addDoc(collection(db, 'recruits'), recruitData);
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Submission error:', err);
      setError('送信中にエラーが発生しました。時間をおいて再度お試しください。');
      handleFirestoreError(err, OperationType.WRITE, activeTab === 'contact' ? 'contacts' : 'recruits');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-brand-navy py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact & Recruit</h1>
            <p className="text-xl text-gray-400">お問い合わせ・採用エントリー</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-brand-light min-h-screen">
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${activeTab === 'recruit' ? 'max-w-6xl' : 'max-w-4xl'}`}>
          {/* Tabs */}
          <div className="flex bg-white p-1 rounded-xl shadow-sm mb-12 border border-gray-100">
            <button
              onClick={() => { setActiveTab('contact'); setError(null); setIsSubmitted(false); }}
              className={`flex-1 py-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'contact' ? 'bg-brand-navy text-white shadow-md' : 'text-gray-400 hover:text-brand-navy'}`}
            >
              一般お問い合わせ
            </button>
            <button
              onClick={() => { setActiveTab('recruit'); setError(null); setIsSubmitted(false); }}
              className={`flex-1 py-4 text-sm font-bold rounded-lg transition-all ${activeTab === 'recruit' ? 'bg-brand-navy text-white shadow-md' : 'text-gray-400 hover:text-brand-navy'}`}
            >
              採用エントリー
            </button>
          </div>

          {/* Job Listings */}
          {activeTab === 'recruit' && !isSubmitted && (
            <div className="mb-20 space-y-12">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-brand-navy mb-4">現在募集中の案件</h2>
                <p className="text-lg text-gray-500">あなたの経験やスキルを活かせる環境がここにあります。</p>
              </div>

              <div className="grid grid-cols-1 gap-8">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-10 border-b border-gray-100">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 bg-brand-blue text-white text-xs font-bold rounded-full uppercase tracking-widest">{job.employmentType}</span>
                            <span className="flex items-center text-gray-500 font-medium">
                              <MapPin size={16} className="mr-1.5 text-brand-blue" />
                              {job.location}
                            </span>
                          </div>
                          <h3 className="text-3xl font-bold text-brand-navy mb-3">{job.title}</h3>
                          <div className="flex items-center text-brand-blue font-bold text-xl">
                            <span className="mr-2">給与目安:</span>{job.salary}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => scrollToForm(job.id)}
                          className="px-10 py-4 bg-brand-navy text-white font-bold rounded-2xl hover:bg-brand-blue transition-all shadow-lg hover:-translate-y-1 active:translate-y-0"
                        >
                          この案件にエントリー
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-5">
                          <h4 className="text-lg font-bold text-brand-navy flex items-center">
                            <Briefcase size={22} className="mr-3 text-brand-blue" />業務内容
                          </h4>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-base">{job.description}</p>
                        </div>
                        <div className="space-y-5">
                          <h4 className="text-lg font-bold text-brand-navy flex items-center">
                            <CheckCircle2 size={22} className="mr-3 text-brand-blue" />応募要件
                          </h4>
                          <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-base">{job.requirements}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="bg-white/50 backdrop-blur-sm p-16 rounded-[2.5rem] border-2 border-dashed border-gray-300 text-center">
                    <Briefcase size={48} className="mx-auto text-gray-300 mb-6" />
                    <p className="text-xl font-bold text-gray-400 mb-2">現在、公開中の募集案件はありません</p>
                    <p className="text-gray-400">オープンポジションでのエントリーをご検討ください。</p>
                  </div>
                )}
              </div>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => scrollToForm('')}
                  className="px-10 py-4 bg-white text-brand-navy font-bold rounded-2xl border-2 border-brand-navy hover:bg-brand-navy hover:text-white transition-all shadow-md"
                >
                  オープンポジションでエントリー
                </button>
              </div>
            </div>
          )}

          {/* Form Area */}
          <div ref={formRef} className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-50 max-w-4xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-bold text-brand-navy mb-2">
                {activeTab === 'contact' ? 'お問い合わせフォーム' : 'エントリーフォーム'}
              </h2>
              <p className="text-gray-500">
                {activeTab === 'recruit' ? '* は必須項目です' : '必要事項をご記入の上、送信してください。'}
              </p>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-brand-navy mb-4">送信完了</h2>
                <p className="text-gray-500">
                  お問い合わせありがとうございます。内容を確認の上、担当者よりご連絡いたします。
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-lg flex items-center space-x-3">
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">{error}</span>
                  </div>
                )}

                {activeTab === 'contact' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className={labelClass}>会社名</label>
                        <input name="companyName" type="text" required className={inputClass} placeholder="株式会社〇〇" />
                      </div>
                      <div className="space-y-2">
                        <label className={labelClass}>お名前</label>
                        <input name="name" type="text" required className={inputClass} placeholder="山田 太郎" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>メールアドレス</label>
                      <input name="email" type="email" required className={inputClass} placeholder="example@presing.co.jp" />
                    </div>
                    <div className="space-y-2">
                      <label className={labelClass}>お問い合わせ内容</label>
                      <textarea name="content" required rows={6} className={`${inputClass} resize-none`} placeholder="ご自由にご記入ください" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Job Selection */}
                    <div className="space-y-4">
                      <label className={`${labelClass} block`}>応募する案件</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {jobs.map((job) => (
                          <button
                            key={job.id}
                            type="button"
                            onClick={() => setSelectedJobId(job.id)}
                            className={`px-4 py-3 text-left border rounded-xl transition-all flex items-center justify-between ${selectedJobId === job.id ? 'border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue' : 'border-gray-200 hover:border-brand-blue'}`}
                          >
                            <span className={`text-sm font-bold ${selectedJobId === job.id ? 'text-brand-blue' : 'text-brand-navy'}`}>{job.title}</span>
                            {selectedJobId === job.id && <CheckCircle2 size={16} className="text-brand-blue shrink-0 ml-2" />}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => setSelectedJobId('')}
                          className={`px-4 py-3 text-left border rounded-xl transition-all flex items-center justify-between ${selectedJobId === '' ? 'border-brand-blue bg-brand-blue/5 ring-2 ring-brand-blue' : 'border-gray-200 hover:border-brand-blue'}`}
                        >
                          <span className={`text-sm font-bold ${selectedJobId === '' ? 'text-brand-blue' : 'text-brand-navy'}`}>その他（オープンポジション）</span>
                          {selectedJobId === '' && <CheckCircle2 size={16} className="text-brand-blue shrink-0 ml-2" />}
                        </button>
                      </div>
                    </div>

                    {/* ── 基本情報 ── */}
                    <div className={sectionClass}>
                      <h3 className="font-bold text-brand-navy text-lg">基本情報</h3>

                      {/* Photo Upload */}
                      <div className="space-y-2">
                        <label className={labelClass}>履歴書用写真（背景白）*</label>
                        <div className="flex items-start gap-6">
                          <div className="w-28 h-36 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                            {photoPreview ? (
                              <img src={photoPreview} alt="プレビュー" className="w-full h-full object-cover" />
                            ) : (
                              <Camera size={32} className="text-gray-300" />
                            )}
                          </div>
                          <div className="flex-1 space-y-2">
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" id="photo-upload" />
                            <label htmlFor="photo-upload" className="inline-block px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-100 transition-all text-sm font-bold text-brand-navy">
                              写真を選択する
                            </label>
                            <p className="text-xs text-gray-400">JPG・PNG形式、背景白の顔写真をアップロードしてください</p>
                          </div>
                        </div>
                      </div>

                      {/* 行1: 氏名漢字・かな */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>氏名（漢字） * 例: 山田 太郎</label>
                          <input name="nameKanji" type="text" required className={inputClass} placeholder="山田 太郎" />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>氏名（かな） * 例: やまだ たろう</label>
                          <input name="nameKana" type="text" required className={inputClass} placeholder="やまだ たろう" />
                        </div>
                      </div>

                      {/* 行2: 年齢・性別・自家用車 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>性別</label>
                          <select name="gender" className={inputClass}>
                            <option value="">選択してください</option>
                            <option value="男">男</option>
                            <option value="女">女</option>
                            <option value="その他">その他</option>
                            <option value="回答しない">回答しない</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>自家用車 有・無（有の場合は車種）</label>
                          <input name="hasCar" type="text" className={inputClass} placeholder="有（プリウス）または 無" />
                        </div>
                      </div>

                      {/* 行3: 電話番号・メールアドレス・紹介者名 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>電話番号 * 例: 090-1234-5678</label>
                          <input name="phone" type="tel" required className={inputClass} placeholder="090-1234-5678" />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>メールアドレス *</label>
                          <input name="email" type="email" required className={inputClass} placeholder="example@mail.com" />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>紹介者名（不明な場合は「不明」）</label>
                          <input name="referredBy" type="text" className={inputClass} placeholder="山田 太郎 または 不明" />
                        </div>
                      </div>
                    </div>

                    {/* ── 住所・交通手段 ── */}
                    <div className={sectionClass}>
                      <h3 className="font-bold text-brand-navy text-lg">住所・交通手段</h3>

                      <div className="space-y-2">
                        <label className={labelClass}>住所 *</label>
                        <input name="address" type="text" required className={inputClass} placeholder="東京都渋谷区〇〇1-2-3" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>最寄り駅 * 例: ○○線 XX駅</label>
                          <input name="nearestStation" type="text" required className={inputClass} placeholder="山手線 渋谷駅" />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>駅までの移動手段 例: 徒歩5分</label>
                          <input name="transportToStation" type="text" className={inputClass} placeholder="徒歩5分" />
                        </div>
                      </div>
                    </div>

                    {/* ── 資格・勤務条件・学歴 ── */}
                    <div className={sectionClass}>
                      <h3 className="font-bold text-brand-navy text-lg">資格・勤務条件・学歴</h3>

                      <div className="space-y-2">
                        <label className={labelClass}>生年月日 *</label>
                        <input name="birthDate" type="date" required className={inputClass} />
                      </div>

                      <div className="space-y-2">
                        <label className={labelClass}>現在持っている資格（例: 普通免許 ※あれば）</label>
                        <input name="qualifications" type="text" className={inputClass} placeholder="普通自動車免許、英検2級 など" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>勤務可能開始日</label>
                          <input name="availableFrom" type="text" className={inputClass} placeholder="2025年04月01日" />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>勤務可能期間</label>
                          <input name="availablePeriod" type="text" className={inputClass} placeholder="長期（1年〜）など" />
                        </div>
                        <div className="space-y-2">
                          <label className={labelClass}>勤務可能シフト</label>
                          <input name="availableShift" type="text" className={inputClass} placeholder="平日のみ、365日24時間OKなど" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <label className={labelClass}>最終学歴 卒業年月 * 例: 2015年3月</label>
                          <input name="educationDate" type="text" required className={inputClass} placeholder="2015年3月" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className={labelClass}>学校名・卒業区分 * 例: 〇〇高等学校卒業</label>
                          <input name="educationName" type="text" required className={inputClass} placeholder="〇〇高等学校卒業" />
                        </div>
                      </div>
                    </div>

                    {/* ── 職務経歴 ── */}
                    <div className={sectionClass}>
                      <h3 className="font-bold text-brand-navy text-lg">職務経歴（新しい順）</h3>

                      {([1, 2, 3] as const).map((n) => (
                        <div key={n} className="border border-gray-200 rounded-xl p-5 space-y-4">
                          <p className="font-bold text-brand-navy text-sm">
                            職務経歴{n}{n === 1 ? '（現在 / 直近）' : ''}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <label className={labelClass}>社名</label>
                              <input name={`work${n}Company`} type="text" className={inputClass} placeholder="株式会社〇〇" />
                            </div>
                            <div className="space-y-1">
                              <label className={labelClass}>職種</label>
                              <input name={`work${n}JobType`} type="text" className={inputClass} placeholder="システムエンジニア" />
                            </div>
                            <div className="space-y-1">
                              <label className={labelClass}>業務内容</label>
                              <input name={`work${n}Content`} type="text" className={inputClass} placeholder="Webアプリ開発" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className={labelClass}>期間</label>
                            <div className="flex items-center gap-2">
                              <input name={`work${n}PeriodFrom`} type="month" className={inputClass} />
                              <span className="text-brand-navy font-bold">〜</span>
                              <input name={`work${n}PeriodTo`} type="month" className={inputClass} />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className={labelClass}>具体的な業務・成果</label>
                            <textarea name={`work${n}Details`} rows={4} className={`${inputClass} resize-none`} placeholder="具体的な業務内容、成果などをご記入ください" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* ── 自己PR ── */}
                    <div className={sectionClass}>
                      <h3 className="font-bold text-brand-navy text-lg">自己PR</h3>
                      <div className="space-y-2">
                        <label className={labelClass}>
                          自己PR（仕事をするうえで気を付けていること、自分の長所、意気込み等）※4行以上が望ましい
                        </label>
                        <textarea
                          name="selfPr"
                          rows={6}
                          className={`${inputClass} resize-none`}
                          placeholder="仕事をするうえで大切にしていること、強み、入社への意気込みなどをご記入ください"
                        />
                      </div>
                    </div>

                    {/* ── 緊急連絡先 ── */}
                    <div className={sectionClass}>
                      <h3 className="font-bold text-brand-navy text-lg">緊急連絡先 *</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className={labelClass}>フリガナ</label>
                          <input name="emergencyFurigana" className={inputClass} placeholder="ヤマダ ハナコ" />
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>続柄</label>
                          <select name="emergencyRelation" required className={inputClass}>
                            <option value="">選択してください</option>
                            <option value="父">父</option>
                            <option value="母">母</option>
                            <option value="兄">兄</option>
                            <option value="弟">弟</option>
                            <option value="姉">姉</option>
                            <option value="妹">妹</option>
                            <option value="配偶者">配偶者</option>
                            <option value="祖父">祖父</option>
                            <option value="祖母">祖母</option>
                            <option value="その他">その他</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>氏名（漢字）</label>
                          <input name="emergencyName" required className={inputClass} placeholder="山田 花子" />
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>電話番号</label>
                          <input name="emergencyTel" required className={inputClass} placeholder="090-0000-0000" />
                        </div>
                      </div>
                    </div>

                    {/* ── 振込先口座 ── */}
                    <div className={sectionClass}>
                      <h3 className="font-bold text-brand-navy text-lg">振込先口座 *</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className={labelClass}>銀行名</label>
                          <input name="bankName" required className={inputClass} placeholder="〇〇銀行" />
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>支店名</label>
                          <input name="bankBranch" required className={inputClass} placeholder="渋谷支店" />
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>口座種類</label>
                          <select name="bankType" required className={inputClass}>
                            <option value="">選択してください</option>
                            <option value="普通">普通</option>
                            <option value="当座">当座</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className={labelClass}>口座番号</label>
                          <input name="bankNumber" required className={inputClass} placeholder="1234567" />
                        </div>
                        <div className="md:col-span-2 space-y-1">
                          <label className={labelClass}>口座名義（カタカナ）</label>
                          <input name="bankHolder" required className={inputClass} placeholder="ヤマダ タロウ" />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-brand-navy text-white font-bold rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={20} />}
                  {isSubmitting ? '送信中...' : '内容を確認して送信する'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
