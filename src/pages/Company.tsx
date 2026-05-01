import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Building2, MapPin, Calendar, Users, User, Briefcase } from 'lucide-react';

export const Company = () => {
  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="bg-brand-navy py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Company</h1>
            <p className="text-xl text-gray-400">株式会社Presingホールディングスについて</p>
          </motion.div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-navy mb-10">人と技術をつなぐ。<br />多様な才能が、未来を創る。</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  経営資源の一端であるヒト。私たちはお客様にとって必要なヒトの提供をお手伝いしております。
                </p>
                <p>
                  プレジング（Presing）という社名は、President と King を掛け合わせた造語です。一人ひとりが主役として輝ける社会を目指し、2021年の創業以来、人材事業を中心に事業を拡大してまいりました。
                </p>
                <p>
                  私たちがご紹介する人材は、しっかりと関係性を築いてきた人材です。各人材が育んだ経験と活気を備えた有効な人材をお届けし、お客様の企業の成長をサポートします。
                </p>
                <p>
                  就労移行支援事業では、ITスキルの教育を通じて社会復帰を支援し、Presingグループの人材ネットワークでIT企業への就職を実現。教育と雇用が循環する独自のエコシステムを構築しています。
                </p>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-brand-navy font-bold text-lg">加納 聖司</p>
                <p className="text-gray-500 text-sm">代表取締役社長 / CEO</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-brand-navy mb-12 text-center">会社概要</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {[
                { label: "会社名", value: "株式会社Presingホールディングス", icon: <Building2 size={20} /> },
                { label: "代表者", value: "代表取締役社長 / CEO 加納 聖司", icon: <User size={20} /> },
                { label: "設立", value: "2021年3月", icon: <Calendar size={20} /> },
                { label: "従業員数", value: "200名（業務委託含む）", icon: <Users size={20} /> },
                { label: "所在地", value: "東京都渋谷区神南1丁目10-5 ラヴィスタ渋谷5F", icon: <MapPin size={20} /> },
                { label: "事業内容", value: "人材事業、BPO事業、物販事業、旅行事業、飲食事業、不動産事業", icon: <Briefcase size={20} /> },
                { label: "子会社 / 拠点", value: "株式会社Presing Social Service（広島）、株式会社PresingIC（東京）", icon: <Building2 size={20} /> },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col md:flex-row p-6 md:p-8">
                  <div className="w-full md:w-1/3 flex items-center text-gray-400 mb-2 md:mb-0">
                    <span className="mr-3">{item.icon}</span>
                    <span className="font-bold text-brand-navy">{item.label}</span>
                  </div>
                  <div className="w-full md:w-2/3 text-gray-600">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Numbers Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">Numbers</h2>
            <p className="text-gray-600">Presingグループの実績（2026年1月時点）</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { num: "7,954", unit: "名", label: "登録スタッフ数" },
              { num: "32", unit: "都道府県", label: "事業展開エリア" },
              { num: "31.7", unit: "歳", label: "平均年齢" },
              { num: "200", unit: "名", label: "従業員数" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100"
              >
                <div className="text-4xl font-black text-brand-blue mb-1">
                  {stat.num}
                  <span className="text-lg font-bold text-gray-400 ml-1">{stat.unit}</span>
                </div>
                <p className="text-sm font-medium text-brand-navy">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">男女比：男性45% / 女性55%　｜　1都1道2府28県にて事業展開</p>
          </div>
        </div>
      </section>

      {/* Staff Industries Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">スタッフ出身業界</h2>
            <p className="text-gray-600">多様な業界経験を持つスタッフが在籍しています。</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "製造業", "教育・学習支援業", "金融業・保険業", "情報通信業",
              "宿泊業", "飲食サービス業", "不動産業・物品賃貸業", "運輸業・郵便業",
              "卸売業・小売業", "医療・福祉", "電気・ガス・熱供給・水道業",
              "生活関連サービス業・娯楽業",
            ].map((industry, idx) => (
              <span
                key={idx}
                className="px-5 py-2.5 bg-white text-brand-navy text-sm font-medium rounded-full border border-gray-200 hover:border-brand-blue hover:text-brand-blue transition-colors"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Group Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">グループ企業</h2>
            <p className="text-gray-600">Presingグループの各事業体をご紹介します。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-white rounded-2xl border border-gray-200 hover:border-brand-blue transition-colors group">
              <h3 className="text-2xl font-bold text-brand-navy mb-2">Presing Social Service</h3>
              <p className="text-sm text-gray-400 mb-4">広島拠点</p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                就労移行支援事業所を運営。IT特化型のカリキュラムで、自立訓練・就労移行支援・就労定着支援を提供。ITスクールで基礎スキルを習得し、Presingグループの人材ネットワークを通じてIT企業への就職を支援しています。
              </p>
              <a href="https://presingsocialservice.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-brand-blue font-bold group-hover:translate-x-2 transition-transform">
                Webサイトを見る
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            <div className="p-10 bg-white rounded-2xl border border-gray-200 hover:border-brand-blue transition-colors group">
              <h3 className="text-2xl font-bold text-brand-navy mb-2">PresingIC</h3>
              <p className="text-sm text-gray-400 mb-4">東京拠点</p>
              <p className="text-gray-500 mb-8 leading-relaxed">
                東京・六本木にてシーシャカフェ＆バーを運営。メインフロア・カウンター・VIPルーム・VVIPルームなど多様な席タイプを備え、様々なシーンに対応。イベントの場所貸しとしても展開中です。
              </p>
              <div className="text-sm text-gray-400 mb-6">
                <p>六本木3丁目15-24 ウィン六本木3F, 4F</p>
                <p>11:00-19:00 カフェ ｜ 19:00-LAST バー</p>
              </div>
              <Link to="/presingic" className="inline-flex items-center text-brand-blue font-bold group-hover:translate-x-2 transition-transform">
                店舗ページを見る
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
