import { useEffect, useState } from 'react';
import {
    ShoppingCart,
    Plus,
    X,
    Clock,
    CheckCircle2,
    XCircle,
    Package,
} from 'lucide-react';
import { getAllOrders, createOrder, cancelOrder, completeOrder } from '../api/orderService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

const STATUS_CONFIG = {
    IN_PROGRESS: {
        label: 'In Progress',
        className: 'status-in-progress',
        icon: Clock,
    },
    COMPLETED: {
        label: 'Completed',
        className: 'status-completed',
        icon: CheckCircle2,
    },
    CANCELLED: {
        label: 'Cancelled',
        className: 'status-cancelled',
        icon: XCircle,
    },
};

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [actionLoading, setActionLoading] = useState(null); // tracks which order id is loading
    const [description, setDescription] = useState('');

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllOrders();
            setOrders(data);
        } catch (err) {
            setError(err.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        setSubmitting(true);
        try {
            await createOrder({ description: description.trim() });
            setDescription('');
            setShowForm(false);
            await fetchOrders();
        } catch (err) {
            setError(err.message || 'Failed to create order');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = async (id) => {
        setActionLoading(id);
        setError(null);
        try {
            await cancelOrder(id);
            await fetchOrders();
        } catch (err) {
            const msg =
                err.response?.data?.detail || err.message || 'Failed to cancel order';
            setError(msg);
        } finally {
            setActionLoading(null);
        }
    };

    const handleComplete = async (id) => {
        setActionLoading(id);
        setError(null);
        try {
            await completeOrder(id);
            await fetchOrders();
        } catch (err) {
            const msg =
                err.response?.data?.detail || err.message || 'Failed to complete order';
            setError(msg);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                            <ShoppingCart className="w-5 h-5 text-white" />
                        </div>
                        Order Management
                    </h1>
                    <p className="mt-1 text-sm text-surface-400 ml-[52px]">
                        Track order statuses and manage fulfilment
                    </p>
                </div>
                <button
                    id="add-order-btn"
                    onClick={() => setShowForm(!showForm)}
                    className={showForm ? 'btn-secondary flex items-center gap-2' : 'btn-primary flex items-center gap-2'}
                >
                    {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showForm ? 'Cancel' : 'New Order'}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <form
                    onSubmit={handleCreate}
                    className="glass-card p-6 animate-slide-up space-y-4"
                >
                    <h3 className="text-lg font-semibold text-white">Create Order</h3>
                    <div>
                        <label className="block text-xs font-medium text-surface-400 mb-1.5 uppercase tracking-wider">
                            Description
                        </label>
                        <input
                            id="input-order-description"
                            type="text"
                            className="input-field"
                            placeholder="e.g. MacBook Pro 16-inch"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <p className="text-xs text-surface-500">
                        Status will be automatically set to <span className="text-amber-400 font-medium">IN_PROGRESS</span>
                    </p>
                    <div className="flex justify-end">
                        <button
                            id="submit-order-btn"
                            type="submit"
                            disabled={submitting}
                            className="btn-primary flex items-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Create Order
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}

            {/* Error */}
            {error && <ErrorAlert message={error} onRetry={fetchOrders} />}

            {/* Orders List */}
            {loading ? (
                <LoadingSpinner message="Fetching orders..." />
            ) : orders.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <Package className="w-12 h-12 text-surface-600 mx-auto" />
                    <p className="mt-4 text-surface-400 font-medium">No orders yet</p>
                    <p className="mt-1 text-sm text-surface-500">Create your first order to see it here.</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {orders.map((order, i) => {
                        const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.IN_PROGRESS;
                        const StatusIcon = cfg.icon;
                        const isLoading = actionLoading === order.id;
                        const isInProgress = order.status === 'IN_PROGRESS';

                        return (
                            <div
                                key={order.id ?? i}
                                className="glass-card-hover p-5 animate-slide-up"
                                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        {/* Icon */}
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${order.status === 'COMPLETED'
                                                ? 'bg-emerald-500/15'
                                                : order.status === 'CANCELLED'
                                                    ? 'bg-red-500/15'
                                                    : 'bg-amber-500/15'
                                            }`}>
                                            <StatusIcon className={`w-5 h-5 ${order.status === 'COMPLETED'
                                                    ? 'text-emerald-400'
                                                    : order.status === 'CANCELLED'
                                                        ? 'text-red-400'
                                                        : 'text-amber-400'
                                                }`} />
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-white">{order.description}</h4>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="text-xs text-surface-500">#{order.id}</span>
                                                <span className={cfg.className}>{cfg.label}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions — only for IN_PROGRESS orders */}
                                    {isInProgress && (
                                        <div className="flex items-center gap-2 sm:flex-shrink-0">
                                            <button
                                                id={`complete-order-${order.id}`}
                                                onClick={() => handleComplete(order.id)}
                                                disabled={isLoading}
                                                className="btn-success text-xs flex items-center gap-1.5"
                                            >
                                                {isLoading ? (
                                                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                                )}
                                                Complete
                                            </button>
                                            <button
                                                id={`cancel-order-${order.id}`}
                                                onClick={() => handleCancel(order.id)}
                                                disabled={isLoading}
                                                className="btn-danger text-xs flex items-center gap-1.5"
                                            >
                                                {isLoading ? (
                                                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <XCircle className="w-3.5 h-3.5" />
                                                )}
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
