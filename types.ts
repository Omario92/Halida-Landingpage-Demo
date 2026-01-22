export type Gender = 'male' | 'female';

export type JobStatus = 'queued' | 'running' | 'rendering' | 'uploading' | 'done' | 'failed';

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  genderSupported: Gender[];
}

export interface JobOutput {
  videoUrl: string | null;
  posterUrl: string | null;
  downloadUrl: string | null;
}

export interface Job {
  jobId: string;
  status: JobStatus;
  stage?: string;
  progress?: number;
  message?: string;
  output?: JobOutput;
  error?: string | null;
  templateId?: string; // stored locally for history
  createdAt?: number; // stored locally for history
}

export interface UploadResponse {
  fileUrl: string;
}

export interface ApiSettings {
  useMock: boolean;
  baseUrl: string;
}
