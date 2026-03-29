import React from 'react';
import { motion } from 'motion/react';
import { Building2, MapPin, Calendar, CreditCard, User } from 'lucide-react';

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
            <p className="text-xl text-gray-400">プレジング・ホールディングス株式会社について</p>
          </motion.div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden relative"
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1000"
                alt="Representative"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-brand-navy/80 to-transparent">
                <p className="text-white font-bold text-xl">代表取締役社長 〇〇 〇〇</p>
                <p className="text-gray-300 text-sm">President & CEO</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-brand-navy mb-8">テクノロジーで、<br />誰もが輝ける未来を。</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  現代社会において、テクノロジーは欠かせない存在となりました。しかし、その恩恵を十分に享受できている人はまだ一部に過ぎません。
                </p>
                <p>
                  私たちは、就労移行支援という福祉の現場からスタートしました。そこで出会った多くの素晴らしい才能が、適切な教育と機会さえあれば、ITの世界で大きく羽ばたけることを確信しました。
                </p>
                <p>
                  プレジング・ホールディングスは、教育・雇用・開発が一体となったエコシステムを通じて、多様な個性が技術を武器に社会に貢献できる場を創り出します。
                </p>
                <p>
                  「人と技術をつなぐ」。このミッションを胸に、私たちは誠実に、そしてイノベーティブに挑戦し続けます。
                </p>
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
                { label: "会社名", value: "プレジング・ホールディングス株式会社", icon: <Building2 size={20} /> },
                { label: "代表者", value: "代表取締役 〇〇 〇〇", icon: <User size={20} /> },
                { label: "設立", value: "202X年 〇月 〇日", icon: <Calendar size={20} /> },
                { label: "資本金", value: "〇,〇〇〇万円", icon: <CreditCard size={20} /> },
                { label: "所在地", value: "〒000-0000 東京都〇〇区〇〇 0-0-0", icon: <MapPin size={20} /> },
                { label: "事業内容", value: "ITソリューション事業、教育事業、グループ経営管理", icon: <Building2 size={20} /> }
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

      {/* Group Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">グループ企業</h2>
            <p className="text-gray-600">プレジンググループの各事業体をご紹介します。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-white rounded-2xl border border-gray-200 hover:border-brand-blue transition-colors group">
              <h3 className="text-2xl font-bold text-brand-navy mb-4">Presing Social Service</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                就労移行支援事業所を運営。一人ひとりの特性に合わせたカリキュラムで、ITスキル習得と社会進出を強力にバックアップします。
              </p>
              <a href="#" className="inline-flex items-center text-brand-blue font-bold group-hover:translate-x-2 transition-transform">
                Webサイトを見る
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            {/* Placeholder for future group companies */}
            <div className="p-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center">
              <p className="text-gray-400 font-medium italic">New Business Coming Soon</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
