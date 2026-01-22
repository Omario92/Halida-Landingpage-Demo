import { ApiSettings, Job, Template, UploadResponse, Gender } from '../types';
import { MOCK_TEMPLATES, MOCK_VIDEO_URL, MOCK_POSTER_URL } from '../constants';
import { sanitizeFileName } from '../utils/validation';

// Helper to determine active base URL
const getBaseUrl = (settings: ApiSettings) => {
  // Priority: 1. Settings input 2. Window fallback 3. Empty (relative)
  return settings.baseUrl || (window as any).__API_BASE_URL__ || '';
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- MOCK IMPLEMENTATION ---

const mockStore: Record<string, { startTime: number, templateId: string, gender: string }> = {};

export const fetchTemplatesMock = async (): Promise<Template[]> => {
  await delay(500);
  return [...MOCK_TEMPLATES];
};

export const uploadFileMock = async (file: File): Promise<UploadResponse> => {
  await delay(1500);
  // In a real app we can't return a local path easily to other devices, but for a pure client demo this URL object works for preview
  // For the purpose of "simulating" a server URL, we'll return a fake https URL
  return { fileUrl: `https://mock-storage.example.com/${sanitizeFileName(file.name)}` };
};

export const createJobMock = async (fileUrl: string, gender: Gender, templateId: string): Promise<Job> => {
  await delay(1000);
  const jobId = `mock_job_${Date.now()}`;
  mockStore[jobId] = { startTime: Date.now(), templateId, gender };
  return {
    jobId,
    status: 'queued',
    createdAt: Date.now(),
    templateId
  };
};

export const getJobStatusMock = async (jobId: string): Promise<Job> => {
  await delay(300); // Fast poll
  const jobInfo = mockStore[jobId];
  if (!jobInfo) {
    return { jobId, status: 'failed', error: 'Job not found in mock store' };
  }

  const elapsed = Date.now() - jobInfo.startTime;

  // Simulate timeline: 0-2s queued, 2-5s running, 5-10s rendering, 10-12s uploading, 12s+ done
  if (elapsed < 2000) {
    return { jobId, status: 'queued', message: 'Waiting in queue...', progress: 0, templateId: jobInfo.templateId };
  } else if (elapsed < 5000) {
    return { jobId, status: 'running', stage: 'analyzing', message: 'Analyzing facial features...', progress: 0.1, templateId: jobInfo.templateId };
  } else if (elapsed < 10000) {
    const renderProgress = 0.2 + ((elapsed - 5000) / 5000) * 0.6; // 0.2 to 0.8
    return { jobId, status: 'rendering', stage: 'rendering', message: 'Swapping faces...', progress: renderProgress, templateId: jobInfo.templateId };
  } else if (elapsed < 12000) {
    return { jobId, status: 'uploading', stage: 'encoding', message: 'Finalizing video...', progress: 0.9, templateId: jobInfo.templateId };
  } else {
    return {
      jobId,
      status: 'done',
      stage: 'done',
      progress: 1,
      message: 'Complete!',
      templateId: jobInfo.templateId,
      output: {
        videoUrl: MOCK_VIDEO_URL,
        posterUrl: MOCK_POSTER_URL,
        downloadUrl: MOCK_VIDEO_URL
      }
    };
  }
};

// --- REAL IMPLEMENTATION ---

export const fetchTemplatesReal = async (settings: ApiSettings): Promise<Template[]> => {
  const url = `${getBaseUrl(settings)}/templates`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch templates');
  const data = await res.json();
  return data.templates;
};

export const uploadFileReal = async (settings: ApiSettings, file: File): Promise<UploadResponse> => {
  const baseUrl = getBaseUrl(settings);
  const sanitizedName = sanitizeFileName(file.name);
  
  // Try Presigned URL flow first
  try {
    const presignRes = await fetch(`${baseUrl}/uploads/presign`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileName: sanitizedName, contentType: file.type })
    });

    if (presignRes.ok) {
      const { uploadUrl, fileUrl } = await presignRes.json();
      // Upload to S3/GCS directly
      const putRes = await fetch(uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': file.type },
        body: file
      });
      if (!putRes.ok) throw new Error('Failed to upload file to storage');
      return { fileUrl };
    }
  } catch (e) {
    console.warn('Presign upload failed, falling back to direct upload', e);
  }

  // Fallback to multipart
  const formData = new FormData();
  formData.append('file', file);
  const res = await fetch(`${baseUrl}/uploads`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) throw new Error('Upload failed');
  return await res.json();
};

export const createJobReal = async (settings: ApiSettings, imageUrl: string, gender: Gender, templateId: string): Promise<Job> => {
  const url = `${getBaseUrl(settings)}/jobs`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageUrl, gender, templateId })
  });
  if (!res.ok) throw new Error('Failed to create job');
  const data = await res.json();
  return { ...data, templateId, createdAt: Date.now() };
};

export const getJobStatusReal = async (settings: ApiSettings, jobId: string): Promise<Job> => {
  const url = `${getBaseUrl(settings)}/jobs/${jobId}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch job status');
  return await res.json();
};

// --- FACADE ---

export const ApiService = {
  fetchTemplates: (settings: ApiSettings) => 
    settings.useMock ? fetchTemplatesMock() : fetchTemplatesReal(settings),
  
  uploadFile: (settings: ApiSettings, file: File) => 
    settings.useMock ? uploadFileMock(file) : uploadFileReal(settings, file),
  
  createJob: (settings: ApiSettings, imageUrl: string, gender: Gender, templateId: string) => 
    settings.useMock ? createJobMock(imageUrl, gender, templateId) : createJobReal(settings, imageUrl, gender, templateId),
  
  getJobStatus: (settings: ApiSettings, jobId: string) => 
    settings.useMock ? getJobStatusMock(jobId) : getJobStatusReal(settings, jobId),
};
