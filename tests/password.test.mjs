import test from 'node:test';
import assert from 'node:assert/strict';
import {generatePassword} from '../password-core.mjs';
test('requested length and every enabled character type are preserved',()=>{for(let i=0;i<100;i++){const value=generatePassword({length:32});assert.equal(value.length,32);assert.match(value,/[A-Z]/);assert.match(value,/[a-z]/);assert.match(value,/[0-9]/);assert.match(value,/[^A-Za-z0-9]/);}});
test('numbers-only generation stays inside the selected set',()=>{assert.match(generatePassword({length:16,upper:false,lower:false,number:true,symbol:false}),/^\d{16}$/);});
test('look-alike characters are excluded when requested',()=>{for(let i=0;i<30;i++)assert.doesNotMatch(generatePassword({length:128,excludeAmbiguous:true}),/[iIlL1oO0]/);});
test('empty selection and invalid lengths fail clearly',()=>{assert.throws(()=>generatePassword({upper:false,lower:false,number:false,symbol:false}),/Select/);for(const length of [0,7,129,10.5,NaN])assert.throws(()=>generatePassword({length}),/length/);});
