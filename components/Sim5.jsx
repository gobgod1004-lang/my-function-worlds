"use client";
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from 'recharts';

export default function Sim5() {
  const router = useRouter();
  const [breed, setBreed] = useState('pomeranian');
  const [weekAge, setWeekAge] = useState(15);
  const [showGuide, setShowGuide] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 반응형 처리를 위한 useEffect
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // 초기 설정
    handleResize();
    
    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 견종별 정보
  const breedInfo = {
    pomeranian: {
      name: '포메라니안',
      emoji: '🐕',
      color: '#f97316',
      bgGradient: 'linear-gradient(135deg, #fed7aa, #fdba74)',
      size: '소형견 (성견 2~3kg)',
      characteristic: '작고 귀여운 털뭉치! 활발하고 사교적이에요.',
      image: '🦊'
    },
    toypoodle: {
      name: '토이푸들',
      emoji: '🐩',
      color: '#ec4899',
      bgGradient: 'linear-gradient(135deg, #fce7f3, #fbcfe8)',
      size: '소형견 (성견 3~4kg)',
      characteristic: '똑똑하고 사랑스러운 곱슬이! 저자극성 털이 특징이에요.',
      image: '🎀'
    },
    retriever: {
      name: '리트리버',
      emoji: '🦮',
      color: '#f59e0b',
      bgGradient: 'linear-gradient(135deg, #fef3c7, #fde68a)',
      size: '대형견 (성견 25~35kg)',
      characteristic: '온순하고 충성스러운 대형견! 가족과 함께하길 좋아해요.',
      image: '🌟'
    }
  };

  const currentBreed = breedInfo[breed];

  // 사료량 계산 함수
  const calculateFood = (x, breedType) => {
    if (breedType === 'pomeranian') {
      if (x >= 6 && x < 10) return 0.02 * Math.pow(x - 6, 2) + 1;
      if (x >= 10 && x < 18) return 0.02 * Math.pow(x - 10, 2) + 2;
      if (x >= 18 && x < 26) return 0.02 * Math.pow(x - 18, 2) + 3;
      if (x >= 26) return 0.02 * Math.pow(x - 26, 2) + 4;
    } else if (breedType === 'toypoodle') {
      if (x >= 6 && x < 10) return 0.015 * Math.pow(x - 6, 2) + 0.9;
      if (x >= 10 && x < 18) return 0.015 * Math.pow(x - 10, 2) + 1;
      if (x >= 18 && x < 26) return 0.015 * Math.pow(x - 18, 2) + 2;
      if (x >= 26) return 0.015 * Math.pow(x - 26, 2) + 3.5;
    } else if (breedType === 'retriever') {
      if (x >= 6 && x < 10) return 0.05 * Math.pow(x - 6, 2) + 7;
      if (x >= 10 && x < 18) return 0.05 * Math.pow(x - 10, 2) + 11;
      if (x >= 18 && x < 26) return 0.05 * Math.pow(x - 18, 2) + 15;
      if (x >= 26) return 0.05 * Math.pow(x - 26, 2) + 30;
    }
    return 0;
  };

  const foodAmount = useMemo(() => calculateFood(weekAge, breed), [weekAge, breed]);

  // 그래프 데이터 생성
  const graphData = useMemo(() => {
    const data = [];
    for (let x = 6; x <= 52; x += 0.5) {
      data.push({
        x: Math.round(x),
        y: Math.round(calculateFood(x, breed))
      });
    }
    return data;
  }, [breed]);

  // 성장 단계
  const getGrowthStage = (weeks) => {
    if (weeks < 10) {
      return {
        stage: '급성장기',
        desc: '빠르게 자라는 시기예요. 영양 공급이 매우 중요해요!',
        color: '#dc2626',
        bg: 'linear-gradient(135deg, #fecaca, #fca5a5)',
        emoji: '🌱'
      };
    } else if (weeks < 18) {
      return {
        stage: '성장기',
        desc: '꾸준히 자라는 시기예요. 균형잡힌 식사가 필요해요.',
        color: '#ca8a04',
        bg: 'linear-gradient(135deg, #fef3c7, #fde68a)',
        emoji: '🌿'
      };
    } else if (weeks < 26) {
      return {
        stage: '후기 성장기',
        desc: '성견에 가까워지고 있어요. 체중 관리를 시작해야 해요.',
        color: '#16a34a',
        bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
        emoji: '🌳'
      };
    } else {
      return {
        stage: '성견',
        desc: '다 자란 성견이에요. 건강 유지에 집중하세요!',
        color: '#2563eb',
        bg: 'linear-gradient(135deg, #dbeafe, #bfdbfe)',
        emoji: '🎯'
      };
    }
  };

  const growthStage = getGrowthStage(weekAge);

  // 월령 변환
  const getMonthAge = (weeks) => {
    const months = Math.floor(weeks / 4);
    const remainWeeks = weeks % 4;
    return remainWeeks === 0 ? `${months}개월` : `${months}개월 ${remainWeeks}주`;
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #dbeafe, #e9d5ff)',
      padding: 'clamp(2rem, 4vw, 3rem) 1rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
          <button
            onClick={() => router.push('/')}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              padding: '0.75rem 1.5rem',
              background: '#6b7280',
              color: 'white',
              borderRadius: '9999px',
              fontWeight: '700',
              fontSize: 'clamp(0.875rem, 2vw, 1rem)',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4b5563'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6b7280'; }}
          >
            ← 메인으로
          </button>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 2.5rem)',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            🐕 강아지 주령별 사료량
          </h1>
          <p style={{ color: '#6b7280', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            강아지의 나이에 따라 얼마나 먹어야 할까요?
          </p>
        </div>

        {/* 견종 선택 */}
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          marginBottom: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1rem'
          }}>
            견종 선택
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(breedInfo).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setBreed(key)}
                style={{
                  background: breed === key ? info.bgGradient : 'white',
                  border: breed === key ? `3px solid ${info.color}` : '3px solid #e5e7eb',
                  borderRadius: '0.75rem',
                  padding: 'clamp(1rem, 2vw, 1.5rem)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  textAlign: 'center'
                }}
                onMouseEnter={e => {
                  if (breed !== key) {
                    e.currentTarget.style.borderColor = info.color;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={e => {
                  if (breed !== key) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{ fontSize: 'clamp(2.5rem, 6vw, 3rem)', marginBottom: '0.5rem' }}>
                  {info.emoji}
                </div>
                <div style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  {info.name}
                </div>
                <div style={{ fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)', color: '#6b7280' }}>
                  {info.size}
                </div>
              </button>
            ))}
          </div>
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: currentBreed.bgGradient,
            borderRadius: '0.75rem',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#374151', margin: 0 }}>
              <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>{currentBreed.image}</span>
              {' '}{currentBreed.characteristic}
            </p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          {/* 주령 선택 */}
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            padding: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              주령 선택
            </h2>

            {/* 현재 주령 표시 */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-block',
                background: currentBreed.bgGradient,
                borderRadius: '9999px',
                padding: 'clamp(1rem, 2vw, 1.5rem) clamp(2rem, 4vw, 3rem)',
                boxShadow: '0 10px 15px rgba(0,0,0,0.1)'
              }}>
                <p style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  color: '#6b7280',
                  marginBottom: '0.25rem'
                }}>
                  현재 나이
                </p>
                <p style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                  fontWeight: '700',
                  color: currentBreed.color,
                  margin: 0
                }}>
                  {weekAge}주
                </p>
                <p style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  fontWeight: '600',
                  color: currentBreed.color,
                  marginTop: '0.25rem'
                }}>
                  ({getMonthAge(weekAge)})
                </p>
              </div>
            </div>

            {/* 슬라이더 */}
            <div style={{ marginBottom: '1.5rem' }}>
              <input
                type="range"
                min="6"
                max="52"
                value={weekAge}
                onChange={(e) => setWeekAge(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  outline: 'none',
                  appearance: 'none',
                  background: `linear-gradient(to right, ${currentBreed.color} 0%, ${currentBreed.color} ${((weekAge - 6) / (52 - 6)) * 100}%, #e5e7eb ${((weekAge - 6) / (52 - 6)) * 100}%, #e5e7eb 100%)`
                }}
              />
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                color: '#6b7280',
                marginTop: '0.5rem'
              }}>
                <span>6주</span>
                <span>52주 (1년)</span>
              </div>
            </div>

            {/* 빠른 선택 버튼 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.5rem'
            }}>
              {[8, 12, 16, 20, 26, 40].map(week => (
                <button
                  key={week}
                  onClick={() => setWeekAge(week)}
                  style={{
                    padding: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                    background: weekAge === week ? currentBreed.color : '#f9fafb',
                    color: weekAge === week ? 'white' : '#374151',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={e => {
                    if (weekAge !== week) {
                      e.currentTarget.style.background = '#e5e7eb';
                    }
                  }}
                  onMouseLeave={e => {
                    if (weekAge !== week) {
                      e.currentTarget.style.background = '#f9fafb';
                    }
                  }}
                >
                  {week}주
                </button>
              ))}
            </div>
          </div>

          {/* 결과 */}
          <div style={{
            background: 'white',
            borderRadius: '1.5rem',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            padding: 'clamp(1.5rem, 3vw, 2rem)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 2rem)',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              권장 사료량
            </h2>

            {/* 사료량 표시 */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{
                display: 'inline-block',
                background: growthStage.bg,
                borderRadius: '1rem',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                width: '100%',
                border: `3px solid ${growthStage.color}`
              }}>
                <div style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', marginBottom: '0.5rem' }}>
                  🍖
                </div>
                <p style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                  fontWeight: '700',
                  color: growthStage.color,
                  margin: 0
                }}>
                  {foodAmount.toFixed(1)}kg
                </p>
                <p style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  color: '#6b7280',
                  marginTop: '0.5rem'
                }}>
                  하루 권장 사료량
                </p>
              </div>
            </div>

            {/* 성장 단계 */}
            <div style={{
              background: growthStage.bg,
              borderRadius: '0.75rem',
              padding: 'clamp(1rem, 2vw, 1.5rem)',
              border: `2px solid ${growthStage.color}`
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}>
                  {growthStage.emoji}
                </span>
                <h3 style={{
                  fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                  fontWeight: '700',
                  color: growthStage.color,
                  margin: 0
                }}>
                  {growthStage.stage}
                </h3>
              </div>
              <p style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                color: '#374151',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {growthStage.desc}
              </p>
            </div>

            {/* 가이드 토글 */}
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <button
                onClick={() => setShowGuide(!showGuide)}
                style={{
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  color: '#6366f1',
                  textDecoration: 'underline',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4338ca'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6366f1'; }}
              >
                {showGuide ? '가이드 숨기기' : '사료 급여 가이드 보기'}
              </button>
            </div>

            {showGuide && (
              <div style={{
                marginTop: '1rem',
                background: '#f9fafb',
                borderRadius: '0.75rem',
                padding: '1rem',
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                color: '#374151',
                lineHeight: '1.6'
              }}>
                <p style={{ fontWeight: '700', marginBottom: '0.5rem' }}>💡 사료 급여 팁:</p>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  <li>하루 권장량을 2-3회로 나눠서 급여하세요</li>
                  <li>항상 신선한 물을 함께 제공하세요</li>
                  <li>급격한 사료 변경은 소화 문제를 일으킬 수 있어요</li>
                  <li>간식은 하루 칼로리의 10% 이내로 제한하세요</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 그래프 */}
        <div style={{
          background: 'white',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
          padding: 'clamp(1.5rem, 3vw, 2rem)',
          marginTop: 'clamp(1.5rem, 3vw, 2rem)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem'
          }}>
            📈 주령별 사료량 변화 그래프
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="x"
                label={{
                  value: '주령 (주)',
                  position: 'insideBottom',
                  offset: -5,
                  style: { fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' }
                }}
                domain={[6, 52]}
                ticks={[6, 10, 18, 26, 34, 42, 52]}
                tickFormatter={(tick) => Math.round(tick)}
                style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}
              />
              <YAxis
                label={{
                  value: '사료량 (kg)',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)' }
                }}
                domain={[0, breed === 'retriever' ? 35 : 8]}
                tickFormatter={(tick) => Math.round(tick)}
                style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}
              />
              <Tooltip
                formatter={(value) => `${Math.round(value)}kg`}
                labelFormatter={(label) => `${label}주 (${getMonthAge(label)})`}
                contentStyle={{
                  fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
                  borderRadius: '0.5rem',
                  border: `2px solid ${currentBreed.color}`
                }}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke={currentBreed.color}
                strokeWidth={3}
                dot={false}
              />
              <ReferenceDot
                x={weekAge}
                y={foodAmount}
                r={8}
                fill="#dc2626"
                stroke="#fff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
          <div style={{
            marginTop: '1rem',
            padding: '0.75rem',
            background: '#f9fafb',
            borderRadius: '0.5rem',
            textAlign: 'center'
          }}>
            <p style={{
              fontSize: 'clamp(0.75rem, 1.8vw, 0.875rem)',
              fontWeight: '700',
              color: '#374151',
              margin: 0
            }}>
              현재 위치: {weekAge}주 ({getMonthAge(weekAge)}) - {foodAmount.toFixed(1)}kg
            </p>
          </div>
        </div>

        {/* 돌아가기 버튼 */}
        <div style={{ marginTop: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center' }}>
          <button
            onClick={() => router.push('/')}
            style={{
              padding: '0.75rem 2rem',
              background: 'white',
              color: '#374151',
              borderRadius: '9999px',
              boxShadow: '0 10px 15px rgba(0,0,0,0.1)',
              transition: 'all 0.3s',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer',
              fontSize: 'clamp(1rem, 2.5vw, 1.125rem)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
            }}
          >
            ← 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}