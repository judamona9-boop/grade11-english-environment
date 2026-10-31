const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const toast = (message) => { const t=$("#toast"); t.textContent=message; t.classList.add("show"); clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>t.classList.remove("show"),2400); };

const translations = {
  en: {
    heroTitle:'Your English journey<br><span>starts here.</span>',
    heroText:'Explore Units 3 and 4 through practical activities that connect listening, speaking, reading and writing—with helpful feedback along the way.',
    exploreBtn:'Explore learning units <span>↗</span>',
    heroNote:'Learn at your pace. Check your answers. Try again.'
  },
  ar: {
    heroTitle:'رحلتك في تعلّم الإنجليزية<br><span>تبدأ من هنا.</span>',
    heroText:'استكشف الوحدتين الثالثة والرابعة من خلال أنشطة عملية تربط الاستماع والتحدث والقراءة والكتابة، مع تغذية راجعة تساعدك على التقدم.',
    exploreBtn:'استكشف الوحدات التعليمية <span>↗</span>',
    heroNote:'تعلّم وفق سرعتك، وتحقق من إجاباتك، وحاول من جديد.'
  }
};
let currentLang='en';
$("#langToggle").addEventListener("click",()=>{
  currentLang=currentLang==='en'?'ar':'en';
  document.body.classList.toggle('arabic',currentLang==='ar');
  document.documentElement.lang=currentLang;
  $("#langToggle").textContent=currentLang==='en'?'العربية':'English';
  const t=translations[currentLang];
  $("#heroTitle").innerHTML=t.heroTitle; $("#heroText").textContent=t.heroText;
  $("#exploreBtn").innerHTML=t.exploreBtn; $("#heroNote").textContent=t.heroNote;
});

$("#menuToggle").addEventListener("click",()=>{
  const nav=$("#mainNav"), open=nav.classList.toggle("open");
  $("#menuToggle").setAttribute("aria-expanded",String(open));
});
$$(".nav-link").forEach(a=>a.addEventListener("click",()=>{$("#mainNav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}));

$$(".copy-prompt").forEach(btn=>btn.addEventListener("click",async()=>{
  try{await navigator.clipboard.writeText(btn.dataset.copy);toast("Prompt copied. Paste it into your chosen AI tool.");}
  catch(e){window.prompt("Copy this prompt:",btn.dataset.copy);}
}));

const miloPanel=$("#miloPanel");
function toggleMilo(open){miloPanel.classList.toggle("open",open);miloPanel.setAttribute("aria-hidden",String(!open));if(open) setTimeout(()=>$("#miloInput").focus(),180);}
$("#miloFab").addEventListener("click",()=>toggleMilo(!miloPanel.classList.contains("open")));
$("#closeMilo").addEventListener("click",()=>toggleMilo(false));
$("#openMiloHero").addEventListener("click",()=>toggleMilo(true));
$("#openMiloBanner").addEventListener("click",()=>toggleMilo(true));

const topicReplies={
  Vocabulary:"Let's practise vocabulary one step at a time. For Unit 3, think about words connected to safety, accidents and prevention. Can you use the word “prevent” in a sentence?",
  Grammar:"Let's practise grammar. In Unit 3, “must” expresses a strong rule or obligation. Complete this sentence: You _____ wear a seat belt in a car. What is your answer?",
  Writing:"I can help you improve your writing. First, write 2–3 sentences about a safety rule or a place you would like to visit. I'll suggest one improvement at a time. Remember to check your work against your textbook.",
  Speaking:"Let's practise speaking. Imagine a visitor asks you how to stay safe at home. Give one short piece of advice in English. You can start with “You should…”"
};
function addMessage(text,who='milo'){const div=document.createElement('div');div.className='message '+(who==='user'?'message-user':'message-milo');div.textContent=text;$("#miloMessages").appendChild(div);$("#miloMessages").scrollTop=$("#miloMessages").scrollHeight;}
function demoReply(input){
  const s=input.toLowerCase();
  if(/hello|hi|hey/.test(s)) return "Hello! 😊 What would you like to practise today: vocabulary, grammar, reading, writing or speaking?";
  if(/must|seat belt/.test(s)) return "Good thinking! A suitable answer is “must”: You must wear a seat belt in a car. We use “must” for a strong rule. Now make your own sentence using “mustn't” for something that is not allowed.";
  if(/prevent/.test(s)) return "Nice try! “Prevent” means to stop something from happening. Example: “Smoke alarms help prevent serious harm.” Can you add one detail to your sentence?";
  if(/read/.test(s)) return "Reading tip: first identify the main idea, then look for details that support it. Paste a short passage from your approved learning material and tell me which part is confusing.";
  if(/thank/.test(s)) return "You're welcome! Keep practising. Making mistakes is a normal part of learning.";
  if(/travel|place|journey|going places/.test(s)) return "Let's connect Unit 4 skills. Describe a place you would like to visit in one sentence. Then add a reason using “because”.";
  if(/i don't know|dont know|help/.test(s)) return "That's okay. Let's break it into smaller steps. Read the question again, underline the key word, and try one idea. Would you like a hint or an example?";
  return "Thanks for your answer. Here's a next step: check whether your sentence has a clear subject and verb, then add a detail or reason. Try revising it yourself. This demo gives sample guidance only; verify language advice with your teacher and course materials.";
}
$("#miloForm").addEventListener("submit",e=>{e.preventDefault();const input=$("#miloInput"),v=input.value.trim();if(!v)return;addMessage(v,'user');input.value='';setTimeout(()=>addMessage(demoReply(v)),250);});
$$(".milo-quick-actions button").forEach(b=>b.addEventListener("click",()=>{addMessage(b.dataset.topic,'user');setTimeout(()=>addMessage(topicReplies[b.dataset.topic]||demoReply(b.dataset.topic)),200);}));

const unitData={
  3:{title:"Unit 3 · Take Care!",kicker:"SAFETY & EVERYDAY LIFE",learn:`<h3>Learning focus</h3><p>Practise language for home safety, accident prevention, rules and responsibilities. Use your textbook and teacher-approved resources as the main reference.</p><ul><li>Identify and use key vocabulary about safety.</li><li>Recognise obligation, prohibition and lack of necessity.</li><li>Connect information from listening or reading to a practical safety message.</li></ul><div class="activity-box"><label for="u3answer">Try it: Write one safety rule for the home.</label><textarea id="u3answer" rows="3" placeholder="Example starter: You must..."></textarea><button class="button button-primary" id="checkWriting" type="button" style="margin-top:10px">Get a writing hint</button><div id="writingHint" class="feedback-result" aria-live="polite"></div></div>`,
    quiz:{q:"Choose the best word: You _____ leave matches near young children.",opts:["must","mustn't","don't have to"],correct:1,explain:"“Mustn't” expresses prohibition: something is not allowed."},
    integrate:`<h3>Connect the skills</h3><p><strong>Task: Create a home-safety message.</strong></p><ol><li><strong>Listen:</strong> Listen to a teacher-approved recording about a home accident and note two key details.</li><li><strong>Read:</strong> Read the related textbook passage and find one prevention tip.</li><li><strong>Speak:</strong> Explain the tip to a partner and give a reason.</li><li><strong>Write:</strong> Write a short safety notice using at least two rules.</li></ol><p><em>Teacher note: Add the verified audio and reading resources for the actual lesson before student use.</em></p>`},
  4:{title:"Unit 4 · Going Places",kicker:"TRAVEL & CHOICES",learn:`<h3>Learning focus</h3><p>Practise expressing preferences, describing places and talking about journeys. Use the approved Unit 4 textbook material to confirm target vocabulary and structures.</p><ul><li>Express preferences using “prefer” and “would rather”.</li><li>Understand details in listening and reading texts.</li><li>Share information about a place and support an opinion with a reason.</li></ul><div class="activity-box"><label for="u4answer">Try it: Complete the idea with your own preference.</label><textarea id="u4answer" rows="3" placeholder="I would rather visit ... because ..."></textarea><button class="button button-primary" id="checkWriting" type="button" style="margin-top:10px">Get a writing hint</button><div id="writingHint" class="feedback-result" aria-live="polite"></div></div>`,
    quiz:{q:"Choose the best completion: I would rather _____ by train than by bus.",opts:["travel","to travel","travelling"],correct:0,explain:"After “would rather”, use the base form of the verb: “would rather travel”."},
    integrate:`<h3>Connect the skills</h3><p><strong>Task: Recommend a destination.</strong></p><ol><li><strong>Listen:</strong> Listen to a teacher-approved description of a destination and note two details.</li><li><strong>Read:</strong> Read a related text and identify one advantage of the place.</li><li><strong>Speak:</strong> Recommend the destination and explain why you chose it.</li><li><strong>Write:</strong> Write a short message inviting a friend to visit, using a preference expression.</li></ol><p><em>Teacher note: Replace this sample task with activities aligned to the verified Unit 4 content.</em></p>`}
};
let activeUnit=3, activeTab='learn';
const dialog=$("#unitDialog"), content=$("#unitDialogContent");
function renderUnitTab(){
 const d=unitData[activeUnit]; $$(".dialog-tab").forEach(b=>b.classList.toggle('active',b.dataset.tab===activeTab));
 if(activeTab==='learn'){content.innerHTML=d.learn;const check=$("#checkWriting");if(check)check.addEventListener('click',()=>{const val=content.querySelector('textarea').value.trim();$("#writingHint").textContent=!val?"Write your own first attempt. Start with a subject and a complete idea.":val.split(/\s+/).length<5?"Good start. Add a reason or specific detail, then check your grammar and spelling.":"Nice effort. Check the verb form, punctuation and whether your reason supports your main idea. Ask your teacher or Milo for further feedback.";});}
 else if(activeTab==='quiz'){content.innerHTML=`<h3>Quick check</h3><p>${d.quiz.q}</p><div class="answer-options">${d.quiz.opts.map((o,i)=>`<button class="answer-option" data-answer="${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join('')}</div><div id="quizResult" class="feedback-result" aria-live="polite"></div><p class="form-note">Sample practice question. Check the target language in your textbook.</p>`;$$(".answer-option",content).forEach(b=>b.addEventListener('click',()=>{const ok=Number(b.dataset.answer)===d.quiz.correct;$$(".answer-option",content).forEach(x=>{x.disabled=true;if(Number(x.dataset.answer)===d.quiz.correct)x.classList.add('correct');});if(!ok)b.classList.add('incorrect');$("#quizResult").textContent=(ok?"Correct! ":"Not quite. ")+d.quiz.explain;$("#quizResult").style.color=ok?'#16805d':'#b44b3d';}));}
 else content.innerHTML=d.integrate;
}
$$(".unit-open").forEach(b=>b.addEventListener('click',()=>{activeUnit=Number(b.dataset.unit);activeTab='learn';$("#dialogTitle").textContent=unitData[activeUnit].title;$("#dialogKicker").textContent=unitData[activeUnit].kicker;renderUnitTab();dialog.showModal();}));
$("#closeUnitDialog").addEventListener('click',()=>dialog.close());
$$(".dialog-tab").forEach(b=>b.addEventListener('click',()=>{activeTab=b.dataset.tab;renderUnitTab();}));
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});

$("#feedbackForm").addEventListener("submit",e=>{e.preventDefault();const rating=$("#rating").value,feedback=$("#feedbackText").value.trim();if(!rating){toast("Please choose a rating first.");return;}const text=`Learning environment feedback\nRating: ${rating}\nComment: ${feedback||"(No comment)"}`;const blob=new Blob([text],{type:"text/plain"});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download="learning-environment-feedback.txt";a.click();URL.revokeObjectURL(url);toast("Feedback prepared as a local file. It was not submitted.");});


// Optional cheerful music and gentle feedback sounds. Audio starts only after a user click.
let musicOn=false, soundOn=true, audioCtx=null, musicTimer=null, noteIndex=0;
function getAudio(){if(!audioCtx){const AC=window.AudioContext||window.webkitAudioContext;if(AC)audioCtx=new AC();}if(audioCtx&&audioCtx.state==='suspended')audioCtx.resume();return audioCtx;}
function playTone(freq=660,duration=.12,type='sine',volume=.045,delay=0){if(!soundOn&&type!=='music')return;const ctx=getAudio();if(!ctx)return;const osc=ctx.createOscillator(),gain=ctx.createGain();osc.type=type;osc.frequency.setValueAtTime(freq,ctx.currentTime+delay);gain.gain.setValueAtTime(.0001,ctx.currentTime+delay);gain.gain.exponentialRampToValueAtTime(volume,ctx.currentTime+delay+.02);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+delay+duration);osc.connect(gain);gain.connect(ctx.destination);osc.start(ctx.currentTime+delay);osc.stop(ctx.currentTime+delay+duration+.03);}
function happyChime(){if(!soundOn)return;[523.25,659.25,783.99].forEach((n,i)=>playTone(n,.18,'sine',.04,i*.09));}
const melody=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46,523.25,659.25,783.99,1046.5,880,783.99,659.25,587.33];
function musicStep(){if(!musicOn)return;playTone(melody[noteIndex%melody.length],.27,'sine',.018,0);if(noteIndex%4===0)playTone(melody[noteIndex%melody.length]/2,.34,'triangle',.012,.02);noteIndex++;}
function setMusic(on){musicOn=on;const b=document.querySelector('#musicToggle');b.setAttribute('aria-pressed',String(on));b.innerHTML=on?'♫ <span>Music on</span>':'♫ <span>Music off</span>';if(on){getAudio();musicStep();musicTimer=setInterval(musicStep,360);}else{clearInterval(musicTimer);musicTimer=null;}}
$('#musicToggle').addEventListener('click',()=>setMusic(!musicOn));
$('#soundToggle').addEventListener('click',()=>{soundOn=!soundOn;const b=$('#soundToggle');b.setAttribute('aria-pressed',String(soundOn));b.innerHTML=soundOn?'🔔 <span>Sounds on</span>':'🔕 <span>Sounds off</span>';if(soundOn)happyChime();});
$('#startJourney').addEventListener('click',()=>{getAudio();$('#welcomeScreen').classList.add('hidden');happyChime();});
// Add a tiny celebratory sound to successful quiz answers.
const originalRenderUnitTab=renderUnitTab;
