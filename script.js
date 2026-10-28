import {generatePassword} from './password-core.mjs';
const $=id=>document.getElementById(id);
const fields={upper:'useUppercase',lower:'useLowercase',number:'useNumbers',symbol:'useSymbols'};
function options(){return {length:Number($('lengthInput').value),...Object.fromEntries(Object.entries(fields).map(([key,id])=>[key,$(id).checked])),excludeAmbiguous:$('useAmbiguous').checked};}
function feedback(message){$('feedbackMessage').textContent=message;}
function generate(){try{
  const configuration=options(),password=generatePassword(configuration);$('passwordOutput').value=password;
  const types=Object.keys(fields).filter(key=>configuration[key]).length;
  const label=password.length>=20&&types>=3?'Long & varied':password.length>=14?'Moderate length':'Shorter password';
  $('strengthLabel').textContent=label;$('strengthBar').style.width=`${Math.min(100,password.length/32*100)}%`;
  $('strengthInfo').textContent=`${password.length} characters · ${types} selected sets. Indicator is a rough estimate, not an audited strength score.`;
  feedback('Generated locally. Nothing was sent to a server.');
}catch(error){$('passwordOutput').value='';feedback(error.message);}}
async function copy(text){if(!text){feedback('Generate a password first.');return;}try{await navigator.clipboard.writeText(text);feedback('Copied to clipboard.');}catch{feedback('Clipboard unavailable. Use Show and copy the selected text manually.');$('passwordOutput').type='text';$('passwordOutput').focus();$('passwordOutput').select();}}
$('generateBtn').addEventListener('click',generate);$('refreshBtn').addEventListener('click',generate);
$('copyBtn').addEventListener('click',()=>copy($('passwordOutput').value));
$('toggleVisibility').addEventListener('click',()=>{const hidden=$('passwordOutput').type==='password';$('passwordOutput').type=hidden?'text':'password';$('toggleVisibility').textContent=hidden?'Hide':'Show';$('toggleVisibility').setAttribute('aria-label',hidden?'Hide password':'Show password');});
for(const [from,to] of [['lengthInput','lengthSlider'],['lengthSlider','lengthInput']])$(from).addEventListener('input',()=>{$(to).value=$(from).value;});
$('bulkGenerateBtn').addEventListener('click',()=>{try{const count=Number($('bulkCount').value);if(!Number.isInteger(count)||count<1||count>100)throw new Error('Choose a batch size from 1 to 100.');$('bulkPasswords').value=Array.from({length:count},()=>generatePassword(options())).join('\n');feedback(`Generated ${count} passwords locally.`);}catch(error){$('bulkPasswords').value='';feedback(error.message);}});
$('copyAllBtn').addEventListener('click',()=>copy($('bulkPasswords').value));
$('downloadBulkBtn').addEventListener('click',()=>{if(!$('bulkPasswords').value){feedback('Generate a batch first.');return;}const url=URL.createObjectURL(new Blob([$('bulkPasswords').value+'\n'],{type:'text/plain'}));const link=document.createElement('a');link.href=url;link.download='generated-passwords.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);feedback('Downloaded the batch. Treat that file as sensitive.');});
$('themeToggle').addEventListener('click',()=>{document.documentElement.dataset.theme=document.documentElement.dataset.theme==='light'?'dark':'light';});
generate();
