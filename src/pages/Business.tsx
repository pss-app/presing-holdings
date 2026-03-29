import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Globe, Shield, Zap, Code, Database } from 'lucide-react';

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
              プレジング・ホールディングスは、最先端のテクノロジーと社会貢献を融合させ、持続可能な未来を創造します。
            </p>
          </motion.div>
        </div>
      </section>

      {/* SIer / AI Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-brand-blue rounded-full text-sm font-bold mb-6">
                <Zap size={16} className="mr-2" />
                AI・SIer事業（計画中）
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-8">
                2年以内のAIアカデミー設立と<br />自社開発ラボの完成を目指して。
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                私たちは、Web制作や出退勤システムなどの身近な開発からスタートし、着実に実績を積み上げています。2年以内には、独自のAIアカデミーを設立し、高度な技術を持つエンジニアを育成。自社開発ラボを通じて、より高度なソリューションを提供できる体制を整えます。
              </p>
              <ul className="space-y-4">
                {[
                  "Webアプリケーション・サイト制作",
                  "業務効率化システムの開発",
                  "AIアルゴリズムの実装・検証（研究段階）",
                  "クラウドインフラの構築・運用"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-brand-navy font-medium">
                    <div className="w-2 h-2 bg-brand-blue rounded-full mr-3" />
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
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000"
                  alt="Technology"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <Cpu className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Roadmap</p>
                    <p className="text-lg font-bold text-brand-navy">AI Academy 2027</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Service Section */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-brand-navy mb-4">グループ連携による社会貢献</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              就労移行支援事業「Presing Social Service」との強力な連携により、技術提供と社会貢献を高い次元で両立させます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="text-brand-blue" />,
                title: "多様な才能の活用",
                desc: "障がいや困難を抱える方々の潜在能力を引き出し、ITエンジニアとしての道を切り拓きます。"
              },
              {
                icon: <Shield className="text-brand-blue" />,
                title: "信頼の品質",
                desc: "徹底した教育と管理体制により、社会貢献と高品質な成果物の提供を同時に実現します。"
              },
              {
                icon: <Database className="text-brand-blue" />,
                title: "持続可能な雇用",
                desc: "一時的な支援ではなく、自社ラボでの雇用やパートナー企業への紹介を通じて、長期的なキャリアを支援します。"
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-4">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
