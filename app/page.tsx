'use client';

import { useState } from 'react';
import { recordStudentBehavior, BehaviorRecord } from '@/lib/behaviorService';

/**
 * AI 학생 행동 기록 시스템 - 메인 페이지
 * 프리미엄 다크 모드 스타일 UI
 */
export default function Home() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BehaviorRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!inputText.trim()) {
      alert('행동 내용을 입력해 주세요.');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await recordStudentBehavior(inputText);
      if (response.success && response.data) {
        setResult(response.data);
        setInputText(''); // 성공 시 입력창 초기화
      } else {
        setError(response.message || '데이터를 기록하는 데 실패했습니다.');
      }
    } catch (err) {
      setError('서버 통신 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* 헤더 섹션 */}
        <header className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            AI 학생 행동 기록 시스템
          </h1>
          <p className="text-slate-400">행동 내용을 자유롭게 적으면 AI가 분석하여 기록합니다.</p>
        </header>

        {/* 입력 섹션 */}
        <section className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm shadow-xl">
          <div className="space-y-4">
            <textarea
              className="w-full h-40 bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
              placeholder="예: 1번 김철수가 정해진 시간보다 일찍 등교하여 교실 환경 미화에 도움을 주었습니다."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${loading
                  ? 'bg-slate-700 cursor-not-allowed text-slate-500'
                  : 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-500/20'
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  AI 분석 중...
                </span>
              ) : '기록하기'}
            </button>
          </div>
        </section>

        {/* 에러 메시지 */}
        {error && (
          <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-400 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* 결과 섹션 */}
        {result && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-cyan-400 rounded-full"></span>
              최근 기록된 내용
            </h2>
            <div className="overflow-hidden bg-slate-800/30 border border-slate-700 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-700/50">
                    <th className="p-4 font-medium text-slate-300">번호</th>
                    <th className="p-4 font-medium text-slate-300">이름</th>
                    <th className="p-4 font-medium text-slate-300">행동 기록</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {result.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-700/20 transition-colors">
                      <td className="p-4 text-cyan-400 font-mono">{item.번호}</td>
                      <td className="p-4 font-bold">{item.이름}</td>
                      <td className="p-4 text-slate-400 leading-relaxed">{item.행동}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-center text-slate-500">
              * 구글 스프레드시트 'students_action' 시트에 저장이 완료되었습니다.
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
