import React from 'react';
import { Job } from '../types';

interface ResultPlayerProps {
  job: Job;
  onStartOver: () => void;
}

const ResultPlayer: React.FC<ResultPlayerProps> = ({ job, onStartOver }) => {
  const { output } = job;

  if (!output || !output.videoUrl) return null;

  return (
    <div className="w-full max-w-4xl mx-auto text-center animate-fade-in-up">
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl ring-4 ring-gray-100 mb-8">
        <video 
          controls 
          autoPlay 
          playsInline
          poster={output.posterUrl || undefined}
          className="w-full max-h-[70vh] aspect-video mx-auto"
        >
          <source src={output.videoUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ thẻ video.
        </video>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <h4 className="text-yellow-800 font-bold text-lg mb-1">🎉 Video của bạn đã sẵn sàng!</h4>
        <p className="text-yellow-700">
           Tải video về máy và <strong>comment video</strong> vào bài đăng Facebook để tag chiến hữu ngay nhé!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        {output.downloadUrl && (
          <a 
            href={output.downloadUrl} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Tải Video Về Máy
          </a>
        )}
        
        <button 
          onClick={onStartOver}
          className="w-full sm:w-auto px-8 py-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg shadow-sm transition-all"
        >
          Tạo Video Mới
        </button>
      </div>
    </div>
  );
};

export default ResultPlayer;
