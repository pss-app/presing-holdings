import React from 'react';
import { motion } from 'motion/react';
import { Users, Globe, Shield, Zap, Briefcase, TrendingUp } from 'lucide-react';

export const Business = () => {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-brand-navy py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Business</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Presingグループは、人材事業を核に6つの事業を展開。
              お客様にとって必要なヒトの提供をお手伝いしています。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Business - 人材事業 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-brand-blue rounded-full text-sm font-bold mb-6">
                <Users size={16} className="mr-2" />
                コア事業
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-8">
                人材事業
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                経営資源の一端であるヒト。私たちがご紹介する人材は、しっかりと関係性を築いてきた人材です。各人材が育んだ経験と活気を備えた有効な人材をお届けし、お客様の企業の成長をサポートします。
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-brand-light p-5 rounded-xl text-center">
                  <div className="text-3xl font-black text-brand-blue">7,954</div>
                  <p className="text-sm text-gray-500 mt-1">登録スタッフ数</p>
                </div>
                <div className="bg-brand-light p-5 rounded-xl text-center">
                  <div className="text-3xl font-black text-brand-blue">32</div>
                  <p className="text-sm text-gray-500 mt-1">展開都道府県</p>
                </div>
              </div>
              <ul className="space-y-4">
                {[
                  "マッチング・就業管理を通じたキャリア形成の支援",
                  "採用・就業における「年齢の壁」の克服",
                  "異なる産業・職業へのキャリアチェンジの支援",
                  "グローバル人材の採用・就業支援",
                  "人材育成による人材サービス産業の高度化",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start text-brand-navy font-medium">
                    <div className="w-2 h-2 bg-brand-blue rounded-full mr-3 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-brand-blue to-brand-accent rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1000"
                  alt="人材事業"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Staff Industries</p>
                <p className="text-sm font-bold text-brand-navy mt-1">製造業・情報通信業・金融業 他12業種</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6 Business Areas */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">事業領域</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              人材事業を中心に、多角的な事業展開を行っています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="text-brand-blue" />,
                title: "人材事業",
                desc: "7,900名以上の登録スタッフ、全国32都道府県の代理店ネットワーク。マッチングから就業管理まで一貫サポート。",
                highlight: true,
              },
              {
                icon: <Briefcase className="text-brand-blue" />,
                title: "BPO事業",
                desc: "業務プロセスのアウトソーシングを通じて、お客様の経営効率化をサポートします。",
                highlight: false,
              },
              {
                icon: <TrendingUp className="text-brand-blue" />,
                title: "物販事業",
                desc: "商品企画から販売まで、幅広い物販ビジネスを展開しています。",
                highlight: false,
              },
              {
                icon: <Globe className="text-brand-blue" />,
                title: "旅行事業",
                desc: "旅行の企画・手配サービスを提供。社内イベント（スキーツアー等）も企画しています。",
                highlight: false,
              },
              {
                icon: <Zap className="text-brand-blue" />,
                title: "飲食事業",
                desc: "PresingICが六本木でシーシャカフェ＆バーを運営。イベントスペースとしても展開中。",
                highlight: false,
              },
              {
                icon: <Shield className="text-brand-blue" />,
                title: "不動産事業",
                desc: "不動産関連のサービスを展開し、事業基盤の多角化を推進しています。",
                highlight: false,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-2xl border transition-shadow hover:shadow-lg ${
                  item.highlight
                    ? 'bg-brand-navy text-white border-brand-navy'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  item.highlight ? 'bg-white/10' : 'bg-blue-50'
                }`}>
                  {item.icon}
                </div>
                <h3 className={`text-xl font-bold mb-4 ${item.highlight ? 'text-white' : 'text-brand-navy'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${item.highlight ? 'text-gray-300' : 'text-gray-500'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Service - 就労移行支援 */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">就労移行支援事業</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Presing Social Service（広島）が運営するIT特化型の就労移行支援。
              ITスクールの受講者をIT業界へ導く、Presingグループ独自のエコシステムです。
            </p>
          </div>

          {/* 3 Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                step: "STEP 1",
                title: "ITスクールで基礎スキル習得",
                desc: "AI・プログラミング・Webデザインなど、IT業界で必要な基礎スキルを段階的に学習。パソコンが苦手な方でも安心して始められます。",
              },
              {
                step: "STEP 2",
                title: "Presingの人材サービスで就職支援",
                desc: "Presingグループが全国で展開する人材ネットワークを活用。一人ひとりに合ったIT企業への就職をサポートします。",
              },
              {
                step: "STEP 3",
                title: "IT業界でキャリアを伸ばす",
                desc: "就職後も就労定着支援で継続サポート。長期的なキャリア形成を支援します。",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
              >
                <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">{item.step}</span>
                <h3 className="text-xl font-bold text-brand-navy mt-3 mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-2xl text-brand-blue/30 -translate-y-1/2 z-10">→</div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Service Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "自立訓練", desc: "生活リズムの安定、コミュニケーション力の向上など、働くための土台づくり。" },
              { title: "就労移行支援", desc: "ITスキル習得から履歴書作成・面接対策まで、就職活動を総合サポート。" },
              { title: "就労定着支援", desc: "就職後も最大3年間、職場での悩みや課題解決を支援。" },
            ].map((svc, idx) => (
              <div key={idx} className="bg-brand-light p-6 rounded-xl text-center">
                <h4 className="font-bold text-brand-navy mb-2">{svc.title}</h4>
                <p className="text-sm text-gray-500">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
