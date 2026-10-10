import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Activity,
  History,
  Sliders,
  Sprout,
  Settings,
  HelpCircle,
  ChevronDown,
  Bell,
  Calendar,
  Download,
  Clock,
  Heart,
  Armchair,
  CheckCircle2,
  AlertCircle,
  Coffee,
  Battery,
  Bluetooth,
  MoreHorizontal,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import './App.css';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('overview');

  // Cushion Connection State
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(82);

  // Simulation State & Presets
  const [posturePreset, setPosturePreset] = useState('balanced'); // 'balanced', 'left', 'right', 'slouch'
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [simTick, setSimTick] = useState(0);

  // Settings Toggles
  const [postureNudges, setPostureNudges] = useState(true);
  const [breakReminders, setBreakReminders] = useState(true);

  // Trend timeframe
  const [trendRange, setTrendRange] = useState('today'); // 'today' | 'week'

  // Break countdown
  const [breakMinutes, setBreakMinutes] = useState(8);
  const [breakInterval, setBreakInterval] = useState(50);

  // Modals & Popups
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCalibrateModal, setShowCalibrateModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0); // 0: ready, 1: running, 2: done
  const [toastMessage, setToastMessage] = useState(null);

  // Live Micro-movement Simulation
  useEffect(() => {
    if (!isLiveSimulating || !isConnected) return;
    const interval = setInterval(() => {
      setSimTick((prev) => (prev + 1) % 100);
    }, 2000);
    return () => clearInterval(interval);
  }, [isLiveSimulating, isConnected]);

  // Compute live dynamic stats based on preset and micro-oscillation
  const getSimulatedMetrics = () => {
    if (!isConnected) {
      return {
        leftPct: 0,
        rightPct: 0,
        peakKpa: 0,
        statusText: 'Cushion disconnected',
        balanceCategory: 'Offline',
        score: 0,
        leftGlow: 'transparent',
        rightGlow: 'transparent',
        isWarning: false
      };
    }

    const microShift = Math.sin(simTick) * 1.5;

    switch (posturePreset) {
      case 'left':
        return {
          leftPct: Math.round(72 + microShift),
          rightPct: Math.round(28 - microShift),
          peakKpa: (6.2 + (microShift * 0.1)).toFixed(1),
          statusText: 'Higher pressure on left hip. Consider balancing weight.',
          balanceCategory: 'Leaning Left',
          score: 72,
          leftGlow: 'radial-gradient(circle, #ea580c 0%, #eab308 50%, #84cc16 85%)',
          rightGlow: 'radial-gradient(circle, #84cc16 0%, #a3e635 60%, transparent 100%)',
          isWarning: true
        };
      case 'right':
        return {
          leftPct: Math.round(26 + microShift),
          rightPct: Math.round(74 - microShift),
          peakKpa: (6.4 + (microShift * 0.1)).toFixed(1),
          statusText: 'Higher pressure on right hip. Re-align posture.',
          balanceCategory: 'Leaning Right',
          score: 70,
          leftGlow: 'radial-gradient(circle, #84cc16 0%, #a3e635 60%, transparent 100%)',
          rightGlow: 'radial-gradient(circle, #ea580c 0%, #eab308 50%, #84cc16 85%)',
          isWarning: true
        };
      case 'slouch':
        return {
          leftPct: Math.round(50 + microShift),
          rightPct: Math.round(50 - microShift),
          peakKpa: (7.5 + (microShift * 0.1)).toFixed(1),
          statusText: 'Posterior pelvic tilt detected. Sacral pressure is elevated.',
          balanceCategory: 'Slouching / Back Heavy',
          score: 61,
          leftGlow: 'radial-gradient(circle, #f59e0b 0%, #84cc16 70%, transparent 100%)',
          rightGlow: 'radial-gradient(circle, #f59e0b 0%, #84cc16 70%, transparent 100%)',
          isWarning: true
        };
      case 'balanced':
      default:
        return {
          leftPct: Math.round(48 + microShift),
          rightPct: Math.round(52 - microShift),
          peakKpa: (4.2 + (microShift * 0.05)).toFixed(1),
          statusText: 'Looking balanced. No high-pressure areas detected. Updates every 2s',
          balanceCategory: 'Evenly balanced',
          score: 86,
          leftGlow: 'radial-gradient(circle, #facc15 0%, #84cc16 55%, transparent 85%)',
          rightGlow: 'radial-gradient(circle, #facc15 0%, #84cc16 55%, transparent 85%)',
          isWarning: false
        };
    }
  };

  const currentStats = getSimulatedMetrics();

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Calibration action handler
  const handleStartCalibration = () => {
    setCalibrationStep(1);
    setTimeout(() => {
      setCalibrationStep(2);
      showToast('Cushion zero-point calibrated successfully');
      setTimeout(() => {
        setShowCalibrateModal(false);
        setCalibrationStep(0);
      }, 1400);
    }, 2200);
  };

  // Export report handler
  const handleDownloadReport = () => {
    const reportContent = `
=========================================
WAVY COMPANY - SMART CUSHION POSTURE REPORT
Date: Today, October 12
User: Alex Lee (Personal workspace)
Device: Wavy Cushion One (Battery: ${batteryLevel}%)
=========================================

SUMMARY METRICS:
- Overall Posture Score: ${currentStats.score} / 100
- Current Sitting Session: 42 minutes
- Total Sitting Today: 2 hours 18 minutes (3 sessions · 2 breaks taken)
- Comfort Level: 92%
- Current Weight Balance: Left ${currentStats.leftPct}% | Right ${currentStats.rightPct}%
- Peak Pressure: ${currentStats.peakKpa} kPa

POSTURE BREAKDOWN:
- Good Posture: 86%
- Shifting/Adjustment: 10%
- Leaning/Asymmetry: 4%

RECOMMENDATIONS:
1. Maintain balanced weight on both ischial tuberosities.
2. Keep break schedule active (current: every ${breakInterval} min).
3. Lumbar support engaged, shoulders relaxed.

Report generated by WAVY COMPANY Smart Cushion Dashboard.
=========================================
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([reportContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Wavy_Company_Posture_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setShowExportModal(false);
    showToast('Posture report downloaded');
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notice">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-top">
          {/* Brand */}
          <div className="brand-header">
            <svg
              className="brand-icon"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 12c4-6 8 6 12 0s8 6 12 0" />
              <path d="M4 20c4-6 8 6 12 0s8 6 12 0" />
            </svg>
            <span className="brand-name">WAVY COMPANY</span>
          </div>

          {/* Navigation Links */}
          <div className="sidebar-nav-section">
            <div className="sidebar-section-title">Your workspace</div>

            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <div className="nav-item-left">
                <LayoutDashboard size={18} />
                <span>Overview</span>
              </div>
              {activeTab === 'overview' && <div className="nav-dot" />}
            </button>

            <button
              className={`nav-item ${activeTab === 'insights' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('insights');
                showToast('Viewing Posture insights');
              }}
            >
              <div className="nav-item-left">
                <Activity size={18} />
                <span>Posture insights</span>
              </div>
            </button>

            <button
              className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('history');
                showToast('Viewing Sitting history');
              }}
            >
              <div className="nav-item-left">
                <History size={18} />
                <span>Sitting history</span>
              </div>
            </button>

            <button
              className={`nav-item ${activeTab === 'mycushion' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('mycushion');
                showToast('Viewing My cushion device');
              }}
            >
              <div className="nav-item-left">
                <Sliders size={18} />
                <span>My cushion</span>
              </div>
            </button>
          </div>

          {/* Tip Card */}
          <div className="sidebar-tip-card">
            <div className="tip-icon-wrap">
              <Sprout size={20} />
            </div>
            <h4 className="tip-title">Small shifts. Big comfort.</h4>
            <p className="tip-desc">
              A little movement goes a long way. Your body will thank you.
            </p>
            <button
              className="tip-link"
              onClick={() => setShowTipsModal(true)}
            >
              <span>Explore sitting tips</span>
              <span>↗</span>
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() => showToast('Settings opened')}
          >
            <div className="nav-item-left">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </button>

          <button
            className="nav-item"
            onClick={() => showToast('Help & support center')}
          >
            <div className="nav-item-left">
              <HelpCircle size={18} />
              <span>Help & support</span>
            </div>
          </button>

          {/* User Profile */}
          <div className="user-profile">
            <div className="user-profile-left">
              <div className="user-avatar">AL</div>
              <div className="user-info">
                <span className="user-name">Alex Lee</span>
                <span className="user-role">Personal workspace</span>
              </div>
            </div>
            <ChevronDown size={14} color="#88938a" />
          </div>
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <main className="main-wrapper">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="breadcrumb-trail">
            My workspace / <span className="breadcrumb-current">Overview</span>
          </div>

          <div className="header-status-group">
            <button
              className="connection-badge"
              title="Click to toggle cushion connection"
              onClick={() => {
                setIsConnected(!isConnected);
                showToast(!isConnected ? 'Cushion reconnected' : 'Cushion disconnected');
              }}
            >
              <span
                className={`status-dot ${!isConnected ? 'disconnected' : ''}`}
              />
              <span>{isConnected ? 'Cushion connected' : 'Cushion offline'}</span>
            </button>

            <button
              className="icon-button"
              title="Notifications"
              onClick={() => showToast('No unread notifications')}
            >
              <Bell size={18} />
            </button>
          </div>
        </header>

        {/* Hero Page Header */}
        <section className="page-header">
          <div>
            <h1 className="page-title">A better seat for your day.</h1>
            <p className="page-subtitle">
              Good morning, Alex. Let's keep you comfortable and balanced.
            </p>
          </div>

          <div className="page-actions">
            <button
              className="btn-secondary"
              onClick={() => showToast('Viewing date: Today, Oct 12')}
            >
              <Calendar size={15} />
              <span>Today, Oct 12</span>
            </button>

            <button
              className="btn-secondary"
              onClick={() => setShowExportModal(true)}
            >
              <Download size={15} />
              <span>Export report</span>
            </button>
          </div>
        </section>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* ROW 1: 4 Key Metrics */}
          <div className="metrics-row">
            {/* Card 1 */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Current session</span>
                <Clock className="metric-icon" />
              </div>
              <div className="metric-value-wrap">
                <span className="metric-value">42</span>
                <span className="metric-unit">min</span>
              </div>
              <span className="metric-sub">Started at 10:00 AM</span>
            </div>

            {/* Card 2 */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Posture score</span>
                <Activity className="metric-icon" />
              </div>
              <div className="metric-value-wrap">
                <span className="metric-value">{currentStats.score}</span>
                <span className="metric-unit">/ 100</span>
              </div>
              <span className="metric-sub trend-up">
                ↑ 8 points from yesterday
              </span>
            </div>

            {/* Card 3 */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Comfort level</span>
                <Heart className="metric-icon" />
              </div>
              <div className="metric-value-wrap">
                <span className="metric-value">92</span>
                <span className="metric-unit">%</span>
              </div>
              <span className="metric-sub">Comfortable & supported</span>
            </div>

            {/* Card 4 */}
            <div className="metric-card">
              <div className="metric-header">
                <span className="metric-label">Total sitting today</span>
                <Armchair className="metric-icon" />
              </div>
              <div className="metric-value-wrap">
                <span className="metric-value">2h 18</span>
                <span className="metric-unit">min</span>
              </div>
              <span className="metric-sub">3 sessions · 2 breaks taken</span>
            </div>
          </div>

          {/* ROW 2: Middle Section (Pressure Distribution + Right Stacked Cards) */}
          <div className="grid-row-two-col">
            {/* Left: Pressure Distribution */}
            <div className="card">
              <div className="card-header-flex">
                <div>
                  <h2 className="card-title">Pressure distribution</h2>
                  <p className="card-subtitle">
                    A little awareness. A more balanced seat.
                  </p>
                </div>
                <div className="live-pill">
                  <span className="live-dot" />
                  <span>Live</span>
                </div>
              </div>

              {/* Graphic + Side Numbers */}
              <div className="pressure-display-grid">
                {/* Visual Cushion Stage */}
                <div className="cushion-stage">
                  <div className="pos-label back">BACK</div>
                  <div className="pos-label front">FRONT</div>
                  <div className="pos-label left">L</div>
                  <div className="pos-label right">R</div>

                  <div className="cushion-contour">
                    <div className="cushion-center-line" />

                    {/* Left Sit Bone Heatmap Blob */}
                    <div
                      className="heat-node"
                      style={{
                        background: currentStats.leftGlow,
                        transform: `scale(${0.9 + (currentStats.leftPct / 100) * 0.4})`
                      }}
                    />

                    {/* Right Sit Bone Heatmap Blob */}
                    <div
                      className="heat-node"
                      style={{
                        background: currentStats.rightGlow,
                        transform: `scale(${0.9 + (currentStats.rightPct / 100) * 0.4})`
                      }}
                    />
                  </div>
                </div>

                {/* Side Stats */}
                <div className="pressure-stats">
                  <div>
                    <div className="balance-title-sub">Weight balance</div>
                    <div className="balance-status-heading">
                      {currentStats.balanceCategory}
                    </div>

                    <div className="split-bar-wrap">
                      <div className="split-bar-labels">
                        <span>Left {currentStats.leftPct}%</span>
                        <span>{currentStats.rightPct}% Right</span>
                      </div>
                      <div className="split-track">
                        <div
                          className="split-fill-left"
                          style={{ width: `${currentStats.leftPct}%` }}
                        />
                        <div
                          className="split-fill-right"
                          style={{ width: `${currentStats.rightPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="balance-title-sub">Peak pressure</div>
                    <div className="peak-pressure-val">
                      {currentStats.peakKpa} kPa
                    </div>
                    <div className="peak-pressure-desc">
                      Within your comfort range
                    </div>
                  </div>
                </div>
              </div>

              {/* Cushion Heat Indicator Legend */}
              <div className="heat-legend-bar">
                <span>Low pressure</span>
                <div className="heat-gradient-preview" />
                <span>High</span>
              </div>

              {/* Status Banner */}
              <div className="cushion-banner-status">
                {currentStats.isWarning ? (
                  <AlertCircle size={17} color="#d97706" />
                ) : (
                  <CheckCircle2 className="banner-check-icon" />
                )}
                <span>{currentStats.statusText}</span>
                <span className="banner-subtle">
                  {isLiveSimulating ? 'Live updates active' : 'Simulation paused'}
                </span>
              </div>

              {/* Simulation Toolbar for Testing */}
              <div className="sim-controls-toolbar">
                <span className="sim-label">Simulate sitting test:</span>
                <div className="sim-btn-group">
                  <button
                    className={`btn-pill-mode ${posturePreset === 'balanced' ? 'active' : ''}`}
                    onClick={() => {
                      setPosturePreset('balanced');
                      showToast('Posture: Balanced alignment');
                    }}
                  >
                    Balanced
                  </button>
                  <button
                    className={`btn-pill-mode ${posturePreset === 'left' ? 'active' : ''}`}
                    onClick={() => {
                      setPosturePreset('left');
                      showToast('Simulating: Leaning Left');
                    }}
                  >
                    Leaning Left
                  </button>
                  <button
                    className={`btn-pill-mode ${posturePreset === 'right' ? 'active' : ''}`}
                    onClick={() => {
                      setPosturePreset('right');
                      showToast('Simulating: Leaning Right');
                    }}
                  >
                    Leaning Right
                  </button>
                  <button
                    className={`btn-pill-mode ${posturePreset === 'slouch' ? 'active' : ''}`}
                    onClick={() => {
                      setPosturePreset('slouch');
                      showToast('Simulating: Slouching posture');
                    }}
                  >
                    Slouching
                  </button>
                  <button
                    className="btn-pill-mode"
                    title={isLiveSimulating ? 'Pause micro oscillations' : 'Resume micro oscillations'}
                    onClick={() => setIsLiveSimulating(!isLiveSimulating)}
                  >
                    {isLiveSimulating ? <Pause size={12} /> : <Play size={12} />}
                    <span style={{ marginLeft: 4 }}>
                      {isLiveSimulating ? 'Pause' : 'Resume'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Stacked Cards */}
            <div className="right-stacked-col">
              {/* Card 1: Your Posture, Right Now */}
              <div className="posture-now-card">
                <div className="posture-now-header">
                  <h3>Your posture, right now</h3>
                  <HelpCircle size={16} color="#88938a" />
                </div>

                <div className="posture-now-body">
                  <div className="posture-avatar-box">
                    <Armchair size={28} />
                  </div>
                  <div className="posture-now-info">
                    <h4>
                      {posturePreset === 'balanced'
                        ? 'Sitting well'
                        : posturePreset === 'left'
                        ? 'Leaning left'
                        : posturePreset === 'right'
                        ? 'Leaning right'
                        : 'Slouch detected'}
                    </h4>
                    <p>
                      {posturePreset === 'balanced'
                        ? "You're upright and centered. Keep your shoulders relaxed."
                        : posturePreset === 'left'
                        ? 'Left sit-bone taking 72% weight. Tilt slightly right.'
                        : posturePreset === 'right'
                        ? 'Right pelvic tilt observed. Align your spine.'
                        : 'Pressure shifted back to sacrum. Sit back into lumbar curve.'}
                    </p>
                    <span className="posture-now-meta">
                      Maintained for the last 12 minutes
                    </span>
                  </div>
                </div>
              </div>

              {/* Card 2: A Moment to Move */}
              <div className="break-reminder-card">
                <div className="break-card-top">
                  <div className="break-icon-title">
                    <Coffee size={18} color="#2a4737" />
                    <span>A moment to move</span>
                  </div>
                  <span className="reminders-badge">
                    {breakReminders ? 'REMINDERS ON' : 'PAUSED'}
                  </span>
                </div>

                <div className="break-time-highlight">
                  {breakMinutes} min <span>until your next break</span>
                </div>

                <p className="break-desc">
                  Stand up, stretch, or take a short walk. Two minutes can make a
                  difference.
                </p>

                <div className="break-progress-track">
                  <div
                    className="break-progress-bar"
                    style={{
                      width: `${((breakInterval - breakMinutes) / breakInterval) * 100}%`
                    }}
                  />
                </div>

                <div className="break-actions">
                  <button
                    className="btn-break-now"
                    onClick={() => {
                      setBreakMinutes(breakInterval);
                      showToast('Break session recorded! Timer reset.');
                    }}
                  >
                    Take a break now
                  </button>
                  <button
                    className="btn-adjust-link"
                    onClick={() => setShowReminderModal(true)}
                  >
                    Adjust reminder
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 3: Bottom Section (Posture Trends + My Cushion) */}
          <div className="grid-row-two-col">
            {/* Left: Posture Trends */}
            <div className="card">
              <div className="card-header-flex">
                <div>
                  <h2 className="card-title">Posture trends</h2>
                  <p className="card-subtitle">Current session</p>
                </div>

                <div className="trend-toggle-tabs">
                  <button
                    className={`tab-pill ${trendRange === 'today' ? 'active' : ''}`}
                    onClick={() => setTrendRange('today')}
                  >
                    Today
                  </button>
                  <button
                    className={`tab-pill ${trendRange === 'week' ? 'active' : ''}`}
                    onClick={() => setTrendRange('week')}
                  >
                    Week
                  </button>
                </div>
              </div>

              {/* Interactive SVG Chart */}
              <div className="chart-container">
                <svg
                  viewBox="0 0 540 140"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2e4d3d" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#2e4d3d" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid guidelines */}
                  <line x1="20" y1="20" x2="520" y2="20" stroke="#ecefe9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="65" x2="520" y2="65" stroke="#ecefe9" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="110" x2="520" y2="110" stroke="#ecefe9" strokeWidth="1" strokeDasharray="3 3" />

                  {/* Y Axis Guide numbers */}
                  <text x="5" y="24" fontSize="10" fill="#a0aba3">100</text>
                  <text x="10" y="69" fontSize="10" fill="#a0aba3">75</text>
                  <text x="10" y="114" fontSize="10" fill="#a0aba3">50</text>

                  {/* Area fill */}
                  <path
                    d="M 30 115 C 60 110, 80 85, 120 75 C 160 65, 180 95, 220 70 C 260 50, 280 80, 320 85 C 360 90, 400 50, 440 60 C 470 65, 490 68, 510 68 L 510 130 L 30 130 Z"
                    fill="url(#trendGradient)"
                  />

                  {/* Smooth spline curve line */}
                  <path
                    d="M 30 115 C 60 110, 80 85, 120 75 C 160 65, 180 95, 220 70 C 260 50, 280 80, 320 85 C 360 90, 400 50, 440 60 C 470 65, 490 68, 510 68"
                    fill="none"
                    stroke="#2e4d3d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* End active node and badge */}
                  <circle cx="510" cy="68" r="4.5" fill="#2e4d3d" />

                  {/* Time stamps */}
                  <text x="30" y="136" fontSize="10.5" fill="#88938a">10:00</text>
                  <text x="190" y="136" fontSize="10.5" fill="#88938a">10:15</text>
                  <text x="350" y="136" fontSize="10.5" fill="#88938a">10:30</text>
                  <text x="495" y="136" fontSize="10.5" fill="#88938a">Now</text>
                </svg>
              </div>

              {/* Breakdown Legend */}
              <div className="trend-stats-footer">
                <div className="trend-legend-item">
                  <span className="legend-dot green" />
                  <span>Good posture</span>
                  <span className="legend-val">86%</span>
                </div>
                <div className="trend-legend-item">
                  <span className="legend-dot gray" />
                  <span>Shifting</span>
                  <span className="legend-val">10%</span>
                </div>
                <div className="trend-legend-item">
                  <span className="legend-dot amber" />
                  <span>Leaning</span>
                  <span className="legend-val">4%</span>
                </div>
              </div>
            </div>

            {/* Right: My Cushion Device Card */}
            <div className="card">
              <div className="device-header">
                <h2 className="card-title">My cushion</h2>
                <button
                  className="icon-button"
                  style={{ border: 'none' }}
                  onClick={() => showToast('Wavy One options')}
                >
                  <MoreHorizontal size={18} />
                </button>
              </div>

              {/* Hardware Device Snippet */}
              <div className="device-snippet">
                <div className="device-cushion-icon">
                  <Armchair size={22} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="device-title">Wavy Cushion One</div>
                  <div className="device-status">
                    {isConnected ? 'Connected via Bluetooth' : 'Offline'}
                  </div>
                </div>
                <div className="battery-tag">
                  <Battery size={16} />
                  <span>{batteryLevel}%</span>
                </div>
              </div>

              {/* Toggles */}
              <div className="device-toggles-list">
                <div className="device-toggle-row">
                  <div>
                    <div className="toggle-title">Posture nudges</div>
                    <div className="toggle-desc">
                      A gentle vibration when you lean
                    </div>
                  </div>
                  <label className="switch-ui">
                    <input
                      type="checkbox"
                      checked={postureNudges}
                      onChange={(e) => {
                        setPostureNudges(e.target.checked);
                        showToast(
                          e.target.checked
                            ? 'Vibration nudges enabled'
                            : 'Vibration nudges disabled'
                        );
                      }}
                    />
                    <span className="slider-ui" />
                  </label>
                </div>

                <div className="device-toggle-row">
                  <div>
                    <div className="toggle-title">Break reminders</div>
                    <div className="toggle-desc">
                      Every {breakInterval} minutes of sitting
                    </div>
                  </div>
                  <label className="switch-ui">
                    <input
                      type="checkbox"
                      checked={breakReminders}
                      onChange={(e) => {
                        setBreakReminders(e.target.checked);
                        showToast(
                          e.target.checked
                            ? 'Break reminders turned on'
                            : 'Break reminders paused'
                        );
                      }}
                    />
                    <span className="slider-ui" />
                  </label>
                </div>
              </div>

              {/* Device Footer */}
              <div className="device-card-footer">
                <button
                  className="btn-calibrate"
                  onClick={() => setShowCalibrateModal(true)}
                >
                  <RotateCcw size={14} />
                  <span>Calibrate cushion</span>
                </button>

                <button
                  className="device-settings-link"
                  onClick={() => showToast('Opening hardware configuration')}
                >
                  <span>Device settings</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* MODAL: Calibrate Cushion */}
      {showCalibrateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCalibrateModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Calibrate Wavy Cushion One</h3>
              <button
                className="icon-button"
                onClick={() => setShowCalibrateModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 12 }}>
                Please sit comfortably upright on the center of the cushion with
                both feet flat on the floor before calibrating.
              </p>
              {calibrationStep === 1 && (
                <div
                  style={{
                    background: '#f4f6f0',
                    padding: 16,
                    borderRadius: 10,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#2a4737'
                  }}
                >
                  Calibrating pressure sensors... (stay still)
                </div>
              )}
              {calibrationStep === 2 && (
                <div
                  style={{
                    background: '#e3ebd8',
                    padding: 16,
                    borderRadius: 10,
                    textAlign: 'center',
                    fontWeight: 700,
                    color: '#2a4737'
                  }}
                >
                  ✓ Calibration complete! Neutral zero baseline set.
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowCalibrateModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                disabled={calibrationStep === 1}
                onClick={handleStartCalibration}
              >
                {calibrationStep === 1 ? 'Calibrating...' : 'Start Calibration'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Sitting Tips */}
      {showTipsModal && (
        <div className="modal-overlay" onClick={() => setShowTipsModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Ergonomic Sitting Tips</h3>
              <button
                className="icon-button"
                onClick={() => setShowTipsModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  marginTop: 6
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18 }}>🧘‍♂️</span>
                  <div>
                    <strong>The 90-90-90 Rule:</strong>
                    <div style={{ color: '#5c6760', fontSize: 12.5 }}>
                      Keep elbows, hips, and knees bent at approximately 90
                      degrees with feet flat on the floor.
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18 }}>⚖️</span>
                  <div>
                    <strong>Balanced Sit Bones:</strong>
                    <div style={{ color: '#5c6760', fontSize: 12.5 }}>
                      Distribute body weight equally across both sides of the
                      cushion to avoid scoliosis strain.
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18 }}>🚶‍♀️</span>
                  <div>
                    <strong>Micro Movement Breaks:</strong>
                    <div style={{ color: '#5c6760', fontSize: 12.5 }}>
                      Every 50 minutes, stand up and walk for 2 minutes to restore
                      circulation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => setShowTipsModal(false)}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Adjust Reminder */}
      {showReminderModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowReminderModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Adjust Break Reminder</h3>
              <button
                className="icon-button"
                onClick={() => setShowReminderModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 14 }}>
                Choose how often WAVY COMPANY cushion should notify you to stand and stretch:
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[30, 45, 50, 60].map((mins) => (
                  <button
                    key={mins}
                    className={`btn-pill-mode ${breakInterval === mins ? 'active' : ''}`}
                    onClick={() => {
                      setBreakInterval(mins);
                      setBreakMinutes(mins);
                    }}
                    style={{ padding: '8px 16px', fontSize: 13 }}
                  >
                    Every {mins} min
                  </button>
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  setShowReminderModal(false);
                  showToast(`Break reminder updated to every ${breakInterval} min`);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Export Report */}
      {showExportModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowExportModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Export Posture Report</h3>
              <button
                className="icon-button"
                onClick={() => setShowExportModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 12 }}>
                Export a detailed summary of today's posture session for your
                ergonomics records or health tracking.
              </p>
              <div
                style={{
                  background: '#f7f9f5',
                  padding: 14,
                  borderRadius: 10,
                  border: '1px solid #e3e6de',
                  fontSize: 12.5,
                  lineHeight: 1.6
                }}
              >
                <div>📅 <strong>Date:</strong> Today, Oct 12</div>
                <div>⏱️ <strong>Session duration:</strong> 42 min (Total: 2h 18m)</div>
                <div>🎯 <strong>Posture score:</strong> {currentStats.score} / 100</div>
                <div>⚖️ <strong>Balance:</strong> Left {currentStats.leftPct}% / Right {currentStats.rightPct}%</div>
                <div>🔋 <strong>Cushion Battery:</strong> {batteryLevel}%</div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowExportModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleDownloadReport}
              >
                <Download size={14} />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
