/* Always True — reviews: load approved reviews from the Google Sheet, submit to the Google Form */
(function(){
  const C = window.REVIEWS_CONFIG || {};
  const configured = C.formAction && !/YOUR_FORM_ID/.test(C.formAction);
  const sheetReady = C.sheetCsv && !/YOUR_SHEET_ID/.test(C.sheetCsv);

  function parseCSV(text){
    const rows=[]; let row=[], f="", q=false;
    for(let i=0;i<text.length;i++){
      const c=text[i];
      if(q){ if(c=='"'){ if(text[i+1]=='"'){f+='"';i++} else q=false } else f+=c }
      else if(c=='"') q=true;
      else if(c==','){ row.push(f); f="" }
      else if(c=='\n'||c=='\r'){ if(c=='\r'&&text[i+1]=='\n') i++; row.push(f); rows.push(row); row=[]; f="" }
      else f+=c;
    }
    if(f!==""||row.length){ row.push(f); rows.push(row) }
    return rows;
  }
  const esc=s=>String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

  async function fetchReviews(){
    if(!sheetReady) return [];
    const res = await fetch(C.sheetCsv + (C.sheetCsv.includes("?")?"&":"?") + "t=" + Date.now());
    if(!res.ok) throw new Error("sheet " + res.status);
    const rows = parseCSV(await res.text()).filter(r=>r.some(x=>x.trim()));
    if(rows.length<2) return [];
    const h = rows[0].map(x=>x.trim().toLowerCase());
    const col = name => h.findIndex(x=>x.includes(name));
    const iT=col("timestamp"), iN=col("name"), iL=col("lesson"), iR=col("rating"), iV=col("review"), iA=col("approved");
    return rows.slice(1).map(r=>({
      date: r[iT]||"", name: r[iN]||"", lesson: r[iL]||"",
      rating: Math.max(1,Math.min(5,parseInt(r[iR])||5)), text: r[iV]||"",
      approved: iA<0 ? false : /^(y|yes|true|x|✓)$/i.test((r[iA]||"").trim())
    })).filter(x=>x.text.trim() && (!C.requireApproval || x.approved)).reverse();
  }

  function card(r){
    const initial = esc((r.name||"?").trim().charAt(0).toUpperCase());
    return `<div class="tcard real"><div class="stars" aria-label="${r.rating} out of 5 stars">${"★".repeat(r.rating)}<span style="opacity:.25">${"★".repeat(5-r.rating)}</span></div>
      <p>“${esc(r.text)}”</p>
      <div class="who"><div class="avatar">${initial}</div><div><b>${esc(r.name||"Student")}</b><small>${esc(r.lesson||"Surf lesson")}</small></div></div></div>`;
  }

  window.ATReviews = {
    configured, sheetReady,
    async render(track, emptyEl){
      try{
        const list = await fetchReviews();
        if(!list.length){ emptyEl && emptyEl.classList.add("show"); track.parentElement.style.display="none"; return 0; }
        let html = list.slice(0,30).map(card).join("");
        track.innerHTML = list.length>=3 ? html+html : html;
        track.classList.toggle("static", list.length<3);
        return list.length;
      }catch(e){
        emptyEl && emptyEl.classList.add("show"); track.parentElement.style.display="none"; return 0;
      }
    },
    async submit(d){
      if(!configured) throw new Error("not-configured");
      const body = new URLSearchParams();
      body.append(C.fields.name, d.name);
      body.append(C.fields.lesson, d.lesson);
      body.append(C.fields.rating, String(d.rating));
      body.append(C.fields.review, d.review);
      // Google Forms doesn't send CORS headers; no-cors posts the response without reading the reply.
      await fetch(C.formAction, { method:"POST", mode:"no-cors", body });
      return true;
    }
  };
})();
