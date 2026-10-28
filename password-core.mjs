const CHARACTER_SETS={upper:'ABCDEFGHIJKLMNOPQRSTUVWXYZ',lower:'abcdefghijklmnopqrstuvwxyz',number:'0123456789',symbol:'!@#$%^&*()_+-=[]{}|;:,.<>?'};
export function randomIndex(size){
  if(!Number.isInteger(size)||size<1||size>65536)throw new Error('Invalid character-pool size.');
  if(!globalThis.crypto?.getRandomValues)throw new Error('Web Crypto is unavailable in this browser.');
  const limit=Math.floor(0x100000000/size)*size;
  const value=new Uint32Array(1);
  do{globalThis.crypto.getRandomValues(value);}while(value[0]>=limit);
  return value[0]%size;
}
export function generatePassword({length=20,upper=true,lower=true,number=true,symbol=true,excludeAmbiguous=false}={}){
  if(!Number.isInteger(length)||length<8||length>128)throw new Error('Choose a whole-number length from 8 to 128.');
  const selected={upper,lower,number,symbol};
  const groups=Object.entries(CHARACTER_SETS).filter(([key])=>selected[key]).map(([,value])=>excludeAmbiguous?value.replace(/[iIlL1oO0]/g,''):value).filter(Boolean);
  if(!groups.length)throw new Error('Select at least one character set.');
  const pool=[...new Set(groups.join(''))];
  const result=groups.map(group=>group[randomIndex(group.length)]);
  while(result.length<length)result.push(pool[randomIndex(pool.length)]);
  for(let index=result.length-1;index>0;index--){const other=randomIndex(index+1);[result[index],result[other]]=[result[other],result[index]];}
  return result.join('');
}
