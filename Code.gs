// Google Sheet backend: Extensions > Apps Script, paste, Deploy > Web app (Execute as: Me, Access: Anyone)
const H=['id','date','to','cat','amt','mode','split','shares','upd'];
function sh(){const s=SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];if(!s.getRange(1,1).getValue())s.appendRow(H);return s}
function doGet(){const v=sh().getDataRange().getValues().slice(1);
 return ContentService.createTextOutput(JSON.stringify(v.map(r=>Object.fromEntries(H.map((h,i)=>[h,h=='date'&&r[i] instanceof Date?Utilities.formatDate(r[i],'UTC','yyyy-MM-dd'):r[i]]))))).setMimeType(ContentService.MimeType.JSON)}
function doPost(e){const d=JSON.parse(e.postData.contents),s=sh();
 s.getRange(2,1,Math.max(s.getLastRow(),2),H.length).clearContent();
 if(d.length)s.getRange(2,1,d.length,H.length).setValues(d.map(x=>H.map(h=>x[h])));
 return ContentService.createTextOutput('ok')}
