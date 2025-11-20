"use client";

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

export default function Sim1() {
  const router = useRouter();
  const [cookingTime, setCookingTime] = useState(0);

  const getRamenState = (x) => {
    if (x < 2) return 1.25 * x * x;
    if (x < 4) return 1.25 * Math.pow(x - 2, 2) + 5;
    if (x < 6) return 10;
    if (x < 8) return 34 - 4 * x;
    return 18 - 2 * x;
  };

  const ramenScore = useMemo(() => getRamenState(cookingTime), [cookingTime]);

  const graphData = useMemo(() => {
    const data = [];
    for (let x = 0; x <= 10; x += 0.05) {
      data.push({
        x: x,
        y: getRamenState(x),
        isOptimal: x >= 4 && x < 6
      });
    }
    return data;
  }, []);

  const getRamenStatus = (score, time) => {
    if (time < 2) {
      return { 
        emoji: '🥶', 
        noodle: '딱딱해요', 
        soup: '거의 섞이지 않아요',
        state: '라면이 거의 익지 않은 초기 단계예요. 맛이 서서히 올라가기 시작해요.',
        text: '아직 익지 않았어요', 
        color: '#2563eb', 
        bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)'
      };
    }
    if (time < 4) {
      return { 
        emoji: '♨️', 
        noodle: '점점 익고 있어요', 
        soup: '잘 섞이면서 맛이 본격적으로 증가해요',
        state: '면이 부드러워지고 국물이 배어 점점 맛있어지는 단계예요.',
        text: '점점 맛있어지고 있어요', 
        color: '#ca8a04', 
        bg: 'linear-gradient(135deg, #fef3c7, #fde68a)'
      };
    }
    if (time < 6) {
      return { 
        emoji: '🍜', 
        noodle: '적당히 익었어요', 
        soup: '최적의 조화예요',
        state: '라면 먹기 최적 상태예요. 맛이 최고점이에요!',
        text: '완벽한 라면이에요!', 
        color: '#16a34a', 
        bg: 'linear-gradient(135deg, #dcfce7, #bbf7d0)'
      };
    }
    if (time < 8) {
      return { 
        emoji: '😐', 
        noodle: '퍼지기 시작해요', 
        soup: '약간 흐려져요',
        state: '면이 퍼지면서 맛이 점차 감소하고 있어요.',
        text: '조금 퍼지고 있어요', 
        color: '#ea580c', 
        bg: 'linear-gradient(135deg, #ffedd5, #fed7aa)'
      };
    }
    return { 
      emoji: '😭', 
      noodle: '너무 퍼졌어요', 
      soup: '맛이 약해졌어요',
      state: '라면이 과도하게 익어 먹기 힘든 상태예요. 맛이 급감했어요.',
      text: '면이 너무 퍼졌어요', 
      color: '#dc2626', 
      bg: 'linear-gradient(135deg, #fee2e2, #fecaca)'
    };
  };

  const ramenStatus = getRamenStatus(ramenScore, cookingTime);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #fefce8, #ffedd5)', padding: 'clamp(2rem, 4vw, 3rem) 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
          <button onClick={() => router.push('/')}
            style={{ position: 'absolute', left: 0, top: 0, padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4b5563'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6b7280'; }}>
            ← 메인으로
          </button>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            🍜 라면 조리 시간과 맛의 변화
          </h1>
          <p style={{ color: '#6b7280', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            조리 시간을 조절하며 라면의 상태 변화를 관찰해보세요
          </p>
        </div>

        {/* ✅ 수정: window 제거 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>조리 시간 조절</h2>
              
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: '#374151', marginBottom: '1rem', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', fontWeight: '600' }}>
                  조리 시간: <span style={{ color: '#ea580c' }}>{cookingTime.toFixed(1)}분</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={cookingTime}
                  onChange={(e) => setCookingTime(parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '4px',
                    outline: 'none',
                    appearance: 'none',
                    background: `linear-gradient(to right, #fb923c 0%, #fb923c ${(cookingTime / 10) * 100}%, #fed7aa ${(cookingTime / 10) * 100}%, #fed7aa 100%)`
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#6b7280', marginTop: '0.5rem' }}>
                  <span>0분</span>
                  <span style={{ color: '#16a34a', fontWeight: '700' }}>4~6분 (최적)</span>
                  <span>10분</span>
                </div>
              </div>

              <div style={{ background: 'linear-gradient(to right, #fef3c7, #fed7aa)', borderRadius: '0.75rem', padding: 'clamp(1rem, 2vw, 1.5rem)', textAlign: 'center' }}>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>라면 맛 점수</p>
                <p style={{ fontSize: 'clamp(2.5rem, 8vw, 3rem)', fontWeight: '700', color: '#ea580c', margin: 0 }}>
                  {ramenScore.toFixed(1)} / 10
                </p>
              </div>
            </div>

            <div style={{ background: ramenStatus.bg, borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center', transition: 'all 0.5s' }}>
              <div style={{ fontSize: 'clamp(5rem, 15vw, 8rem)', marginBottom: '1rem' }}>{ramenStatus.emoji}</div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)', fontWeight: '700', color: ramenStatus.color, marginBottom: '1rem' }}>
                {ramenStatus.text}
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '0.75rem', padding: '1rem' }}>
                <div>
                  <span style={{ fontWeight: '700', color: '#374151' }}>면발:</span>
                  <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>{ramenStatus.noodle}</span>
                </div>
                <div>
                  <span style={{ fontWeight: '700', color: '#374151' }}>국물/스프:</span>
                  <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>{ramenStatus.soup}</span>
                </div>
                <div>
                  <span style={{ fontWeight: '700', color: '#374151' }}>상태:</span>
                  <span style={{ marginLeft: '0.5rem', color: '#6b7280' }}>{ramenStatus.state}</span>
                </div>
              </div>

              {cookingTime >= 4 && cookingTime < 6 && (
                <div style={{ marginTop: '1rem', color: '#15803d', fontWeight: '700', animation: 'pulse 2s ease-in-out infinite', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>
                  ⭐ 지금이 먹기 딱 좋은 타이밍입니다! ⭐
                </div>
              )}
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>라면 상태 변화 그래프</h2>
            
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="x" 
                  label={{ value: '조리 시간 (분)', position: 'insideBottom', offset: -5, style: { fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' } }}
                  domain={[0, 10]}
                  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}
                />
                <YAxis 
                  label={{ value: '맛 점수', angle: -90, position: 'insideLeft', style: { fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' } }}
                  domain={[0, 11]}
                  ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}
                />
                <Tooltip 
                  formatter={(value) => `${value.toFixed(1)}점`}
                  labelFormatter={(label) => `${label.toFixed(1)}분`}
                  contentStyle={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', borderRadius: '0.5rem', border: '2px solid #fb923c' }}
                />
                <Area
                  type="monotone"
                  dataKey={(data) => data.isOptimal ? data.y : null}
                  fill="#22c55e"
                  fillOpacity={0.3}
                  stroke="none"
                />
                <Area 
                  type="monotone" 
                  dataKey="y" 
                  stroke="#fb923c" 
                  strokeWidth={3}
                  fill="url(#colorScore)"
                />
                <ReferenceDot 
                  x={cookingTime} 
                  y={ramenScore} 
                  r={8} 
                  fill="#dc2626" 
                  stroke="#fff"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#f9fafb', borderRadius: '0.5rem', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' }}>
              <h3 style={{ fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>📐 분할 함수식</h3>
              <div style={{ fontFamily: 'monospace', fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)', color: '#374151', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <p style={{ margin: 0 }}>• 0≤x&lt;2: y = 1.25x² (서서히 익음)</p>
                <p style={{ margin: 0 }}>• 2≤x&lt;4: y = 1.25(x-2)² + 5 (빠르게 맛있어짐)</p>
                <p style={{ margin: 0, color: '#16a34a', fontWeight: '700' }}>• 4≤x&lt;6: y = 10 (최적 상태! ⭐)</p>
                <p style={{ margin: 0 }}>• 6≤x&lt;8: y = 34 - 4x (퍼지기 시작)</p>
                <p style={{ margin: 0 }}>• 8≤x≤10: y = 18 - 2x (많이 퍼짐)</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center' }}>
          <button 
            onClick={() => router.push('/')}
            style={{ padding: '0.75rem 2rem', background: 'white', color: '#374151', borderRadius: '9999px', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.15)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'; }}
          >
            ← 돌아가기
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}