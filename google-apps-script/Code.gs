/**
 * Google Apps Script Web App receiver for the 免費請老師選一題 form.
 * 1. Create a Google Sheet and open Extensions > Apps Script.
 * 2. Paste this file, deploy as Web app (Execute as Me, Anyone).
 * 3. Put the /exec URL in config.js as window.GOOGLE_FORM_ENDPOINT.
 */
const SHEET_NAME = '問題收件';

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ ok: true, service: 'bazi-consult' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse((e.postData && e.postData.contents) || '{}');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['姓名', '出生日期', '出生時間', '日主', '數字組合', '問題類型', '想問的問題', 'LINE', '送出時間']);
  }
  sheet.appendRow([
    data.name || '', data.birthDate || '', data.birthTime || '', data.dayMaster || '',
    data.numberCombo || '', data.questionType || '', data.question || '', data.line || '',
    data.submittedAt || new Date().toISOString()
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
