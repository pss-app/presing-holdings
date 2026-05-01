import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Briefcase, Globe, ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NEWS_DATA } from '@/src/constants';

export const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
              人と技術をつなぐ。<br />
              <span className="text-brand-accent">多様な才能</span>が、<br />
              未来を創る。
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Presing = President + King。<br />
              一人ひとりが主役として輝ける社会を目指し、<br />
              人材事業を核に6つの事業を展開しています。
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/business"
                className="px-8 py-4 bg-brand-blue text-white font-bold rounded-lg hover:bg-blue-600 transition-all flex items-center group"
              >
                事業内容を見る
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 backdrop-blur-sm transition-all border border-white/20"
              >
                お問い合わせ
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Numbers Bar */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "7,954名", label: "登録スタッフ数" },
              { num: "32都道府県", label: "事業展開エリア" },
              { num: "200名", label: "従業員数" },
              { num: "2021年〜", label: "設立" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-black text-brand-navy">{stat.num}</div>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-navy mb-2">News</h2>
              <div className="h-1 w-12 bg-brand-blue" />
            </div>
          </div>
          <div className="space-y-4">
            {NEWS_DATA.map((news) => (
              <motion.div
                key={news.id}
                whileHover={{ x: 10 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-4 cursor-pointer"
              >
                <span className="text-gray-400 font-mono text-sm">{news.date}</span>
                <span className="px-3 py-1 bg-blue-50 text-brand-blue text-xs font-bold rounded-full w-fit">
                  {news.category}
                </span>
                <p className="text-brand-navy font-medium flex-grow">{news.title}</p>
                <ChevronRight className="text-gray-300 hidden md:block" size={20} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-brand-navy mb-6">Our Business</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              人材事業を核に、BPO・物販・旅行・飲食・不動産の6事業を展開。
              お客様にとって必要なヒトの提供をお手伝いしています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <Users className="text-brand-blue" size={32} />,
                title: "人材事業",
                desc: "7,900名以上の登録スタッフと全国32都道府県の代理店ネットワーク。マッチングから就業管理まで一貫してサポートします。",
                label: "Staffing",
                step: "01"
              },
              {
                icon: <Briefcase className="text-brand-blue" size={32} />,
                title: "BPO事業",
                desc: "業務プロセスの最適化を通じて、お客様の経営効率化に貢献します。",
                label: "Business Process",
                step: "02"
              },
              {
                icon: <Globe className="text-brand-blue" size={32} />,
                title: "就労移行支援",
                desc: "ITスクールで基礎スキルを習得し、Presingの人材ネットワークを通じてIT企業への就職を支援します。",
                label: "Social Service",
                step: "03"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-10 rounded-2xl shadow-xl border border-gray-50 relative z-10 text-center group hover:border-brand-blue/30 transition-all hover:-translate-y-2"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-navy text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest mb-2 block">
                  {item.label}
                </span>
                <h3 className="text-2xl font-bold text-brand-navy mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Other businesses */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "物販事業", desc: "商品企画から販売まで" },
              { title: "旅行事業", desc: "旅行の企画・手配" },
              { title: "飲食事業", desc: "六本木シーシャカフェ＆バー（PresingIC）" },
            ].map((biz, idx) => (
              <div key={idx} className="bg-brand-light p-6 rounded-xl text-center">
                <h4 className="font-bold text-brand-navy mb-1">{biz.title}</h4>
                <p className="text-sm text-gray-500">{biz.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Mission</h2>
            <p className="text-gray-600">人材事業を通じて社会に貢献する5つのミッション</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: "01", title: "マッチング・キャリア形成の支援", desc: "仕事と働く人を結びつけるマッチングと、良好な雇用関係を継続化させる就業管理を通じて、個人のキャリア形成を支援します。" },
              { num: "02", title: "「年齢の壁」の克服", desc: "少子化・高齢化を意識したサービスの提案・提供を行います。" },
              { num: "03", title: "異業種へのキャリアチェンジ支援", desc: "業界・職種の隔たりを超えたキャリアチェンジを可能にできる支援を強化します。" },
              { num: "04", title: "グローバル人材の採用・就業支援", desc: "国際化社会に対応すべく、外国人の採用支援も積極的に行います。" },
              { num: "05", title: "人材育成による高度化", desc: "人材サービス産業に携わるプロの育成、レベル向上を、教育を通じて行います。" },
            ].map((mission) => (
              <motion.div
                key={mission.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl font-black text-brand-blue/15 block mb-2">{mission.num}</span>
                <h3 className="text-lg font-bold text-brand-navy mb-3">{mission.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{mission.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Companies Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Group Companies</h2>
              <p className="text-gray-600">
                Presingグループは、各分野の専門性を活かし、シナジーを生み出すことで社会に価値を提供します。
              </p>
            </div>
            <Link to="/company" className="text-brand-blue font-bold flex items-center hover:underline">
              グループ一覧を見る <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-white font-bold">P</div>
                  <h3 className="text-xl font-bold text-brand-navy">Presing Social Service</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">広島拠点 ｜ 就労移行支援事業</p>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  IT特化型の就労移行支援事業所。自立訓練・就労移行支援・就労定着支援を通じて、ITスクールで基礎スキルを習得した受講者をIT業界への就職に導きます。
                </p>
              </div>
              <a href="https://presingsocialservice.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-brand-blue font-bold group">
                サービスサイトへ <ExternalLink className="ml-2" size={16} />
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-white font-bold">P</div>
                  <h3 className="text-xl font-bold text-brand-navy">PresingIC</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">東京拠点 ｜ 飲食事業</p>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  六本木にてシーシャカフェ＆バーを運営。多様な席タイプでさまざまなシーンに対応し、イベントスペースとしても展開しています。
                </p>
              </div>
              <Link to="/presingic" className="inline-flex items-center text-brand-blue font-bold group">
                店舗サイトへ <ExternalLink className="ml-2" size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/10 skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            あなたの経験と活気を、<br />次のステージへ。
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/contact"
              className="px-10 py-4 bg-white text-brand-navy font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              採用エントリー
            </Link>
            <Link
              to="/contact"
              className="px-10 py-4 border border-white/30 text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const ChevronRight = ({ className, size }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);
