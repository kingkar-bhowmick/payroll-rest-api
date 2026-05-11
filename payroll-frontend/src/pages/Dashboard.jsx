import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ShoppingCart, ArrowRight, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { getAllEmployees } from '../api/employeeService';
import { getAllOrders } from '../api/orderService';

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [empData, ordData] = await Promise.all([
                    getAllEmployees(),
                    getAllOrders(),
                ]);
                setEmployees(empData);
                setOrders(ordData);
            } catch (err) {
                console.error('Dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const inProgress = orders.filter(o => o.status === 'IN_PROGRESS').length;
    const completed = orders.filter(o => o.status === 'COMPLETED').length;
    const cancelled = orders.filter(o => o.status === 'CANCELLED').length;

    const stats = [
        {
            label: 'Total Employees',
            value: employees.length,
            icon: Users,
            gradient: 'from-brand-500 to-purple-500',
            shadow: 'shadow-brand-500/20',
        },
        {
            label: 'Total Orders',
            value: orders.length,
            icon: ShoppingCart,
            gradient: 'from-cyan-500 to-blue-500',
            shadow: 'shadow-cyan-500/20',
        },
        {
            label: 'In Progress',
            value: inProgress,
            icon: Clock,
            gradient: 'from-amber-500 to-orange-500',
            shadow: 'shadow-amber-500/20',
        },
        {
            label: 'Completed',
            value: completed,
            icon: CheckCircle2,
            gradient: 'from-emerald-500 to-green-500',
            shadow: 'shadow-emerald-500/20',
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Welcome back <span className="gradient-text">👋</span>
                </h1>
                <p className="mt-1 text-surface-400">
                    Here's what's happening with your payroll service today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="glass-card p-5 animate-slide-up"
                        style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-surface-400 font-medium">{stat.label}</p>
                                <p className="mt-2 text-3xl font-bold text-white">
                                    {loading ? (
                                        <span className="inline-block w-10 h-8 bg-white/5 rounded animate-pulse"></span>
                                    ) : (
                                        stat.value
                                    )}
                                </p>
                            </div>
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.shadow}`}>
                                <stat.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Employees Card */}
                <Link to="/employees" className="glass-card-hover p-6 block group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Employee Management</h3>
                                <p className="text-sm text-surface-400 mt-0.5">View, add, and manage your team</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-surface-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-brand-400" />
                    </div>

                    {/* Recent employees preview */}
                    {!loading && employees.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-white/5">
                            <div className="flex -space-x-2">
                                {employees.slice(0, 5).map((emp, i) => (
                                    <div
                                        key={emp.id ?? i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-[11px] font-bold text-white border-2 border-surface-950"
                                        title={`${emp.firstName} ${emp.lastName}`}
                                    >
                                        {(emp.firstName?.[0] ?? '').toUpperCase()}
                                    </div>
                                ))}
                                {employees.length > 5 && (
                                    <div className="w-8 h-8 rounded-full bg-surface-800 flex items-center justify-center text-[11px] font-bold text-surface-400 border-2 border-surface-950">
                                        +{employees.length - 5}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </Link>

                {/* Orders Card */}
                <Link to="/orders" className="glass-card-hover p-6 block group">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                                <ShoppingCart className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-white">Order Management</h3>
                                <p className="text-sm text-surface-400 mt-0.5">Track, complete, or cancel orders</p>
                            </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-surface-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-400" />
                    </div>

                    {/* Order status breakdown */}
                    {!loading && orders.length > 0 && (
                        <div className="mt-5 pt-5 border-t border-white/5 flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-amber-400" />
                                <span className="text-xs text-surface-400">{inProgress} active</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-xs text-surface-400">{completed} done</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <XCircle className="w-3.5 h-3.5 text-red-400" />
                                <span className="text-xs text-surface-400">{cancelled} cancelled</span>
                            </div>
                        </div>
                    )}
                </Link>
            </div>
        </div>
    );
}
