export interface NewsItem {
  id: string;
  date: string;
  title: string;
  category: string;
}

export interface GroupCompany {
  name: string;
  description: string;
  url: string;
}

export const NEWS_DATA: NewsItem[] = [
  { id: '1', date: '2026.03.20', title: 'コーポレートサイトをリニューアルしました。', category: 'お知らせ' },
  { id: '2', date: '2026.03.15', title: 'AIアカデミー設立に向けたロードマップを公開しました。', category: 'プレスリリース' },
  { id: '3', date: '2026.03.01', title: '就労移行支援事業との連携を強化します。', category: '事業情報' },
];

export const GROUP_COMPANIES: GroupCompany[] = [
  {
    name: 'Presing Social Service',
    description: '就労移行支援を通じて、多様な才能の社会進出を支援します。',
    url: 'https://example.com/social-service',
  },
];
