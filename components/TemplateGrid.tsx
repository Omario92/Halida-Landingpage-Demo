import React from 'react';
import { Template, Gender } from '../types';

interface TemplateGridProps {
  templates: Template[];
  selectedTemplateId: string | null;
  onSelect: (id: string) => void;
  currentGender: Gender;
}

const TemplateGrid: React.FC<TemplateGridProps> = ({ templates, selectedTemplateId, onSelect, currentGender }) => {
  // Filter templates based on gender support
  const availableTemplates = templates.filter(t => t.genderSupported.includes(currentGender));

  if (availableTemplates.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
        No templates available for the selected gender.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {availableTemplates.map((template) => {
        const isSelected = selectedTemplateId === template.id;
        return (
          <div
            key={template.id}
            onClick={() => onSelect(template.id)}
            className={`cursor-pointer group relative rounded-xl overflow-hidden border-2 transition-all duration-200 
              ${isSelected 
                ? 'border-brand-500 ring-4 ring-brand-100 shadow-xl transform scale-[1.02]' 
                : 'border-transparent hover:border-gray-300 hover:shadow-lg'
              }
            `}
          >
            <div className="aspect-video bg-gray-200 relative overflow-hidden">
               {/* Use placeholder if thumbnail fails or is generic */}
              <img 
                src={template.thumbnailUrl} 
                alt={template.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                 {isSelected && (
                   <div className="bg-brand-500 text-white rounded-full p-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                   </div>
                 )}
              </div>
            </div>
            <div className="p-4 bg-white">
              <h3 className="font-bold text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">{template.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TemplateGrid;
