(()=>{
'use strict';
const copy={
 en:{panelTitle:'U.S. OPERATIONS',panelRegion:'NORTH + SOUTH CAROLINA',commitment:'DIFFERENT PLACES. SAME COMMITMENT.',origin:'BRAZIL',destination:'U.S. OPERATIONS → NORTH + SOUTH CAROLINA',contexts:['REAL ESTATE','OPERATIONS','CRM','CLIENT SUPPORT','MARKETING','COORDINATION'],mapAlt:'United States map highlighting North and South Carolina'},
 pt:{panelTitle:'OPERAÇÕES NOS EUA',panelRegion:'CAROLINA DO NORTE + SUL',commitment:'LUGARES DIFERENTES. O MESMO COMPROMISSO.',origin:'BRASIL',destination:'OPERAÇÕES NOS EUA → CAROLINA DO NORTE + SUL',contexts:['MERCADO IMOBILIÁRIO','OPERAÇÕES','CRM','SUPORTE A CLIENTES','MARKETING','COORDENAÇÃO'],mapAlt:'Mapa dos Estados Unidos destacando Carolina do Norte e Carolina do Sul'},
 es:{panelTitle:'OPERACIONES EN EE. UU.',panelRegion:'CAROLINA DEL NORTE + SUR',commitment:'LUGARES DIFERENTES. EL MISMO COMPROMISO.',origin:'BRASIL',destination:'OPERACIONES EN EE. UU. → CAROLINA DEL NORTE + SUR',contexts:['SECTOR INMOBILIARIO','OPERACIONES','CRM','ATENCIÓN AL CLIENTE','MARKETING','COORDINACIÓN'],mapAlt:'Mapa de Estados Unidos destacando Carolina del Norte y Carolina del Sur'}
};
function currentLang(){const v=(document.documentElement.lang||'en').toLowerCase();return v.startsWith('pt')?'pt':v.startsWith('es')?'es':'en'}
function sync(){const lang=currentLang(),t=copy[lang];document.querySelectorAll('[data-rv4]').forEach(el=>{const k=el.dataset.rv4;if(k==='contexts'){el.innerHTML='';t.contexts.forEach(x=>{const s=document.createElement('span');s.textContent=x;el.appendChild(s)})}else if(k==='mapAlt'){el.setAttribute('alt',t.mapAlt)}else if(t[k])el.textContent=t[k]})}
new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
document.addEventListener('click',e=>{if(e.target.closest('[data-setlang]'))setTimeout(sync,0)});
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',sync):sync();
})();
