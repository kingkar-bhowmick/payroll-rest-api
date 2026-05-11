import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ message = 'Loading...' }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-2 border-brand-500/20"></div>
                <Loader2 className="w-12 h-12 text-brand-500 animate-spin absolute top-0 left-0" />
            </div>
            <p className="mt-4 text-sm text-surface-400 font-medium">{message}</p>
        </div>
    );
}
