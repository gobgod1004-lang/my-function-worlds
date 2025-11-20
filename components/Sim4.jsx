"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, ReferenceLine } from 'recharts';

export default function Sim4() {
  const router = useRouter();
  const [step, setStep] = useState('mode');
  const [mode, setMode] = useState(null);
  const [outsideConc, setOutsideConc] = useState(5);
  const [insideConc, setInsideConc] = useState(5);
  const [initialOutside, setInitialOutside] = useState(5);
  const [movingParticles, setMovingParticles] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const modes = {
    oxygen: {
      name: '산소 (O₂)',
      icon: '🟠',
      type: '단순확산',
      equation: 'y = x - 5',
      color: '#f97316',
      calc: (out) => out - 5,
      molecule: '⚪',
      hasProtein: false
    },
    glucose: {
      name: '포도당',
      icon: '🟢',
      type: '운반체 촉진확산',
      equation: 'y = 10(x-5)/(2+|x-5|)',
      color: '#22c55e',
      calc: (out) => {
        const diff = out - 5;
        return (10 * diff) / (2 + Math.abs(diff));
      },
      molecule: '🟩',
      hasProtein: 'carrier'
    }
  };

  const currentMode = mode ? modes[mode] : null;
  const finalEquilibrium = useMemo(() => (initialOutside + 5) / 2, [initialOutside]);
  const velocity = useMemo(() => currentMode ? currentMode.calc(outsideConc) : 0, [mode, outsideConc, currentMode]);
  const isEquilibrium = Math.abs(outsideConc - insideConc) < 0.01;

  const graphData = useMemo(() => {
    if (!currentMode) return [];
    const data = [];
    for (let x = 0; x <= 10; x += 0.5) {
      data.push({ x, y: currentMode.calc(x) });
    }
    return data;
  }, [mode, currentMode]);

  useEffect(() => {
    if (!mode || !isAnimating || isEquilibrium) return;

    const baseInterval = Math.max(200, 1000 / Math.max(0.3, Math.abs(velocity)));
    const intervalTime = baseInterval / speedMultiplier;
    
    const interval = setInterval(() => {
      const isInward = velocity > 0;
      
      if (isInward && outsideConc > finalEquilibrium) {
        const newParticle = { id: Date.now() + Math.random(), direction: 'down' };
        setMovingParticles(prev => [...prev, newParticle]);
        const animDuration = 1200 / speedMultiplier;
        setTimeout(() => {
          setOutsideConc(prev => Math.max(finalEquilibrium, prev - 0.5));
          setInsideConc(prev => Math.min(finalEquilibrium, prev + 0.5));
          setMovingParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, animDuration);
      } else if (!isInward && insideConc > finalEquilibrium) {
        const newParticle = { id: Date.now() + Math.random(), direction: 'up' };
        setMovingParticles(prev => [...prev, newParticle]);
        const animDuration = 1200 / speedMultiplier;
        setTimeout(() => {
          setInsideConc(prev => Math.max(finalEquilibrium, prev - 0.5));
          setOutsideConc(prev => Math.min(finalEquilibrium, prev + 0.5));
          setMovingParticles(prev => prev.filter(p => p.id !== newParticle.id));
        }, animDuration);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [mode, outsideConc, insideConc, velocity, isAnimating, isEquilibrium, finalEquilibrium, speedMultiplier]);

  const animations = `
    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    @keyframes moveDown {
      0% { top: 20%; opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
      50% { top: 47.5%; opacity: 1; transform: translateX(-50%) scale(1.3) rotate(180deg); }
      100% { top: 75%; opacity: 1; transform: translateX(-50%) scale(1) rotate(360deg); }
    }
    @keyframes moveDownCarrier {
      0% { top: 20%; left: 50%; opacity: 1; transform: translateX(-50%) scale(1); }
      40% { top: 43%; left: 50%; opacity: 1; transform: translateX(-50%) scale(0.7); }
      50% { top: 50%; left: 50%; opacity: 1; transform: translateX(-50%) scale(0.5); }
      60% { top: 57%; left: 50%; opacity: 1; transform: translateX(-50%) scale(0.7); }
      100% { top: 75%; left: 50%; opacity: 1; transform: translateX(-50%) scale(1); }
    }
    @keyframes moveUp {
      0% { top: 75%; opacity: 1; transform: translateX(-50%) scale(1) rotate(0deg); }
      50% { top: 52.5%; opacity: 1; transform: translateX(-50%) scale(1.3) rotate(-180deg); }
      100% { top: 20%; opacity: 1; transform: translateX(-50%) scale(1) rotate(-360deg); }
    }
    @keyframes moveUpCarrier {
      0% { top: 75%; left: 50%; opacity: 1; transform: translateX(-50%) scale(1); }
      40% { top: 57%; left: 50%; opacity: 1; transform: translateX(-50%) scale(0.7); }
      50% { top: 50%; left: 50%; opacity: 1; transform: translateX(-50%) scale(0.5); }
      60% { top: 43%; left: 50%; opacity: 1; transform: translateX(-50%) scale(0.7); }
      100% { top: 20%; left: 50%; opacity: 1; transform: translateX(-50%) scale(1); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.1); }
    }
    @keyframes carrierPulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(22,163,74,0.5); }
      50% { transform: scale(1.1); box-shadow: 0 0 25px rgba(22,163,74,0.8); }
    }
  `;

  if (step === 'mode') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #fffbeb, #ffedd5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <style>{animations}</style>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
            <button onClick={() => router.push('/')}
              style={{ position: 'absolute', left: 0, top: 0, padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#4b5563'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#6b7280'; }}>
              ← 메인으로
            </button>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.25rem)', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
              🧬 세포막 물질 이동
            </h1>
            <p style={{ color: '#6b7280', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
              물질 이동 방식을 선택하세요
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {Object.entries(modes).map(([key, info]) => (
              <button key={key} onClick={() => { setMode(key); setStep('concentration'); }}
                style={{ 
                  background: key === 'oxygen' ? 'linear-gradient(135deg, #fff5f0, #ffe8e0)' : 'linear-gradient(135deg, #f0fff4, #e0f9e8)', 
                  borderRadius: '1rem', 
                  boxShadow: '0 25px 50px rgba(0,0,0,0.25)', 
                  padding: 'clamp(2rem, 4vw, 3rem)', 
                  border: `4px solid ${key === 'oxygen' ? '#ff8c42' : '#4ade80'}`, 
                  cursor: 'pointer', 
                  transition: 'all 0.3s ease' 
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25)'; }}>
                <div style={{ fontSize: 'clamp(3rem, 10vw, 4.5rem)', marginBottom: '1rem' }}>{info.icon}</div>
                <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#333', marginBottom: '0.75rem' }}>{info.name}</h3>
                <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: key === 'oxygen' ? '#ff6348' : '#22c55e', fontWeight: '700', marginBottom: '1rem' }}>{info.type}</p>
                <div style={{ padding: '0.75rem 1.5rem', background: key === 'oxygen' ? 'linear-gradient(to right, #ff6348, #ff4757)' : 'linear-gradient(to right, #22c55e, #16a34a)', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
                  선택하기 →
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'concentration') {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #fffbeb, #ffedd5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <style>{animations}</style>
        <div style={{ maxWidth: '800px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ display: 'inline-block', background: 'white', borderRadius: '1rem', padding: 'clamp(1.5rem, 3vw, 2rem)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 'clamp(3rem, 10vw, 4.5rem)' }}>{currentMode.icon}</div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#333', margin: '0.75rem 0 0.5rem' }}>{currentMode.name}</h2>
              <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', color: mode === 'oxygen' ? '#ff6348' : '#22c55e', fontWeight: '700' }}>{currentMode.type}</p>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '1rem', padding: 'clamp(2rem, 4vw, 3rem)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', textAlign: 'center', marginBottom: '1.5rem' }}>농도 설정</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '0.75rem', padding: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center', border: '3px solid #3b82f6' }}>
                <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '700', color: '#1e40af', marginBottom: '0.5rem' }}>🌊 세포 밖</p>
                <p style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>{outsideConc.toFixed(1)}</p>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: '700', color: '#3b82f6' }}>mM</p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', borderRadius: '0.75rem', padding: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center', border: '3px solid #ec4899' }}>
                <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '700', color: '#be185d', marginBottom: '0.5rem' }}>🏠 세포 안</p>
                <p style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '700', color: '#831843', margin: 0 }}>5.0</p>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: '700', color: '#ec4899' }}>mM</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button onClick={() => setOutsideConc(prev => Math.max(0, prev - 0.5))} disabled={outsideConc === 0}
                style={{ width: 'clamp(3.5rem, 12vw, 5rem)', height: 'clamp(3.5rem, 12vw, 5rem)', background: outsideConc === 0 ? '#d1d5db' : 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', borderRadius: '0.75rem', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', border: 'none', cursor: outsideConc === 0 ? 'not-allowed' : 'pointer', boxShadow: outsideConc === 0 ? 'none' : '0 10px 15px rgba(0,0,0,0.1)' }}>
                −
              </button>
              <div style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)', borderRadius: '0.75rem', padding: '0.25rem', display: 'flex', alignItems: 'center' }}>
                <div style={{ background: 'white', borderRadius: '0.5rem', padding: 'clamp(0.75rem, 3vw, 1.5rem) clamp(1.5rem, 5vw, 2.5rem)' }}>
                  <p style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>{outsideConc.toFixed(1)}</p>
                </div>
              </div>
              <button onClick={() => setOutsideConc(prev => Math.min(10, prev + 0.5))} disabled={outsideConc === 10}
                style={{ width: 'clamp(3.5rem, 12vw, 5rem)', height: 'clamp(3.5rem, 12vw, 5rem)', background: outsideConc === 10 ? '#d1d5db' : 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', borderRadius: '0.75rem', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '900', border: 'none', cursor: outsideConc === 10 ? 'not-allowed' : 'pointer', boxShadow: outsideConc === 10 ? 'none' : '0 10px 15px rgba(0,0,0,0.1)' }}>
                +
              </button>
            </div>

            <p style={{ textAlign: 'center', fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#666', marginBottom: '1.5rem' }}>
              농도 0.5 = 입자 1개 | 최종 평형: {((outsideConc + 5) / 2).toFixed(1)} mM
            </p>

            {outsideConc === 5 && (
              <div style={{ background: '#fef3c7', border: '3px solid #f59e0b', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: '700', color: '#92400e', margin: 0 }}>⚖️ 이미 평형 상태입니다</p>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
              <button onClick={() => { setStep('mode'); setMode(null); }}
                style={{ padding: 'clamp(0.75rem, 2vw, 1rem)', background: '#6b7280', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4b5563'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#6b7280'; }}>
                ← 뒤로
              </button>
              <button onClick={() => { setStep('simulation'); setIsAnimating(true); setInitialOutside(outsideConc); }} disabled={outsideConc === 5}
                style={{ padding: 'clamp(0.75rem, 2vw, 1rem)', background: outsideConc === 5 ? '#d1d5db' : '#a855f7', color: outsideConc === 5 ? '#9ca3af' : 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', border: 'none', cursor: outsideConc === 5 ? 'not-allowed' : 'pointer', boxShadow: outsideConc === 5 ? 'none' : '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
                onMouseEnter={e => { if (outsideConc !== 5) e.currentTarget.style.background = '#9333ea'; }}
                onMouseLeave={e => { if (outsideConc !== 5) e.currentTarget.style.background = '#a855f7'; }}>
                시작 →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 시뮬레이션 화면
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #faf5ff, #fce7f3)', padding: 'clamp(1rem, 2vw, 3rem)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{animations}</style>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', background: 'white', borderRadius: '0.75rem', padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2rem)', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
            <span style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginRight: '0.75rem' }}>{currentMode.icon}</span>
            <span style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)', fontWeight: '700', color: '#333' }}>{currentMode.name}</span>
          </div>
        </div>

        {/* ✅ 수정: gridTemplateColumns 반응형 처리 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: 'white', borderRadius: '1rem', padding: 'clamp(1rem, 2vw, 1.5rem)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h3 style={{ fontSize: 'clamp(1.125rem, 2.5vw, 1.375rem)', fontWeight: '700', margin: 0 }}>🔬 세포막</h3>
              <div style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '700', color: velocity > 0 ? '#22c55e' : velocity < 0 ? '#ef4444' : '#6b7280' }}>
                속도: {velocity.toFixed(2)} μmol/min {velocity > 0 ? '→ 안으로' : velocity < 0 ? '→ 밖으로' : '⚖️'}
              </div>
            </div>

            <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: '1rem', marginBottom: '1rem', border: '2px solid #e5e7eb' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '700', color: '#374151' }}>⚡ 애니메이션 속도</label>
                <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: '700', color: '#a855f7' }}>{speedMultiplier.toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="3" 
                step="0.5" 
                value={speedMultiplier} 
                onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#a855f7' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)', color: '#6b7280', marginTop: '0.25rem' }}>
                <span>느림 (0.5x)</span>
                <span>빠름 (3x)</span>
              </div>
            </div>

            <div style={{ position: 'relative', height: 'clamp(400px, 50vw, 600px)', borderRadius: '0.75rem', border: '3px solid #a855f7', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, width: '100%', height: '40%', background: 'linear-gradient(to bottom, #bfdbfe, #93c5fd, #dbeafe)' }}>
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(255,255,255,0.95)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', border: '2px solid #60a5fa', zIndex: 10 }}>
                  <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)', fontWeight: '700', color: '#1e40af', margin: 0 }}>🌊 세포 밖</p>
                  <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: '700', color: '#1e3a8a', margin: 0 }}>{outsideConc.toFixed(1)} mM</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: '1rem', gap: '0.5rem' }}>
                  {Array(Math.round(outsideConc * 2)).fill('').map((_, i) => (
                    <div key={`out-${i}`} style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', animation: 'float 2s ease-in-out infinite', animationDelay: `${Math.random()}s` }}>{currentMode.molecule}</div>
                  ))}
                </div>
              </div>

              <div style={{ position: 'absolute', top: '45%', width: '100%', height: '10%', background: 'linear-gradient(to right, #fbbf24, #f59e0b, #fbbf24)', borderTop: '3px solid #d97706', borderBottom: '3px solid #d97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {currentMode.hasProtein === 'carrier' && (
                  <div style={{ 
                    width: 'clamp(3rem, 10vw, 5rem)', 
                    height: '120%', 
                    background: 'linear-gradient(to bottom, #16a34a, #15803d, #16a34a)', 
                    borderRadius: '0.5rem', 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    boxShadow: '0 0 15px rgba(22,163,74,0.5)',
                    border: '2px solid #166534',
                    animation: movingParticles.length > 0 ? 'carrierPulse 1s ease-in-out infinite' : 'none'
                  }}>
                    <span style={{ color: 'white', fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)', fontWeight: '900', textAlign: 'center', lineHeight: '1.2' }}>운반체<br/>단백질</span>
                  </div>
                )}
                <div style={{ position: 'absolute', left: '0.5rem', background: 'rgba(255,255,255,0.9)', borderRadius: '0.375rem', padding: '0.25rem 0.5rem', border: '2px solid #f59e0b' }}>
                  <p style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.7rem)', fontWeight: '700', color: '#92400e', margin: 0 }}>인지질 이중층</p>
                </div>
              </div>

              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: '40%', background: 'linear-gradient(to bottom, #fce7f3, #fbcfe8, #fce7f3)' }}>
                <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(255,255,255,0.95)', borderRadius: '0.5rem', padding: '0.5rem 0.75rem', border: '2px solid #f472b6', zIndex: 10 }}>
                  <p style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)', fontWeight: '700', color: '#be185d', margin: 0 }}>🏠 세포 안</p>
                  <p style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)', fontWeight: '700', color: '#831843', margin: 0 }}>{insideConc.toFixed(1)} mM</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', padding: '1rem', gap: '0.5rem' }}>
                  {Array(Math.round(insideConc * 2)).fill('').map((_, i) => (
                    <div key={`in-${i}`} style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.75rem)', animation: 'float 2s ease-in-out infinite', animationDelay: `${Math.random()}s` }}>{currentMode.molecule}</div>
                  ))}
                </div>
              </div>

              {movingParticles.map(p => {
                const animDuration = `${1.2 / speedMultiplier}s`;
                const useCarrier = currentMode.hasProtein === 'carrier';
                const animName = useCarrier 
                  ? (p.direction === 'down' ? 'moveDownCarrier' : 'moveUpCarrier')
                  : (p.direction === 'down' ? 'moveDown' : 'moveUp');
                
                return (
                  <div key={p.id} style={{ 
                    position: 'absolute', 
                    left: '50%', 
                    fontSize: 'clamp(1.5rem, 3vw, 2rem)', 
                    zIndex: 25, 
                    animation: `${animName} ${animDuration} ease-in-out forwards`,
                    top: p.direction === 'down' ? '20%' : '75%'
                  }}>
                    {currentMode.molecule}
                  </div>
                );
              })}

              {isEquilibrium && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 }}>
                  <div style={{ background: 'white', borderRadius: '1rem', padding: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center', maxWidth: '90%' }}>
                    <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '1rem' }}>⚖️</div>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#22c55e', marginBottom: '0.5rem' }}>평형 상태!</h3>
                    <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#666', marginBottom: '1rem' }}>{outsideConc.toFixed(1)} mM = {insideConc.toFixed(1)} mM</p>
                    <button onClick={() => { setIsAnimating(false); setOutsideConc(5); setInsideConc(5); setStep('concentration'); setMovingParticles([]); setSpeedMultiplier(1); }}
                      style={{ padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)', background: '#a855f7', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#9333ea'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#a855f7'; }}>
                      🔄 다시 시작
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              <button onClick={() => { setIsAnimating(false); setOutsideConc(5); setInsideConc(5); setStep('concentration'); setMovingParticles([]); setSpeedMultiplier(1); }}
                style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem)', background: '#6b7280', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4b5563'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#6b7280'; }}>
                🔄 처음부터
              </button>
              <button onClick={() => setIsAnimating(!isAnimating)} disabled={isEquilibrium}
                style={{ padding: 'clamp(0.75rem, 1.5vw, 1rem)', background: isEquilibrium ? '#d1d5db' : '#22c55e', color: isEquilibrium ? '#9ca3af' : 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: isEquilibrium ? 'not-allowed' : 'pointer', boxShadow: isEquilibrium ? 'none' : '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
                onMouseEnter={e => { if (!isEquilibrium) e.currentTarget.style.background = '#16a34a'; }}
                onMouseLeave={e => { if (!isEquilibrium) e.currentTarget.style.background = '#22c55e'; }}>
                {isAnimating ? '⏸ 정지' : '▶️ 재생'}
              </button>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '1rem', padding: 'clamp(1rem, 2vw, 1.5rem)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)' }}>
            <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', fontWeight: '700', marginBottom: '1rem' }}>📈 농도-속도 그래프</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="x" label={{ value: '세포 밖 농도 (mM)', position: 'insideBottom', offset: -5, style: { fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' } }} domain={[0, 10]} />
                <YAxis label={{ value: '속도', angle: -90, position: 'insideLeft', style: { fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' } }} domain={mode === 'glucose' ? [-8, 8] : [-5, 5]} />
                <Tooltip />
                <Line type="monotone" dataKey="y" stroke={currentMode.color} strokeWidth={3} dot={false} />
                <ReferenceLine y={0} stroke="#666" strokeDasharray="3 3" />
                <ReferenceLine x={5} stroke="#666" strokeDasharray="3 3" />
                <ReferenceDot x={outsideConc} y={velocity} r={6} fill="#dc2626" stroke="#fff" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f9fafb', borderRadius: '0.5rem' }}>
              <p style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', fontWeight: '700', color: '#374151', margin: 0 }}>
                현재: ({outsideConc.toFixed(1)} mM, {velocity.toFixed(2)} μmol/min)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}