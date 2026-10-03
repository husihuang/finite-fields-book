from pathlib import Path
import sys,json
sys.path.insert(0,'finite-fields-book/appendices')
from finitefield import GF2m,irreducible,poly_rem
F=GF2m(19)
def polynomial(a):
 if not a:return '0'
 return ' + '.join('1' if i==0 else 'x' if i==1 else f'x^{i}' for i in range(a.bit_length()-1,-1,-1) if (a>>i)&1)
fixtures={'field':[],'irreducible':[],'gcd':[]}
for a in range(16):
 orbit=[];v=a
 while v not in orbit:orbit.append(v);v=F.power(v,2)
 coeff=[1]
 for v in orbit:
  next_coeff=[0]*(len(coeff)+1)
  for i,c in enumerate(coeff):next_coeff[i]^=F.mul(c,v);next_coeff[i+1]^=c
  coeff=next_coeff
 minimal=sum(c<<i for i,c in enumerate(coeff))
 fixtures['field'].append({'a':a,'exponent':next((k for k in range(15) if F.power(2,k)==a),None),'order':F.order(a) if a else 0,'trace':F.trace(a),'relative_trace':a^F.power(a,4),'relative_norm':F.power(a,5),'minimal':polynomial(minimal),'degree':len(orbit)})
for f in range(2,128):fixtures['irreducible'].append({'f':f,'expected':irreducible(f)})
for a in range(21):
 for b in range(1,13):
  x,y=a,b
  while y:x,y=y,poly_rem(x,y)
  fixtures['gcd'].append({'a':a,'b':b,'expected':polynomial(x)})
Path('finite-fields-book/_build/chapter-review/math-fixtures.json').write_text(json.dumps(fixtures,ensure_ascii=False),encoding='utf-8')
