@echo off
chcp 65001 >nul
title gumi_plants - GitHub & Vercel 自動デプロイ
echo ========================================================
echo   🌿 gumi_plants - GitHub & Vercel 自動デプロイツール
echo ========================================================
echo.

set PATH=C:\Users\kei_i\.gemini\antigravity\bin\git\cmd;C:\Users\kei_i\.gemini\antigravity\bin\node;%PATH%
cd /d C:\Users\kei_i\.gemini\antigravity\scratch\plant-id-manager

echo [1/3] 変更されたファイルを検出・追加中...
git add .

echo [2/3] コミット（記録）を作成中...
git commit -m "Update from deploy tool" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
  echo      - 変更を記録しました。
) else (
  echo      - 新しい変更はありません（最新状態です）。
)

echo.
echo [3/3] GitHubへ送信中...
echo      (初回のみブラウザ認証画面が開く場合があります。「Authorize」を押してください)
git push -u origin main --force

if %ERRORLEVEL% EQU 0 (
  echo.
  echo ========================================================
  echo   ✅ 送信が正常に完了しました！
  echo   約30秒〜1分後に Vercel の本番サイトが最新版に更新されます。
  echo ========================================================
) else (
  echo.
  echo ❌ 送信に失敗しました。認証画面で許可を完了してください。
)

echo.
pause
