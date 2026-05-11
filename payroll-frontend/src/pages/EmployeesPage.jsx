import { useEffect, useState } from 'react';
import { Users, Plus, X, Trash2, Briefcase } from 'lucide-react';
import { getAllEmployees, createEmployee, deleteEmployee } from '../api/employeeService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorAlert from '../components/ErrorAlert';

export default function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({ firstName: '', lastName: '', role: '' });

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllEmployees();
            setEmployees(data);
        } catch (err) {
            setError(err.message || 'Failed to load employees');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.firstName.trim() || !form.lastName.trim() || !form.role.trim()) return;
        setSubmitting(true);
        try {
            await createEmployee({
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim(),
                role: form.role.trim(),
            });
            setForm({ firstName: '', lastName: '', role: '' });
            setShowForm(false);
            await fetchEmployees();
        } catch (err) {
            setError(err.message || 'Failed to create employee');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to remove this employee?')) return;
        try {
            await deleteEmployee(id);
            setEmployees((prev) => prev.filter((e) => e.id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete employee');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
                            <Users className="w-5 h-5 text-white" />
                        </div>
                        Employee Management
                    </h1>
                    <p className="mt-1 text-sm text-surface-400 ml-[52px]">
                        Manage your team members and their roles
                    </p>
                </div>
                <button
                    id="add-employee-btn"
                    onClick={() => setShowForm(!showForm)}
                    className={showForm ? 'btn-secondary flex items-center gap-2' : 'btn-primary flex items-center gap-2'}
                >
                    {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    {showForm ? 'Cancel' : 'Add Employee'}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <form
                    onSubmit={handleSubmit}
                    className="glass-card p-6 animate-slide-up space-y-4"
                >
                    <h3 className="text-lg font-semibold text-white">New Employee</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-surface-400 mb-1.5 uppercase tracking-wider">
                                First Name
                            </label>
                            <input
                                id="input-firstname"
                                type="text"
                                className="input-field"
                                placeholder="e.g. John"
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-surface-400 mb-1.5 uppercase tracking-wider">
                                Last Name
                            </label>
                            <input
                                id="input-lastname"
                                type="text"
                                className="input-field"
                                placeholder="e.g. Doe"
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-surface-400 mb-1.5 uppercase tracking-wider">
                                Role
                            </label>
                            <input
                                id="input-role"
                                type="text"
                                className="input-field"
                                placeholder="e.g. Java Developer"
                                value={form.role}
                                onChange={(e) => setForm({ ...form, role: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            id="submit-employee-btn"
                            type="submit"
                            disabled={submitting}
                            className="btn-primary flex items-center gap-2"
                        >
                            {submitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4" />
                                    Save Employee
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}

            {/* Error */}
            {error && <ErrorAlert message={error} onRetry={fetchEmployees} />}

            {/* List */}
            {loading ? (
                <LoadingSpinner message="Fetching employees..." />
            ) : employees.length === 0 ? (
                <div className="glass-card p-12 text-center">
                    <Users className="w-12 h-12 text-surface-600 mx-auto" />
                    <p className="mt-4 text-surface-400 font-medium">No employees found</p>
                    <p className="mt-1 text-sm text-surface-500">Add your first employee to get started.</p>
                </div>
            ) : (
                <div className="grid gap-3">
                    {employees.map((emp, i) => (
                        <div
                            key={emp.id ?? i}
                            className="glass-card-hover p-5 flex items-center justify-between animate-slide-up"
                            style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
                        >
                            <div className="flex items-center gap-4">
                                {/* Avatar */}
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center shadow-md shadow-brand-500/20">
                                    <span className="text-sm font-bold text-white">
                                        {(emp.firstName?.[0] ?? '').toUpperCase()}{(emp.lastName?.[0] ?? '').toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-white">
                                        {emp.firstName} {emp.lastName}
                                    </h4>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <Briefcase className="w-3 h-3 text-surface-500" />
                                        <span className="text-xs text-surface-400">{emp.role}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-surface-500 mr-2">ID: {emp.id}</span>
                                <button
                                    onClick={() => handleDelete(emp.id)}
                                    className="p-2 rounded-lg hover:bg-red-500/10 text-surface-500 hover:text-red-400 transition-all duration-300"
                                    title="Delete employee"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
