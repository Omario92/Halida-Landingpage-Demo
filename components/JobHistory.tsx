import React from 'react';
import { Job, Template } from '../types';

interface JobHistoryProps {
  history: Job[];
  templates: Template[];
  onSelectJob: (job: Job) => void;
}

const JobHistory: React.FC<JobHistoryProps> = ({ history, templates, onSelectJob }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Creations</h3>
      <div className="grid gap-3">
        {history.map((job) => {
          const template = templates.find(t => t.id === job.templateId);
          const date = job.createdAt ? new Date(job.createdAt).toLocaleString() : 'Unknown date';
          
          return (
            <div 
              key={job.jobId} 
              onClick={() => onSelectJob(job)}
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${job.status === 'done' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <div>
                   <p className="font-semibold text-gray-800">{template?.name || 'Unknown Template'}</p>
                   <p className="text-xs text-gray-500">{date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                 <span className="capitalize">{job.status}</span>
                 {job.status === 'done' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobHistory;
