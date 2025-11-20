"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Sim6() {
  const router = useRouter();
  const [selectedBreed, setSelectedBreed] = useState('a');
  const [showGuide, setShowGuide] = useState(false);

  const breedData = {
    a: { 
      name: '비숑 프리제', 
      emoji: '☁️', 
      color: '#3b82f6',
      bgGradient: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
      exercise: '30-60분',
      level: '중간',
      desc: '활발하고 사교적인 성격으로 적당한 운동이 필요해요'
    },
    b: { 
      name: '토이 푸들', 
      emoji: '🐩', 
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
      exercise: '30-45분',
      level: '중간',
      desc: '똑똑하고 활동적이라 규칙적인 산책이 중요해요'
    },
    c: { 
      name: '포메라니안', 
      emoji: '🦊', 
      color: '#f97316',
      bgGradient: 'linear-gradient(135deg, #fed7aa, #fdba74)',
      exercise: '20-40분',
      level: '낮음',
      desc: '소형견이지만 활발해서 짧은 산책으로도 충분해요'
    },
    d: { 
      name: '말티즈', 
      emoji: '🎀', 
      color: '#a855f7',
      bgGradient: 'linear-gradient(135deg, #e9d5ff, #d8b4fe)',
      exercise: '20-30분',
      level: '낮음',
      desc: '온순하고 실내 활동을 좋아하는 편이에요'
    },
    e: { 
      name: '리트리버', 
      emoji: '🦮', 
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      exercise: '60-90분',
      level: '높음',
      desc: '활동량이 많아 충분한 운동과 놀이가 필수예요'
    },
    f: { 
      name: '사모예드', 
      emoji: '🐻‍❄️', 
      color: '#06b6d4',
      bgGradient: 'linear-gradient(135deg, #cffafe, #a5f3fc)',
      exercise: '60-120분',
      level: '매우 높음',
      desc: '대형견으로 많은 운동량과 활동 공간이 필요해요'
    },
  };

  const currentBreed = breedData[selectedBreed];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #e0e7ff, #fce7f3)', padding: 'clamp(2rem, 4vw, 3rem) 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
          <button onClick={() => router.push('/')}
            style={{ position: 'absolute', left: 0, top: 0, padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4b5563'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6b7280'; }}>
            ← 메인으로
          </button>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            🐕 강아지 견종별 운동량
          </h1>
          <p style={{ color: '#6b7280', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            견종을 선택하여 하루 권장 운동 시간을 확인해보세요
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
          <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', textAlign: 'center' }}>
            견종 선택
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 'clamp(0.75rem, 2vw, 1rem)' }}>
            {Object.entries(breedData).map(([key, breed]) => (
              <button
                key={key}
                onClick={() => setSelectedBreed(key)}
                style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem)',
                  borderRadius: '0.75rem',
                  border: selectedBreed === key ? `4px solid ${breed.color}` : '4px solid #e5e7eb',
                  background: selectedBreed === key ? breed.bgGradient : '#f9fafb',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  transform: selectedBreed === key ? 'scale(1.05)' : 'scale(1)',
                  boxShadow: selectedBreed === key ? '0 10px 15px rgba(0,0,0,0.1)' : 'none',
                  textAlign: 'center'
                }}
                onMouseEnter={e => {
                  if (selectedBreed !== key) {
                    e.currentTarget.style.borderColor = breed.color;
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedBreed !== key) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                <div style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', marginBottom: '0.5rem' }}>{breed.emoji}</div>
                <p style={{ fontWeight: '700', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#1f2937', marginBottom: '0.25rem' }}>{breed.name}</p>
                <p style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)', color: '#6b7280' }}>({key.toUpperCase()})</p>
              </button>
            ))}
          </div>
        </div>

        {/* ✅ 수정: gridTemplateColumns 반응형 처리 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <div style={{ background: currentBreed.bgGradient, borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center', border: `4px solid ${currentBreed.color}` }}>
              <div style={{ fontSize: 'clamp(5rem, 15vw, 8rem)', marginBottom: '1rem' }}>{currentBreed.emoji}</div>
              <h3 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '700', color: currentBreed.color, marginBottom: '0.5rem' }}>
                {currentBreed.name}
              </h3>
              <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#374151', marginBottom: '1rem' }}>
                {currentBreed.desc}
              </p>
              
              <div style={{ background: 'rgba(255, 255, 255, 0.9)', borderRadius: '0.75rem', padding: 'clamp(1rem, 2vw, 1.5rem)', marginTop: '1rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#6b7280', marginBottom: '0.25rem' }}>하루 권장 운동 시간</p>
                  <p style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: '700', color: currentBreed.color, margin: 0 }}>
                    {currentBreed.exercise}
                  </p>
                </div>
                <div style={{ padding: '0.75rem', background: currentBreed.bgGradient, borderRadius: '0.5rem', border: `2px solid ${currentBreed.color}` }}>
                  <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '700', color: currentBreed.color, margin: 0 }}>
                    운동량 필요도: {currentBreed.level}
                  </p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setShowGuide(!showGuide)}
                style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                  background: '#6366f1',
                  color: 'white',
                  borderRadius: '9999px',
                  fontWeight: '700',
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#4f46e5'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; }}
              >
                📖 {showGuide ? '설명 숨기기' : '운동의 중요성 보기'}
              </button>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <h2 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem', textAlign: 'center' }}>
              함수 매핑 다이어그램
            </h2>

            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 4vw, 3rem)' }}>
              <div>
                <div style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '0.75rem', padding: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '1rem', textAlign: 'center', border: '2px solid #3b82f6' }}>
                  <h3 style={{ fontWeight: '700', color: '#1e40af', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', marginBottom: '0.25rem' }}>정의역 (Domain)</h3>
                  <p style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#1e40af', margin: 0 }}>입력값 X</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                  {Object.keys(breedData).map((key) => (
                    <div
                      key={key}
                      style={{
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        borderRadius: '0.5rem',
                        border: '2px solid',
                        borderColor: selectedBreed === key ? '#3b82f6' : '#bfdbfe',
                        background: selectedBreed === key ? '#3b82f6' : '#eff6ff',
                        color: selectedBreed === key ? 'white' : '#1e40af',
                        textAlign: 'center',
                        transition: 'all 0.3s',
                        transform: selectedBreed === key ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: selectedBreed === key ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      <p style={{ fontWeight: '700', fontSize: 'clamp(1.5rem, 4vw, 2rem)', margin: 0 }}>{key.toUpperCase()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', borderRadius: '0.75rem', padding: 'clamp(0.75rem, 2vw, 1rem)', marginBottom: '1rem', textAlign: 'center', border: '2px solid #22c55e' }}>
                  <h3 style={{ fontWeight: '700', color: '#15803d', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', marginBottom: '0.25rem' }}>공역/치역</h3>
                  <p style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#15803d', margin: 0 }}>출력값 Y</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem, 1.5vw, 0.75rem)' }}>
                  {Object.entries(breedData).map(([key, breed]) => (
                    <div
                      key={key}
                      style={{
                        padding: 'clamp(0.75rem, 2vw, 1rem)',
                        borderRadius: '0.5rem',
                        border: '2px solid',
                        borderColor: selectedBreed === key ? '#22c55e' : '#a7f3d0',
                        background: selectedBreed === key ? '#22c55e' : '#f0fdf4',
                        color: selectedBreed === key ? 'white' : '#15803d',
                        transition: 'all 0.3s',
                        transform: selectedBreed === key ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: selectedBreed === key ? '0 4px 6px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <span style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}>{breed.emoji}</span>
                        <p style={{ fontWeight: '700', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', margin: 0 }}>{breed.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#dc2626" />
                  </marker>
                </defs>
                {selectedBreed === 'a' && <line x1="45%" y1="15%" x2="55%" y2="15%" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                {selectedBreed === 'b' && <line x1="45%" y1="27%" x2="55%" y2="27%" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                {selectedBreed === 'c' && <line x1="45%" y1="39%" x2="55%" y2="39%" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                {selectedBreed === 'd' && <line x1="45%" y1="51%" x2="55%" y2="51%" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                {selectedBreed === 'e' && <line x1="45%" y1="63%" x2="55%" y2="63%" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
                {selectedBreed === 'f' && <line x1="45%" y1="75%" x2="55%" y2="75%" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowhead)" />}
              </svg>
            </div>

            <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '0.75rem', border: '2px solid #f59e0b', textAlign: 'center' }}>
              <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#374151', margin: 0, lineHeight: '1.5' }}>
                <span style={{ fontWeight: '700', color: '#dc2626' }}>빨간 화살표</span>가 현재 선택된 매핑을 나타내요
              </p>
              <p style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#6b7280', marginTop: '0.5rem', margin: 0 }}>
                {selectedBreed.toUpperCase()} → {currentBreed.name}
              </p>
            </div>
          </div>
        </div>

        {showGuide && (
          <div style={{ marginTop: 'clamp(1.5rem, 3vw, 2rem)', background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem', textAlign: 'center' }}>
              📚 강아지 운동량의 중요성
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '0.75rem', padding: 'clamp(1rem, 2vw, 1.5rem)', border: '2px solid #3b82f6' }}>
                <h3 style={{ fontSize: 'clamp(1.125rem, 3vw, 1.375rem)', fontWeight: '700', color: '#1e40af', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  🏃‍♂️ 왜 운동이 중요할까요?
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#374151', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.6' }}>
                  <li>체중 관리와 비만 예방</li>
                  <li>스트레스 해소와 행동 문제 예방</li>
                  <li>사회성 발달과 정서적 안정</li>
                  <li>근육과 관절 건강 유지</li>
                  <li>심혈관 건강 증진</li>
                </ul>
              </div>
              
              <div style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '0.75rem', padding: 'clamp(1rem, 2vw, 1.5rem)', border: '2px solid #f59e0b' }}>
                <h3 style={{ fontSize: 'clamp(1.125rem, 3vw, 1.375rem)', fontWeight: '700', color: '#92400e', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  💡 운동 팁
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#374151', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.6' }}>
                  <li>견종과 나이에 맞는 적절한 운동량 유지</li>
                  <li>더운 날씨에는 이른 아침이나 늦은 저녁에 산책</li>
                  <li>규칙적인 산책 시간으로 생활 리듬 형성</li>
                  <li>다양한 경로로 산책하여 자극 제공</li>
                </ul>
              </div>
            </div>
          </div>
        )}

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
    </div>
  );
}