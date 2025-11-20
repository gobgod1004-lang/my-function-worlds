"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Sim2() {
  const router = useRouter();
  const [saltAmount, setSaltAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [saltAnimation, setSaltAnimation] = useState(false);
  const [showMapping, setShowMapping] = useState(false);
  const resultRef = useRef(null);

  const saltToSaltiness = {
    0: 1, 1: 1,
    2: 2, 3: 2,
    4: 3, 5: 3,
    6: 4,
    7: 5,
    8: 6, 9: 6,
    10: 7, 11: 7,
    12: 8, 13: 8,
    14: 9, 15: 9, 16: 10,
    17: 10, 18: 10, 19: 10, 20: 10,
    21: 10, 22: 10, 23: 10, 24: 10, 25: 10
  };

  const saltinessLevel = saltToSaltiness[saltAmount];

  const getSaltinessStatus = (level, salt) => {
    const statuses = {
      1: {
        emoji: '😰',
        text: '너무 싱거워요',
        color: '#2563eb',
        bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        comment: '국물에 간이 거의 없어요. 소금을 더 넣어주세요.'
      },
      2: {
        emoji: '😕',
        text: '많이 싱거워요',
        color: '#3b82f6',
        bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        comment: '맛이 심심해요. 간이 많이 부족해요.'
      },
      3: {
        emoji: '🙁',
        text: '조금 싱거워요',
        color: '#0891b2',
        bg: 'linear-gradient(135deg, #cffafe, #a5f3fc)',
        comment: '거의 다 왔지만 아직 조금 더 필요해요.'
      },
      4: {
        emoji: '🙂',
        text: '거의 적당해요',
        color: '#ca8a04',
        bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        comment: '거의 완벽해요! 조금만 더 넣으면 딱 맞을 것 같아요.'
      },
      5: {
        emoji: '🍜',
        text: '완벽해요!',
        color: '#16a34a',
        bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
        comment: '천일염의 구수한 맛이 국물과 완벽하게 어우러졌어요! 최고예요!'
      },
      6: {
        emoji: '😐',
        text: '약간 짜기 시작해요',
        color: '#ea580c',
        bg: 'linear-gradient(135deg, #fed7aa, #fdba74)',
        comment: '먹을 만하지만 살짝 짜네요. 소금을 조금 덜 넣었으면 좋았을 것 같아요.'
      },
      7: {
        emoji: '😬',
        text: '조금 짜요',
        color: '#ea580c',
        bg: 'linear-gradient(135deg, #fed7aa, #fdba74)',
        comment: '확실히 짜요. 물을 좀 마셔야겠어요.'
      },
      8: {
        emoji: '😣',
        text: '짜요',
        color: '#dc2626',
        bg: 'linear-gradient(135deg, #fecaca, #fca5a5)',
        comment: '많이 짜네요. 먹기가 힘들어요.'
      },
      9: {
        emoji: '😵',
        text: '많이 짜요',
        color: '#dc2626',
        bg: 'linear-gradient(135deg, #fecaca, #fca5a5)',
        comment: '너무 짜서 거의 먹을 수가 없어요!'
      },
      10: {
        emoji: '💀',
        text: '너무 짜서 먹기 힘들어요',
        color: '#991b1b',
        bg: 'linear-gradient(135deg, #fecaca, #fca5a5)',
        comment: '염분 과다예요! 이건 먹을 수 없어요.'
      }
    };
    return statuses[level] || statuses[1];
  };

  const status = getSaltinessStatus(saltinessLevel, saltAmount);

  const addSalt = () => {
    if (saltAmount < 25 && !submitted) {
      setSaltAmount(prev => prev + 1);
      setSaltAnimation(true);
      setTimeout(() => setSaltAnimation(false), 300);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setSaltAmount(0);
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const animations = `
    @keyframes fall {
      0% {
        transform: translateX(-50%) translateY(0) scale(1);
        opacity: 0.9;
      }
      100% {
        transform: translateX(-50%) translateY(200px) scale(0.5);
        opacity: 0;
      }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
  `;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #fffbeb, #ffedd5)', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <style>{animations}</style>
      
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(2rem, 4vw, 3rem) 1rem' }}>
        <div style={{ maxWidth: '1000px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
            <button onClick={() => router.push('/')}
              style={{ position: 'absolute', left: 0, top: 0, padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#4b5563'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#6b7280'; }}>
              ← 메인으로
            </button>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
              🧂 소금의 양과 짠맛 강도
            </h1>
            <p style={{ color: '#6b7280', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
              소고기뭇국에 소금을 넣어 간을 맞춰보세요
            </p>
          </div>

          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(2rem, 4vw, 3rem)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
                소고기뭇국
              </h2>
              <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#6b7280', marginBottom: '1.5rem' }}>
                클릭해서 천일염을 한 꼬집(1g)씩 넣어주세요
              </p>
            </div>

            <div 
              onClick={addSalt}
              style={{ position: 'relative', margin: '0 auto 2rem', cursor: 'pointer', width: '100%', maxWidth: '300px', height: '300px', transition: 'transform 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div style={{ width: '18rem', height: '12rem', background: 'linear-gradient(to bottom, #fed7aa, #fdba74)', borderRadius: '50%', border: '8px solid #fb923c', boxShadow: '0 20px 25px rgba(0,0,0,0.15)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #fde68a, #fcd34d)' }}>
                    <div style={{ position: 'absolute', top: '2rem', left: '3rem', width: '2rem', height: '2rem', background: 'white', borderRadius: '0.375rem', opacity: 0.7 }}></div>
                    <div style={{ position: 'absolute', top: '4rem', right: '4rem', width: '1.5rem', height: '1.5rem', background: 'white', borderRadius: '0.375rem', opacity: 0.6 }}></div>
                    <div style={{ position: 'absolute', bottom: '3rem', left: '5rem', width: '2.5rem', height: '2.5rem', background: 'white', borderRadius: '0.375rem', opacity: 0.8 }}></div>
                    <div style={{ position: 'absolute', top: '5rem', right: '6rem', width: '1.5rem', height: '1rem', background: '#7f1d1d', borderRadius: '0.25rem', opacity: 0.7 }}></div>
                    <div style={{ position: 'absolute', top: '6rem', left: '7rem', width: '2rem', height: '1.25rem', background: '#7f1d1d', borderRadius: '0.25rem', opacity: 0.6 }}></div>
                  </div>
                  
                  <div style={{ position: 'absolute', top: '-1.5rem', left: '50%', transform: 'translateX(-50%)', animation: 'pulse 2s ease-in-out infinite' }}>
                    <div style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', opacity: 0.6 }}>💨</div>
                  </div>
                </div>
              </div>

              {saltAnimation && (
                <>
                  <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%) rotate(-45deg)' }}>
                    <span style={{ fontSize: 'clamp(4rem, 10vw, 5rem)' }}>🧂</span>
                  </div>
                  
                  <div
                    style={{
                      position: 'absolute',
                      top: '70px',
                      left: '50%',
                      animation: 'fall 0.6s ease-in forwards'
                    }}
                  >
                    <span style={{ fontSize: '1.5rem', opacity: 0.9 }}>⚪</span>
                  </div>
                </>
              )}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-block', background: 'linear-gradient(to right, #fef3c7, #fde68a)', borderRadius: '9999px', padding: 'clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem)', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
                <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#6b7280', marginBottom: '0.25rem' }}>넣은 소금</p>
                <p style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '700', color: '#ea580c', margin: 0 }}>
                  {saltAmount}g
                </p>
                <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)', color: '#6b7280', marginTop: '0.25rem' }}>
                  (한 꼬집 = 1g)
                </p>
              </div>
            </div>

            {/* ✅ 수정: flexDirection을 'row'로 고정, flexWrap으로 반응형 처리 */}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={handleSubmit}
                disabled={submitted}
                style={{ 
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)', 
                  borderRadius: '9999px', 
                  fontWeight: '700', 
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', 
                  boxShadow: submitted ? 'none' : '0 10px 15px rgba(0,0,0,0.1)', 
                  transition: 'all 0.3s',
                  border: 'none',
                  cursor: submitted ? 'not-allowed' : 'pointer',
                  background: submitted ? '#d1d5db' : '#22c55e',
                  color: submitted ? '#9ca3af' : 'white'
                }}
                onMouseEnter={e => { if (!submitted) e.currentTarget.style.background = '#16a34a'; }}
                onMouseLeave={e => { if (!submitted) e.currentTarget.style.background = '#22c55e'; }}
              >
                {submitted ? '제출 완료' : '손님에게 제출하기'}
              </button>
              
              <button
                onClick={handleReset}
                style={{ padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)', background: '#3b82f6', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s', border: 'none', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#3b82f6'; }}
              >
                다시 시작
              </button>
            </div>
          </div>
        </div>
      </div>

      {submitted && (
        <div ref={resultRef} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(2rem, 4vw, 3rem) 1rem', background: 'linear-gradient(to bottom right, #faf5ff, #fce7f3)' }}>
          <div style={{ maxWidth: '1000px', width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                손님의 반응
              </h2>
            </div>

            <div style={{ background: status.bg, borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', marginBottom: '1.5rem' }}>{status.emoji}</div>
                <h3 style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', fontWeight: '700', color: status.color, marginBottom: '1rem' }}>
                  "{status.text}"
                </h3>
                <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#374151', marginBottom: '1rem' }}>
                  {status.comment}
                </p>
                
                {saltAmount === 7 && (
                  <div style={{ marginTop: '1.5rem', color: '#16a34a', fontWeight: '700', fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', animation: 'pulse 2s ease-in-out infinite' }}>
                    ⭐ 완벽한 간입니다! ⭐
                  </div>
                )}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', color: '#1f2937', margin: 0 }}>
                  📊 정의역 → 치역 매핑
                </h3>
                <button
                  onClick={() => setShowMapping(!showMapping)}
                  style={{ padding: '0.5rem 1rem', background: '#a855f7', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', transition: 'all 0.3s', border: 'none', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#9333ea'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#a855f7'; }}
                >
                  {showMapping ? '숨기기' : '보기'}
                </button>
              </div>
              
              {showMapping && (
                <>
                  {/* ✅ 수정: gridTemplateColumns 반응형 처리 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'clamp(1rem, 2vw, 2rem)', marginBottom: '1.5rem' }}>
                    <div style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '0.75rem', padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
                      <h4 style={{ fontWeight: '700', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', color: '#1e40af', marginBottom: '1rem', textAlign: 'center' }}>
                        정의역 (입력)
                      </h4>
                      <p style={{ textAlign: 'center', fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#374151' }}>
                        소금의 양 (g)
                      </p>
                      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <span style={{ display: 'inline-block', background: '#bfdbfe', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#1e3a8a' }}>
                          0g ~ 25g
                        </span>
                      </div>
                    </div>

                    <div style={{ background: 'linear-gradient(135deg, #fed7aa, #fdba74)', borderRadius: '0.75rem', padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
                      <h4 style={{ fontWeight: '700', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)', color: '#9a3412', marginBottom: '1rem', textAlign: 'center' }}>
                        치역 (출력)
                      </h4>
                      <p style={{ textAlign: 'center', fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#374151' }}>
                        짠맛 단계
                      </p>
                      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                        <span style={{ display: 'inline-block', background: '#fdba74', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#7c2d12' }}>
                          1 ~ 10단계
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ background: '#f9fafb', borderRadius: '0.75rem', padding: 'clamp(1rem, 2vw, 1.5rem)', maxHeight: '400px', overflowY: 'auto' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.75rem, 2vw, 1rem)' }}>
                      {[
                        { level: 1, emoji: '😰', title: '1단계 - 너무 싱거워요', bg: '#dbeafe', color: '#1e40af', mapping: '0g, 1g → 1단계' },
                        { level: 2, emoji: '😕', title: '2단계 - 많이 싱거워요', bg: '#dbeafe', color: '#1e40af', mapping: '2g, 3g → 2단계' },
                        { level: 3, emoji: '🙁', title: '3단계 - 조금 싱거워요', bg: '#cffafe', color: '#0e7490', mapping: '4g, 5g → 3단계' },
                        { level: 4, emoji: '🙂', title: '4단계 - 거의 적당해요', bg: '#fef3c7', color: '#92400e', mapping: '6g → 4단계' },
                        { level: 5, emoji: '🍜', title: '5단계 - 완벽해요! ⭐', bg: '#d1fae5', color: '#15803d', mapping: '7g → 5단계 (최적)', border: '2px solid #22c55e' },
                        { level: 6, emoji: '😐', title: '6단계 - 약간 짜기 시작해요', bg: '#fed7aa', color: '#9a3412', mapping: '8g, 9g → 6단계' },
                        { level: 7, emoji: '😬', title: '7단계 - 조금 짜요', bg: '#fed7aa', color: '#9a3412', mapping: '10g, 11g → 7단계' },
                        { level: 8, emoji: '😣', title: '8단계 - 짜요', bg: '#fecaca', color: '#991b1b', mapping: '12g, 13g → 8단계' },
                        { level: 9, emoji: '😵', title: '9단계 - 많이 짜요', bg: '#fecaca', color: '#991b1b', mapping: '14g, 15g, 16g → 9단계' },
                        { level: 10, emoji: '💀', title: '10단계 - 너무 짜서 먹기 힘들어요', bg: '#fecaca', color: '#991b1b', mapping: '17g ~ 25g → 10단계' }
                      ].map(item => (
                        <div key={item.level} style={{ background: item.bg, borderRadius: '0.5rem', padding: 'clamp(0.5rem, 1.5vw, 0.75rem)', border: item.border || 'none' }}>
                          <div style={{ fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: item.color, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span>{item.emoji}</span>
                            <span>{item.title}</span>
                          </div>
                          <div style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#374151', paddingLeft: 'clamp(1.5rem, 3vw, 2rem)' }}>
                            {item.mapping}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p style={{ textAlign: 'center', fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#6b7280', marginTop: '1rem' }}>
                    💡 현재 선택: <span style={{ fontWeight: '700', color: '#16a34a' }}>{saltAmount}g → {saltinessLevel}단계</span>
                    {saltAmount === 7 && ' ⭐ (최적)'}
                  </p>
                </>
              )}
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
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
      )}
    </div>
  );
}