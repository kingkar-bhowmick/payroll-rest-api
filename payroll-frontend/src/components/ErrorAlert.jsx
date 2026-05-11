import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorAlert({ message, onRetry }) {
    return (
        <div className="glass-card p-6 border-red-500/20 bg-red-500/5 animate-fade-in">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-red-400">Something went wrong</h3>
                    <p className="mt-1 text-sm text-surface-400">{message}</p>
                    {onRetry && (
                        <button onClick={onRetry} className="mt-3 btn-secondary text-sm flex items-center gap-2">
                            <RefreshCw className="w-4 h-4" />
                            Try again
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
