import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard,
  Users,
  MessageSquare,
  LogOut,
  LogIn,
  ChevronRight,
  Calendar,
  MapPin,
  Briefcase,
  DollarSign,
  Phone,
  Mail,
  Building2,
  Clock,
  Search,
  Filter,
  AlertCircle,
  Plus,
  X,
  Edit2,
  Trash2,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  UserPlus,
  Table2
} from 'lucide-react';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  User,
  handleFirestoreError,
  OperationType,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp
} from '../firebase';

interface ContactEntry {
  id: string;
  companyName: string;
  name: string;
  email: string;
  content: string;
  createdAt: any;
}

interface RecruitEntry {
  id: string;
  jobId: string | null;
  name: string;
  nameKanji?: string;
  nameKana?: string;
  email: string;
  phone: string;
  photoUrl?: string;
  lineId?: string;
  referredBy?: string;
  gender?: string;
  birthDate?: string;
  age?: string;
  address?: string;
  hasCar?: string;
  nearestStation?: string;
  transportToStation?: string;
  qualifications?: string;
  availableFrom?: string;
  availablePeriod?: string;
  availableShift?: string;
  education?: string;
  workHistory1?: string;
  workHistory2?: string;
  workHistory3?: string;
  selfPr?: string;
  emergencyContact?: string;
  emergencyFurigana?: string;
  emergencyName?: string;
  emergencyRelation?: string;
  emergencyTel?: string;
  bankAccount?: string;
  bankName?: string;
  bankBranch?: string;
  bankType?: string;
  bankNumber?: string;
  bankHolder?: string;
  jobTitle?: string;
  employmentType?: string;
  desiredSalary?: string;
  workLocation?: string;
  experience?: string;
  status: string;
  createdAt: any;
}

interface Job {
  id: string;
  title: string;
  location: string;
  employmentType: string;
  salary: string;
  description: string;
  requirements: string;
  status: 'active' | 'closed';
  createdAt: any;
}

export const Dashboard = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<'contacts' | 'recruits' | 'jobs' | 'staff' | 'recruitTable'>('recruits');
  const [contacts, setContacts] = React.useState<ContactEntry[]>([]);
  const [recruits, setRecruits] = React.useState<RecruitEntry[]>([]);
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [adminEmails, setAdminEmails] = React.useState<{email: string; name?: string; company?: string}[]>([]);
  const [editingAdmin, setEditingAdmin] = React.useState<{email: string; name?: string; company?: string} | null>(null);
  const [newAdminName, setNewAdminName] = React.useState('');
  const [newAdminRole, setNewAdminRole] = React.useState('staff');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedEntry, setSelectedEntry] = React.useState<ContactEntry | RecruitEntry | Job | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = React.useState(false);
  const [editingJob, setEditingJob] = React.useState<Job | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [newAdminEmail, setNewAdminEmail] = React.useState('');
  const [editingRecruit, setEditingRecruit] = React.useState<RecruitEntry | null>(null);
  const [isRecruitEditOpen, setIsRecruitEditOpen] = React.useState(false);

  const [loginError, setLoginError] = React.useState<string | null>(null);

  const BOOTSTRAP_ADMIN = 'paradigm070755@gmail.com';

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setIsAdmin(false);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    if (!user) return;

    // Check if user is bootstrap admin
    if (user.email === BOOTSTRAP_ADMIN) {
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    // Check if user is in admin_emails collection
    const unsubscribe = onSnapshot(doc(db, 'admin_emails', user.email!), (docSnap) => {
      setIsAdmin(docSnap.exists());
      setLoading(false);
    }, (err) => {
      console.error('Admin check error:', err);
      setIsAdmin(false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  React.useEffect(() => {
    if (!isAdmin) return;

    const qContacts = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubscribeContacts = onSnapshot(qContacts, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactEntry));
      setContacts(data);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'contacts'));

    const qRecruits = query(collection(db, 'recruits'), orderBy('createdAt', 'desc'));
    const unsubscribeRecruits = onSnapshot(qRecruits, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as RecruitEntry));
      setRecruits(data);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'recruits'));

    const qJobs = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
    const unsubscribeJobs = onSnapshot(qJobs, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Job));
      setJobs(data);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'jobs'));

    const qAdmins = query(collection(db, 'admin_emails'));
    const unsubscribeAdmins = onSnapshot(qAdmins, (snapshot) => {
      const emails = snapshot.docs.map(doc => ({ ...(doc.data() as any), email: doc.id }));
      setAdminEmails(emails);
    }, (err) => console.error('Error fetching admins:', err));

    return () => {
      unsubscribeContacts();
      unsubscribeRecruits();
      unsubscribeJobs();
      unsubscribeAdmins();
    };
  }, [isAdmin]);

  const handleLogin = async () => {
    setLoginError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.code === 'auth/popup-blocked') {
        setLoginError('ポップアップがブロックされました。ブラウザの設定で許可してください。');
      } else if (error.code === 'auth/unauthorized-domain') {
        setLoginError('このドメインはFirebaseで許可されていません。Firebaseコンソールで設定が必要です。');
      } else {
        setLoginError('ログイン中にエラーが発生しました。: ' + error.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleJobSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get('title') as string,
      location: formData.get('location') as string,
      employmentType: formData.get('employmentType') as string,
      salary: formData.get('salary') as string,
      description: formData.get('description') as string,
      requirements: formData.get('requirements') as string,
      status: formData.get('status') as 'active' | 'closed',
      updatedAt: serverTimestamp(),
    };

    try {
      if (editingJob) {
        await updateDoc(doc(db, 'jobs', editingJob.id), jobData);
      } else {
        await addDoc(collection(db, 'jobs'), { ...jobData, createdAt: serverTimestamp() });
      }
      setIsJobModalOpen(false);
      setEditingJob(null);
    } catch (err) {
      console.error('Job submit error:', err);
      handleFirestoreError(err, OperationType.WRITE, 'jobs');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateRecruit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingRecruit) return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = {};
    fd.forEach((v, k) => { data[k] = v as string; });
    try {
      await updateDoc(doc(db, 'recruits', editingRecruit.id), data);
      setIsRecruitEditOpen(false);
      setEditingRecruit(null);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!window.confirm('この案件を削除してもよろしいですか？')) return;
    try {
      await deleteDoc(doc(db, 'jobs', id));
      if (selectedEntry?.id === id) setSelectedEntry(null);
    } catch (err) {
      console.error('Delete job error:', err);
      handleFirestoreError(err, OperationType.DELETE, 'jobs');
    }
  };

  const updateRecruitStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'recruits', id), { status });
    } catch (err) {
      console.error('Update status error:', err);
      handleFirestoreError(err, OperationType.UPDATE, 'recruits');
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail) return;
    try {
      await setDoc(doc(db, 'admin_emails', newAdminEmail.toLowerCase()), {
        name: newAdminName,
        role: newAdminRole,
        addedAt: serverTimestamp(),
        addedBy: user?.email
      });
      setNewAdminEmail('');
      setNewAdminName('');
      setNewAdminRole('staff');
    } catch (err) {
      console.error('Add admin error:', err);
      alert('管理者の追加に失敗しました。');
    }
  };

  const handleUpdateAdmin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingAdmin) return;
    const fd = new FormData(e.currentTarget);
    try {
      await updateDoc(doc(db, 'admin_emails', editingAdmin.email), {
        name: fd.get('name') as string,
        role: fd.get('role') as string,
      });
      setEditingAdmin(null);
    } catch (err) {
      console.error('Update admin error:', err);
      alert('更新に失敗しました。');
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    if (email === BOOTSTRAP_ADMIN) {
      alert('メイン管理者は削除できません。');
      return;
    }
    if (!window.confirm(`${email} を管理者から削除しますか？`)) return;
    try {
      await deleteDoc(doc(db, 'admin_emails', email.toLowerCase()));
    } catch (err) {
      console.error('Remove admin error:', err);
      alert('管理者の削除に失敗しました。');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-blue"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-brand-navy/5 text-brand-navy rounded-full flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard size={40} />
          </div>
          <h1 className="text-2xl font-bold text-brand-navy mb-2">Admin Dashboard</h1>
          <p className="text-gray-500 mb-8">管理者専用ページです。ログインしてください。</p>
          
          {loginError && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center space-x-2">
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-4 bg-brand-navy text-white font-bold rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center shadow-lg"
          >
            <LogIn className="mr-2" size={20} />
            Googleでログイン
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl text-center border border-gray-100">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-500 mb-8">
            このアカウント（{user.email}）には管理者権限がありません。
          </p>
          <button
            onClick={handleLogout}
            className="w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
          >
            ログアウト
          </button>
        </div>
      </div>
    );
  }

  const filteredData = activeTab === 'contacts' 
    ? contacts.filter(c => c.name.includes(searchTerm) || c.companyName.includes(searchTerm) || c.content.includes(searchTerm))
    : activeTab === 'recruits'
    ? recruits.filter(r => r.name.includes(searchTerm) || (r.nameKana || '').includes(searchTerm) || (r.nearestStation || '').includes(searchTerm) || (r.education || '').includes(searchTerm))
    : jobs.filter(j => j.title.includes(searchTerm) || j.location.includes(searchTerm) || j.description.includes(searchTerm));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-brand-navy text-white flex flex-col">
        <div className="p-8 border-b border-white/10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center">
              <LayoutDashboard size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight">Admin Console</span>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
            <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full border border-white/20" referrerPolicy="no-referrer" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user.displayName}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => { setActiveTab('recruits'); setSelectedEntry(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'recruits' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <Users size={20} />
            <span className="font-bold">採用エントリー</span>
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-md text-xs">{recruits.length}</span>
          </button>
          <button
            onClick={() => { setActiveTab('recruitTable'); setSelectedEntry(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'recruitTable' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <Table2 size={20} />
            <span className="font-bold">エントリー管理表</span>
          </button>
          <button
            onClick={() => { setActiveTab('jobs'); setSelectedEntry(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'jobs' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <Briefcase size={20} />
            <span className="font-bold">案件管理</span>
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-md text-xs">{jobs.length}</span>
          </button>
          <button
            onClick={() => { setActiveTab('contacts'); setSelectedEntry(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'contacts' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <MessageSquare size={20} />
            <span className="font-bold">お問い合わせ</span>
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-md text-xs">{contacts.length}</span>
          </button>
          <button
            onClick={() => { setActiveTab('staff'); setSelectedEntry(null); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeTab === 'staff' ? 'bg-brand-blue text-white' : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            <ShieldCheck size={20} />
            <span className="font-bold">スタッフ管理</span>
            <span className="ml-auto bg-white/20 px-2 py-0.5 rounded-md text-xs">{adminEmails.length + 1}名</span>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
          >
            <LogOut size={20} />
            <span className="font-bold">ログアウト</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-brand-navy">
              {activeTab === 'recruits' ? '採用エントリー一覧' :
               activeTab === 'recruitTable' ? 'エントリー管理表' :
               activeTab === 'jobs' ? '案件管理' :
               activeTab === 'staff' ? 'スタッフ管理' :
               'お問い合わせ一覧'}
            </h2>
            {activeTab === 'jobs' && (
              <button 
                onClick={() => { setEditingJob(null); setIsJobModalOpen(true); }}
                className="hidden md:flex items-center space-x-2 px-6 py-3 bg-brand-blue text-white rounded-2xl hover:bg-opacity-90 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <Plus size={20} />
                <span className="font-bold">新規案件を登録する</span>
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-brand-blue outline-none w-full md:w-64"
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* List or Staff Management */}
          {activeTab === 'recruitTable' ? (
            <div className="flex-1 p-6 overflow-auto bg-gray-50">
              <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-auto">
                <table className="w-full text-sm whitespace-nowrap">
                  <thead>
                    <tr className="bg-brand-navy text-white text-left">
                      <th className="px-4 py-3">氏名</th>
                      <th className="px-4 py-3">フリガナ</th>
                      <th className="px-4 py-3">電話番号</th>
                      <th className="px-4 py-3">メールアドレス</th>
                      <th className="px-4 py-3">応募求人</th>
                      <th className="px-4 py-3">生年月日</th>
                      <th className="px-4 py-3">年齢</th>
                      <th className="px-4 py-3">住所</th>
                      <th className="px-4 py-3">状態</th>
                      <th className="px-4 py-3">登録日</th>
                      <th className="px-4 py-3">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recruits.map((r, i) => (
                      <tr key={r.id} className={`border-t border-gray-100 hover:bg-blue-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="px-4 py-3 font-bold text-brand-navy">{r.nameKanji || r.name}</td>
                        <td className="px-4 py-3 text-gray-500">{r.nameKana || ''}</td>
                        <td className="px-4 py-3">{r.phone}</td>
                        <td className="px-4 py-3 text-gray-500">{r.email}</td>
                        <td className="px-4 py-3">{jobs.find(j => j.id === r.jobId)?.title || r.jobTitle || '—'}</td>
                        <td className="px-4 py-3">{r.birthDate || '—'}</td>
                        <td className="px-4 py-3 text-center">{r.age || '—'}</td>
                        <td className="px-4 py-3 max-w-[150px] truncate">{r.address || '—'}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            r.status === 'hired' ? 'bg-green-100 text-green-700' :
                            r.status === 'rejected' ? 'bg-red-100 text-red-600' :
                            r.status === 'interviewing' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {r.status === 'hired' ? '採用' :
                             r.status === 'rejected' ? '不採用' :
                             r.status === 'interviewing' ? '面接中' : '審査中'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs">{r.createdAt?.toDate().toLocaleDateString('ja-JP')}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setEditingRecruit(r); setIsRecruitEditOpen(true); }}
                              className="px-3 py-1.5 bg-brand-blue text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-1"
                            >
                              <Edit2 size={12} />編集
                            </button>
                            <button
                              onClick={async () => {
                                if (!window.confirm(`${r.nameKanji || r.name} のエントリーを削除しますか？`)) return;
                                await deleteDoc(doc(db, 'recruits', r.id));
                              }}
                              className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition-all flex items-center gap-1"
                            >
                              <Trash2 size={12} />削除
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {recruits.length === 0 && (
                  <div className="p-12 text-center text-gray-400">エントリーがありません</div>
                )}
              </div>
            </div>
          ) : activeTab === 'staff' ? (
            <div className="flex-1 p-8 overflow-y-auto bg-gray-50">
              <div className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-8">
                  <h3 className="text-xl font-bold text-brand-navy mb-6 flex items-center">
                    <UserPlus size={24} className="mr-2 text-brand-blue" />
                    新しいスタッフを追加
                  </h3>
                  <form onSubmit={handleAddAdmin} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input type="text" placeholder="氏名" value={newAdminName} onChange={e => setNewAdminName(e.target.value)} className="px-4 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-brand-blue outline-none" />
                      <select value={newAdminRole} onChange={e => setNewAdminRole(e.target.value)} className="px-4 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-brand-blue outline-none">
                        <option value="admin">管理者</option>
                        <option value="staff">スタッフ</option>
                      </select>
                      <input type="email" placeholder="Googleメールアドレス *" value={newAdminEmail} onChange={e => setNewAdminEmail(e.target.value)} className="px-4 py-3 bg-gray-100 border-none rounded-xl focus:ring-2 focus:ring-brand-blue outline-none" required />
                    </div>
                    <button type="submit" className="px-8 py-3 bg-brand-navy text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-md">
                      追加する
                    </button>
                  </form>
                  <p className="mt-4 text-sm text-gray-400">
                    ※追加されたスタッフは、自身のGoogleアカウントでログインすることで管理画面にアクセス可能になります。
                  </p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="font-bold text-brand-navy">スタッフ一覧</h3>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {user?.email === BOOTSTRAP_ADMIN && (
                      <div className="p-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">
                            M
                          </div>
                          <div>
                            <p className="font-bold text-brand-navy">{BOOTSTRAP_ADMIN}</p>
                            <p className="text-xs text-brand-blue font-bold uppercase tracking-wider">プラットフォームオーナー</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {adminEmails.map((admin) => (
                      <div key={admin.email} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-all">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center font-bold text-sm">
                            {(admin.name || admin.email || '?')[0].toUpperCase()}
                          </div>
                          <div>
                            {admin.name && <p className="font-bold text-brand-navy">{admin.name}</p>}
                            <p className="text-xs text-gray-400">{admin.email}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                              (admin as any).role === 'admin' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {(admin as any).role === 'admin' ? '管理者' : 'スタッフ'}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingAdmin(admin)}
                            className="px-3 py-1.5 bg-brand-blue text-white text-xs font-bold rounded-lg hover:bg-opacity-90 transition-all flex items-center gap-1"
                          >
                            <Edit2 size={12} />編集
                          </button>
                          <button
                            onClick={() => handleRemoveAdmin(admin.email)}
                            className="px-3 py-1.5 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition-all flex items-center gap-1"
                          >
                            <Trash2 size={12} />削除
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* List */}
              <div className="w-full md:w-1/3 border-r border-gray-200 overflow-y-auto bg-white">
            {activeTab === 'jobs' && filteredData.length > 0 && (
              <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                <button 
                  onClick={() => { setEditingJob(null); setIsJobModalOpen(true); }}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-white border-2 border-dashed border-brand-blue text-brand-blue rounded-xl hover:bg-brand-blue/5 transition-all font-bold text-sm"
                >
                  <Plus size={18} />
                  <span>新しい案件を追加</span>
                </button>
              </div>
            )}
            {filteredData.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <p className="mb-4">データが見つかりません</p>
                {activeTab === 'jobs' && (
                  <button 
                    onClick={() => { setEditingJob(null); setIsJobModalOpen(true); }}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-navy text-white rounded-xl hover:bg-opacity-90 transition-all shadow-md"
                  >
                    <Plus size={20} />
                    <span className="font-bold">最初の案件を登録する</span>
                  </button>
                )}
              </div>
            ) : (
              filteredData.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className={`w-full p-6 text-left border-b border-gray-100 transition-all hover:bg-gray-50 flex items-start space-x-4 ${
                    selectedEntry?.id === entry.id ? 'bg-brand-blue/5 border-l-4 border-l-brand-blue' : ''
                  }`}
                >
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-brand-blue uppercase tracking-wider">
                        {activeTab === 'recruits' ? (jobs.find(j => j.id === (entry as RecruitEntry).jobId)?.title || (entry as RecruitEntry).jobTitle || '求人未指定') : activeTab === 'jobs' ? (entry as Job).employmentType : (entry as ContactEntry).companyName}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {entry.createdAt?.toDate().toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                    <p className="font-bold text-brand-navy truncate">{activeTab === 'jobs' ? (entry as Job).title : entry.name}</p>
                    <p className="text-sm text-gray-500 truncate">
                      {activeTab === 'recruits' ? ((entry as RecruitEntry).education || (entry as RecruitEntry).experience || '') : activeTab === 'jobs' ? (entry as Job).description : (entry as ContactEntry).content}
                    </p>
                    {activeTab === 'recruits' && (
                      <span className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        (entry as RecruitEntry).status === 'hired' ? 'bg-green-100 text-green-700' :
                        (entry as RecruitEntry).status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {(entry as RecruitEntry).status}
                      </span>
                    )}
                  </div>
                  <ChevronRight size={18} className="text-gray-300 mt-1" />
                </button>
              ))
            )}
          </div>

          {/* Detail View */}
          <div className="hidden md:block flex-1 overflow-y-auto bg-gray-50 p-8">
            {selectedEntry ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                {/* Detail Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-8 bg-brand-navy text-white">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-brand-blue rounded-full text-[10px] font-bold uppercase tracking-widest">
                        {activeTab === 'recruits' ? 'Recruitment' : activeTab === 'jobs' ? 'Job Posting' : 'Contact'}
                      </span>
                      <div className="flex items-center text-xs text-white/60">
                        <Clock size={14} className="mr-1" />
                        {selectedEntry.createdAt?.toDate().toLocaleString('ja-JP')}
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{activeTab === 'jobs' ? (selectedEntry as Job).title : selectedEntry.name}</h3>
                    <div className="flex flex-wrap gap-4 mt-4">
                      {activeTab === 'jobs' ? (
                        <>
                          <div className="flex items-center text-sm text-white/80">
                            <MapPin size={16} className="mr-2" />
                            {(selectedEntry as Job).location}
                          </div>
                          <div className="flex items-center text-sm text-white/80">
                            <DollarSign size={16} className="mr-2" />
                            {(selectedEntry as Job).salary}
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center text-sm text-white/80">
                            <Mail size={16} className="mr-2" />
                            {selectedEntry.email}
                          </div>
                          {activeTab === 'recruits' && (
                            <div className="flex items-center text-sm text-white/80">
                              <Phone size={16} className="mr-2" />
                              {(selectedEntry as RecruitEntry).phone}
                            </div>
                          )}
                          {activeTab === 'contacts' && (
                            <div className="flex items-center text-sm text-white/80">
                              <Building2 size={16} className="mr-2" />
                              {(selectedEntry as ContactEntry).companyName}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-8 space-y-8">
                    {activeTab === 'recruits' ? (
                      <>
                        {/* Status & PDF */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-2xl">
                          <div className="space-y-2">
                            <span className="text-sm font-bold text-gray-500 block">選考ステータス</span>
                            <div className="flex flex-wrap gap-2">
                              {['pending', 'interviewing', 'hired', 'rejected'].map((s) => (
                                <button
                                  key={s}
                                  onClick={() => updateRecruitStatus(selectedEntry.id, s)}
                                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                                    (selectedEntry as RecruitEntry).status === s
                                      ? 'bg-brand-navy text-white shadow-md'
                                      : 'bg-white text-gray-400 border border-gray-200 hover:border-brand-navy'
                                  }`}
                                >
                                  {s.toUpperCase()}
                                </button>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              const r = selectedEntry as RecruitEntry;
                              const win = window.open('', '_blank');
                              if (!win) return;

                              // 職務経歴HTML（入れ子テンプレートを避けるため事前生成）
                              let workHtml = '';
                              [1, 2, 3].forEach(function(n) {
                                const ra = r as any;
                                const company = ra['work' + n + 'Company'] || '';
                                const jobType = ra['work' + n + 'JobType'] || '';
                                const content = ra['work' + n + 'Content'] || '';
                                const period  = ra['work' + n + 'Period']  || '';
                                const details = ra['work' + n + 'Details'] || ra['workHistory' + n] || '';
                                const label   = n === 1 ? '職務経歴1（現在）' : '職務経歴' + n;
                                // 期間を「開始年月 / ～ / 終了年月」縦表示に整形
                                const periodFmt = period.replace(/[〜～]/, '\n～\n');
                                // セル構造:
                                // row1: 職務経歴N(rowspan5) | 社名 | val | 職種 | val | 業務内容 | val
                                // row2: (skip)             | 期間  | 具体的業務・成果(colspan5, rowspan4)
                                // row3: (skip)             | 〇〇年～〇〇年(rowspan3)  | (details続き)
                                // row4: (skip)             | (period続き)              | (details続き)
                                // row5: (skip)             | (period続き)              | (details続き)
                                workHtml += '<table>'
                                  + '<tr>'
                                  + '<td class="label" rowspan="5" style="width:90px;vertical-align:top">' + label + '</td>'
                                  + '<td class="label" style="width:50px">社名</td><td>' + company + '</td>'
                                  + '<td class="label" style="width:50px">職種</td><td>' + jobType + '</td>'
                                  + '<td class="label" style="width:60px">業務内容</td><td>' + content + '</td>'
                                  + '</tr>'
                                  + '<tr>'
                                  + '<td class="label" style="vertical-align:top">期間</td>'
                                  + '<td colspan="5" rowspan="4" style="vertical-align:top;white-space:pre-wrap;height:80px">' + details + '</td>'
                                  + '</tr>'
                                  + '<tr>'
                                  + '<td rowspan="3" style="text-align:center;vertical-align:middle;white-space:pre-wrap">' + periodFmt + '</td>'
                                  + '</tr>'
                                  + '<tr style="height:20px"></tr>'
                                  + '<tr style="height:20px"></tr>'
                                  + '</table>';
                              });
                              win.document.write(`<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><title>エントリーシート - ${r.nameKanji || r.name}</title><style>
                                body{font-family:'Meiryo','Hiragino Kaku Gothic Pro',sans-serif;font-size:11px;margin:0;padding:16px;color:#000}
                                h1{text-align:center;font-size:18px;margin-bottom:4px}
                                .date{text-align:right;font-size:10px;margin-bottom:8px}
                                table{width:100%;border-collapse:collapse;margin-bottom:8px}
                                td,th{border:1px solid #333;padding:4px 6px;vertical-align:top}
                                .label{background:#eee;font-weight:bold;white-space:nowrap;width:120px}
                                .section{background:#ddd;font-weight:bold;text-align:center}
                                .photo{width:80px;height:100px;border:1px solid #333;text-align:center;vertical-align:middle;font-size:9px}
                                pre{margin:0;font-family:inherit;white-space:pre-wrap;font-size:10px}
                                @media print{body{padding:0}}
                              </style></head><body>
                              <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                                <div>
                                  <h1 style="margin:0 0 4px 0;font-size:18px">エントリーシート</h1>
                                  <div style="font-size:10px">作成日: ${r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString('ja-JP') : ''}</div>
                                </div>
                                <div class="photo">${r.photoUrl ? `<img src="${r.photoUrl}" style="width:78px;height:98px;object-fit:cover">` : '写真'}</div>
                              </div>
                              <table>
                                <tr>
                                  <td class="label">フリガナ</td>
                                  <td colspan="3">${r.nameKana || ''}</td>
                                  <td class="label" style="text-align:center">性別</td>
                                  <td class="label" style="text-align:center">生年月日</td>
                                  <td class="label" style="text-align:center">年齢</td>
                                </tr>
                                <tr>
                                  <td class="label">氏名</td>
                                  <td colspan="3">${r.nameKanji || r.name || ''}</td>
                                  <td style="text-align:center">${r.gender || ''}</td>
                                  <td style="text-align:center">${r.birthDate || ''}</td>
                                  <td style="text-align:center">${r.age || ''}</td>
                                </tr>
                                <tr>
                                  <td class="label">住所</td>
                                  <td colspan="3">${r.address || ''}</td>
                                  <td class="label">自家用車(車種)</td>
                                  <td colspan="2">${r.hasCar || ''}</td>
                                </tr>
                                <tr>
                                  <td class="label">電話番号</td>
                                  <td colspan="2">${r.phone || ''}</td>
                                  <td class="label">メールアドレス</td>
                                  <td colspan="3">${r.email || ''}</td>
                                </tr>
                              </table>
                              <table>
                                <tr>
                                  <td class="label">最寄り駅</td>
                                  <td>${r.nearestStation || ''}</td>
                                  <td class="label">駅までの移動手段</td>
                                  <td>${r.transportToStation || ''}</td>
                                  <td class="label">紹介者名</td>
                                  <td>${r.referredBy || ''}</td>
                                </tr>
                                <tr>
                                  <td class="label">資格</td>
                                  <td colspan="5">${r.qualifications || ''}</td>
                                </tr>
                                <tr>
                                  <td class="label">勤務可能開始日</td>
                                  <td>${r.availableFrom || ''}</td>
                                  <td class="label">勤務可能期間</td>
                                  <td>${r.availablePeriod || ''}</td>
                                  <td class="label">勤務可能シフト</td>
                                  <td>${r.availableShift || ''}</td>
                                </tr>
                                <tr>
                                  <td class="label">最終学歴</td>
                                  <td>${(r as any).educationDate || ''}</td>
                                  <td class="label">学校名</td>
                                  <td colspan="3">${(r as any).educationName || r.education || ''}</td>
                                </tr>
                              </table>
                              ${workHtml}
                              <table>
                                <tr><td class="section" colspan="2">自己PR</td></tr>
                                <tr><td colspan="2" style="min-height:100px;vertical-align:top;padding:8px"><pre>${r.selfPr || ''}</pre></td></tr>
                              </table>
                              <table>
                                <tr>
                                  <td class="label" rowspan="2" style="width:80px;vertical-align:middle;text-align:center">緊急連絡先</td>
                                  <td class="label" style="width:60px">フリガナ</td>
                                  <td>${(r as any).emergencyFurigana || ''}</td>
                                  <td class="label" style="width:40px">続柄</td>
                                  <td>${(r as any).emergencyRelation || r.emergencyContact || ''}</td>
                                </tr>
                                <tr>
                                  <td class="label">氏名</td>
                                  <td>${(r as any).emergencyName || ''}</td>
                                  <td class="label">TEL</td>
                                  <td>${(r as any).emergencyTel || ''}</td>
                                </tr>
                              </table>
                              <table style="table-layout:fixed">
                                <tr>
                                  <td class="label" rowspan="2" style="width:80px;vertical-align:middle;text-align:center">振込先口座</td>
                                  <td class="label" style="width:80px;text-align:center">銀行名</td>
                                  <td class="label" style="width:80px;text-align:center">支店</td>
                                  <td class="label" style="width:60px;text-align:center">口座種類</td>
                                  <td class="label" style="width:80px;text-align:center">口座番号</td>
                                  <td class="label" style="text-align:center">口座名義</td>
                                </tr>
                                <tr>
                                  <td style="word-break:break-all">${(r as any).bankName || ''}</td>
                                  <td style="word-break:break-all">${(r as any).bankBranch || ''}</td>
                                  <td style="text-align:center">${(r as any).bankType || ''}</td>
                                  <td style="word-break:break-all">${(r as any).bankNumber || ''}</td>
                                  <td style="word-break:break-all">${(r as any).bankHolder || ''}</td>
                                </tr>
                              </table>
                              <script>window.onload=function(){window.print()}<\/script>
                              </body></html>`);
                              win.document.close();
                            }}
                            className="px-4 py-2 bg-brand-blue text-white text-sm font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-md whitespace-nowrap"
                          >
                            PDF出力
                          </button>
                        </div>

                        {/* Photo + basic info */}
                        <div className="flex gap-6 items-start">
                          {(selectedEntry as RecruitEntry).photoUrl && (
                            <img
                              src={(selectedEntry as RecruitEntry).photoUrl}
                              alt="履歴書写真"
                              className="w-24 h-32 object-cover rounded-xl border border-gray-200 shrink-0"
                            />
                          )}
                          <div className="grid grid-cols-2 gap-4 flex-1">
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-gray-400">氏名（かな）</p>
                              <p className="text-brand-navy font-bold">{(selectedEntry as RecruitEntry).nameKana || '未記入'}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-gray-400">性別</p>
                              <p className="text-brand-navy font-bold">{(selectedEntry as RecruitEntry).gender || '未記入'}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-gray-400">生年月日</p>
                              <p className="text-brand-navy font-bold">{(selectedEntry as RecruitEntry).birthDate || '未記入'}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-gray-400">年齢</p>
                              <p className="text-brand-navy font-bold">{(selectedEntry as RecruitEntry).age || '未記入'}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">住所</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).address || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">自家用車</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).hasCar || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">LINE ID</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).lineId || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">紹介者名</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).referredBy || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">最寄り駅</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).nearestStation || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">駅までの移動手段</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).transportToStation || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">資格</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).qualifications || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">勤務可能開始日</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).availableFrom || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">勤務可能期間</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).availablePeriod || '未記入'}</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-gray-400">勤務可能シフト</p>
                            <p className="text-brand-navy">{(selectedEntry as RecruitEntry).availableShift || '未記入'}</p>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-bold text-gray-400">最終学歴</p>
                          <p className="text-brand-navy">{(selectedEntry as RecruitEntry).education || '未記入'}</p>
                        </div>

                        {([1,2,3] as const).map(n => {
                          const ra = selectedEntry as any;
                          const company = ra[`work${n}Company`] || '';
                          const jobType = ra[`work${n}JobType`] || '';
                          const content = ra[`work${n}Content`] || '';
                          const period  = ra[`work${n}Period`]  || '';
                          const details = ra[`work${n}Details`] || ra[`workHistory${n}`] || '';
                          if (!company && !jobType && !content && !period && !details) return null;
                          return (
                            <div key={n} className="space-y-2">
                              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">職務経歴{n}{n === 1 ? '（現在）' : ''}</p>
                              <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-1">
                                <div className="flex gap-4 text-brand-navy font-bold">
                                  {company && <span>社名: {company}</span>}
                                  {jobType && <span>職種: {jobType}</span>}
                                  {content && <span>業務内容: {content}</span>}
                                </div>
                                {period && <p className="text-gray-500 text-xs">期間: {period}</p>}
                                {details && <p className="text-brand-navy whitespace-pre-wrap leading-relaxed">{details}</p>}
                              </div>
                            </div>
                          );
                        })}

                        <div className="space-y-2">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">自己PR</p>
                          <div className="bg-gray-50 p-4 rounded-xl text-brand-navy whitespace-pre-wrap leading-relaxed text-sm">
                            {(selectedEntry as RecruitEntry).selfPr || '未記入'}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">緊急連絡先</p>
                          <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-1">
                            {(() => {
                              const ra = selectedEntry as any;
                              return ra.emergencyName ? (
                                <>
                                  <div className="flex gap-4 text-brand-navy font-bold">
                                    <span>{ra.emergencyName}</span>
                                    {ra.emergencyFurigana && <span className="text-gray-500 font-normal">（{ra.emergencyFurigana}）</span>}
                                    {ra.emergencyRelation && <span className="text-brand-blue">続柄: {ra.emergencyRelation}</span>}
                                  </div>
                                  {ra.emergencyTel && <p className="text-gray-600">TEL: {ra.emergencyTel}</p>}
                                </>
                              ) : <span className="text-gray-400">未記入</span>;
                            })()}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">振込先口座</p>
                          <div className="bg-gray-50 p-4 rounded-xl text-sm space-y-1">
                            {(() => {
                              const ra = selectedEntry as any;
                              return ra.bankName ? (
                                <div className="flex flex-wrap gap-4 text-brand-navy">
                                  <span>{ra.bankName}</span>
                                  {ra.bankBranch && <span>{ra.bankBranch}</span>}
                                  {ra.bankType && <span>{ra.bankType}</span>}
                                  {ra.bankNumber && <span>口座番号: {ra.bankNumber}</span>}
                                  {ra.bankHolder && <span className="font-bold">名義: {ra.bankHolder}</span>}
                                </div>
                              ) : <span className="text-gray-400">未記入</span>;
                            })()}
                          </div>
                        </div>
                      </>
                    ) : activeTab === 'jobs' ? (
                      <>
                        <div className="flex space-x-4">
                          <button 
                            onClick={() => { setEditingJob(selectedEntry as Job); setIsJobModalOpen(true); }}
                            className="flex-1 py-3 bg-brand-blue text-white font-bold rounded-xl flex items-center justify-center hover:bg-opacity-90 transition-all"
                          >
                            <Edit2 size={18} className="mr-2" /> 編集する
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(selectedEntry.id)}
                            className="flex-1 py-3 bg-red-50 text-red-600 font-bold rounded-xl flex items-center justify-center hover:bg-red-100 transition-all"
                          >
                            <Trash2 size={18} className="mr-2" /> 削除する
                          </button>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">業務内容</p>
                            <div className="bg-gray-50 p-6 rounded-2xl text-brand-navy whitespace-pre-wrap leading-relaxed">
                              {(selectedEntry as Job).description}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">応募要件</p>
                            <div className="bg-gray-50 p-6 rounded-2xl text-brand-navy whitespace-pre-wrap leading-relaxed">
                              {(selectedEntry as Job).requirements}
                            </div>
                          </div>
                        </div>

                        {/* Applicants for this job */}
                        <div className="border-t border-gray-100 pt-8">
                          <h4 className="text-lg font-bold text-brand-navy mb-4 flex items-center">
                            <Users size={20} className="mr-2 text-brand-blue" />
                            この案件への応募者 ({recruits.filter(r => r.jobId === selectedEntry.id).length})
                          </h4>
                          <div className="space-y-3">
                            {recruits.filter(r => r.jobId === selectedEntry.id).map(applicant => (
                              <div key={applicant.id} className="p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                                <div>
                                  <p className="font-bold text-brand-navy">{applicant.name}</p>
                                  <p className="text-xs text-gray-500">{applicant.email}</p>
                                </div>
                                <button 
                                  onClick={() => { setActiveTab('recruits'); setSelectedEntry(applicant); }}
                                  className="text-brand-blue text-xs font-bold hover:underline"
                                >
                                  詳細を見る
                                </button>
                              </div>
                            ))}
                            {recruits.filter(r => r.jobId === selectedEntry.id).length === 0 && (
                              <p className="text-sm text-gray-400 text-center py-4 italic">まだ応募者はありません</p>
                            )}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">お問い合わせ内容</p>
                        <div className="bg-gray-50 p-6 rounded-2xl text-brand-navy whitespace-pre-wrap leading-relaxed">
                          {(selectedEntry as ContactEntry).content}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <div className="w-24 h-24 bg-white rounded-full shadow-sm flex items-center justify-center">
                  <Search size={40} className="text-gray-200" />
                </div>
                <p className="font-bold">項目を選択して詳細を表示</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  </main>
      
      {/* Mobile Floating Action Button */}
      {activeTab === 'jobs' && (
        <button
          onClick={() => { setEditingJob(null); setIsJobModalOpen(true); }}
          className="md:hidden fixed bottom-8 right-8 w-14 h-14 bg-brand-blue text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 active:scale-95 transition-all"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Admin Edit Modal */}
      <AnimatePresence>
        {editingAdmin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 className="text-xl font-bold text-brand-navy">管理者を編集</h3>
                <button onClick={() => setEditingAdmin(null)} className="p-2 hover:bg-gray-200 rounded-full transition-all"><X size={20} /></button>
              </div>
              <form onSubmit={handleUpdateAdmin} className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">メールアドレス（変更不可）</label>
                  <p className="px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-500">{editingAdmin.email}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">氏名</label>
                  <input name="name" defaultValue={editingAdmin.name || ''} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">役割</label>
                  <select name="role" defaultValue={(editingAdmin as any).role || 'staff'} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue">
                    <option value="admin">管理者</option>
                    <option value="staff">スタッフ</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setEditingAdmin(null)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all">キャンセル</button>
                  <button type="submit" className="flex-1 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-md">保存する</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recruit Edit Modal */}
      <AnimatePresence>
        {isRecruitEditOpen && editingRecruit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 className="text-xl font-bold text-brand-navy">エントリー編集 — {editingRecruit.nameKanji || editingRecruit.name}</h3>
                <button onClick={() => setIsRecruitEditOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-all"><X size={20} /></button>
              </div>
              <form onSubmit={handleUpdateRecruit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                {/* 基本情報 */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">基本情報</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { name: 'nameKanji', label: '氏名（漢字）' },
                      { name: 'nameKana', label: 'フリガナ' },
                      { name: 'gender', label: '性別' },
                      { name: 'birthDate', label: '生年月日' },
                      { name: 'phone', label: '電話番号' },
                      { name: 'email', label: 'メールアドレス' },
                      { name: 'address', label: '住所' },
                      { name: 'hasCar', label: '自家用車' },
                      { name: 'nearestStation', label: '最寄り駅' },
                      { name: 'transportToStation', label: '駅までの移動手段' },
                      { name: 'referredBy', label: '紹介者名' },
                      { name: 'qualifications', label: '資格' },
                    ].map(f => (
                      <div key={f.name} className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">{f.label}</label>
                        <input name={f.name} defaultValue={(editingRecruit as any)[f.name] || ''} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* 勤務希望 */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">勤務希望</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      { name: 'availableFrom', label: '勤務可能開始日' },
                      { name: 'availablePeriod', label: '勤務可能期間' },
                      { name: 'availableShift', label: '勤務可能シフト' },
                    ].map(f => (
                      <div key={f.name} className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">{f.label}</label>
                        <input name={f.name} defaultValue={(editingRecruit as any)[f.name] || ''} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* 学歴・職歴 */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">学歴・職歴</p>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500">学校名（卒業年月）</label>
                      <input name="educationDate" defaultValue={(editingRecruit as any).educationDate || ''} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500">学校名</label>
                      <input name="educationName" defaultValue={(editingRecruit as any).educationName || ''} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue" />
                    </div>
                  </div>
                  {([1,2,3] as const).map(n => (
                    <div key={n} className="border border-gray-100 rounded-xl p-3 mb-2 space-y-2">
                      <p className="text-xs font-bold text-brand-navy">職務経歴{n}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Company','JobType','Content','Period'] as const).map(f => (
                          <div key={f} className="space-y-1">
                            <label className="text-xs text-gray-400">{{Company:'社名',JobType:'職種',Content:'業務内容',Period:'期間'}[f]}</label>
                            <input name={`work${n}${f}`} defaultValue={(editingRecruit as any)[`work${n}${f}`] || ''} className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-blue" />
                          </div>
                        ))}
                      </div>
                      <textarea name={`work${n}Details`} defaultValue={(editingRecruit as any)[`work${n}Details`] || ''} rows={2} className="w-full px-2 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-brand-blue resize-none" placeholder="具体的な業務・成果" />
                    </div>
                  ))}
                </div>
                {/* 自己PR */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">自己PR</label>
                  <textarea name="selfPr" defaultValue={editingRecruit.selfPr || ''} rows={4} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue resize-none" />
                </div>
                {/* 緊急連絡先 */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">緊急連絡先</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { name: 'emergencyFurigana', label: 'フリガナ' },
                      { name: 'emergencyName', label: '氏名' },
                      { name: 'emergencyRelation', label: '続柄' },
                      { name: 'emergencyTel', label: '電話番号' },
                    ].map(f => (
                      <div key={f.name} className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">{f.label}</label>
                        <input name={f.name} defaultValue={(editingRecruit as any)[f.name] || ''} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* 振込先 */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">振込先口座</p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { name: 'bankName', label: '銀行名' },
                      { name: 'bankBranch', label: '支店名' },
                      { name: 'bankType', label: '口座種類' },
                      { name: 'bankNumber', label: '口座番号' },
                      { name: 'bankHolder', label: '口座名義' },
                    ].map(f => (
                      <div key={f.name} className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">{f.label}</label>
                        <input name={f.name} defaultValue={(editingRecruit as any)[f.name] || ''} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* ステータス */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500">ステータス</label>
                  <select name="status" defaultValue={editingRecruit.status || 'pending'} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-blue">
                    <option value="pending">審査中</option>
                    <option value="interviewing">面接中</option>
                    <option value="hired">採用</option>
                    <option value="rejected">不採用</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setIsRecruitEditOpen(false)} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-all">キャンセル</button>
                  <button type="submit" className="flex-1 py-3 bg-brand-blue text-white font-bold rounded-xl hover:bg-opacity-90 transition-all shadow-md">保存する</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Job Modal */}
      <AnimatePresence>
        {isJobModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-navy/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                <h3 className="text-xl font-bold text-brand-navy">
                  {editingJob ? '案件を編集' : '新規案件登録'}
                </h3>
                <button onClick={() => setIsJobModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-full transition-all">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleJobSubmit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy">案件名</label>
                    <input name="title" type="text" required defaultValue={editingJob?.title} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy">勤務地</label>
                    <input name="location" type="text" required defaultValue={editingJob?.location} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy">雇用形態</label>
                    <select name="employmentType" defaultValue={editingJob?.employmentType || '正社員'} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue">
                      <option value="正社員">正社員</option>
                      <option value="契約社員">契約社員</option>
                      <option value="アルバイト">アルバイト</option>
                      <option value="業務委託">業務委託</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-brand-navy">給与目安</label>
                    <input name="salary" type="text" required defaultValue={editingJob?.salary} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy">ステータス</label>
                  <select name="status" defaultValue={editingJob?.status || 'active'} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue">
                    <option value="active">募集中</option>
                    <option value="closed">募集終了</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy">業務内容</label>
                  <textarea name="description" rows={4} required defaultValue={editingJob?.description} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue resize-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-brand-navy">応募要件</label>
                  <textarea name="requirements" rows={4} required defaultValue={editingJob?.requirements} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue resize-none" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-brand-navy text-white font-bold rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center shadow-lg disabled:opacity-50"
                >
                  {isSubmitting ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle2 className="mr-2" size={20} />}
                  {editingJob ? '更新する' : '登録する'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
