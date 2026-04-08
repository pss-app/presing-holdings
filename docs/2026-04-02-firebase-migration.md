# Firebase プロジェクト移行記録

**日付:** 2026-04-02
**作業者:** Claude + paradigm070755

## 背景

Presing Holdings のウェブアプリ開発において、Firebase と GitHub のアカウントが混在し、デプロイが出来ない状態が続いていた。

### アカウント構成の問題

| サービス | 旧アカウント | 新アカウント |
|---------|------------|------------|
| Firebase | paradigm070755@gmail.com | PresingSocialService@gmail.com |
| GitHub | pss-app (PresingSocialService) | pss-app (変更なし) |

Firebase と GitHub が別アカウントのため、GitHub Actions からのデプロイ時に認証が通らなかった。

### 混在していたプロジェクトID

コードベース内に3つの異なるFirebaseプロジェクトIDが混在していた：

| ファイル | プロジェクトID | 所有者 |
|---------|-------------|--------|
| `firebase-applet-config.json` | `gen-lang-client-0076116956` | paradigm070755 |
| `.github/workflows/deploy.yml` | `photo-upload-form` | 不明（旧プロジェクト） |
| サービスアカウントキー | `gen-lang-client-0365991205` | PresingSocialService |

## 作業内容

### 1. プロジェクトIDの統一

全ファイルを `gen-lang-client-0365991205`（PresingSocialService）に統一。

**変更ファイル:**
- `firebase-applet-config.json` - プロジェクトID、appId、apiKey、authDomain、storageBucket、messagingSenderId、firestoreDatabaseId
- `.firebaserc` - デフォルトプロジェクト
- `.github/workflows/deploy.yml` - デプロイ先プロジェクト
- `firebase.json` - Firestoreデータベース名、ホスティングサイト名

### 2. Firebase Console側の設定

新プロジェクトで以下を有効化・設定：

- **Hosting** - 有効化 + サイト名 `presing` を作成（`presing-holdings` は旧プロジェクトで使用済みのため使用不可）
- **Storage** - 有効化（本番モード）
- **Authentication** - 承認済みドメインに `presing.web.app` を追加
- **サービスアカウント** - 編集者（Editor）ロールを付与

### 3. GitHub Secrets の更新

`FIREBASE_SERVICE_ACCOUNT` シークレットを新プロジェクトのサービスアカウントキーに更新。

### 4. デプロイ設定の改善

`deploy.yml` のデプロイコマンドを変更：

```
# 変更前
firebase deploy --only hosting --project photo-upload-form

# 変更後
firebase deploy --only hosting,firestore,storage --project gen-lang-client-0365991205
```

Firestore ルールと Storage ルールもデプロイされるようにした。

### 5. データ移行

旧プロジェクトから新プロジェクトへFirestoreデータを移行。

| コレクション | 件数 | 内容 |
|------------|------|------|
| `admin_emails` | 3件 | 管理者・スタッフのメールアドレス |
| `jobs` | 2件 | 求人情報 |
| `recruits` | 2件 | 応募者データ |

Node.js の `firebase-admin` SDK を使用した移行スクリプトで一括コピー。

## 最終構成

```
Firebase プロジェクト: gen-lang-client-0365991205 (PresingSocialService)
Firestore DB:         ai-studio-b7e8898a-e1a0-4601-8c50-1e5f226c0975
Hosting サイト名:      presing
Hosting URL:          https://presing.web.app
GitHub リポジトリ:     pss-app/presing-holdings
デプロイ:             GitHub Actions (main push時に自動)
```

## デプロイ失敗の履歴と原因

| # | エラー内容 | 原因 |
|---|----------|------|
| 1 | Failed to get Firebase project | プロジェクトIDが間違っていた（0076116956） |
| 2 | 403 Permission denied on presing-holdings | サイト名が旧プロジェクトに属していた |
| 3 | 403 Permission denied (serviceusage) | サービスアカウントに編集者ロールがなかった |
| 4 | Firebase Storage has not been set up | Storageが未有効化 |
| 5 | 成功 | 全ての前提条件をクリア |

## 振り返り・教訓

### 改善すべきだった点

1. **全体像の把握が先** - 最初に正しいプロジェクトIDを確認してから作業すべきだった。部分的な修正を繰り返してしまい、デプロイ失敗を4回重ねた。

2. **デプロイ前のチェックリスト** - Firebase Console側の準備（Hosting、Storage、認証ドメイン、権限）を全て先に済ませてからpushすれば1回でデプロイ成功できた。

3. **`--only hosting` の限定** - `firestore.rules` と `storage.rules` がリポジトリにある以上、最初から全てデプロイする設定にすべきだった。

4. **秘密情報の取り扱い** - サービスアカウントキー全体ではなく `project_id` の値だけ確認すれば済んだ場面があった。

### 良かった点

- データ移行スクリプトは一発で成功
- 最終的に全設定が統一され、クリーンな状態になった
- `.firebaserc` でデフォルトプロジェクトを固定したので今後の間違いを防止

## 残課題

- ダッシュボードのレスポンシブ対応（画面が狭いとタブが表示されない）
- 旧プロジェクト（gen-lang-client-0076116956）のクリーンアップ・削除の検討
