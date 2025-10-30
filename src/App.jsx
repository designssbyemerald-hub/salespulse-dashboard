import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, ShoppingCart, Award, Calendar } from 'lucide-react';

const revenueData = [
    { month: 'Jan', revenue: 45000, target: 40000 },
    { month: 'Feb', revenue: 52000, target: 45000 },
    { month: 'Mar', revenue: 48000, target: 50000 },
    { month: 'Apr', revenue: 61000, target: 55000 },
    { month: 'May', revenue: 68000, target: 60000 },
    { month: 'Jun', revenue: 75000, target: 65000 },
];

const productData = [
    { name: 'Enterprise Suite', sales: 285000 },
    { name: 'Professional Plan', sales: 198000 },
    { name: 'Starter Pack', sales: 156000 },
    { name: 'Premium Add-ons', sales: 124000 },
];

const regionData = [
    { name: 'North America', value: 385000 },
    { name: 'Europe', value: 298000 },
    { name: 'Asia Pacific', value: 215000 },
    { name: 'Latin America', value: 98000 },
];

const salesReps = [
    { name: 'Sarah Chen', sales: 156000, deals: 23, growth: '+18%' },
    { name: 'Marcus Rodriguez', sales: 142000, deals: 19, growth: '+22%' },
    { name: 'Emily Watson', sales: 138000, deals: 21, growth: '+15%' },
    { name: 'James Kim', sales: 125000, deals: 18, growth: '+12%' },
    { name: 'Alex Thompson', sales: 118000, deals: 16, growth: '+9%' },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
        color: 'white',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
        marginBottom: '32px'
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '8px',
        background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
    },
    subtitle: {
        color: '#94a3b8',
        fontSize: '14px'
    },
    buttonContainer: {
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap'
    },
    button: {
        padding: '8px 16px',
        borderRadius: '8px',
        fontWeight: '500',
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s',
        fontSize: '14px'
    },
    buttonActive: {
        backgroundColor: '#2563eb',
        color: 'white',
        boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)'
    },
    buttonInactive: {
        backgroundColor: '#1e293b',
        color: '#94a3b8'
    },
    grid: {
        display: 'grid',
        gap: '24px',
        marginBottom: '32px'
    },
    grid4: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    },
    grid2: {
        gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))'
    },
    card: {
        background: 'linear-gradient(135deg, #1e293b 0%, rgba(30, 41, 59, 0.5) 100%)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid rgba(71, 85, 105, 0.5)',
        transition: 'border 0.3s'
    },
    kpiCard: {
        display: 'flex',
        flexDirection: 'column'
    },
    kpiHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
    },
    iconBox: {
        padding: '12px',
        borderRadius: '8px',
        display: 'inline-flex'
    },
    badge: {
        color: '#4ade80',
        fontSize: '12px',
        fontWeight: '500'
    },
    kpiLabel: {
        color: '#94a3b8',
        fontSize: '12px',
        marginBottom: '4px'
    },
    kpiValue: {
        fontSize: '28px',
        fontWeight: 'bold'
    },
    chartTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    leaderboardItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px',
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        borderRadius: '8px',
        marginBottom: '16px',
        transition: 'background 0.3s'
    },
    rankBadge: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    },
    footer: {
        textAlign: 'center',
        color: '#64748b',
        fontSize: '12px',
        marginTop: '32px'
    }
};

function SalesDashboard() {
    const [timeRange, setTimeRange] = useState('6m');

    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const avgRevenue = Math.round(totalRevenue / revenueData.length);
    const growth = ((revenueData[5].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);

    const getRankStyle = (index) => {
        if (index === 0) return { backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#fbbf24' };
        if (index === 1) return { backgroundColor: 'rgba(148, 163, 184, 0.2)', color: '#cbd5e1' };
        if (index === 2) return { backgroundColor: 'rgba(249, 115, 22, 0.2)', color: '#fb923c' };
        return { backgroundColor: 'rgba(51, 65, 85, 0.5)', color: '#94a3b8' };
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>SalesPulse Analytics</h1>
                <p style={styles.subtitle}>Real-time business intelligence dashboard</p>
            </div>

            <div style={styles.buttonContainer}>
                {['1m', '3m', '6m', '1y'].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        style={{
                            ...styles.button,
                            ...(timeRange === range ? styles.buttonActive : styles.buttonInactive)
                        }}
                    >
                        {range.toUpperCase()}
                    </button>
                ))}
            </div>

            <div style={{ ...styles.grid, ...styles.grid4 }}>
                <div style={styles.card}>
                    <div style={styles.kpiHeader}>
                        <div style={{ ...styles.iconBox, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
                            <DollarSign size={24} color="#60a5fa" />
                        </div>
                        <span style={styles.badge}>+{growth}%</span>
                    </div>
                    <h3 style={styles.kpiLabel}>Total Revenue</h3>
                    <p style={styles.kpiValue}>${(totalRevenue / 1000).toFixed(0)}K</p>
                </div>

                <div style={styles.card}>
                    <div style={styles.kpiHeader}>
                        <div style={{ ...styles.iconBox, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}>
                            <TrendingUp size={24} color="#a78bfa" />
                        </div>
                        <span style={styles.badge}>+12%</span>
                    </div>
                    <h3 style={styles.kpiLabel}>Avg Monthly</h3>
                    <p style={styles.kpiValue}>${(avgRevenue / 1000).toFixed(0)}K</p>
                </div>

                <div style={styles.card}>
                    <div style={styles.kpiHeader}>
                        <div style={{ ...styles.iconBox, backgroundColor: 'rgba(236, 72, 153, 0.2)' }}>
                            <ShoppingCart size={24} color="#ec4899" />
                        </div>
                        <span style={styles.badge}>+8%</span>
                    </div>
                    <h3 style={styles.kpiLabel}>Total Orders</h3>
                    <p style={styles.kpiValue}>1,247</p>
                </div>

                <div style={styles.card}>
                    <div style={styles.kpiHeader}>
                        <div style={{ ...styles.iconBox, backgroundColor: 'rgba(245, 158, 11, 0.2)' }}>
                            <Users size={24} color="#f59e0b" />
                        </div>
                        <span style={styles.badge}>+24%</span>
                    </div>
                    <h3 style={styles.kpiLabel}>Active Customers</h3>
                    <p style={styles.kpiValue}>892</p>
                </div>
            </div>

            <div style={{ ...styles.grid, ...styles.grid2 }}>
                <div style={styles.card}>
                    <h2 style={styles.chartTitle}>
                        <Calendar size={20} color="#60a5fa" />
                        Revenue Trend
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} />
                            <Line type="monotone" dataKey="target" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div style={styles.card}>
                    <h2 style={styles.chartTitle}>Regional Distribution</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={regionData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={(entry) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {regionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div style={{ ...styles.grid, ...styles.grid2 }}>
                <div style={styles.card}>
                    <h2 style={styles.chartTitle}>Top Products</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={productData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="name" stroke="#9ca3af" angle={-15} textAnchor="end" height={80} />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
                            <Bar dataKey="sales" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div style={styles.card}>
                    <h2 style={styles.chartTitle}>
                        <Award size={20} color="#fbbf24" />
                        Top Performers
                    </h2>
                    <div>
                        {salesReps.map((rep, index) => (
                            <div key={rep.name} style={styles.leaderboardItem}>
                                <div style={{ ...styles.rankBadge, ...getRankStyle(index) }}>
                                    {index + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>{rep.name}</p>
                                    <p style={{ fontSize: '12px', color: '#94a3b8' }}>{rep.deals} deals closed</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>${(rep.sales / 1000).toFixed(0)}K</p>
                                    <p style={{ fontSize: '12px', color: '#4ade80' }}>{rep.growth}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.footer}>
                <p>Last updated: {new Date().toLocaleString()}</p>
            </div>
        </div>
    );
}

export default SalesDashboard;
