/**
 * AI 학생 행동 분석 결과 인터페이스
 */
export interface BehaviorRecord {
  번호: string;
  이름: string;
  행동: string;
}

export interface GASResponse {
  success: boolean;
  data?: BehaviorRecord[];
  message?: string;
}

/**
 * Google Apps Script API와 통신하여 학생 행동을 기록합니다.
 */
export async function recordStudentBehavior(text: string): Promise<GASResponse> {
  const GAS_URL = process.env.NEXT_PUBLIC_GAS_URL;
  const AUTH_KEY = process.env.NEXT_PUBLIC_AUTH_KEY;

  if (!GAS_URL || !AUTH_KEY) {
    return {
      success: false,
      message: '환경 변수(GAS_URL 또는 AUTH_KEY)가 설정되지 않았습니다.',
    };
  }

  try {
    const response = await fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({
        text,
        authKey: AUTH_KEY,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('GAS API 요청 중 오류 발생:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
    };
  }
}
