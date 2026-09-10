/* HybriDent lightweight site JS — no jQuery, Slick or AOS dependency */
'use strict';

const WHATSAPP_NUMBER = '919887420145';
const CONTACT_PHONE = '+91 98874 20145';

function showToast(title, msg, type='success'){
  const t=document.getElementById('toast'); if(!t) return;
  const titleEl=document.getElementById('toastTitle'), msgEl=document.getElementById('toastMsg'), icon=t.querySelector('.toast-icon');
  if(titleEl) titleEl.textContent=title; if(msgEl) msgEl.textContent=msg;
  if(icon){ icon.style.background=type==='error'?'linear-gradient(135deg,#ef4444,#f97316)':'linear-gradient(135deg,#0D9488,#0EA5E9)'; icon.innerHTML=type==='error'?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-check"></i>'; }
  t.classList.add('show'); clearTimeout(window._toastTimer); window._toastTimer=setTimeout(()=>t.classList.remove('show'),5000);
}

function initReveal(){
  const els=document.querySelectorAll('[data-aos]');
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('aos-animate')); return;}
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('aos-animate');io.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -30px'});
  els.forEach(el=>io.observe(el));
}

function initMobileMenu(){
  const btn=document.getElementById('mobile-menu-btn'), menu=document.getElementById('mobile-menu');
  if(!btn||!menu) return;
  btn.addEventListener('click',()=>menu.classList.toggle('hidden'));
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>menu.classList.add('hidden')));
}

function initScroll(){
  const nav=document.getElementById('navbar'), btt=document.getElementById('backToTop');
  const tick=()=>{ if(nav) nav.classList.toggle('scrolled',window.scrollY>30); if(btt) btt.classList.toggle('hidden-btn',window.scrollY<=400); };
  window.addEventListener('scroll',tick,{passive:true}); tick();
  btt?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
}

function initFaq(){document.querySelectorAll('.faq-question').forEach(q=>q.addEventListener('click',()=>q.parentElement.classList.toggle('active')));}

function initGallery(){
  const tabs=document.querySelectorAll('[data-filter]'), items=document.querySelectorAll('[data-cat]'); if(!tabs.length) return;
  tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active-filter'));tab.classList.add('active-filter');const f=tab.dataset.filter;items.forEach(i=>i.style.display=(f==='all'||i.dataset.cat===f)?'':'none');}));
}

function initTestimonials(){
  const slider=document.querySelector('.testimonial-slider'); if(!slider) return;
  const slides=[...slider.children]; if(!slides.length) return;
  slides.forEach((s,i)=>s.classList.toggle('is-active',i===0));
  const dots=document.createElement('div'); dots.className='testimonial-dots';
  let index=0; slides.forEach((_,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Show testimonial ${i+1}`);b.classList.toggle('active',i===0);b.addEventListener('click',()=>go(i));dots.appendChild(b);});
  slider.parentElement.appendChild(dots);
  const go=i=>{index=i;slides.forEach((s,j)=>s.classList.toggle('is-active',j===i));[...dots.children].forEach((b,j)=>b.classList.toggle('active',j===i));};
  window.setInterval(()=>go((index+1)%slides.length),5000);
}

function initBooking(){
  const form=document.getElementById('bookingForm'); if(!form) return;
  const date=document.getElementById('fDate'); if(date) date.min=new Date().toISOString().split('T')[0];
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('fName').value.trim(), email=document.getElementById('fEmail').value.trim(), phone=document.getElementById('fPhone').value.trim(), service=document.getElementById('fService').value, dateVal=document.getElementById('fDate').value, time=document.getElementById('fTime').value, msg=document.getElementById('fMsg').value.trim();
    if(!name||!email||!phone||!service||!dateVal){showToast('Missing Info','Please fill all required fields marked with *','error');return;}
    const btn=document.getElementById('submitBtn'), orig=btn.innerHTML; btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>Sending...'; btn.disabled=true;
    const waMessage=`🦷 *New Appointment — HybriDent*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📱 *Phone:* ${phone}\n💼 *Service:* ${service}\n📅 *Date:* ${dateVal}\n⏰ *Time:* ${time}\n${msg?'💬 *Message:* '+msg:''}\n\n_Sent from HybriDent website_`;
    const waURL=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
    setTimeout(()=>{showToast('✅ Request Sent!',`Thank you ${name}! Your appointment request has been prepared for WhatsApp.`);window.open(waURL,'_blank','noopener');form.reset();btn.innerHTML=orig;btn.disabled=false;},700);
  });
}

function initNewsletter(){document.querySelectorAll('footer form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();showToast('Subscribed!','You will receive dental tips and offers soon.','success');form.reset();}));}

function initImageFallbacks(){
  const fallback='assets/images/dental-fallback.svg';
  const mark=(img)=>{
    if(!img || img.dataset.fallbackApplied) return;
    img.dataset.fallbackApplied='1';
    img.addEventListener('error',()=>{
      if(img.dataset.failedOnce) return;
      img.dataset.failedOnce='1';
      img.src=fallback;
      img.removeAttribute('srcset');
      img.loading='lazy';
      img.decoding='async';
      img.classList.add('image-fallback');
    },{once:false});
    img.loading=img.hasAttribute('loading')?img.loading:'lazy';
    img.decoding='async';
  };
  document.querySelectorAll('img').forEach(mark);

  // Protect inline background-image URLs too. If a remote hero/banner fails,
  // replace it with a local dental fallback instead of leaving a blank section.
  document.querySelectorAll('[style*="background-image"]').forEach(el=>{
    const style=el.getAttribute('style')||'';
    const m=style.match(/background-image\s*:\s*url\((['\"]?)(.*?)\1\)/i);
    if(!m) return;
    const url=m[2];
    const probe=new Image();
    probe.onload=()=>{};
    probe.onerror=()=>{el.style.backgroundImage=`url('${fallback}')`;};
    probe.src=url;
  });
}

function initChat(){
  const toggle=document.getElementById('chatToggle'), win=document.getElementById('chatWindow'), close=document.getElementById('chatClose'), body=document.getElementById('chatBody'), input=document.getElementById('chatInput'), send=document.getElementById('chatSend'), suggestions=document.getElementById('chatSuggestions'), stack=document.getElementById('floatingStack');
  if(!toggle||!win||!body||!input||!send) return;

  const statusText=document.getElementById('statusText'), statusDot=document.getElementById('statusDot');
  const clinicContext=`You are HybriDent's website assistant. Be warm, professional, concise, and never invent information.
Address: Jaipur, Rajasthan, India.
Phone/WhatsApp: ${CONTACT_PHONE}.
Hours: Mon–Sat 9AM–7PM; Sunday closed; 24/7 emergency available.
Services: General Dentistry, Cosmetic Dentistry, Orthodontics, Dental Implants, Teeth Whitening, Root Canals, Veneers.
Pricing: Basic ₹999/visit, Premium ₹1,999/visit, Complete ₹2,999/visit.
Insurance: most major dental insurance plans accepted.
Team: Dr. Sarah Mitchell, Dr. James Carter, Dr. Emily Roberts, Dr. Michael Lee.
Founded 2014, 5,000+ patients, 98% success rate.
For booking, direct the visitor to contact.html or WhatsApp/call ${CONTACT_PHONE}.`;

  const localAnswer=(text)=>{
    const q=text.toLowerCase();
    if(/hello|hi|hey|namaste/.test(q)) return '👋 Hello! I’m the HybriDent assistant. Ask me about our services, pricing, timings, emergencies, or appointments.';
    if(/price|pricing|cost|fee|₹|rupee/.test(q)) return 'Our listed plans are Basic ₹999, Premium ₹1,999, and Complete ₹2,999 per visit. For treatment-specific pricing, please contact the clinic.';
    if(/hour|open|close|timing/.test(q)) return 'We are open Monday–Saturday, 9 AM–7 PM. Sundays are closed, with 24/7 emergency care available.';
    if(/book|appointment|schedule/.test(q)) return `You can book through the Contact page or call/WhatsApp ${CONTACT_PHONE}.`;
    if(/emergency|urgent|severe|broken tooth/.test(q)) return `Yes, 24/7 emergency dental care is available. Please call ${CONTACT_PHONE} for urgent needs.`;
    if(/service|treatment|do you offer|what do you do/.test(q)) return 'We offer General, Cosmetic, Orthodontics, Dental Implants, Teeth Whitening, Root Canals, and Veneers.';
    if(/address|location|where/.test(q)) return 'Our address is Jaipur, Rajasthan, India.';
    if(/insurance/.test(q)) return 'Yes. HybriDent accepts most major dental insurance plans. Please contact the clinic to verify your coverage.';
    if(/doctor|dentist|team/.test(q)) return 'Our team includes Dr. Sarah Mitchell, Dr. James Carter, Dr. Emily Roberts, and Dr. Michael Lee.';
    if(/found|established|years|experience/.test(q)) return 'HybriDent was founded in 2014 and has served 5,000+ patients with a 98% reported success rate.';
    return 'I can help with HybriDent’s services, pricing, hours, emergency care, insurance, and appointments. Try one of the quick questions below.';
  };

  const setStatus=(text)=>{ if(statusText) statusText.textContent=text; if(statusDot) statusDot.style.background='#4ade80'; };
  const addMsg=(text,who)=>{const d=document.createElement('div');d.className='msg '+who;d.textContent=text;body.appendChild(d);body.scrollTop=body.scrollHeight;};
  const renderWelcome=()=>{body.innerHTML='';addMsg("👋 Hi! I'm HybriDent's AI assistant. Ask about services, pricing, hours, emergencies, insurance, or appointments.",'bot');};
  const typing=()=>{if(document.getElementById('typingIndicator'))return;const d=document.createElement('div');d.className='typing';d.id='typingIndicator';d.innerHTML='<span></span><span></span><span></span>';body.appendChild(d);body.scrollTop=body.scrollHeight;};
  const removeTyping=()=>document.getElementById('typingIndicator')?.remove();

  const handle=async text=>{
    text=text.trim(); if(!text) return;
    addMsg(text,'user'); input.value=''; send.disabled=true; typing();
    await new Promise(r=>setTimeout(r,220));
    removeTyping(); addMsg(localAnswer(text),'bot'); send.disabled=false; input.focus();
  };

  toggle.onclick=()=>{
    win.classList.toggle('open');
    if(win.classList.contains('open')){
      stack?.classList.add('hidden-stack');
      if(!body.children.length) renderWelcome();
      setStatus('AI Assistant Online');
      setTimeout(()=>input.focus(),150);
    } else stack?.classList.remove('hidden-stack');
  };
  close?.addEventListener('click',()=>{win.classList.remove('open');stack?.classList.remove('hidden-stack');});
  send.addEventListener('click',()=>handle(input.value));
  input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();handle(input.value);}});
  suggestions?.addEventListener('click',e=>{const b=e.target.closest('button[data-q]');if(b)handle(b.dataset.q);});
  setStatus('AI Assistant Online');
}

window.addEventListener('load',()=>setTimeout(()=>document.getElementById('preloader')?.classList.add('hidden'),300));
document.addEventListener('DOMContentLoaded',()=>{initImageFallbacks();initReveal();initMobileMenu();initScroll();initFaq();initGallery();initTestimonials();initBooking();initNewsletter();initChat();});
