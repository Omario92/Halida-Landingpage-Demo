import React from 'react';
import { Job, Template } from '../types';

interface JobProgressProps {
  job: Job;
  template?: Template;
}

const JobProgress: React.FC<JobProgressProps> = ({ job, template }) => {
  const { status, progress = 0, message, error } = job;

  const getStatusColor = () => {
    switch (status) {
      case 'failed': return 'bg-red-500';
      case 'done': return 'bg-green-500';
      default: return 'bg-brand-500';
    }
  };

  const getStatusText = (s: string) => {
    switch (s) {
      case 'queued': return 'Đang trong hàng đợi';
      case 'running': return 'Đang xử lý';
      case 'rendering': return 'Đang tạo hình';
      case 'uploading': return 'Đang hoàn tất';
      case 'done': return 'Hoàn thành';
      case 'failed': return 'Thất bại';
      default: return s;
    }
  };

  const percent = Math.min(Math.max(Math.round(progress * 100), 0), 100);

  if (status === 'failed') {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-red-50 border border-red-200 rounded-xl text-center">
        <div className="text-red-500 mb-2">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 className="text-lg font-bold text-red-700">Xử lý thất bại</h3>
        <p className="text-red-600 mt-1">{error || 'Đã có lỗi xảy ra.'}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-6 sm:p-8">
      <div className="flex flex-col items-center">
        {template && (
           <h3 className="text-xl font-bold text-gray-800 mb-1">Đang nhập vai: {template.name}</h3>
        )}
        <p className="text-gray-500 text-sm mb-6 uppercase tracking-wide font-semibold">
          Trạng thái: <span className="text-brand-600">{getStatusText(status)}</span>
        </p>

        {/* Spinner for non-determinate stages */}
        {status === 'queued' && (
           <div className="animate-pulse flex space-x-2 mb-6">
             <div className="h-3 w-3 bg-brand-400 rounded-full"></div>
             <div className="h-3 w-3 bg-brand-400 rounded-full"></div>
             <div className="h-3 w-3 bg-brand-400 rounded-full"></div>
           </div>
        )}

        {/* Progress Bar */}
        <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden mb-3">
          <div 
            className={`h-full transition-all duration-500 ease-out ${getStatusColor()} relative`}
            style={{ width: `${percent}%` }}
          >
             <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]"></div>
          </div>
        </div>

        <div className="flex justify-between w-full text-sm font-medium text-gray-500">
          <span>{message || 'Vui lòng chờ...'}</span>
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
};

export default JobProgress;
