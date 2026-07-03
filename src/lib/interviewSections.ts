// 面談ウィザードのページ定義
// 左 = recruits に入っている事前情報、右 = 面談中に記入するメモ（responses に section.key 単位で保存）

export type InterviewType = 'hiring' | 'followup';

export type LeftField = {
  field: string;   // RecruitEntry のキー
  label: string;
};

export type RightField = {
  key: string;                                  // responses[section.key][key] に保存
  label: string;
  type?: 'text' | 'textarea' | 'rating';        // 既定は textarea
  placeholder?: string;
};

export type InterviewSection = {
  key: string;
  title: string;
  hint?: string;            // ページ上部の補足
  left: LeftField[];
  right: RightField[];
  skipIfEmpty?: boolean;    // 左の事前情報が全て空ならページを自動スキップ
};

export const interviewTypeLabels: Record<InterviewType, string> = {
  hiring: '採用面談',
  followup: '稼働フォロー',
};

const workSection = (n: 1 | 2 | 3): InterviewSection => ({
  key: `work${n}`,
  title: n === 1 ? '職務経歴1（現在）' : `職務経歴${n}`,
  hint: '事前の記載を確認しながら、退職理由や業務の深掘りを聞き取る',
  skipIfEmpty: n !== 1,
  left: [
    { field: `work${n}Company`, label: '社名' },
    { field: `work${n}JobType`, label: '職種' },
    { field: `work${n}Content`, label: '業務内容' },
    { field: `work${n}Period`, label: '期間' },
    { field: `work${n}Details`, label: '具体的な業務・成果' },
    { field: `workHistory${n}`, label: '職務経歴（旧形式）' },
  ],
  right: [
    { key: 'reason', label: '退職／転職理由' },
    { key: 'detail', label: '業務の深掘り（実績・役割・規模）' },
    { key: 'note', label: '評価・気づき' },
  ],
});

export const interviewSections: Record<InterviewType, InterviewSection[]> = {
  hiring: [
    {
      key: 'basic',
      title: '基本情報',
      hint: '本人確認と第一印象、通勤・勤務条件の前提を押さえる',
      left: [
        { field: 'nameKanji', label: '氏名' },
        { field: 'nameKana', label: 'フリガナ' },
        { field: 'gender', label: '性別' },
        { field: 'birthDate', label: '生年月日' },
        { field: 'age', label: '年齢' },
        { field: 'phone', label: '電話番号' },
        { field: 'email', label: 'メール' },
        { field: 'address', label: '住所' },
        { field: 'hasCar', label: '自家用車' },
        { field: 'nearestStation', label: '最寄り駅' },
        { field: 'transportToStation', label: '駅までの移動手段' },
        { field: 'qualifications', label: '資格' },
        { field: 'lineId', label: 'LINE ID' },
        { field: 'referredBy', label: '紹介者' },
      ],
      right: [
        { key: 'impression', label: '第一印象・身だしなみ', type: 'text' },
        { key: 'motivation', label: '志望動機' },
        { key: 'commute', label: '通勤手段・所要時間の確認', type: 'text' },
        { key: 'note', label: 'その他確認事項' },
      ],
    },
    workSection(1),
    workSection(2),
    workSection(3),
    {
      key: 'selfPr',
      title: '自己PR',
      hint: '本人の強みと当社で活かせる点をすり合わせる',
      left: [{ field: 'selfPr', label: '自己PR' }],
      right: [
        { key: 'strength', label: '確認できた強み' },
        { key: 'fit', label: '当社で活かせる点・配属イメージ' },
      ],
    },
    {
      key: 'workCondition',
      title: '稼働状況・条件',
      hint: '実際の稼働に対する希望と条件を確定する',
      left: [
        { field: 'availableFrom', label: '勤務可能開始日' },
        { field: 'availablePeriod', label: '勤務可能期間' },
        { field: 'availableShift', label: '勤務可能シフト' },
        { field: 'desiredSalary', label: '希望給与' },
        { field: 'workLocation', label: '希望勤務地' },
      ],
      right: [
        { key: 'availability', label: '稼働可能日数・時間帯のすり合わせ' },
        { key: 'condition', label: '給与・条件の確認' },
        { key: 'concern', label: '懸念点・リスク' },
        { key: 'rating', label: '総合評価', type: 'rating' },
        { key: 'summary', label: '総合所見' },
      ],
    },
  ],
  followup: [
    {
      key: 'status',
      title: '稼働状況',
      hint: '入社後の実際の稼働状況をヒアリング',
      left: [
        { field: 'jobTitle', label: '従事中の職種' },
        { field: 'workLocation', label: '勤務地' },
        { field: 'availableShift', label: 'シフト' },
      ],
      right: [
        { key: 'situation', label: '現在の業務状況' },
        { key: 'attendance', label: '勤怠・体調' },
        { key: 'trouble', label: '困りごと・要望' },
      ],
    },
    {
      key: 'next',
      title: '今後',
      hint: '継続意向と次回フォローを確認',
      left: [],
      right: [
        { key: 'intention', label: '継続意向', type: 'text' },
        { key: 'improvement', label: '改善提案・対応事項' },
        { key: 'rating', label: '稼働評価', type: 'rating' },
        { key: 'summary', label: '所見・次回予定' },
      ],
    },
  ],
};
