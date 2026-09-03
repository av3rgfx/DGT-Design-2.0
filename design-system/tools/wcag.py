import sys, json, itertools
def lum(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def cr(a,b):
    la,lb=lum(a),lum(b); hi,lo=max(la,lb),min(la,lb); return (hi+0.05)/(lo+0.05)
if __name__=='__main__':
    pairs=json.load(open(sys.argv[1]))
    fails=0
    for p in pairs:
        r=cr(p['fg'],p['bg']); ok=r>=p['req']; fails+= (not ok)
        print(f"{'PASS' if ok else 'FAIL'}  {r:5.2f} (>= {p['req']})  {p['fg']} on {p['bg']}  {p['ctx']}")
    print(f"\n{len(pairs)} pairs, {fails} failing")
    sys.exit(1 if fails else 0)
