import React, { useState, useEffect, useRef } from 'react';
import { Job, Template, Gender, ApiSettings } from './types';
import { ApiService } from './services/api';
import { getStoredSettings, saveSettings, getJobHistory, saveJobToHistory } from './utils/storage';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import UploadBox from './components/UploadBox';
import GenderToggle from './components/GenderToggle';
import TemplateGrid from './components/TemplateGrid';
import JobProgress from './components/JobProgress';
import ResultPlayer from './components/ResultPlayer';
import JobHistory from './components/JobHistory';
import ApiSettingsPanel from './components/ApiSettingsPanel';

const App: React.FC = () => {
  // App State
  const [settings, setSettings] = useState<ApiSettings>(getStoredSettings());
  const [templates, setTemplates] = useState<Template[]>([]);
  const [history, setHistory] = useState<Job[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);

  // Workflow State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [gender, setGender] = useState<Gender>('male');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // Job State
  const [currentJob, setCurrentJob] = useState<Job | null>(null);
  const [isCreatingJob, setIsCreatingJob] = useState(false);

  const demoSectionRef = useRef<HTMLDivElement>(null);
  const pollIntervalRef = useRef<number | null>(null);

  // Load initial data
  useEffect(() => {
    loadTemplates();
    setHistory(getJobHistory());
  }, [settings]); // Reload if settings change (e.g. switch mock/real)

  const loadTemplates = async () => {
    setIsLoadingTemplates(true);
    try {
      const data = await ApiService.fetchTemplates(settings);
      setTemplates(data);
    } catch (error) {
      console.error('Failed to load templates', error);
      // Fallback or empty state could be handled here
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const handleSettingsSave = (newSettings: ApiSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    // Reset state on environment switch
    setFile(null);
    setPreviewUrl(null);
    setSelectedTemplateId(null);
    setCurrentJob(null);
  };

  // Polling Effect
  useEffect(() => {
    if (currentJob && ['queued', 'running', 'rendering', 'uploading'].includes(currentJob.status)) {
      if (pollIntervalRef.current) window.clearInterval(pollIntervalRef.current);
      
      pollIntervalRef.current = window.setInterval(async () => {
        try {
          const status = await ApiService.getJobStatus(settings, currentJob.jobId);
          setCurrentJob(prev => ({ ...prev, ...status }));
          
          if (status.status === 'done' || status.status === 'failed') {
             if (pollIntervalRef.current) window.clearInterval(pollIntervalRef.current);
             // Save to history once done
             saveJobToHistory({ ...status, templateId: currentJob.templateId, createdAt: currentJob.createdAt });
             setHistory(getJobHistory());
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 2000);
    }
    return () => {
      if (pollIntervalRef.current) window.clearInterval(pollIntervalRef.current);
    };
  }, [currentJob, settings]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    // Create local preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    setUploadedUrl(null); // Reset uploaded state
  };

  const handleClearFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setUploadedUrl(null);
  };

  const scrollToDemo = () => {
    demoSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGenerate = async () => {
    if (!file || !selectedTemplateId) return;

    try {
      setIsUploading(true);
      
      // 1. Upload File (if not already uploaded, though in this flow we upload on Generate click)
      // Optimisation: check if uploadedUrl exists, but for simplicity we assume new upload
      const { fileUrl } = await ApiService.uploadFile(settings, file);
      setUploadedUrl(fileUrl);
      setIsUploading(false);

      // 2. Create Job
      setIsCreatingJob(true);
      const job = await ApiService.createJob(settings, fileUrl, gender, selectedTemplateId);
      setCurrentJob(job);
    } catch (e) {
      console.error("Generation failed", e);
      alert("Failed to start job. See console.");
      setIsUploading(false);
    } finally {
      setIsCreatingJob(false);
    }
  };

  const handleStartOver = () => {
    setCurrentJob(null);
    // Optional: Keep file selected or clear it? Keeping it is better UX usually.
  };

  const handleHistorySelect = (job: Job) => {
    setCurrentJob(job);
    scrollToDemo();
  };

  const isFormValid = file && selectedTemplateId && !isUploading && !isCreatingJob;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Hero onCtaClick={scrollToDemo} />
      <HowItWorks />

      <main ref={demoSectionRef} className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        
        {/* If a job is active (running or done), show the job view */}
        {currentJob ? (
          <div className="space-y-8">
            {currentJob.status === 'done' ? (
              <ResultPlayer job={currentJob} onStartOver={handleStartOver} />
            ) : (
              <JobProgress job={currentJob} template={templates.find(t => t.id === currentJob.templateId)} />
            )}
          </div>
        ) : (
          /* CONFIGURATION VIEW */
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Tạo Video Của Bạn</h2>
              <p className="mt-4 text-gray-500">Thiết lập các tùy chọn bên dưới để bắt đầu.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* LEFT COLUMN: Inputs */}
              <div className="lg:col-span-4 space-y-8">
                {/* 1. Upload */}
                <section>
                   <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <span className="bg-brand-100 text-brand-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                     Tải Ảnh Lên
                   </h3>
                   <UploadBox 
                     onFileSelect={handleFileSelect} 
                     selectedFile={file} 
                     previewUrl={previewUrl}
                     onClear={handleClearFile}
                     isUploading={isUploading}
                   />
                </section>

                {/* 2. Gender */}
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <span className="bg-brand-100 text-brand-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                     Chọn Giới Tính
                   </h3>
                  <GenderToggle value={gender} onChange={setGender} disabled={!!currentJob} />
                </section>
              </div>

              {/* RIGHT COLUMN: Templates */}
              <div className="lg:col-span-8">
                <section>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                     <span className="bg-brand-100 text-brand-700 w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
                     Chọn Vai Diễn
                   </h3>
                   {isLoadingTemplates ? (
                     <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl">
                       <p className="text-gray-500">Đang tải danh sách vai diễn...</p>
                     </div>
                   ) : (
                     <TemplateGrid 
                       templates={templates} 
                       selectedTemplateId={selectedTemplateId} 
                       onSelect={setSelectedTemplateId} 
                       currentGender={gender}
                     />
                   )}
                </section>

                <div className="mt-8 flex justify-end">
                   <button
                     onClick={handleGenerate}
                     disabled={!isFormValid}
                     className={`px-10 py-4 rounded-full text-lg font-bold shadow-xl transition-all
                       ${isFormValid 
                         ? 'bg-brand-600 hover:bg-brand-700 text-white transform hover:-translate-y-1' 
                         : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                       }
                     `}
                   >
                     {isUploading ? 'Đang tải ảnh...' : isCreatingJob ? 'Đang khởi tạo...' : 'Tạo Video Ngay ✨'}
                   </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <JobHistory 
          history={history} 
          templates={templates} 
          onSelectJob={handleHistorySelect} 
        />
      </main>

      <Footer />
      <ApiSettingsPanel settings={settings} onSave={handleSettingsSave} />
    </div>
  );
};

export default App;
