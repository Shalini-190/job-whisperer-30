import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { logger } from '../../lib/logger';

/**
 * ComplexWidget085 
 * Advanced UI component for Enterprise Job tracking system.
 */
export interface ComplexWidget085Props {
  id?: string;
  className?: string;
  defaultActive?: boolean;
  onAction?: (actionId: string, payload: any) => void;
  metadata?: Record<string, any>;
}

export const ComplexWidget085: React.FC<ComplexWidget085Props> = (props) => {
  const {
    id = 'ComplexWidget085-' + Math.random().toString(36).substr(2, 9),
    className = '',
    defaultActive = false,
    onAction,
    metadata = {}
  } = props;

  const [isActive, setIsActive] = useState(defaultActive);
  const [clickCount, setClickCount] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize component
  useEffect(() => {
    logger.debug(`Initialize ComplexWidget085 ${id}`);
    
    // Simulate complex lifecycle
    let mounted = true;
    const init = async () => {
      setLoading(true);
      try {
        // Simulate fetch
        await new Promise(r => setTimeout(r, 100));
        if (mounted) {
          setData(Array.from({ length: 5 }, (_, i) => ({ id: i, value: `Item ${i}` })));
          setError(null);
        }
      } catch (err: any) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    init();
    
    return () => {
      mounted = false;
      logger.debug(`Cleanup ComplexWidget085 ${id}`);
    };
  }, [id]);

  const handleToggle = useCallback(() => {
    setIsActive(prev => !prev);
    setClickCount(prev => prev + 1);
    
    if (onAction) {
      onAction('TOGGLE', { isActive: !isActive, clickCount: clickCount + 1 });
    }
  }, [isActive, clickCount, onAction]);

  const complexComputedValue = useMemo(() => {
    if (!data.length) return 0;
    return data.reduce((acc, item) => acc + (item.id * 2), 0) + (isActive ? 100 : 0);
  }, [data, isActive]);

  return (
    <div 
      id={id}
      className={`
        p-4 border rounded shadow transition-all duration-300
        ${isActive ? 'bg-primary/10 border-primary' : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'}
        ${className}
      `}
      data-testid={'ComplexWidget085'}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Widget 085
        </h3>
        <button
          onClick={handleToggle}
          className="px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
        >
          {isActive ? 'Deactivate' : 'Activate'}
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-500">
          State: <span className="font-medium text-slate-700 dark:text-slate-300">{isActive ? 'Active' : 'Inactive'}</span>
        </p>
        <p className="text-sm text-slate-500">
          Interactions: <span className="font-medium text-slate-700 dark:text-slate-300">{clickCount}</span>
        </p>
        <p className="text-sm text-slate-500">
          Computed Matrix: <span className="font-medium text-slate-700 dark:text-slate-300">{complexComputedValue}</span>
        </p>
      </div>
      
      {loading && <div className="mt-4 p-2 bg-slate-100 dark:bg-slate-700 rounded text-center text-sm animate-pulse">Loading core logic...</div>}
      {error && <div className="mt-4 p-2 bg-red-100 text-red-700 rounded text-center text-sm">{error}</div>}
      
      {!loading && !error && data.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {data.map(item => (
            <div key={item.id} className="p-2 border rounded bg-slate-50 dark:bg-slate-700/50 text-sm">
              {item.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
