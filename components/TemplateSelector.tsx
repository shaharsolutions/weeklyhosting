import React from 'react';
import type { Template } from '../types';
import Card from './Card';

interface TemplateSelectorProps {
  templates: Template[];
  onSelect: (template: Template) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ templates, onSelect }) => {
  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">תבניות אירוח</h2>
      <div className="space-y-4">
        {templates.map((template, index) => (
          <div key={template.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg animate-slide-in" style={{ animationDelay: `${index * 150}ms` }}>
            <h3 className="font-bold text-lg text-brand-primary">{template.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-3">{template.description}</p>
            <button
              onClick={() => onSelect(template)}
              className="w-full px-4 py-2 bg-brand-secondary text-brand-text font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              בחר תבנית
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TemplateSelector;
