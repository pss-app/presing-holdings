import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Cpu, Users, Code, ExternalLink, Zap } from 'lucide-react';
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
              就労移行支援からAIアカデミー、そして開発ラボへ。<br />
              私たちは、教育と雇用、そして最先端の開発が循環する独自のエコシステムで、社会の課題を解決します。
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

      {/* Vision Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-brand-navy mb-6">Our Ecosystem</h2>
            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              私たちは、単なるIT企業ではありません。社会貢献と技術革新を両立させる、独自の循環型ビジネスモデルを展開しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection Lines (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-brand-blue/20 to-transparent -translate-y-1/2 z-0" />
            
            {[
              {
                icon: <Users className="text-brand-blue" size={32} />,
                title: "就労移行支援",
                desc: "多様な才能の発掘と、社会復帰・進出の第一歩をサポートします。",
                label: "Presing Social Service",
                step: "01"
              },
              {
                icon: <Cpu className="text-brand-blue" size={32} />,
                title: "AIアカデミー",
                desc: "次世代のAIエンジニアを育成。実践的なカリキュラムで即戦力を養います。",
                label: "Education",
                step: "02"
              },
              {
                icon: <Code className="text-brand-blue" size={32} />,
                title: "開発ラボ (SIer)",
                desc: "アカデミー卒業生が活躍する開発拠点。高品質なシステムを提供します。",
                label: "Development",
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
        </div>
      </section>

      {/* Group Companies Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">Group Companies</h2>
              <p className="text-gray-600">
                プレジンググループは、各分野の専門性を活かし、シナジーを生み出すことで社会に価値を提供します。
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
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-brand-navy rounded-lg flex items-center justify-center text-white font-bold">P</div>
                  <h3 className="text-xl font-bold text-brand-navy">Presing Social Service</h3>
                </div>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  就労移行支援を通じて、障がいや困難を抱える方々の社会進出を支援。ITスキル習得に特化したカリキュラムを提供し、次世代のエンジニア候補を育成しています。
                </p>
              </div>
              <a href="#" className="inline-flex items-center text-brand-blue font-bold group">
                サービスサイトへ <ExternalLink className="ml-2" size={16} />
              </a>
            </motion.div>

            <div className="bg-brand-navy/5 p-10 rounded-3xl border border-dashed border-brand-navy/10 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Zap className="text-gray-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-brand-navy/40 mb-2">New Business</h3>
              <p className="text-gray-400 text-sm">新たな価値創造に向けた事業を準備中です。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/10 skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            未来のシステムを、共に創りませんか。
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
