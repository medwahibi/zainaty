import re

with open('cdn/shop/t/5/assets/app.js', 'r') as f:
    content = f.read()

# 1. Update logoScale
content = content.replace('logoScale:window.innerWidth>1100?.85:.6', 'logoScale:window.innerWidth>1100?.72:.51')

# 2. Update initial bubble state (reveal:0,collect:0 -> reveal:1,collect:1)
content = content.replace('u=w(o,{reveal:0,collect:0', 'u=w(o,{reveal:1,collect:1')

# 3. Patch the timeline logic
# Locate the massive timeline starting at `u.setState({reveal:0,collect:0})` up to `)}))))`
start_marker = 'u.setState({reveal:0,collect:0})'
end_marker = '4.4)}})}))))'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker) + len(end_marker)

if start_idx != -1 and end_idx != -1:
    old_logic = content[start_idx:end_idx]
    
    new_logic = """u.setState({reveal:1,collect:1});
if(s){s.innerHTML="<div style='width:200px;height:2px;background:rgba(255,255,255,0.2);position:relative;overflow:hidden;margin:0 auto;'><div id='progBar' style='width:0%;height:100%;background:#fff;'></div></div>";a.ZP.set(s,{opacity:1});}
const progBar=document.getElementById('progBar');
function g(){if(progBar)progBar.style.width=Math.round(p.progress)+"%";}
a.ZP.set(i,{opacity:.4,scale:1});
a.ZP.set(r,{opacity:.1,scale:.8});
h();
a.ZP.to(p,{progress:100,duration:1.2,delay:0,ease:"power2.inOut",onUpdate:g,onComplete:()=>{
  p.progress=100;g();f=!0;a.ZP.killTweensOf(p);n.style.pointerEvents="none";
  a.ZP.timeline({onUpdate:h,onComplete:()=>{u.destroy();n.remove();}})
    .add((()=>e({played:!0})),0)
    .to(p,{logoAlpha:0,alpha:0,duration:0.6,ease:"sine.out"},0)
    .to([i,r,s,d],{opacity:0,duration:0.6,ease:"sine.out"},0)
    .to([".header",".page-scroll",".bredcrams"],{opacity:1,duration:0.8,ease:"sine.inOut"},0.3)
    .to(n,{opacity:0,duration:0.5,ease:"sine.out"},0.5);
}})}))))"""
    
    # We replace the newline in case python injects it. Wait, new_logic has newlines, which is fine! JS doesn't care.
    content = content[:start_idx] + new_logic.replace('\n', '') + content[end_idx:]
    
    with open('cdn/shop/t/5/assets/app.js', 'w') as f:
        f.write(content)
    print("Patched successfully.")
else:
    print("Could not find markers.")
