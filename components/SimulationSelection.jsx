"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SimulationSelection() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);

  const simulations = [
    {
      id: 1,
      icon: '🍜',
      title: '라면 조리 시간과 맛의 변화',
      description: '조리 시간에 따라 라면의 맛이 어떻게 변하는지 체험해보세요',
      link: '/simulations/sim1',
      gradient: 'linear-gradient(135deg, #fbbf24, #f97316)'
    },
    {
      id: 2,
      icon: '🧂',
      title: '소금의 양과 짠맛 강도',
      description: '소금 양에 따른 짠맛 단계 변화를 정의역과 치역으로 이해해요',
      link: '/simulations/sim2',
      gradient: 'linear-gradient(135deg, #f59e0b, #ea580c)'
    },
    {
      id: 3,
      icon: '🧬',
      title: '코돈과 아미노산',
      description: '3개의 염기를 조합하여 아미노산을 만들고 유전 정보를 이해해요',
      link: '/simulations/sim3',
      gradient: 'linear-gradient(135deg, #6366f1, #a855f7)'
    },
    {
      id: 4,
      icon: '🔬',
      title: '세포막 물질 이동',
      description: '확산과 촉진확산의 차이를 시각화하고 농도에 따른 속도를 관찰해요',
      link: '/simulations/sim4',
      gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)'
    },
    {
      id: 5,
      icon: '🐕',
      title: '강아지 성장과 사료량',
      description: '주령에 따른 사료량 변화를 2차 함수 그래프로 확인해요',
      link: '/simulations/sim5',
      gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
    },
    {
      id: 6,
      icon: '🐾',
      title: '강아지 견종별 운동량',
      description: '견종에 따른 운동 시간을 함수 매핑으로 이해해요',
      link: '/simulations/sim6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)'
    }
  ];

  const cardStyle = (isHovered) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    transition: 'transform 0.7s',
    transformStyle: 'preserve-3d',
    transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)'
  });

  const frontStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: 'white',
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
    border: '4px solid #f3f4f6',
    transition: 'border-color 0.3s'
  };

  const backStyle = (gradient) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    background: gradient,
    borderRadius: '1.5rem',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backfaceVisibility: 'hidden',
    transform: 'rotateY(180deg)'
  });

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #dbeafe, #e9d5ff, #fce7f3)', padding: 'clamp(2rem, 4vw, 3rem) 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 3.75rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>
            일상 속 함수 탐험하기 🔬
          </h1>
          <p style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', color: '#6b7280', marginBottom: '0.5rem' }}>
            주제를 선택해서 함수의 세계를 경험해보세요
          </p>
          <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#9ca3af' }}>
            💡 카드에 마우스를 올려 자세한 내용을 확인하세요
          </p>
        </div>

        {/* ✅ 프로젝트 개요 */}
        <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', textAlign: 'center' }}>
            📌 프로젝트 개요
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: '#374151', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.6' }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#a855f7' }}>함수는 입력값에 따라 출력값이 결정되는 규칙적인 관계</strong>를 뜻합니다. 
              우리가 살아가는 현실 속 대부분의 변화는 함수로 표현할 수 있어요.
            </p>
            <p style={{ margin: 0 }}>
              이 프로젝트는 일상생활의 다양한 현상을 <strong style={{ color: '#a855f7' }}>수학 함수로 시각화</strong>하고, 
              사용자가 직접 변수를 조절하며 <strong style={{ color: '#a855f7' }}>입력(x)과 출력(y)의 관계</strong>를 실시간으로 탐구할 수 있는 인터랙티브 웹사이트입니다.
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: '#a855f7' }}>Next.js와 React</strong>로 제작되었으며, 
              <strong style={{ color: '#a855f7' }}> Recharts 라이브러리</strong>를 활용해 그래프를 실시간으로 시각화합니다. 
              라면 조리부터 세포막 이동까지, 수학은 단순한 공식이 아닌 <strong style={{ color: '#a855f7' }}>세상의 규칙을 표현하는 도구</strong>임을 체험해보세요!
            </p>
          </div>
        </div>

        {/* ✅ 카드 그리드 - 3x2로 변경 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 'clamp(1.5rem, 3vw, 2rem)', 
          marginBottom: 'clamp(3rem, 6vw, 4rem)' 
        }}>
          {simulations.map((sim) => (
            <div
              key={sim.id}
              style={{
                position: 'relative',
                height: '320px',
                cursor: 'pointer',
                perspective: '1000px'
              }}
              onMouseEnter={() => setHoveredCard(sim.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => router.push(sim.link)}
            >
              <div style={cardStyle(hoveredCard === sim.id)}>
                {/* 앞면 - 아이콘 */}
                <div 
                  style={{
                    ...frontStyle,
                    borderColor: hoveredCard === sim.id ? '#a855f7' : '#f3f4f6'
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div 
                      style={{ 
                        fontSize: 'clamp(5rem, 12vw, 6rem)', 
                        marginBottom: '1rem',
                        animation: 'bounce 2s ease-in-out infinite'
                      }}
                    >
                      {sim.icon}
                    </div>
                    <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                      <div style={{ 
                        display: 'inline-block', 
                        background: sim.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>
                        <p style={{ fontSize: 'clamp(1.125rem, 3vw, 1.25rem)', fontWeight: '700', margin: 0 }}>
                          Sim {sim.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 뒷면 - 제목과 설명 */}
                <div style={backStyle(sim.gradient)}>
                  <div style={{ fontSize: 'clamp(3rem, 8vw, 4rem)', marginBottom: '1.5rem' }}>{sim.icon}</div>
                  <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', fontWeight: '700', marginBottom: '1rem', textAlign: 'center', lineHeight: '1.3' }}>
                    {sim.title}
                  </h3>
                  <p style={{ textAlign: 'center', fontSize: 'clamp(0.875rem, 2vw, 1rem)', opacity: 0.95, marginBottom: '1.5rem', lineHeight: '1.5' }}>
                    {sim.description}
                  </p>
                  <button 
                    style={{ 
                      marginTop: 'auto',
                      padding: '0.75rem 2rem', 
                      background: 'white', 
                      color: '#1f2937', 
                      borderRadius: '9999px', 
                      fontWeight: '700', 
                      fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
                    }}
                  >
                    시작하기 →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 정보 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(2rem, 4vw, 3rem)', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            <h2 style={{ fontSize: 'clamp(1.875rem, 5vw, 2.25rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1rem', textAlign: 'center' }}>
              🌟 학습 특징
            </h2>
            <p style={{ color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem', fontSize: 'clamp(0.875rem, 2vw, 1rem)', textAlign: 'center' }}>
              슬라이더로 값을 조절하면 JavaScript의 Math 함수가 즉시 계산하고, 
              그래프가 실시간으로 업데이트되어 함수의 형태가 시각화됩니다.
            </p>
            <p style={{ color: '#6b7280', lineHeight: '1.6', fontSize: 'clamp(0.875rem, 2vw, 1rem)', textAlign: 'center' }}>
              단순한 계산기가 아닌, <strong style={{ color: '#a855f7' }}>살아 있는 함수 체험 공간</strong>을 경험해보세요!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
            <div style={{ background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '1rem', padding: 'clamp(1.5rem, 3vw, 2rem)', border: '2px solid #93c5fd' }}>
              <div style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginBottom: '0.75rem' }}>📊</div>
              <h3 style={{ fontWeight: '700', color: '#1e40af', marginBottom: '0.5rem', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>시각적 학습</h3>
              <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#1e40af', margin: 0, lineHeight: '1.5' }}>
                그래프와 애니메이션으로 함수를 직관적으로 이해해요
              </p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #e9d5ff, #d8b4fe)', borderRadius: '1rem', padding: 'clamp(1.5rem, 3vw, 2rem)', border: '2px solid #c4b5fd' }}>
              <div style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginBottom: '0.75rem' }}>🎮</div>
              <h3 style={{ fontWeight: '700', color: '#7c3aed', marginBottom: '0.5rem', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>인터랙티브</h3>
              <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#7c3aed', margin: 0, lineHeight: '1.5' }}>
                직접 값을 조절하며 실시간으로 변화를 관찰해요
              </p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', borderRadius: '1rem', padding: 'clamp(1.5rem, 3vw, 2rem)', border: '2px solid #f9a8d4' }}>
              <div style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginBottom: '0.75rem' }}>🧪</div>
              <h3 style={{ fontWeight: '700', color: '#be185d', marginBottom: '0.5rem', fontSize: 'clamp(1rem, 2.5vw, 1.125rem)' }}>실생활 연결</h3>
              <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#be185d', margin: 0, lineHeight: '1.5' }}>
                현실의 현상을 수학으로 표현하고 이해해요
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @media (min-width: 1024px) {
          [style*="gridTemplateColumns"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}