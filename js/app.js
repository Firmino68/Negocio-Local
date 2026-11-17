(() => {
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const money = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " AOA";
  const price = (i) => (i.from ? "a partir de " : "") + money(i.price);
  const t2m = (t) => { const [h, m] = t.split(":"); return +h * 60 + +m; };
  const m2t = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  const DIAS = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  const q = new URLSearchParams(location.search).get("tipo");
  const B = NEGOCIOS[NEGOCIOS[q] ? q : TIPO];
  const items = B.items, find = (id) => items.find((i) => i.id === id);
  const waLink = (text) => `https://wa.me/${B.phone}` + (text ? "?text=" + encodeURIComponent(text) : "");

  // ---- Aparência e textos ----
  document.documentElement.style.setProperty("--brand", B.color);
  document.documentElement.style.setProperty("--soft", B.soft);
  document.querySelector('meta[name="theme-color"]').content = B.color;
  document.title = `${B.name} | ${B.tagline}`;
  document.querySelector('meta[name="description"]').content = `${B.name}: ${B.tagline}. Horário, preços e marcação online por WhatsApp.`;
  $("brand").textContent = B.emoji + " " + B.name;
  $("emoji").textContent = B.emoji; $("name").textContent = B.name; $("tagline").textContent = B.tagline;
  $("navServ").textContent = B.navLabel;
  $("servTitle").textContent = B.servicesTitle; $("bookTitle").textContent = B.bookTitle; $("svcLabel").textContent = B.svcLabel;
  $("ctaBook").textContent = B.bookCta; $("send").textContent = "Confirmar pelo WhatsApp";
  $("ctaWa").href = $("waFloat").href = $("wa").href = waLink(`Olá! Gostaria de falar com ${B.name}.`);
  $("address").textContent = B.address;
  $("map").href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(B.name + ", " + B.address);
  $("tel").textContent = "+" + B.phone.replace(/^(\d{3})(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4"); $("tel").href = "tel:+" + B.phone;

  // ---- Aberto agora / próxima abertura ----
  function status() {
    const now = new Date(), min = now.getHours() * 60 + now.getMinutes(), h = B.hours[now.getDay()];
    if (h && min >= t2m(h[0]) && min < t2m(h[1])) return "● Aberto agora · fecha às " + h[1];
    for (let i = 0; i < 8; i++) {
      const d = (now.getDay() + i) % 7, x = B.hours[d];
      if (!x || (i === 0 && min >= t2m(x[0]))) continue;
      return "● Fechado · abre " + (i === 0 ? "hoje" : i === 1 ? "amanhã" : "na " + DIAS[d].toLowerCase()) + " às " + x[0];
    }
    return "● Fechado";
  }
  $("status").textContent = status();

  // ---- Horário ----
  const today = new Date().getDay();
  $("hours").innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) => `<tr class="${d === today ? "today" : ""}"><td>${DIAS[d]}</td><td>${B.hours[d] ? B.hours[d][0] + " – " + B.hours[d][1] : "Fechado"}</td></tr>`).join("");

  // ---- Serviços e formulário ----
  $("services").innerHTML = items.map((i) => `<article class="svc"><div><h3>${esc(i.name)}</h3><p>${esc(i.desc)}</p>
      <span class="meta">${esc(i.dur)} · <strong>${price(i)}</strong></span></div>
      <button class="btn small" type="button" data-svc="${i.id}">${B.bookCta}</button></article>`).join("");
  $("svc").innerHTML = '<option value="">Escolha…</option>' + items.map((i) => `<option value="${i.id}">${esc(i.name)} — ${price(i)}</option>`).join("");
  $("services").addEventListener("click", (e) => {
    const b = e.target.closest("[data-svc]"); if (!b) return;
    $("svc").value = b.dataset.svc; location.hash = "marcar"; $("cName").focus({ preventScroll: true });
  });

  const pad = (n) => String(n).padStart(2, "0"), ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const start = new Date(), end = new Date(Date.now() + 60 * 864e5);
  $("date").min = ymd(start); $("date").max = ymd(end);

  function slotsFor(v) {
    const [y, m, d] = v.split("-").map(Number), dt = new Date(y, m - 1, d), h = B.hours[dt.getDay()];
    if (!h) return { dt, error: "Fechado neste dia. Escolha outra data." };
    const now = new Date(), isToday = dt.toDateString() === now.toDateString(), minNow = now.getHours() * 60 + now.getMinutes() + 30;
    const list = [];
    for (let t = t2m(h[0]); t <= t2m(h[1]) - B.slot; t += B.slot) if (!isToday || t >= minNow) list.push(m2t(t));
    return { dt, list, error: list.length ? "" : "Já não há horários para hoje. Escolha outro dia." };
  }
  function renderSlots() {
    const v = $("date").value;
    if (!v) { $("slots").innerHTML = ""; $("slotMsg").textContent = "Escolha primeiro a data."; return; }
    const r = slotsFor(v);
    $("slotMsg").textContent = r.error || "Escolha uma hora:";
    $("slots").innerHTML = (r.list || []).map((t, i) => `<span><input type="radio" name="slot" id="sl${i}" value="${t}"><label for="sl${i}">${t}</label></span>`).join("");
  }
  $("date").addEventListener("change", renderSlots);

  $("book").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("cName").value.trim(), it = find($("svc").value), v = $("date").value, slot = document.querySelector('input[name="slot"]:checked');
    const err = (m) => ($("err").textContent = m);
    if (!name) return err("Indique o seu nome.");
    if (!it) return err("Escolha uma opção da lista.");
    if (!v) return err("Escolha a data.");
    if (!slot) return err("Escolha a hora.");
    err("");
    const dt = slotsFor(v).dt, notes = $("notes").value.trim();
    const when = new Intl.DateTimeFormat("pt-PT", { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" }).format(dt);
    const text = [`*Pedido de ${B.bookCta === "Reservar" ? "reserva" : "marcação"} — ${B.name}*`, `Cliente: ${name}`, `${B.svcLabel}: ${it.name} (${price(it)})`,
      `Data: ${when}`, `Hora: ${slot.value}`, notes ? `Obs.: ${notes}` : ""].filter(Boolean).join("\n");
    window.open(waLink(text), "_blank", "noopener");
  });

  // ---- SEO: dados estruturados (JSON-LD) ----
  const dias = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": B.schema, name: B.name, description: B.tagline, telephone: "+" + B.phone,
    address: { "@type": "PostalAddress", streetAddress: B.address, addressCountry: "AO" },
    openingHoursSpecification: Object.entries(B.hours).filter(([, h]) => h).map(([d, h]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: dias[d], opens: h[0], closes: h[1] })) });
  document.head.appendChild(ld);
})();
