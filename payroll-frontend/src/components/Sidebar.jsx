import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, Zap } from 'lucide-react';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/employees', icon: Users, label: 'Employees' },
    { to: '/orders', icon: ShoppingCart, label: 'Orders' },
];

export default function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-surface-950/80 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50">
            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white tracking-tight">Payroll</h1>
                        <p className="text-[11px] text-surface-400 font-medium tracking-wider uppercase">Service Dashboard</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map(({ to, icon: Icon, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${isActive
                                ? 'bg-brand-500/15 text-brand-400 border border-brand-500/20 shadow-sm shadow-brand-500/10'
                                : 'text-surface-400 hover:text-surface-200 hover:bg-white/5'
                            }`
                        }
                    >
                        <Icon className="w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110" />
                        <span>{label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft"></div>
                    <span className="text-xs text-surface-500">Backend on :8080</span>
                </div>
            </div>
        </aside>
    );
}
