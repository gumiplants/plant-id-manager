// 自動バックアップ（起動時 ＆ 深夜1時）管理ユーティリティ
import type { Plant } from '../types/plant';

const AUTO_BACKUP_ENABLED_KEY = 'plant_id_manager_auto_backup_enabled';
const LAST_STARTUP_BACKUP_KEY = 'plant_id_manager_last_startup_backup';
const LAST_NIGHTLY_BACKUP_KEY = 'plant_id_manager_last_nightly_backup';

export interface AutoBackupInfo {
  enabled: boolean;
  lastBackupTime: string | null;
  lastBackupType: 'startup' | 'nightly' | null;
}

// 自動バックアップが有効かどうか（デフォルト: true）
export function isAutoBackupEnabled(): boolean {
  try {
    const val = localStorage.getItem(AUTO_BACKUP_ENABLED_KEY);
    return val === null ? true : val === 'true';
  } catch {
    return true;
  }
}

// 自動バックアップの有効・無効を設定
export function setAutoBackupEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(AUTO_BACKUP_ENABLED_KEY, String(enabled));
  } catch (e) {
    console.error('自動バックアップ設定の保存失敗:', e);
  }
}

// 最終バックアップ情報の取得
export function getAutoBackupInfo(): AutoBackupInfo {
  try {
    const enabled = isAutoBackupEnabled();
    const startupStr = localStorage.getItem(LAST_STARTUP_BACKUP_KEY);
    const nightlyStr = localStorage.getItem(LAST_NIGHTLY_BACKUP_KEY);

    let lastBackupTime: string | null = null;
    let lastBackupType: 'startup' | 'nightly' | null = null;

    if (startupStr && nightlyStr) {
      if (new Date(startupStr).getTime() >= new Date(nightlyStr).getTime()) {
        lastBackupTime = startupStr;
        lastBackupType = 'startup';
      } else {
        lastBackupTime = nightlyStr;
        lastBackupType = 'nightly';
      }
    } else if (startupStr) {
      lastBackupTime = startupStr;
      lastBackupType = 'startup';
    } else if (nightlyStr) {
      lastBackupTime = nightlyStr;
      lastBackupType = 'nightly';
    }

    return { enabled, lastBackupTime, lastBackupType };
  } catch {
    return { enabled: true, lastBackupTime: null, lastBackupType: null };
  }
}

/**
 * データをダウンロードフォルダへファイル保存する
 */
export function downloadBackupFile(
  plants: Plant[],
  brandName: string,
  reason: 'startup' | 'nightly'
): void {
  if (!plants || plants.length === 0) return;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const dateStr = `${year}-${month}-${day}`;
  const timeStr = `${hours}-${minutes}`;
  const label = reason === 'nightly' ? '01am' : 'startup';
  const safeBrand = (brandName || 'gumi_plants').toLowerCase().replace(/[^a-z0-9_-]/gi, '_');

  // ファイル名例: gumi_plants_backup_auto_01am_2026-10-18_01-00.json
  const filename = `${safeBrand}_backup_auto_${label}_${dateStr}_${timeStr}.json`;

  const blob = new Blob([JSON.stringify(plants, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}

/**
 * 起動時自動バックアップ判定・実行
 * - 前回起動バックアップから12時間以上経過、または別の日付の場合に実行
 */
export function checkAndRunStartupBackup(plants: Plant[], brandName: string): boolean {
  if (!isAutoBackupEnabled()) return false;
  if (!plants || plants.length === 0) return false;

  try {
    const lastStr = localStorage.getItem(LAST_STARTUP_BACKUP_KEY);
    const now = new Date();

    if (lastStr) {
      const lastDate = new Date(lastStr);
      const diffHours = (now.getTime() - lastDate.getTime()) / (1000 * 60 * 60);
      const isSameDate = now.toDateString() === lastDate.toDateString();

      // 同日かつ直近12時間以内にバックアップ済みならスキップ（リロード時の多重ダウンロード防止）
      if (isSameDate && diffHours < 12) {
        return false;
      }
    }

    // バックアップ実行
    downloadBackupFile(plants, brandName, 'startup');
    localStorage.setItem(LAST_STARTUP_BACKUP_KEY, now.toISOString());
    return true;
  } catch (e) {
    console.error('起動時自動バックアップ失敗:', e);
    return false;
  }
}

/**
 * 深夜1時自動バックアップ判定・実行
 * - 深夜1時台（01:00〜01:59）かつ、今日まだ深夜1時バックアップをしていない場合に実行
 */
export function checkAndRunNightlyBackup(plants: Plant[], brandName: string): boolean {
  if (!isAutoBackupEnabled()) return false;
  if (!plants || plants.length === 0) return false;

  try {
    const now = new Date();
    const currentHour = now.getHours();

    // 深夜1時台 (01:00〜01:59) かどうか判定
    if (currentHour !== 1) {
      return false;
    }

    const todayStr = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const lastDateKey = localStorage.getItem('plant_id_manager_nightly_date_key');

    // 今日すでに深夜1時バックアップを実行済みならスキップ
    if (lastDateKey === todayStr) {
      return false;
    }

    // バックアップ実行
    downloadBackupFile(plants, brandName, 'nightly');
    localStorage.setItem(LAST_NIGHTLY_BACKUP_KEY, now.toISOString());
    localStorage.setItem('plant_id_manager_nightly_date_key', todayStr);
    return true;
  } catch (e) {
    console.error('深夜1時自動バックアップ失敗:', e);
    return false;
  }
}
