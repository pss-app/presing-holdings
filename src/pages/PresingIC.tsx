import { motion } from 'motion/react';
import { MapPin, Clock, Wine, Music, Sparkles, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryImages = [
  "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=800",
];

export const PresingIC = () => {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=1600"
            alt="Bar interior"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <p className="text-amber-400 text-sm font-bold tracking-widest uppercase">Presing IC</p>
                <p className="text-white/60 text-xs">A Presing Holdings Company</p>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Shisha Café<br />
              <span className="text-amber-400">&amp; Bar</span>
            </h1>
            <p className="text-xl text-white/80 mb-4">
              六本木の隠れ家で、上質なひとときを。
            </p>
            <p className="text-white/60 mb-10 leading-relaxed">
              厳選されたシーシャと洗練されたカクテルを楽しめる、
              大人のためのリラックス空間。イベント貸切にも対応しています。
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-white/80 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin size={16} className="mr-2 text-amber-400" />
                六本木駅 徒歩5分
              </div>
              <div className="flex items-center text-white/80 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock size={16} className="mr-2 text-amber-400" />
                18:00 - 翌5:00
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concept */}
      <section className="py-24 bg-neutral-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">Concept</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                日常を忘れる、<br />特別な空間
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                六本木の喧騒から一歩入った先に広がる、落ち着いたアンビエントの世界。
                上質なシーシャの煙とともに、ゆったりとした時間が流れます。
              </p>
              <p className="text-neutral-400 leading-relaxed">
                一人でくつろぐカウンター席から、グループで楽しめるソファ席、
                プライベート感のあるVIPエリアまで、多彩な席タイプをご用意。
                パーティーやイベントの貸切にも対応しています。
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&q=80&w=800"
                  alt="Bar atmosphere"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-400 text-black p-6 rounded-2xl shadow-2xl hidden md:block">
                <p className="text-3xl font-black">EST.</p>
                <p className="text-sm font-bold">Roppongi, Tokyo</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">Features</p>
            <h2 className="text-3xl font-bold text-white">当店の特徴</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="text-amber-400" size={28} />,
                title: "プレミアムシーシャ",
                desc: "厳選されたフレーバーを豊富に取り揃え。お好みに合わせたブレンドもご提案します。",
              },
              {
                icon: <Wine className="text-amber-400" size={28} />,
                title: "クラフトカクテル",
                desc: "バーテンダーが一杯一杯丁寧に仕上げるオリジナルカクテル。ノンアルコールメニューも充実。",
              },
              {
                icon: <Music className="text-amber-400" size={28} />,
                title: "アンビエント空間",
                desc: "音響・照明にこだわった落ち着きのある空間。会話を邪魔しない心地よいBGM。",
              },
              {
                icon: <Users className="text-amber-400" size={28} />,
                title: "イベント貸切",
                desc: "パーティー・企業イベント・撮影利用など、多目的にご利用いただけます。",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-amber-400/30 transition-all"
              >
                <div className="w-14 h-14 bg-amber-400/10 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seat Types */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">Seats</p>
            <h2 className="text-3xl font-bold text-white">席タイプ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "カウンター席",
                desc: "お一人様でもお気軽に。バーテンダーとの会話を楽しみながら、ゆったりとした時間を。",
                img: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=600",
                capacity: "1〜2名",
              },
              {
                title: "ソファ席",
                desc: "友人や仲間とリラックスして過ごせる空間。シーシャを囲みながら語らいのひとときを。",
                img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600",
                capacity: "2〜6名",
              },
              {
                title: "VIP / 貸切",
                desc: "プライベートなパーティーや特別な夜に。完全個室・フロア貸切プランもご用意。",
                img: "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&q=80&w=600",
                capacity: "〜30名",
              },
            ].map((seat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-6 relative">
                  <img
                    src={seat.img}
                    alt={seat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-amber-400 text-xs font-bold px-3 py-1 rounded-full">
                    {seat.capacity}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{seat.title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{seat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">Gallery</p>
            <h2 className="text-3xl font-bold text-white">店内の雰囲気</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`rounded-2xl overflow-hidden ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  style={{ minHeight: idx === 0 ? '400px' : '200px' }}
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Access */}
      <section className="py-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">Access</p>
              <h2 className="text-3xl font-bold text-white mb-10">店舗情報</h2>

              <div className="space-y-6">
                {[
                  { label: "店舗名", value: "PresingIC シーシャカフェ＆バー" },
                  { label: "所在地", value: "東京都港区六本木" },
                  { label: "アクセス", value: "東京メトロ日比谷線・都営大江戸線「六本木駅」徒歩5分" },
                  { label: "営業時間", value: "18:00 〜 翌5:00（不定休）" },
                  { label: "運営会社", value: "株式会社PresingIC（Presingホールディングス グループ）" },
                ].map((item, idx) => (
                  <div key={idx} className="flex border-b border-white/10 pb-4">
                    <span className="text-amber-400 font-bold text-sm w-28 shrink-0">{item.label}</span>
                    <span className="text-neutral-300 text-sm">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3 bg-amber-400 text-black font-bold rounded-lg hover:bg-amber-300 transition-all"
                >
                  お問い合わせ
                </Link>
                <Link
                  to="/company"
                  className="px-8 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition-all flex items-center"
                >
                  会社概要 <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-80 lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.747979554883!2d139.72910!3d35.66062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b9a8a4e7d07%3A0x6d0c2f9b9f6c8e0a!2z5YWt5pys5pyo!5e0!3m2!1sja!2sjp!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Map"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
