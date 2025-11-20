"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Sim3() {
  const router = useRouter();
  const [slots, setSlots] = useState(['', '', '']);
  const [draggedBase, setDraggedBase] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const codonTable = {
    'UUU': { name: '페닐알라닌', abbr: 'Phe', desc: '신경전달물질 전구체로 뇌 기능과 기분 조절에 도움을 줘요.' },
    'UUC': { name: '페닐알라닌', abbr: 'Phe', desc: '신경전달물질 전구체로 뇌 기능과 기분 조절에 도움을 줘요.' },
    'UUA': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'UUG': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'UCU': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'UCC': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'UCA': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'UCG': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'UAU': { name: '티로신', abbr: 'Tyr', desc: '도파민, 노르에피네프린 등 신경전달물질과 멜라닌의 전구체예요.' },
    'UAC': { name: '티로신', abbr: 'Tyr', desc: '도파민, 노르에피네프린 등 신경전달물질과 멜라닌의 전구체예요.' },
    'UAA': { name: '종결 코돈', abbr: 'STOP', desc: '단백질 합성을 멈추라는 신호예요. 더 이상 아미노산이 연결되지 않아요.' },
    'UAG': { name: '종결 코돈', abbr: 'STOP', desc: '단백질 합성을 멈추라는 신호예요. 더 이상 아미노산이 연결되지 않아요.' },
    'UGU': { name: '시스테인', abbr: 'Cys', desc: '항산화제 글루타치온을 구성하며 멜라닌 생성 조절과 피부 보호 역할을 해요.' },
    'UGC': { name: '시스테인', abbr: 'Cys', desc: '항산화제 글루타치온을 구성하며 멜라닌 생성 조절과 피부 보호 역할을 해요.' },
    'UGA': { name: '종결 코돈', abbr: 'STOP', desc: '단백질 합성을 멈추라는 신호예요. 더 이상 아미노산이 연결되지 않아요.' },
    'UGG': { name: '트립토판', abbr: 'Trp', desc: '세로토닌과 멜라토닌 생성에 관여하여 수면과 기분 안정에 도움을 줘요.' },
    'CUU': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'CUC': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'CUA': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'CUG': { name: '류신', abbr: 'Leu', desc: '분지사슬 아미노산(BCAA)으로 근육 성장과 회복에 중요한 역할을 해요.' },
    'CCU': { name: '프롤린', abbr: 'Pro', desc: '콜라겐의 구성 성분으로 피부 보습과 조직 재생에 핵심 역할을 해요.' },
    'CCC': { name: '프롤린', abbr: 'Pro', desc: '콜라겐의 구성 성분으로 피부 보습과 조직 재생에 핵심 역할을 해요.' },
    'CCA': { name: '프롤린', abbr: 'Pro', desc: '콜라겐의 구성 성분으로 피부 보습과 조직 재생에 핵심 역할을 해요.' },
    'CCG': { name: '프롤린', abbr: 'Pro', desc: '콜라겐의 구성 성분으로 피부 보습과 조직 재생에 핵심 역할을 해요.' },
    'CAU': { name: '히스티딘', abbr: 'His', desc: '히스타민 생성에 필요하며 성장기에 중요하고 상처 치유를 촉진해요.' },
    'CAC': { name: '히스티딘', abbr: 'His', desc: '히스타민 생성에 필요하며 성장기에 중요하고 상처 치유를 촉진해요.' },
    'CAA': { name: '글루타민', abbr: 'Gln', desc: '장 점막을 보호하고 면역력을 증진하며 단백질 합성을 촉진해요.' },
    'CAG': { name: '글루타민', abbr: 'Gln', desc: '장 점막을 보호하고 면역력을 증진하며 단백질 합성을 촉진해요.' },
    'CGU': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'CGC': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'CGA': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'CGG': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'AUU': { name: '이소류신', abbr: 'Ile', desc: 'BCAA로 에너지 생산과 근육 대사에 관여하며 혈당 조절에도 도움을 줘요.' },
    'AUC': { name: '이소류신', abbr: 'Ile', desc: 'BCAA로 에너지 생산과 근육 대사에 관여하며 혈당 조절에도 도움을 줘요.' },
    'AUA': { name: '이소류신', abbr: 'Ile', desc: 'BCAA로 에너지 생산과 근육 대사에 관여하며 혈당 조절에도 도움을 줘요.' },
    'AUG': { name: '메티오닌', abbr: 'Met', desc: '항산화제 글루타치온 생성에 관여하고 체내 독소 배출과 지방 대사에 필수적이에요. 시작 코돈' },
    'ACU': { name: '트레오닌', abbr: 'Thr', desc: '피부와 치아, 콜라겐 생성에 중요하며 소화기 건강 유지에 도움을 줘요.' },
    'ACC': { name: '트레오닌', abbr: 'Thr', desc: '피부와 치아, 콜라겐 생성에 중요하며 소화기 건강 유지에 도움을 줘요.' },
    'ACA': { name: '트레오닌', abbr: 'Thr', desc: '피부와 치아, 콜라겐 생성에 중요하며 소화기 건강 유지에 도움을 줘요.' },
    'ACG': { name: '트레오닌', abbr: 'Thr', desc: '피부와 치아, 콜라겐 생성에 중요하며 소화기 건강 유지에 도움을 줘요.' },
    'AAU': { name: '아스파라긴', abbr: 'Asn', desc: '에너지 대사와 뇌 기능을 지원하며 신경 전달과 질소 운반에 관여해요.' },
    'AAC': { name: '아스파라긴', abbr: 'Asn', desc: '에너지 대사와 뇌 기능을 지원하며 신경 전달과 질소 운반에 관여해요.' },
    'AAA': { name: '라이신', abbr: 'Lys', desc: '성장과 조직 복구에 필요하고 칼슘 흡수를 촉진하며 면역력을 강화해요.' },
    'AAG': { name: '라이신', abbr: 'Lys', desc: '성장과 조직 복구에 필요하고 칼슘 흡수를 촉진하며 면역력을 강화해요.' },
    'AGU': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'AGC': { name: '세린', abbr: 'Ser', desc: '인지질과 글리세린산 생성에 관여하며 세포막과 신경계 기능을 지원해요.' },
    'AGA': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'AGG': { name: '아르기닌', abbr: 'Arg', desc: '산화질소 생성으로 혈관을 확장시키고 면역력과 상처 치유를 지원해요.' },
    'GUU': { name: '발린', abbr: 'Val', desc: 'BCAA로 근육 대사와 에너지 생성에 참여하고 운동 수행능력 향상에 도움을 줘요.' },
    'GUC': { name: '발린', abbr: 'Val', desc: 'BCAA로 근육 대사와 에너지 생성에 참여하고 운동 수행능력 향상에 도움을 줘요.' },
    'GUA': { name: '발린', abbr: 'Val', desc: 'BCAA로 근육 대사와 에너지 생성에 참여하고 운동 수행능력 향상에 도움을 줘요.' },
    'GUG': { name: '발린', abbr: 'Val', desc: 'BCAA로 근육 대사와 에너지 생성에 참여하고 운동 수행능력 향상에 도움을 줘요.' },
    'GCU': { name: '알라닌', abbr: 'Ala', desc: '간에서 포도당 생성을 보조하고 에너지 공급과 면역 세포를 지원해요.' },
    'GCC': { name: '알라닌', abbr: 'Ala', desc: '간에서 포도당 생성을 보조하고 에너지 공급과 면역 세포를 지원해요.' },
    'GCA': { name: '알라닌', abbr: 'Ala', desc: '간에서 포도당 생성을 보조하고 에너지 공급과 면역 세포를 지원해요.' },
    'GCG': { name: '알라닌', abbr: 'Ala', desc: '간에서 포도당 생성을 보조하고 에너지 공급과 면역 세포를 지원해요.' },
    'GAU': { name: '아스파르트산', abbr: 'Asp', desc: '에너지 생산 TCA회로에 관여하며 신경 전달과 해독 작용을 지원해요.' },
    'GAC': { name: '아스파르트산', abbr: 'Asp', desc: '에너지 생산 TCA회로에 관여하며 신경 전달과 해독 작용을 지원해요.' },
    'GAA': { name: '글루타메이트', abbr: 'Glu', desc: '주요 신경전달물질이며 장 내 연료 공급에 중요한 역할을 해요.' },
    'GAG': { name: '글루타메이트', abbr: 'Glu', desc: '주요 신경전달물질이며 장 내 연료 공급에 중요한 역할을 해요.' },
    'GGU': { name: '글리신', abbr: 'Gly', desc: '중추신경계 신경전달물질이며 콜라겐의 약 1/3을 구성하고 해독과 염증 억제 작용을 해요.' },
    'GGC': { name: '글리신', abbr: 'Gly', desc: '중추신경계 신경전달물질이며 콜라겐의 약 1/3을 구성하고 해독과 염증 억제 작용을 해요.' },
    'GGA': { name: '글리신', abbr: 'Gly', desc: '중추신경계 신경전달물질이며 콜라겐의 약 1/3을 구성하고 해독과 염증 억제 작용을 해요.' },
    'GGG': { name: '글리신', abbr: 'Gly', desc: '중추신경계 신경전달물질이며 콜라겐의 약 1/3을 구성하고 해독과 염증 억제 작용을 해요.' }
  };

  const bases = [
    { letter: 'U', color: '#60a5fa', name: 'Uracil' },
    { letter: 'C', color: '#4ade80', name: 'Cytosine' },
    { letter: 'A', color: '#facc15', name: 'Adenine' },
    { letter: 'G', color: '#f87171', name: 'Guanine' }
  ];

  const handleDragStart = (base) => setDraggedBase(base);
  const handleDrop = (index) => {
    if (draggedBase && !submitted) {
      const newSlots = [...slots];
      newSlots[index] = draggedBase;
      setSlots(newSlots);
      setDraggedBase(null);
    }
  };
  const handleClear = () => { setSlots(['', '', '']); setSubmitted(false); };
  const handleSubmit = () => { if (slots.every(s => s !== '')) setSubmitted(true); };

  const codon = slots.join('');
  const result = codonTable[codon];

  const getResultStyle = () => {
    if (!result) return { bg: '#f9fafb', color: '#4b5563' };
    if (result.abbr === 'STOP') return { bg: 'linear-gradient(135deg, #fecaca, #fca5a5)', color: '#991b1b' };
    if (codon === 'AUG') return { bg: 'linear-gradient(135deg, #e9d5ff, #d8b4fe)', color: '#6b21a8' };
    return { bg: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', color: '#15803d' };
  };

  const resultStyle = getResultStyle();

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #faf5ff, #fce7f3)', padding: 'clamp(2rem, 4vw, 3rem) 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative' }}>
          <button onClick={() => router.push('/')}
            style={{ position: 'absolute', left: 0, top: 0, padding: '0.75rem 1.5rem', background: '#6b7280', color: 'white', borderRadius: '9999px', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#4b5563'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#6b7280'; }}>
            ← 메인으로
          </button>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
            🧬 코돈과 아미노산
          </h1>
          <p style={{ color: '#6b7280', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
            3개의 염기를 조합하여 어떤 아미노산이 만들어지는지 확인해보세요
          </p>
        </div>

        {/* ✅ 수정: window 제거 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>염기 선택</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {bases.map((base) => (
                  <div
                    key={base.letter}
                    draggable
                    onDragStart={() => handleDragStart(base.letter)}
                    style={{ 
                      background: base.color, 
                      borderRadius: '0.75rem', 
                      padding: 'clamp(1.5rem, 3vw, 2rem)', 
                      cursor: 'move', 
                      boxShadow: '0 10px 15px rgba(0,0,0,0.1)', 
                      transition: 'all 0.3s',
                      textAlign: 'center',
                      userSelect: 'none'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)'; }}
                  >
                    <div style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>{base.letter}</div>
                    <div style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: 'white', opacity: 0.9 }}>{base.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1rem' }}>코돈 조립</h2>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                {slots.map((slot, index) => (
                  <div
                    key={index}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                    style={{ 
                      width: 'clamp(4rem, 15vw, 5rem)', 
                      height: 'clamp(4rem, 15vw, 5rem)', 
                      border: '2px dashed #d1d5db', 
                      borderRadius: '0.75rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: 'clamp(2rem, 6vw, 2.5rem)', 
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      background: 'white'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#f9fafb'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
                  >
                    {slot}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleSubmit}
                  style={{ padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)', background: '#6366f1', color: 'white', borderRadius: '0.75rem', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#4f46e5'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#6366f1'; }}
                >
                  확인
                </button>
                <button
                  onClick={handleClear}
                  style={{ padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 1.5rem)', background: '#d1d5db', color: '#374151', borderRadius: '0.75rem', fontWeight: '700', fontSize: 'clamp(0.875rem, 2vw, 1rem)', border: 'none', cursor: 'pointer', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#9ca3af'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#d1d5db'; }}
                >
                  초기화
                </button>
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setShowGuide(!showGuide)}
                style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', color: '#6366f1', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#4338ca'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#6366f1'; }}
              >
                {showGuide ? '가이드 숨기기' : '가이드 보기'}
              </button>
            </div>
          </div>

          {/* ✅ 수정: minHeight도 고정값으로 */}
          <div style={{ background: 'white', borderRadius: '1.5rem', boxShadow: '0 25px 50px rgba(0,0,0,0.25)', padding: 'clamp(1.5rem, 3vw, 2rem)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem' }}>결과</h2>
            <div style={{ background: resultStyle.bg, borderRadius: '0.75rem', padding: 'clamp(1.5rem, 3vw, 2rem)', width: '100%', textAlign: 'center', transition: 'all 0.3s', border: codon === 'AUG' ? '3px solid #a855f7' : result?.abbr === 'STOP' ? '3px solid #dc2626' : 'none' }}>
              <p style={{ color: resultStyle.color, fontWeight: '700', fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '0.5rem' }}>
                {result ? result.name : '???'}
              </p>
              {result && (
                <p style={{ color: resultStyle.color, fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '600', marginBottom: '1rem' }}>
                  ({result.abbr})
                </p>
              )}
              <p style={{ color: resultStyle.color, fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.5' }}>
                {result ? result.desc : '염기를 모두 배치하고 확인 버튼을 눌러보세요.'}
              </p>
              {codon === 'AUG' && (
                <div style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(168, 85, 247, 0.2)', borderRadius: '0.5rem' }}>
                  <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '700', color: '#7c3aed', margin: 0 }}>
                    ⭐ 시작 코돈
                  </p>
                </div>
              )}
              {result?.abbr === 'STOP' && (
                <div style={{ marginTop: '1rem', padding: '0.5rem', background: 'rgba(220, 38, 38, 0.2)', borderRadius: '0.5rem' }}>
                  <p style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)', fontWeight: '700', color: '#dc2626', margin: 0 }}>
                    🛑 종결 코돈
                  </p>
                </div>
              )}
            </div>

            {showGuide && (
              <div style={{ marginTop: '1.5rem', textAlign: 'left', background: '#f9fafb', padding: '1rem', borderRadius: '0.75rem', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.06)', color: '#374151', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '0.5rem' }}>💡 <strong>TIP:</strong></p>
                <p style={{ marginBottom: '0.5rem' }}>• AUG는 <strong style={{ color: '#7c3aed' }}>시작 코돈</strong></p>
                <p style={{ marginBottom: '0.5rem' }}>• UAA/UAG/UGA는 <strong style={{ color: '#dc2626' }}>종결 코돈</strong></p>
                <p style={{ margin: 0 }}>• 분지사슬 아미노산(BCAA): 류신, 발린, 이소류신</p>
              </div>
            )}
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
    </div>
  );
}