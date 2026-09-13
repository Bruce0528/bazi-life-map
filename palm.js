(function(){
 'use strict';
 const names={love:'愛情線',career:'事業線',life:'生命線'};
 const descriptions={love:'這條線在傳統手相裡常被拿來談情感表達；現實關係更值得從溝通與承諾觀察。',career:'這條線在傳統手相裡常被拿來談工作方向；實際職涯仍由能力、機會與選擇塑造。',life:'生命線不能判斷壽命或健康。若在意身體狀況，請用正規健康檢查與專業諮詢。'};
 const genderLabel={male:'男生',female:'女生'},sideLabel={left:'左手掌',right:'右手掌'};
 let photo=null,url=null,stream=null,cameraOn=false,cameraRequest=0;
 function status(message){document.querySelector('#palm-camera-status').textContent=message}
 function currentLabel(){return genderLabel[document.querySelector('#palm-gender').value]+' · '+sideLabel[document.querySelector('#palm-side').value]}
 function updateLabel(){const label=currentLabel();document.querySelector('#palm-slot-label').textContent=label;const legend=document.querySelector('#palm-legend');if(legend)legend.textContent=label}
 function stopCamera(){cameraRequest++;if(stream)stream.getTracks().forEach(function(track){track.stop()});stream=null;cameraOn=false;document.querySelector('#palm-video').hidden=true;document.querySelector('#palm-snap-btn').hidden=true}
 function showPhoto(blob){const preview=document.querySelector('#palm-preview');if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);photo=blob;preview.src=url;preview.hidden=false}
 const choices='<option value="unknown">看不清／不確定</option><option value="clear">比較清晰</option><option value="faint">比較淺淡</option><option value="branch">有分岔或中斷</option>';
 document.querySelector('#palm-questions').innerHTML='<fieldset><legend id="palm-legend"></legend>'+Object.keys(names).map(function(key){return'<label>'+names[key]+'<select id="palm-line-'+key+'">'+choices+'</select></label>'}).join('')+'</fieldset>';
 updateLabel();
 document.querySelector('#palm-gender').addEventListener('change',updateLabel);
 document.querySelector('#palm-side').addEventListener('change',updateLabel);
 document.querySelector('#palm-photo').addEventListener('change',function(event){
  const file=event.target.files&&event.target.files[0],preview=document.querySelector('#palm-preview');
  if(cameraOn)stopCamera();if(url)URL.revokeObjectURL(url);url=null;photo=null;preview.hidden=true;
  if(!file||!file.type.startsWith('image/'))return;
  showPhoto(file);status(currentLabel()+'照片已在本機預覽。');
 });
 document.querySelector('#palm-camera-btn').addEventListener('click',async function(){
  stopCamera();const request=++cameraRequest;
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){status('此瀏覽器無法直接開啟相機，請使用上方的拍照／選檔欄位。');return}
  try{
   const opened=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'}},audio:false});
   if(request!==cameraRequest){opened.getTracks().forEach(function(track){track.stop()});return}
   stream=opened;cameraOn=true;
   const video=document.querySelector('#palm-video');video.srcObject=stream;video.hidden=false;
   document.querySelector('#palm-snap-btn').hidden=false;
   await video.play();
   status('相機已開啟，請讓手掌完整入鏡後按拍照。');
  }catch(e){stopCamera();status('無法取得相機權限；請允許相機，或改用拍照／選檔欄位。')}
 });
 document.querySelector('#palm-snap-btn').addEventListener('click',function(){
  const video=document.querySelector('#palm-video');
  if(!stream||!cameraOn||!video.videoWidth){status('相機畫面尚未準備好，請稍等。');return}
  const canvas=document.createElement('canvas');
  canvas.width=Math.min(video.videoWidth,1200);canvas.height=Math.round(video.videoHeight*canvas.width/video.videoWidth);
  canvas.getContext('2d').drawImage(video,0,0,canvas.width,canvas.height);
  canvas.toBlob(function(blob){if(blob){showPhoto(blob);status(currentLabel()+'已拍下，照片只保留在此頁面。')}stopCamera()},'image/jpeg',.85);
 });
 document.querySelector('#palm-back').addEventListener('click',stopCamera);
 document.querySelector('#palm-analyze').addEventListener('click',function(){
  const target=document.querySelector('#palm-result');target.hidden=false;
  if(!photo){target.innerHTML='<p>請先拍攝或選擇'+currentLabel()+'的照片。</p>';return}
  const labels={unknown:'看不清，這次不作猜測',clear:'照片中看起來比較清晰',faint:'照片中看起來比較淺淡',branch:'照片中似乎有分岔或中斷'};
  target.innerHTML='<h4>'+currentLabel()+' 紋路觀察筆記</h4><p>以下只是你對照片的選擇摘要，網站沒有自動辨識線條，也沒有把照片送到網路資料庫。</p><div class="palm-notes"><article>'+Object.keys(names).map(function(key){const value=document.querySelector('#palm-line-'+key).value;return'<p><b>'+names[key]+'：</b>'+labels[value]+'。'+descriptions[key]+'</p>'}).join('')+'</article></div><p class="palm-disclaimer">手相不能可靠預測愛情、事業、壽命或健康；照片只在本裝置的這個頁面中預覽，重新整理後會消失。</p>';
  target.scrollIntoView({behavior:'smooth',block:'start'});
 });
})();
