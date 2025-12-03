import React, { useState, useEffect } from 'react';
import { logger } from '../../lib/logger';

export interface SavedJobsTableProps {
  title?: string;
  className?: string;
}

/**
 * SavedJobsTable Component
 * Part of the Application Tracking module (Phase 6)
 */
export const SavedJobsTable: React.FC<SavedJobsTableProps> = ({ title, className }) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    logger.info('SavedJobsTable mounted');
    // Simulate data loading
    const timer = setTimeout(() => {
      setData([{ id: 1, name: 'Sample Item 1' }, { id: 2, name: 'Sample Item 2' }]);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-900 ${className || ''}`}>
      <h2 className="text-xl font-semibold mb-4">{title || 'SavedJobsTable'}</h2>
      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-sm text-gray-500">Loaded {data.length} items.</div>
          <ul className="divide-y">
            {data.map(item => (
              <li key={item.id} className="py-2 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-400">Details for {item.name}...</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
