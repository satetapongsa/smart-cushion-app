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
  RotateCcw,
  TrendingUp,
  Award,
  Zap,
  ShieldCheck,
  Filter,
  BarChart2,
  PieChart,
  RefreshCw,
  Info,
  Thermometer,
  Wind,
  Flame,
  AlertTriangle,
  Smile,
  Compass,
  User,
  LogOut,
  ExternalLink
} from 'lucide-react';
import './App.css';

export default function App() {
  // Navigation State: 'overview' | 'insights' | 'history' | 'mycushion'
  const [activeTab, setActiveTab] = useState('overview');

  // Cushion Connection State
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(82);

  // Simulation State & Presets: 'balanced', 'left', 'right', 'slouch', 'fart', 'hot', 'fatigue'
  const [posturePreset, setPosturePreset] = useState('balanced');
  const [isLiveSimulating, setIsLiveSimulating] = useState(true);
  const [simTick, setSimTick] = useState(0);

  // Settings Toggles
  const [postureNudges, setPostureNudges] = useState(true);
  const [breakReminders, setBreakReminders] = useState(true);
  const [gasDetectionActive, setGasDetectionActive] = useState(true);
  const [thermalReliefActive, setThermalReliefActive] = useState(true);
  const [ledBrightness, setLedBrightness] = useState(60);
  const [hapticIntensity, setHapticIntensity] = useState('medium'); // 'soft', 'medium', 'firm'

  // Trend timeframe
  const [trendRange, setTrendRange] = useState('today'); // 'today' | 'week'
  const [historyFilter, setHistoryFilter] = useState('all'); // 'all', 'great', 'needs_work'

  // Break countdown
  const [breakMinutes, setBreakMinutes] = useState(8);
  const [breakInterval, setBreakInterval] = useState(50);

  // Modals & Popups
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCalibrateModal, setShowCalibrateModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0); // 0: ready, 1: running, 2: done
  const [toastMessage, setToastMessage] = useState(null);

  // Gas emission counter for session
  const [gasEventsCount, setGasEventsCount] = useState(2);

  // Auto-Random 1-Second Mode: In-browser live telemetry mockup stream without database
  const [autoRandomMode, setAutoRandomMode] = useState(true);

  // Real-time 1-Second Rolling Chart Buffer (14 data points representing current time window)
  const [realtimeScores, setRealtimeScores] = useState([
    84, 82, 85, 87, 86, 88, 85, 83, 86, 87, 85, 84, 86, 86
  ]);

  // Live Micro-movement & 1-Second Real-Time Telemetry Stream
  useEffect(() => {
    if (!isLiveSimulating || !isConnected) return;
    const interval = setInterval(() => {
      setSimTick((prev) => (prev + 1) % 10000);
      
      // Update real-time 1-second rolling graph with small stochastic jitter
      setRealtimeScores((prev) => {
        const lastScore = prev[prev.length - 1] || 85;
        // Jitter by +/- 1 to 3 points, bounded between 55 and 98
        const delta = Math.round((Math.random() - 0.5) * 5);
        const nextScore = Math.min(98, Math.max(55, lastScore + delta));
        return [...prev.slice(1), nextScore];
      });

      // Every 1 second when autoRandomMode is active, periodically transition seating dynamics
      if (autoRandomMode && Math.random() < 0.22) {
        const scenarios = ['balanced', 'balanced', 'left', 'right', 'slouch', 'hot', 'fatigue', 'fart'];
        const randomChoice = scenarios[Math.floor(Math.random() * scenarios.length)];
        setPosturePreset(randomChoice);
        if (randomChoice === 'fart') {
          setGasEventsCount((c) => c + 1);
        }
      }
    }, 1000); // 1-second pulse!
    return () => clearInterval(interval);
  }, [isLiveSimulating, isConnected, autoRandomMode]);

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
        sacralGlow: 'transparent',
        isWarning: false,
        seatTemp: 0,
        gluteFatigue: 0,
        gasDetected: false,
        gasPpm: 0,
        comfortLevel: 0,
        fitStatus: 'Disconnected',
        fitColor: '#88938a',
        quadrantBias: 'None'
      };
    }

    const microShift = Math.sin(simTick) * 1.5;

    switch (posturePreset) {
      case 'fart':
        return {
          leftPct: Math.round(49 + microShift),
          rightPct: Math.round(51 - microShift),
          peakKpa: (4.4 + microShift * 0.05).toFixed(1),
          statusText: 'Bio-gas spike detected (H2S/CH4 420 ppm). Ventilating active chamber.',
          balanceCategory: 'Gas Emission Detected',
          score: 80,
          leftGlow: 'radial-gradient(circle, #eab308 0%, #84cc16 55%, transparent 85%)',
          rightGlow: 'radial-gradient(circle, #eab308 0%, #84cc16 55%, transparent 85%)',
          sacralGlow: 'radial-gradient(circle, #10b981 0%, #34d399 50%, transparent 80%)',
          isWarning: true,
          seatTemp: (36.9 + Math.sin(simTick) * 0.1).toFixed(1),
          gluteFatigue: 42,
          gasDetected: true,
          gasPpm: 420,
          comfortLevel: 84,
          fitStatus: 'Even Fit (Aerated)',
          fitColor: '#10b981',
          quadrantBias: 'Mid-Perineal Outflow'
        };

      case 'hot':
        return {
          leftPct: Math.round(48 + microShift),
          rightPct: Math.round(52 - microShift),
          peakKpa: (4.8 + microShift * 0.05).toFixed(1),
          statusText: 'Gluteal contact temperature elevated (38.2°C). Thermal micro-circulation alert.',
          balanceCategory: 'Heat Trap / Overheating',
          score: 75,
          leftGlow: 'radial-gradient(circle, #f97316 0%, #ef4444 60%, transparent 90%)',
          rightGlow: 'radial-gradient(circle, #f97316 0%, #ef4444 60%, transparent 90%)',
          sacralGlow: 'radial-gradient(circle, #ef4444 0%, #f97316 60%, transparent 90%)',
          isWarning: true,
          seatTemp: (38.2 + Math.sin(simTick) * 0.1).toFixed(1),
          gluteFatigue: 78,
          gasDetected: false,
          gasPpm: 25,
          comfortLevel: 68,
          fitStatus: 'Heat Stagnation',
          fitColor: '#ef4444',
          quadrantBias: 'Ischial Bilateral Core'
        };

      case 'fatigue':
        return {
          leftPct: Math.round(56 + microShift),
          rightPct: Math.round(44 - microShift),
          peakKpa: (6.9 + microShift * 0.08).toFixed(1),
          statusText: 'Severe gluteal fatigue & vascular numbness threshold (84%). Sit bone decompression advised.',
          balanceCategory: 'Gluteal Muscle Fatigue',
          score: 64,
          leftGlow: 'radial-gradient(circle, #ea580c 0%, #dc2626 65%, transparent 90%)',
          rightGlow: 'radial-gradient(circle, #f59e0b 0%, #84cc16 65%, transparent 90%)',
          sacralGlow: 'radial-gradient(circle, #f59e0b 0%, transparent 75%)',
          isWarning: true,
          seatTemp: (37.6 + Math.sin(simTick) * 0.1).toFixed(1),
          gluteFatigue: 84,
          gasDetected: false,
          gasPpm: 32,
          comfortLevel: 58,
          fitStatus: 'Deep Muscle Strain',
          fitColor: '#ea580c',
          quadrantBias: 'Left Piriformis Bias'
        };

      case 'left':
        return {
          leftPct: Math.round(72 + microShift),
          rightPct: Math.round(28 - microShift),
          peakKpa: (6.2 + microShift * 0.1).toFixed(1),
          statusText: 'Heavy Left Bias (72%). Pelvis tilted; left gluteus maximus absorbing excessive load.',
          balanceCategory: 'Heavy Left Glute Bias',
          score: 72,
          leftGlow: 'radial-gradient(circle, #ea580c 0%, #eab308 50%, #84cc16 85%)',
          rightGlow: 'radial-gradient(circle, #84cc16 0%, #a3e635 60%, transparent 100%)',
          sacralGlow: 'transparent',
          isWarning: true,
          seatTemp: (36.6 + Math.sin(simTick) * 0.1).toFixed(1),
          gluteFatigue: 62,
          gasDetected: false,
          gasPpm: 22,
          comfortLevel: 74,
          fitStatus: 'Asymmetric Left Pinch',
          fitColor: '#ea580c',
          quadrantBias: 'Posterolateral Left (72%)'
        };

      case 'right':
        return {
          leftPct: Math.round(26 + microShift),
          rightPct: Math.round(74 - microShift),
          peakKpa: (6.4 + microShift * 0.1).toFixed(1),
          statusText: 'Heavy Right Bias (74%). Sciatic compression risk on right ischial tuberosity.',
          balanceCategory: 'Heavy Right Glute Bias',
          score: 70,
          leftGlow: 'radial-gradient(circle, #84cc16 0%, #a3e635 60%, transparent 100%)',
          rightGlow: 'radial-gradient(circle, #ea580c 0%, #eab308 50%, #84cc16 85%)',
          sacralGlow: 'transparent',
          isWarning: true,
          seatTemp: (36.7 + Math.sin(simTick) * 0.1).toFixed(1),
          gluteFatigue: 65,
          gasDetected: false,
          gasPpm: 24,
          comfortLevel: 71,
          fitStatus: 'Asymmetric Right Pinch',
          fitColor: '#ea580c',
          quadrantBias: 'Posterolateral Right (74%)'
        };

      case 'slouch':
        return {
          leftPct: Math.round(50 + microShift),
          rightPct: Math.round(50 - microShift),
          peakKpa: (7.5 + microShift * 0.1).toFixed(1),
          statusText: 'Tailbone & Sacrum Overload. Coccyx receiving 7.5 kPa; disc pressure elevated.',
          balanceCategory: 'Coccyx / Sacral Slouch',
          score: 61,
          leftGlow: 'radial-gradient(circle, #f59e0b 0%, #84cc16 70%, transparent 100%)',
          rightGlow: 'radial-gradient(circle, #f59e0b 0%, #84cc16 70%, transparent 100%)',
          sacralGlow: 'radial-gradient(circle, #dc2626 0%, #f97316 65%, transparent 90%)',
          isWarning: true,
          seatTemp: (37.2 + Math.sin(simTick) * 0.1).toFixed(1),
          gluteFatigue: 76,
          gasDetected: false,
          gasPpm: 28,
          comfortLevel: 62,
          fitStatus: 'Poor Pelvic Fit',
          fitColor: '#dc2626',
          quadrantBias: 'Posterior Sacral Axis'
        };

      case 'balanced':
      default:
        return {
          leftPct: Math.round(48 + microShift),
          rightPct: Math.round(52 - microShift),
          peakKpa: (4.2 + microShift * 0.05).toFixed(1),
          statusText: 'Looking balanced. Even gluteal dispersion, healthy seat temperature.',
          balanceCategory: 'Evenly balanced',
          score: 86,
          leftGlow: 'radial-gradient(circle, #facc15 0%, #84cc16 55%, transparent 85%)',
          rightGlow: 'radial-gradient(circle, #facc15 0%, #84cc16 55%, transparent 85%)',
          sacralGlow: 'transparent',
          isWarning: false,
          seatTemp: (36.4 + Math.sin(simTick) * 0.08).toFixed(1),
          gluteFatigue: 24,
          gasDetected: false,
          gasPpm: 18,
          comfortLevel: 92,
          fitStatus: 'Optimal Ergonomic Fit',
          fitColor: '#2b7a4b',
          quadrantBias: 'Symmetric (48% L / 52% R)'
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

  // Trigger simulated bio-gas vent
  const handleTriggerFartVent = () => {
    setPosturePreset('fart');
    setGasEventsCount((prev) => prev + 1);
    showToast('Air Quality Alert: Bio-gas venting sequence initiated');
  };

  // Export report handler
  const handleDownloadReport = () => {
    const reportContent = `
=========================================
WAVY COMPANY - SMART CUSHION COMPREHENSIVE TELEMETRY REPORT
Date: Today, October 12
User: Alex Lee (Personal workspace)
Device: Wavy Cushion One (Battery: ${batteryLevel}%)
=========================================

BIOMECHANICAL & GLUTEAL METRICS:
- Overall Posture Score: ${currentStats.score} / 100
- Pelvic Weight Balance: Left ${currentStats.leftPct}% | Right ${currentStats.rightPct}%
- Quadrant Load Bias: ${currentStats.quadrantBias}
- Buttock Contact Fit: ${currentStats.fitStatus}
- Peak Ischial Pressure: ${currentStats.peakKpa} kPa

PHYSIOLOGICAL & SENSORY TELEMETRY:
- Contact Surface Temperature: ${currentStats.seatTemp} °C
- Gluteal Fatigue Index: ${currentStats.gluteFatigue} %
- Comfort Index: ${currentStats.comfortLevel} %
- Air Quality / Bio-gas (VOC/H2S): ${currentStats.gasPpm} ppm (Events Today: ${gasEventsCount})
- Sitting Session: 42 min (Total: 2h 18 min)

RECOMMENDATIONS:
1. Maintain weight distribution within 45% - 55% delta.
2. If seat temperature exceeds 37.5°C, stand up for 2 minutes to restore capillary circulation.
3. Keep micro-pore ventilation chamber active.

Report generated by WAVY COMPANY Smart Cushion Platform.
=========================================
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([reportContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Wavy_Company_Glute_Report_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setShowExportModal(false);
    showToast('Telemetry report downloaded');
  };

  // Static / Mock Session History
  const sessionHistory = [
    {
      id: 'sess-1',
      date: 'Today, Oct 12',
      time: '10:00 AM - 10:42 AM',
      duration: '42 min',
      score: 86,
      rating: 'great',
      balance: '48% L / 52% R',
      temp: '36.4°C',
      fatigue: '24%',
      gas: '0 events',
      fit: 'Optimal Fit',
      notes: 'Optimal pelvic alignment and minimal thermal accumulation.'
    },
    {
      id: 'sess-2',
      date: 'Today, Oct 12',
      time: '08:15 AM - 09:51 AM',
      duration: '1h 36 min',
      score: 82,
      rating: 'great',
      balance: '51% L / 49% R',
      temp: '37.1°C',
      fatigue: '48%',
      gas: '1 event (09:12 AM)',
      fit: 'Even Fit',
      notes: 'Gas discharge auto-vented at 09:12 AM. Slight glute fatigue.'
    },
    {
      id: 'sess-3',
      date: 'Yesterday, Oct 11',
      time: '02:10 PM - 04:30 PM',
      duration: '2h 20 min',
      score: 74,
      rating: 'needs_work',
      balance: '64% L / 36% R',
      temp: '37.9°C',
      fatigue: '76%',
      gas: '2 events',
      fit: 'Left Pinch',
      notes: 'High buttock soreness. Heavy left glute bias with thermal trap.'
    },
    {
      id: 'sess-4',
      date: 'Yesterday, Oct 11',
      time: '09:00 AM - 11:15 AM',
      duration: '2h 15 min',
      score: 88,
      rating: 'great',
      balance: '50% L / 50% R',
      temp: '36.5°C',
      fatigue: '32%',
      gas: '0 events',
      fit: 'Optimal Fit',
      notes: 'Excellent symmetric pressure distribution.'
    },
    {
      id: 'sess-5',
      date: 'Wednesday, Oct 10',
      time: '01:30 PM - 03:45 PM',
      duration: '2h 15 min',
      score: 69,
      rating: 'needs_work',
      balance: '58% L / 42% R',
      temp: '38.1°C',
      fatigue: '85%',
      gas: '1 event',
      fit: 'Coccyx Strain',
      notes: 'Severe slouching. Coccyx overpressure and high gluteal stiffness.'
    }
  ];

  const filteredSessions = sessionHistory.filter((item) => {
    if (historyFilter === 'all') return true;
    return item.rating === historyFilter;
  });

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
                showToast('Viewing Posture & Glute insights');
              }}
            >
              <div className="nav-item-left">
                <Activity size={18} />
                <span>Posture insights</span>
              </div>
              {activeTab === 'insights' && <div className="nav-dot" />}
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
              {activeTab === 'history' && <div className="nav-dot" />}
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
              {activeTab === 'mycushion' && <div className="nav-dot" />}
            </button>
          </div>

          {/* Tip Card */}
          <div className="sidebar-tip-card">
            <div className="tip-icon-wrap">
              <Sprout size={20} />
            </div>
            <h4 className="tip-title">Small shifts. Big comfort.</h4>
            <p className="tip-desc">
              Prevent buttock numbness and heat traps with dynamic micro-shifts.
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
            onClick={() => setShowSettingsModal(true)}
          >
            <div className="nav-item-left">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </button>

          <button
            className="nav-item"
            onClick={() => setShowHelpModal(true)}
          >
            <div className="nav-item-left">
              <HelpCircle size={18} />
              <span>Help & support</span>
            </div>
          </button>

          {/* User Profile */}
          <div
            className="user-profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Click to manage profile"
          >
            <div className="user-profile-left">
              <div className="user-avatar" style={{ background: '#2a4737', color: '#ffffff' }}>WC</div>
              <div className="user-info">
                <span className="user-name">wavy@gmail.com</span>
                <span className="user-role">WAVY COMPANY</span>
              </div>
            </div>
            <ChevronDown size={14} color="#88938a" />
          </div>

          {/* Profile Menu Popover */}
          {showProfileMenu && (
            <div className="profile-popover" onClick={(e) => e.stopPropagation()}>
              <div style={{ padding: '6px 10px 10px', borderBottom: '1px solid #e3e6de', marginBottom: '6px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#19231c' }}>WAVY COMPANY</div>
                <div style={{ fontSize: '11px', color: '#5c6760' }}>wavy@gmail.com</div>
              </div>
              <button
                className="profile-popover-item"
                onClick={() => {
                  setShowSettingsModal(true);
                  setShowProfileMenu(false);
                }}
              >
                <User size={15} />
                <span>Account Profile</span>
              </button>
              <button
                className="profile-popover-item"
                onClick={() => {
                  setActiveTab('mycushion');
                  setShowProfileMenu(false);
                }}
              >
                <Sliders size={15} />
                <span>Device Config</span>
              </button>
              <button
                className="profile-popover-item"
                onClick={() => {
                  setShowProfileMenu(false);
                  showToast('Signed in as wavy@gmail.com (WAVY COMPANY)');
                }}
                style={{ color: '#dc2626' }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <main className="main-wrapper">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="breadcrumb-trail">
            My workspace /{' '}
            <span className="breadcrumb-current">
              {activeTab === 'overview' && 'Overview'}
              {activeTab === 'insights' && 'Posture insights'}
              {activeTab === 'history' && 'Sitting history'}
              {activeTab === 'mycushion' && 'My cushion'}
            </span>
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

        {/* ================= VIEW 1: OVERVIEW ================= */}
        {activeTab === 'overview' && (
          <>
            {/* Hero Page Header */}
            <section className="page-header">
              <div>
                <h1 className="page-title">A better seat for your day.</h1>
                <p className="page-subtitle">
                  Welcome, WAVY COMPANY. Tracking pressure balance, buttock temperature, and ergonomic comfort.
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
              {/* ROW 1: 4 Primary Metrics */}
              <div className="metrics-row">
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

                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-label">Comfort level</span>
                    <Heart className="metric-icon" />
                  </div>
                  <div className="metric-value-wrap">
                    <span className="metric-value">{currentStats.comfortLevel}</span>
                    <span className="metric-unit">%</span>
                  </div>
                  <span className="metric-sub">
                    {currentStats.comfortLevel >= 80 ? 'Comfortable & supported' : 'Muscle tension detected'}
                  </span>
                </div>

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

              {/* ROW 1.5: Glute Health & Sensory Telemetry Bar */}
              <div className="glute-telemetry-banner">
                <div className="glute-telemetry-item">
                  <div className="glute-icon-wrap" style={{ background: '#fdf2e9', color: '#ea580c' }}>
                    <Thermometer size={18} />
                  </div>
                  <div>
                    <div className="glute-metric-label">Seat Temp</div>
                    <div className="glute-metric-val">
                      {currentStats.seatTemp} °C
                      <span className={`glute-status-chip ${Number(currentStats.seatTemp) > 37.5 ? 'chip-alert' : 'chip-good'}`}>
                        {Number(currentStats.seatTemp) > 37.5 ? 'Heat Stagnation' : 'Normal'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glute-telemetry-item">
                  <div className="glute-icon-wrap" style={{ background: '#fef2f2', color: '#dc2626' }}>
                    <Zap size={18} />
                  </div>
                  <div>
                    <div className="glute-metric-label">Buttock Soreness & Fatigue</div>
                    <div className="glute-metric-val">
                      {currentStats.gluteFatigue} %
                      <span className={`glute-status-chip ${currentStats.gluteFatigue > 60 ? 'chip-alert' : 'chip-good'}`}>
                        {currentStats.gluteFatigue > 60 ? 'Decompress Soon' : 'Low Fatigue'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glute-telemetry-item">
                  <div className="glute-icon-wrap" style={{ background: '#ecfdf5', color: '#059669' }}>
                    <Wind size={18} />
                  </div>
                  <div>
                    <div className="glute-metric-label">Air Quality / Bio-gas (VOC)</div>
                    <div className="glute-metric-val">
                      {currentStats.gasPpm} ppm
                      <span className={`glute-status-chip ${currentStats.gasDetected ? 'chip-alert' : 'chip-good'}`}>
                        {currentStats.gasDetected ? 'Ventilating' : 'Clean'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="glute-telemetry-item">
                  <div className="glute-icon-wrap" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                    <Compass size={18} />
                  </div>
                  <div>
                    <div className="glute-metric-label">Buttock Fit & Load Bias</div>
                    <div className="glute-metric-val" style={{ fontSize: '13px', fontWeight: 700, color: currentStats.fitColor }}>
                      {currentStats.fitStatus}
                    </div>
                  </div>
                </div>
              </div>

              {/* ROW 2: Middle Section (Pressure Distribution Heatmap + Right Stacked Cards) */}
              <div className="grid-row-two-col">
                {/* Left: Pressure Distribution */}
                <div className="card">
                  <div className="card-header-flex">
                    <div>
                      <h2 className="card-title">Pressure & Thermal Distribution</h2>
                      <p className="card-subtitle">
                        High-density ischial & gluteal sensor array. Real-time pelvic fit monitoring.
                      </p>
                    </div>
                    <div className="live-pill">
                      <span className="live-dot" />
                      <span>Live 25Hz</span>
                    </div>
                  </div>

                  <div className="pressure-display-grid">
                    {/* Visual Cushion Stage with Heatmap & Vent Port */}
                    <div className="cushion-stage">
                      <div className="pos-label back">BACK / SACRUM</div>
                      <div className="pos-label front">FRONT / THIGHS</div>
                      <div className="pos-label left">L (GLUTE)</div>
                      <div className="pos-label right">R (GLUTE)</div>

                      <div className="cushion-contour">
                        <div className="cushion-center-line" />

                        {/* Sacrum / Coccyx Central Node */}
                        <div
                          className="heat-node sacral-node"
                          style={{
                            background: currentStats.sacralGlow,
                            opacity: currentStats.sacralGlow !== 'transparent' ? 0.9 : 0
                          }}
                        />

                        {/* Left Ischial Sit Bone Node */}
                        <div
                          className="heat-node"
                          style={{
                            background: currentStats.leftGlow,
                            transform: `scale(${0.9 + (currentStats.leftPct / 100) * 0.4})`
                          }}
                        />

                        {/* Right Ischial Sit Bone Node */}
                        <div
                          className="heat-node"
                          style={{
                            background: currentStats.rightGlow,
                            transform: `scale(${0.9 + (currentStats.rightPct / 100) * 0.4})`
                          }}
                        />

                        {/* Bio-gas active vent animation overlay */}
                        {currentStats.gasDetected && (
                          <div className="gas-dispersion-ring">
                            <Wind size={20} color="#10b981" />
                            <span>Venting chamber</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Side Stats */}
                    <div className="pressure-stats">
                      <div>
                        <div className="balance-title-sub">Weight Balance Breakdown</div>
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
                        <div className="balance-title-sub">Peak Contact Pressure</div>
                        <div className="peak-pressure-val">
                          {currentStats.peakKpa} kPa
                        </div>
                        <div className="peak-pressure-desc">
                          {Number(currentStats.peakKpa) > 6.0
                            ? 'High pressure concentration on sit-bones'
                            : 'Within ergonomic comfort threshold (<5.0 kPa)'}
                        </div>
                      </div>

                      <div>
                        <div className="balance-title-sub">Primary Load Vector</div>
                        <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                          {currentStats.quadrantBias}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="heat-legend-bar">
                    <span>Low pressure / Cool</span>
                    <div className="heat-gradient-preview" />
                    <span>High load / Thermal Trap</span>
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

                  {/* Comprehensive Simulation Toolbar for Testing All Scenarios */}
                  <div className="sim-controls-toolbar">
                    <span className="sim-label">Simulate sitting test:</span>
                    <div className="sim-btn-group">
                      <button
                        className={`btn-pill-mode ${posturePreset === 'balanced' ? 'active' : ''}`}
                        onClick={() => {
                          setPosturePreset('balanced');
                          showToast('Simulating: Balanced symmetry');
                        }}
                      >
                        Balanced
                      </button>
                      <button
                        className={`btn-pill-mode ${posturePreset === 'left' ? 'active' : ''}`}
                        onClick={() => {
                          setPosturePreset('left');
                          showToast('Simulating: Heavy Left Glute Load');
                        }}
                      >
                        Left Heavy (72%)
                      </button>
                      <button
                        className={`btn-pill-mode ${posturePreset === 'right' ? 'active' : ''}`}
                        onClick={() => {
                          setPosturePreset('right');
                          showToast('Simulating: Heavy Right Glute Load');
                        }}
                      >
                        Right Heavy (74%)
                      </button>
                      <button
                        className={`btn-pill-mode ${posturePreset === 'slouch' ? 'active' : ''}`}
                        onClick={() => {
                          setPosturePreset('slouch');
                          showToast('Simulating: Coccyx / Sacral Slouch');
                        }}
                      >
                        Sacral Slouch
                      </button>
                      <button
                        className={`btn-pill-mode ${posturePreset === 'fart' ? 'active' : ''}`}
                        onClick={handleTriggerFartVent}
                        style={{ borderColor: '#10b981' }}
                      >
                        Bio-gas Spike
                      </button>
                      <button
                        className={`btn-pill-mode ${posturePreset === 'hot' ? 'active' : ''}`}
                        onClick={() => {
                          setPosturePreset('hot');
                          showToast('Simulating: Gluteal Thermal Stagnation (38.2°C)');
                        }}
                        style={{ borderColor: '#ef4444' }}
                      >
                        Heat Stagnation
                      </button>
                      <button
                        className={`btn-pill-mode ${posturePreset === 'fatigue' ? 'active' : ''}`}
                        onClick={() => {
                          setPosturePreset('fatigue');
                          showToast('Simulating: Buttock Soreness & High Fatigue (84%)');
                        }}
                        style={{ borderColor: '#ea580c' }}
                      >
                        High Fatigue
                      </button>
                      <button
                        className={`btn-pill-mode ${autoRandomMode ? 'active' : ''}`}
                        onClick={() => {
                          setAutoRandomMode(!autoRandomMode);
                          showToast(!autoRandomMode ? 'Live Massage Cushion Telemetry: ON (Updating 1s)' : 'Simulation Paused');
                        }}
                        style={{
                          background: autoRandomMode ? '#2a4737' : '#ffffff',
                          color: autoRandomMode ? '#ffffff' : '#19231c',
                          borderColor: '#2a4737',
                          fontWeight: 700,
                          padding: '6px 14px'
                        }}
                        title="Simulates real-time 1-second continuous telemetry feed from massage smart cushion"
                      >
                        <RefreshCw size={13} className={autoRandomMode ? 'spin-slow' : ''} />
                        <span style={{ marginLeft: 6 }}>
                          {autoRandomMode ? 'Live Chair Telemetry: 1s Active' : 'Start Live Telemetry (1s)'}
                        </span>
                      </button>
                      <button
                        className="btn-pill-mode"
                        title="Instant Random Sitting Shift"
                        onClick={() => {
                          const scenarios = ['balanced', 'left', 'right', 'slouch', 'hot', 'fatigue', 'fart'];
                          const randomChoice = scenarios[Math.floor(Math.random() * scenarios.length)];
                          setPosturePreset(randomChoice);
                          if (randomChoice === 'fart') setGasEventsCount((c) => c + 1);
                          showToast(`Sensor Shift: ${randomChoice.toUpperCase()}`);
                        }}
                        style={{ padding: '6px 12px' }}
                      >
                        <span>Random Jitter</span>
                      </button>
                      <button
                        className="btn-pill-mode"
                        title={isLiveSimulating ? 'Pause micro oscillations' : 'Resume micro oscillations'}
                        onClick={() => setIsLiveSimulating(!isLiveSimulating)}
                        style={{ padding: '6px 12px' }}
                      >
                        {isLiveSimulating ? <Pause size={13} /> : <Play size={13} />}
                        <span style={{ marginLeft: 4 }}>
                          {isLiveSimulating ? 'Pause Stream' : 'Resume Stream'}
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
                            : posturePreset === 'slouch'
                            ? 'Slouch detected'
                            : posturePreset === 'fart'
                            ? 'Ventilating chamber'
                            : posturePreset === 'hot'
                            ? 'Heat trap alert'
                            : 'Glute muscle fatigue'}
                        </h4>
                        <p>
                          {posturePreset === 'balanced'
                            ? "You're upright and centered. Keep your shoulders relaxed."
                            : posturePreset === 'left'
                            ? 'Left glute taking 72% weight. Tilt slightly right to equalize hips.'
                            : posturePreset === 'right'
                            ? 'Right pelvic tilt observed. Align your spine and sit-bones.'
                            : posturePreset === 'slouch'
                            ? 'Tailbone taking 7.5 kPa. Engage lumbar curve to offload coccyx.'
                            : posturePreset === 'fart'
                            ? 'Micro-vent fan engaged. Bio-gas dissipating from core cushion channel.'
                            : posturePreset === 'hot'
                            ? 'Buttock temperature reached 38.2°C. Stand for 2 mins to circulate air.'
                            : 'High vascular compression. Micro-movement suggested to relieve buttock ache.'}
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
                      difference to capillary blood flow in your gluteal muscles.
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

                  <div className="chart-container">
                    <svg
                      viewBox="0 0 540 140"
                      width="100%"
                      height="100%"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#2e4d3d" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#2e4d3d" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      <line x1="20" y1="20" x2="520" y2="20" stroke="#ecefe9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="20" y1="65" x2="520" y2="65" stroke="#ecefe9" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="20" y1="110" x2="520" y2="110" stroke="#ecefe9" strokeWidth="1" strokeDasharray="3 3" />

                      <text x="5" y="24" fontSize="10" fill="#a0aba3">100</text>
                      <text x="10" y="69" fontSize="10" fill="#a0aba3">75</text>
                      <text x="10" y="114" fontSize="10" fill="#a0aba3">50</text>

                      {/* Dynamic 1-Second Area Fill */}
                      <path
                        d={`M 30 ${140 - (realtimeScores[0] - 40) * 1.8} ` +
                          realtimeScores
                            .map((score, i) => {
                              const x = 30 + i * (480 / (realtimeScores.length - 1));
                              const y = Math.max(15, Math.min(125, 140 - (score - 40) * 1.8));
                              return `L ${x} ${y}`;
                            })
                            .join(' ') +
                          ` L 510 135 L 30 135 Z`}
                        fill="url(#trendGradient)"
                      />

                      {/* Dynamic 1-Second Line Stroke */}
                      <path
                        d={`M 30 ${140 - (realtimeScores[0] - 40) * 1.8} ` +
                          realtimeScores
                            .map((score, i) => {
                              const x = 30 + i * (480 / (realtimeScores.length - 1));
                              const y = Math.max(15, Math.min(125, 140 - (score - 40) * 1.8));
                              return `L ${x} ${y}`;
                            })
                            .join(' ')}
                        fill="none"
                        stroke="#2e4d3d"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Head Data Node */}
                      <circle
                        cx="510"
                        cy={Math.max(15, Math.min(125, 140 - (realtimeScores[realtimeScores.length - 1] - 40) * 1.8))}
                        r="4.5"
                        fill="#2e4d3d"
                      />

                      <text x="30" y="136" fontSize="10.5" fill="#88938a">-14s</text>
                      <text x="190" y="136" fontSize="10.5" fill="#88938a">-10s</text>
                      <text x="350" y="136" fontSize="10.5" fill="#88938a">-5s</text>
                      <text x="490" y="136" fontSize="10.5" fill="#2b7a4b" fontWeight="bold">Live (1s)</text>
                    </svg>
                  </div>

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
                      onClick={() => setActiveTab('mycushion')}
                    >
                      <span>Device settings</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ================= VIEW 2: POSTURE INSIGHTS ================= */}
        {activeTab === 'insights' && (
          <div className="view-container">
            <section className="page-header">
              <div>
                <h1 className="page-title">Posture & Gluteal Biomechanics Insights</h1>
                <p className="page-subtitle">
                  Longitudinal pelvic load asymmetry, thermal retention patterns, and glute fatigue diagnostics.
                </p>
              </div>
              <div className="page-actions">
                <button
                  className="btn-secondary"
                  onClick={() => setShowExportModal(true)}
                >
                  <Download size={15} />
                  <span>Export Insights</span>
                </button>
              </div>
            </section>

            <div className="dashboard-content">
              {/* Top Insights Scorecard Row */}
              <div className="metrics-row">
                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-label">7-Day Posture Index</span>
                    <Award className="metric-icon" />
                  </div>
                  <div className="metric-value-wrap">
                    <span className="metric-value">84.2</span>
                    <span className="metric-unit">/ 100</span>
                  </div>
                  <span className="metric-sub trend-up">Top 15% ergonomically aligned</span>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-label">Lateral Symmetry</span>
                    <PieChart className="metric-icon" />
                  </div>
                  <div className="metric-value-wrap">
                    <span className="metric-value">94.8</span>
                    <span className="metric-unit">%</span>
                  </div>
                  <span className="metric-sub">Optimal pelvic equilibrium</span>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-label">Avg Seat Contact Temp</span>
                    <Thermometer className="metric-icon" />
                  </div>
                  <div className="metric-value-wrap">
                    <span className="metric-value">36.6</span>
                    <span className="metric-unit">°C</span>
                  </div>
                  <span className="metric-sub">Within thermo-neutral zone</span>
                </div>

                <div className="metric-card">
                  <div className="metric-header">
                    <span className="metric-label">Gluteal Soreness Risk</span>
                    <ShieldCheck className="metric-icon" />
                  </div>
                  <div className="metric-value-wrap">
                    <span className="metric-value" style={{ color: '#2b7a4b' }}>Low (24%)</span>
                  </div>
                  <span className="metric-sub">Capillary perfusion preserved</span>
                </div>
              </div>

              {/* Insights Deep-Dive Grid */}
              <div className="grid-row-two-col">
                {/* Asymmetry Analysis Chart */}
                <div className="card">
                  <div className="card-header-flex">
                    <div>
                      <h2 className="card-title">Pelvic Lateral Symmetry Vector</h2>
                      <p className="card-subtitle">Hourly weight distribution deviation from zero baseline</p>
                    </div>
                    <span className="badge-tag">Biomechanical Delta</span>
                  </div>

                  <div className="symmetry-chart-box">
                    <div className="symmetry-bars-grid">
                      {[
                        { hour: '09:00', l: 50, r: 50, state: 'balanced' },
                        { hour: '10:00', l: 48, r: 52, state: 'balanced' },
                        { hour: '11:00', l: 54, r: 46, state: 'slight' },
                        { hour: '12:00', l: 51, r: 49, state: 'balanced' },
                        { hour: '13:00', l: 62, r: 38, state: 'warning' },
                        { hour: '14:00', l: 58, r: 42, state: 'slight' },
                        { hour: '15:00', l: 49, r: 51, state: 'balanced' },
                        { hour: '16:00', l: 52, r: 48, state: 'balanced' }
                      ].map((item, idx) => (
                        <div key={idx} className="symmetry-col">
                          <div className="col-percentage-tag">{item.l}%L</div>
                          <div className="symmetry-bar-container">
                            <div
                              className="bar-left"
                              style={{
                                height: `${item.l * 0.8}px`,
                                backgroundColor: item.state === 'warning' ? '#d97706' : '#2a4737'
                              }}
                            />
                            <div
                              className="bar-right"
                              style={{
                                height: `${item.r * 0.8}px`,
                                backgroundColor: item.state === 'warning' ? '#f59e0b' : '#6a8c78'
                              }}
                            />
                          </div>
                          <div className="col-hour-label">{item.hour}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="insight-recommendation-banner">
                    <Info size={16} color="#2a4737" />
                    <span>
                      Noticeable left pelvic bias occurs around 13:00 post-lunch. Suggest standing for 5 minutes before afternoon deep-work sessions.
                    </span>
                  </div>
                </div>

                {/* Posture Distribution Breakdown */}
                <div className="card">
                  <div className="card-header-flex">
                    <div>
                      <h2 className="card-title">Behavioral & Glute Stress Categories</h2>
                      <p className="card-subtitle">Aggregate posture categorization</p>
                    </div>
                  </div>

                  <div className="behavior-pie-list">
                    <div className="behavior-item">
                      <div className="behavior-info">
                        <span className="behavior-dot" style={{ backgroundColor: '#2a4737' }} />
                        <div>
                          <strong>Upright Ergonomic Fit</strong>
                          <div className="behavior-sub">Ischial bones centered, spine in natural S-curve</div>
                        </div>
                      </div>
                      <div className="behavior-pct">74%</div>
                    </div>

                    <div className="behavior-item">
                      <div className="behavior-info">
                        <span className="behavior-dot" style={{ backgroundColor: '#5c7f69' }} />
                        <div>
                          <strong>Dynamic Micro-shifts</strong>
                          <div className="behavior-sub">Natural posture shifts preventing vascular stasis</div>
                        </div>
                      </div>
                      <div className="behavior-pct">16%</div>
                    </div>

                    <div className="behavior-item">
                      <div className="behavior-info">
                        <span className="behavior-dot" style={{ backgroundColor: '#d97706' }} />
                        <div>
                          <strong>Lateral Pelvic Tilt</strong>
                          <div className="behavior-sub">Weight unevenly concentrated on one sit-bone</div>
                        </div>
                      </div>
                      <div className="behavior-pct">7%</div>
                    </div>

                    <div className="behavior-item">
                      <div className="behavior-info">
                        <span className="behavior-dot" style={{ backgroundColor: '#dc2626' }} />
                        <div>
                          <strong>Coccyx / Sacral Slouch</strong>
                          <div className="behavior-sub">Tailbone overcompression causing disc fatigue</div>
                        </div>
                      </div>
                      <div className="behavior-pct">3%</div>
                    </div>
                  </div>

                  <button
                    className="btn-secondary"
                    style={{ marginTop: 20, width: '100%', justifyContent: 'center' }}
                    onClick={() => setShowTipsModal(true)}
                  >
                    View Recommended Ergonomics Exercises
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: SITTING HISTORY ================= */}
        {activeTab === 'history' && (
          <div className="view-container">
            <section className="page-header">
              <div>
                <h1 className="page-title">Sitting History & Telemetry Logs</h1>
                <p className="page-subtitle">
                  Historical session timestamps, posture compliance logs, temperature records, and bio-gas events.
                </p>
              </div>

              <div className="page-actions">
                <div className="filter-button-group">
                  <button
                    className={`btn-pill-mode ${historyFilter === 'all' ? 'active' : ''}`}
                    onClick={() => setHistoryFilter('all')}
                  >
                    All Sessions ({sessionHistory.length})
                  </button>
                  <button
                    className={`btn-pill-mode ${historyFilter === 'great' ? 'active' : ''}`}
                    onClick={() => setHistoryFilter('great')}
                  >
                    Score 80+
                  </button>
                  <button
                    className={`btn-pill-mode ${historyFilter === 'needs_work' ? 'active' : ''}`}
                    onClick={() => setHistoryFilter('needs_work')}
                  >
                    Needs Work
                  </button>
                </div>

                <button
                  className="btn-secondary"
                  onClick={() => setShowExportModal(true)}
                >
                  <Download size={15} />
                  <span>Export Logs</span>
                </button>
              </div>
            </section>

            <div className="dashboard-content">
              {/* History Table Card */}
              <div className="card">
                <div className="table-responsive">
                  <table className="history-table">
                    <thead>
                      <tr>
                        <th>Date & Session</th>
                        <th>Duration</th>
                        <th>Score</th>
                        <th>L/R Balance</th>
                        <th>Temp</th>
                        <th>Fatigue</th>
                        <th>Air / Bio-gas</th>
                        <th>Fit Diagnostic</th>
                        <th>Biomechanical Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSessions.map((session) => (
                        <tr key={session.id}>
                          <td>
                            <div className="table-title">{session.date}</div>
                            <div className="table-sub">{session.time}</div>
                          </td>
                          <td>
                            <span className="duration-tag">{session.duration}</span>
                          </td>
                          <td>
                            <span
                              className={`score-pill ${
                                session.score >= 80 ? 'score-high' : 'score-mid'
                              }`}
                            >
                              {session.score} / 100
                            </span>
                          </td>
                          <td>
                            <strong>{session.balance}</strong>
                          </td>
                          <td>
                            <span style={{ fontSize: '12px', fontWeight: 600 }}>{session.temp}</span>
                          </td>
                          <td>
                            <span style={{ fontSize: '12px', color: '#ea580c', fontWeight: 600 }}>{session.fatigue}</span>
                          </td>
                          <td>
                            <span style={{ fontSize: '11.5px', color: '#059669', fontWeight: 600 }}>{session.gas}</span>
                          </td>
                          <td>
                            <span className="break-badge">{session.fit}</span>
                          </td>
                          <td className="table-notes">{session.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="table-footer-summary">
                  <span>Showing {filteredSessions.length} recorded sessions</span>
                  <button
                    className="btn-secondary"
                    onClick={() => showToast('Refreshed telemetry logs')}
                  >
                    <RefreshCw size={13} />
                    <span>Sync Past 30 Days</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW 4: MY CUSHION ================= */}
        {activeTab === 'mycushion' && (
          <div className="view-container">
            <section className="page-header">
              <div>
                <h1 className="page-title">My Cushion Hardware & Sensory Config</h1>
                <p className="page-subtitle">
                  Configure Wavy Cushion One sensor matrices: pressure transducers, thermal sensors, and bio-gas detectors.
                </p>
              </div>

              <div className="page-actions">
                <button
                  className="btn-primary"
                  onClick={() => setShowCalibrateModal(true)}
                >
                  <RotateCcw size={15} />
                  <span>Run Calibration Wizard</span>
                </button>
              </div>
            </section>

            <div className="dashboard-content">
              <div className="grid-row-two-col">
                {/* Device Specifications & Status */}
                <div className="card">
                  <h2 className="card-title" style={{ marginBottom: 16 }}>
                    Hardware Status & Diagnostics
                  </h2>

                  <div className="hardware-hero-card">
                    <div className="device-icon-large">
                      <Armchair size={36} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="hardware-model-name">Wavy Cushion One</div>
                      <div className="hardware-serial">Model ID: WAVY-C1-2026-X8 · Firmware v2.5.0-SENS</div>
                      <div className="hardware-status-row">
                        <span className={`status-dot ${!isConnected ? 'disconnected' : ''}`} />
                        <span style={{ fontSize: 13, fontWeight: 600 }}>
                          {isConnected ? 'GATT Connected · Low Latency (20ms)' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    <div className="battery-gauge-box">
                      <Battery size={20} color="#2a4737" />
                      <span className="battery-val">{batteryLevel}%</span>
                      <span className="battery-label">~18 days remaining</span>
                    </div>
                  </div>

                  <div className="device-spec-grid">
                    <div className="spec-card">
                      <div className="spec-label">Pressure Array</div>
                      <div className="spec-value">16-Zone Piezo Matrix</div>
                    </div>
                    <div className="spec-card">
                      <div className="spec-label">Thermal Sensor</div>
                      <div className="spec-value">Dual NTC Surface Probe</div>
                    </div>
                    <div className="spec-card">
                      <div className="spec-label">Bio-gas / VOC Sensor</div>
                      <div className="spec-value">MOX Chemiresistive (H2S/CH4)</div>
                    </div>
                    <div className="spec-card">
                      <div className="spec-label">Micro-pore Ventilation</div>
                      <div className="spec-value" style={{ color: '#2b7a4b' }}>Active Core Duct</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 22, display: 'flex', gap: 12 }}>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setBatteryLevel(100);
                        showToast('Self-Test Passed: 16 pressure nodes, 2 thermal probes, 1 VOC detector operational');
                      }}
                    >
                      Run Full Sensor Self-Test
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => {
                        setIsConnected(!isConnected);
                        showToast(!isConnected ? 'Reconnected to Wavy Cushion' : 'Disconnected device');
                      }}
                    >
                      {isConnected ? 'Disconnect BLE' : 'Connect BLE'}
                    </button>
                  </div>
                </div>

                {/* Hardware Actuation Settings */}
                <div className="card">
                  <h2 className="card-title" style={{ marginBottom: 16 }}>
                    Actuator, Heat Relief & Bio-Gas Preferences
                  </h2>

                  <div className="device-toggles-list">
                    <div className="device-toggle-row">
                      <div>
                        <div className="toggle-title">Posture Nudge Vibrations</div>
                        <div className="toggle-desc">
                          Gentle tactile buzz when sitting asymmetry exceeds 15% for over 60 seconds.
                        </div>
                      </div>
                      <label className="switch-ui">
                        <input
                          type="checkbox"
                          checked={postureNudges}
                          onChange={(e) => {
                            setPostureNudges(e.target.checked);
                            showToast(e.target.checked ? 'Posture nudges activated' : 'Posture nudges disabled');
                          }}
                        />
                        <span className="slider-ui" />
                      </label>
                    </div>

                    <div className="device-toggle-row">
                      <div>
                        <div className="toggle-title">Break Reminder Haptic Pulse</div>
                        <div className="toggle-desc">
                          Double-pulse notification at the {breakInterval}-minute mark to relieve gluteal ache.
                        </div>
                      </div>
                      <label className="switch-ui">
                        <input
                          type="checkbox"
                          checked={breakReminders}
                          onChange={(e) => {
                            setBreakReminders(e.target.checked);
                            showToast(e.target.checked ? 'Break reminders on' : 'Break reminders off');
                          }}
                        />
                        <span className="slider-ui" />
                      </label>
                    </div>

                    <div className="device-toggle-row">
                      <div>
                        <div className="toggle-title">Bio-gas / VOC Detection & Auto-Vent</div>
                        <div className="toggle-desc">
                          Detect gas emission spikes and auto-activate micro-vent chamber exhaust.
                        </div>
                      </div>
                      <label className="switch-ui">
                        <input
                          type="checkbox"
                          checked={gasDetectionActive}
                          onChange={(e) => {
                            setGasDetectionActive(e.target.checked);
                            showToast(e.target.checked ? 'Bio-gas detection enabled' : 'Bio-gas detection paused');
                          }}
                        />
                        <span className="slider-ui" />
                      </label>
                    </div>

                    <div className="device-toggle-row">
                      <div>
                        <div className="toggle-title">Glute Thermal Relief Alert</div>
                        <div className="toggle-desc">
                          Notifies when seat contact temperature exceeds 37.5°C to avoid heat rash.
                        </div>
                      </div>
                      <label className="switch-ui">
                        <input
                          type="checkbox"
                          checked={thermalReliefActive}
                          onChange={(e) => {
                            setThermalReliefActive(e.target.checked);
                            showToast(e.target.checked ? 'Thermal relief alerts active' : 'Thermal relief alerts paused');
                          }}
                        />
                        <span className="slider-ui" />
                      </label>
                    </div>

                    <div className="setting-slider-block">
                      <div className="setting-slider-header">
                        <span className="toggle-title">Haptic Pulse Intensity</span>
                        <span className="slider-value-pill">{hapticIntensity.toUpperCase()}</span>
                      </div>
                      <div className="haptic-selector-row">
                        {['soft', 'medium', 'firm'].map((level) => (
                          <button
                            key={level}
                            className={`btn-pill-mode ${hapticIntensity === level ? 'active' : ''}`}
                            onClick={() => {
                              setHapticIntensity(level);
                              showToast(`Haptic intensity set to ${level}`);
                            }}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="setting-slider-block">
                      <div className="setting-slider-header">
                        <span className="toggle-title">Status Ring LED Brightness</span>
                        <span className="slider-value-pill">{ledBrightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={ledBrightness}
                        onChange={(e) => setLedBrightness(Number(e.target.value))}
                        style={{ width: '100%', accentColor: '#2a4737', cursor: 'pointer' }}
                      />
                    </div>
                  </div>

                  <div className="device-card-footer" style={{ marginTop: 24 }}>
                    <button
                      className="btn-primary"
                      onClick={() => showToast('Hardware preferences saved successfully')}
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                both feet flat on the floor before calibrating. Both ischial sit-bones and thermal baseline will be re-zeroed.
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
                  Calibrating pressure & thermal sensors... (stay still)
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
              <h3 className="modal-title">Ergonomic Sitting & Buttock Care Tips</h3>
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
                    <strong>Balanced Sit Bones & Soreness Relief:</strong>
                    <div style={{ color: '#5c6760', fontSize: 12.5 }}>
                      Distribute body weight equally across both sides of the
                      cushion to avoid muscle fatigue, piriformis syndrome, and asymmetric soreness.
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 18 }}>🌡️</span>
                  <div>
                    <strong>Heat Dispersion:</strong>
                    <div style={{ color: '#5c6760', fontSize: 12.5 }}>
                      Avoid sitting uninterrupted if seat surface temperature exceeds 37.5°C to preserve skin circulation.
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
              <h3 className="modal-title">Export Posture & Biomechanical Report</h3>
              <button
                className="icon-button"
                onClick={() => setShowExportModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: 12 }}>
                Export a detailed summary of today's sitting posture, buttock load distribution, and physiological telemetry.
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
                <div>🌡️ <strong>Seat Temp:</strong> {currentStats.seatTemp} °C</div>
                <div>⚡ <strong>Glute Fatigue:</strong> {currentStats.gluteFatigue} %</div>
                <div>💨 <strong>Air Quality / Bio-gas:</strong> {currentStats.gasPpm} ppm ({gasEventsCount} events)</div>
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
      {/* MODAL: Settings */}
      {showSettingsModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowSettingsModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Workspace Settings</h3>
              <button
                className="icon-button"
                onClick={() => setShowSettingsModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#5c6760', display: 'block', marginBottom: 4 }}>
                    Account Profile
                  </label>
                  <div style={{ background: '#f7f9f5', border: '1px solid #e3e6de', borderRadius: 8, padding: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: '13.5px' }}>WAVY COMPANY</div>
                    <div style={{ color: '#5c6760', fontSize: '12px' }}>wavy@gmail.com</div>
                    <div style={{ fontSize: '11px', color: '#2b7a4b', marginTop: 4, fontWeight: 600 }}>Plan: Pro Enterprise Telemetry</div>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#5c6760', display: 'block', marginBottom: 4 }}>
                    Telemetry Stream Frequency
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {['10 Hz', '25 Hz (Default)', '50 Hz'].map((hz) => (
                      <button
                        key={hz}
                        className={`btn-pill-mode ${hz.includes('25') ? 'active' : ''}`}
                        onClick={() => showToast(`Stream set to ${hz}`)}
                        style={{ padding: '6px 12px', fontSize: '12px' }}
                      >
                        {hz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#5c6760', display: 'block', marginBottom: 4 }}>
                    Data Storage Mode
                  </label>
                  <div style={{ fontSize: '12.5px', color: '#5c6760', background: '#f0f4ee', padding: 10, borderRadius: 8 }}>
                    In-Browser Transient Memory (Zero Database · High Privacy)
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => {
                  setShowSettingsModal(false);
                  showToast('Settings saved');
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Help & Support */}
      {showHelpModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowHelpModal(false)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Help & Support</h3>
              <button
                className="icon-button"
                onClick={() => setShowHelpModal(false)}
              >
                <X size={16} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: '#f7f9f5', border: '1px solid #e3e6de', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontWeight: 700, fontSize: '13.5px', color: '#2a4737', marginBottom: 4 }}>
                    Wavy Cushion One Support
                  </div>
                  <p style={{ fontSize: '12px', color: '#5c6760', lineHeight: 1.5 }}>
                    Need assistance with sensor re-zeroing, Bluetooth GATT pairing, or posture analytics reports? Contact the WAVY COMPANY hardware engineering desk:
                  </p>
                  <div style={{ marginTop: 8, fontWeight: 700, fontSize: '12.5px', color: '#19231c' }}>
                    Email: wavy@gmail.com
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#5c6760' }}>
                  <strong>Quick Diagnostic Tips:</strong>
                  <ul style={{ paddingLeft: 18, marginTop: 4, lineHeight: 1.6 }}>
                    <li>Ensure cushion is placed on a flat, firm chair seat.</li>
                    <li>Avoid thick blankets over the piezo surface to ensure accurate thermal & bio-gas readings.</li>
                    <li>Recalibrate zero-baseline whenever changing chairs.</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => setShowHelpModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
