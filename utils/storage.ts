import { ApiSettings, Job } from '../types';
import { DEFAULT_API_BASE_URL } from '../constants';

const STORAGE_KEYS = {
  SETTINGS: 'halida_settings',
  HISTORY: 'halida_job_history',
};

export const getStoredSettings = (): ApiSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse settings from storage', e);
  }
  
  // Default settings
  return {
    useMock: true,
    baseUrl: DEFAULT_API_BASE_URL,
  };
};

export const saveSettings = (settings: ApiSettings) => {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
};

export const getJobHistory = (): Job[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Failed to parse history', e);
  }
  return [];
};

export const saveJobToHistory = (job: Job) => {
  const history = getJobHistory();
  // Remove if exists (update)
  const filtered = history.filter(j => j.jobId !== job.jobId);
  // Add to top
  const newHistory = [job, ...filtered].slice(0, 5);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(newHistory));
};
