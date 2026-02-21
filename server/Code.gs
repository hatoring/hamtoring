/**
 * AI 학생 행동 기록 시스템 - Google Apps Script (GAS)
 * 
 * 주요 기능:
 * 1. Next.js 서버로부터 학생 행동 텍스트를 수신 (doPost)
 * 2. Gemini API를 사용하여 텍스트 분석 (학생 식별 및 행동 추출)
 * 3. 분석된 결과를 구글 스프레드시트에 KST 시간으로 기록
 */

const PROPERTIES = PropertiesService.getScriptProperties();
const GEMINI_API_KEY = PROPERTIES.getProperty('GEMINI_API_KEY');
const APP_AUTH_KEY = PROPERTIES.getProperty('APP_AUTH_KEY');
const MODEL_NAME = 'gemini-2.0-flash'; // 최 최신 모델 사용

/**
 * POST 요청 처리 함수
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const text = data.text;
    const authKey = data.authKey;

    // 1. 보안 인증 확인
    if (authKey !== APP_AUTH_KEY) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Unauthorized: Invalid Auth Key' 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (!text) {
      return ContentService.createTextOutput(JSON.stringify({ 
        success: false, 
        message: 'Bad Request: Missing text' 
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. 학생 명단 읽기
    const studentsInfo = getStudentsInfo();
    
    // 3. Gemini API 호출하여 분석
    const analysisResult = analyzeBehaviorWithGemini(text, studentsInfo);

    // 4. 스프레드시트에 기록
    recordActions(analysisResult);

    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      data: analysisResult 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * students_info 시트에서 학생 명단(번호, 이름)을 읽어옵니다.
 */
function getStudentsInfo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('students_info');
  if (!sheet) throw new Error("'students_info' 시트를 찾을 수 없습니다.");
  
  const data = sheet.getDataRange().getValues();
  const students = [];
  
  // 첫 번째 행은 헤더이므로 생략
  for (let i = 1; i < data.length; i++) {
    students.push({
      "번호": data[i][0].toString(),
      "이름": data[i][1].toString()
    });
  }
  return students;
}

/**
 * Gemini API를 사용하여 학생 행동을 분석합니다.
 */
function analyzeBehaviorWithGemini(text, studentsInfo) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${GEMINI_API_KEY}`;
  
  const prompt = `
당신은 학생들의 행동을 기록하는 보조 교사입니다.
교사가 입력한 내용을 분석하여 제공된 학생 명단 중 해당되는 학생을 찾아 행동 기록을 JSON 배열로 반환하세요.

[학생 명단]
${JSON.stringify(studentsInfo)}

[입력 내용]
"${text}"

[출력 형식]
반드시 아래와 같은 순수 JSON 배열만 반환하세요. (코드 블록 없이)
[{"번호": "번호", "이름": "이름", "행동": "구체적인 행동 내용"}]

주의사항:
1. 명단에 없는 이름은 기록하지 마세요.
2. 행동 내용은 문장형으로 다듬어서 작성하세요.
3. 여러 명의 행동이 포함된 경우 각각 객체로 분리하세요.
`;

  const payload = {
    "contents": [{
      "parts": [{ "text": prompt }]
    }],
    "generationConfig": {
      "response_mime_type": "application/json"
    }
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(url, options);
  const json = JSON.parse(response.getContentText());
  const resultText = json.candidates[0].content.parts[0].text;
  
  return JSON.parse(resultText);
}

/**
 * 분석된 결과를 students_action 시트에 기록합니다.
 */
function recordActions(actions) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('students_action');
  if (!sheet) throw new Error("'students_action' 시트를 찾을 수 없습니다.");
  
  // 한국 시간(KST) 포맷 설정
  const now = new Date();
  const timestamp = Utilities.formatDate(now, "GMT+9", "yyyy. M. d. a h:mm:ss");

  actions.forEach(action => {
    sheet.appendRow([
      timestamp,
      action["번호"],
      action["이름"],
      action["행동"]
    ]);
  });
}
