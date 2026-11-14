function getTodaysMysteryKey() {
  const day = new Date().getDay();
  if (day === 1 || day === 6) return "joyful";
  if (day === 4) return "luminous";
  if (day === 2 || day === 5) return "sorrowful";
  return "glorious";
}

const state = {
  dark: localStorage.getItem("ora_dark") === "true",
  fontSize: parseFloat(localStorage.getItem("ora_font")) || 1.15,
  haptic: localStorage.getItem("ora_haptic") !== "false",
  mysteryKey: localStorage.getItem("ora_mystery") || getTodaysMysteryKey(),
  rosaryStep: parseInt(localStorage.getItem("ora_rosary_step") || "0", 10),
  intentions: JSON.parse(localStorage.getItem("ora_intentions") || "[]")
};

function applyTheme() {
  document.body.classList.toggle("dark", state.dark);
  document.getElementById("darkToggle").textContent = state.dark ? "☀️ Light" : "🌙 Night";
  localStorage.setItem("ora_dark", state.dark);
}

function applyFontSize() {
  document.documentElement.style.setProperty("--prayer-size", state.fontSize + "rem");
  localStorage.setItem("ora_font", state.fontSize);
}

document.getElementById("darkToggle").addEventListener("click", () => {
  state.dark = !state.dark;
  applyTheme();
});

document.getElementById("fontIncBtn").addEventListener("click", () => {
  state.fontSize = Math.min(1.65, +(state.fontSize + 0.1).toFixed(2));
  applyFontSize();
});

document.getElementById("fontDecBtn").addEventListener("click", () => {
  state.fontSize = Math.max(0.95, +(state.fontSize - 0.1).toFixed(2));
  applyFontSize();
});

function switchTab(tabName) {
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
  document.getElementById("tab-" + tabName).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === tabName);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => switchTab(btn.dataset.tab));
});

function selectDailySlot(slotKey) {
  const slot = DAILY_SLOTS[slotKey];
  document.getElementById("dailyPrayerTitle").textContent = slot.title;
  document.getElementById("dailyPrayerBody").textContent = slot.text;
  document.querySelectorAll("#dailyTimePills .pill").forEach(p => {
    p.classList.toggle("active", p.dataset.slot === slotKey);
  });
}

function initTodayTab() {
  const now = new Date();
  const dateStr = now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  document.getElementById("todayDateLabel").textContent = dateStr;

  const hour = now.getHours();
  let greeting = "Good Evening";
  let defaultSlot = "night";
  if (hour < 12) { greeting = "Good Morning"; defaultSlot = "morning"; }
  else if (hour < 17) { greeting = "Good Afternoon"; defaultSlot = "angelus"; }
  document.getElementById("todayGreeting").textContent = greeting;

  const todayKey = getTodaysMysteryKey();
  const m = MYSTERIES[todayKey];
  document.getElementById("todayLiturgicalNote").textContent =
    "Today's Rosary focus: " + m.name + " (" + m.days + ").";
  document.getElementById("todayMysteryTitle").textContent = m.name;

  selectDailySlot(defaultSlot);

  document.querySelectorAll("#dailyTimePills .pill").forEach(pill => {
    pill.addEventListener("click", () => selectDailySlot(pill.dataset.slot));
  });

  document.getElementById("goToRosaryBtn").addEventListener("click", () => {
    state.mysteryKey = todayKey;
    document.getElementById("mysterySelect").value = todayKey;
    localStorage.setItem("ora_mystery", todayKey);
    renderRosary();
    switchTab("rosary");
  });
}

function buildRosarySteps(mysteryKey) {
  const m = MYSTERIES[mysteryKey];
  const steps = [
    { label: "Intro • Crucifix", title: "Sign of the Cross", text: CORE.signOfCross },
    { label: "Intro • Crucifix", title: "The Apostles' Creed", text: CORE.creed },
    { label: "Intro • First Large Bead", title: "Our Father", banner: "For the intentions of our Holy Father, the Pope.", text: CORE.ourFather },
    { label: "Intro • Small Bead 1 of 3", title: "Hail Mary", banner: "For an increase in Faith.", text: CORE.hailMary },
    { label: "Intro • Small Bead 2 of 3", title: "Hail Mary", banner: "For an increase in Hope.", text: CORE.hailMary },
    { label: "Intro • Small Bead 3 of 3", title: "Hail Mary", banner: "For an increase in Charity.", text: CORE.hailMary },
    { label: "Intro • Closing", title: "Glory Be", text: CORE.gloryBe }
  ];

  m.decades.forEach((dec, idx) => {
    const dNum = idx + 1;
    steps.push({
      label: `Decade ${dNum} of 5 • Large Bead`,
      title: dec.title, banner: dec.fruit, text: CORE.ourFather, decade: dNum, decadeBead: 0
    });
    for (let b = 1; b <= 10; b++) {
      steps.push({
        label: `Decade ${dNum} of 5 • Bead ${b} of 10`,
        title: "Hail Mary", banner: `${dec.title} — ${dec.fruit}`, text: CORE.hailMary, decade: dNum, decadeBead: b
      });
    }
    steps.push({
      label: `End of Decade ${dNum}`,
      title: "Glory Be & Fatima Prayer", banner: dec.title, text: CORE.gloryBe + "\n\n" + CORE.fatima, decade: dNum, decadeBead: 11
    });
  });

  steps.push(
    { label: "Closing • Centerpiece", title: "Hail, Holy Queen", text: CORE.hailHolyQueen },
    { label: "Closing Prayer", title: "Concluding Prayer", text: CORE.rosaryClosing }
  );
  return steps;
}

function renderRosary() {
  const steps = buildRosarySteps(state.mysteryKey);
  if (state.rosaryStep >= steps.length) state.rosaryStep = steps.length - 1;
  if (state.rosaryStep < 0) state.rosaryStep = 0;

  const s = steps[state.rosaryStep];
  document.getElementById("rosaryBeadLabel").textContent = s.label;
  document.getElementById("rosaryStepTitle").textContent = s.title;
  document.getElementById("rosaryStepText").textContent = s.text;

  const bannerEl = document.getElementById("rosaryMysteryBanner");
  if (s.banner) { bannerEl.textContent = s.banner; bannerEl.style.display = "block"; }
  else { bannerEl.style.display = "none"; }

  const beadsRow = document.getElementById("rosaryBeadsRow");
  beadsRow.innerHTML = "";
  if (s.decade) {
    const ourFatherBead = document.createElement("span");
    ourFatherBead.className = "bead large " + (s.decadeBead === 0 ? "current" : "done");
    beadsRow.appendChild(ourFatherBead);
    for (let i = 1; i <= 10; i++) {
      const bead = document.createElement("span");
      let cls = "bead";
      if (s.decadeBead === i) cls += " current";
      else if (s.decadeBead > i) cls += " done";
      bead.className = cls;
      beadsRow.appendChild(bead);
    }
  }

  const pct = Math.round(((state.rosaryStep + 1) / steps.length) * 100);
  document.getElementById("rosaryProgressFill").style.width = pct + "%";
  document.getElementById("rosaryCounterText").textContent = `Step ${state.rosaryStep + 1} of ${steps.length} (${pct}%)`;
  document.getElementById("nextBeadBtn").textContent =
    state.rosaryStep === steps.length - 1 ? "Amen • Start New Rosary" : "Next Bead →";

  localStorage.setItem("ora_rosary_step", state.rosaryStep);
}

function advanceRosary(delta) {
  const steps = buildRosarySteps(state.mysteryKey);
  if (delta > 0 && state.rosaryStep === steps.length - 1) state.rosaryStep = 0;
  else state.rosaryStep = Math.max(0, Math.min(steps.length - 1, state.rosaryStep + delta));
  if (state.haptic && navigator.vibrate) navigator.vibrate(14);
  renderRosary();
}

document.getElementById("nextBeadBtn").addEventListener("click", () => advanceRosary(1));
document.getElementById("rosaryCard").addEventListener("click", () => advanceRosary(1));
document.getElementById("prevBeadBtn").addEventListener("click", () => advanceRosary(-1));
document.getElementById("resetRosaryBtn").addEventListener("click", () => { state.rosaryStep = 0; renderRosary(); });

const mysterySelect = document.getElementById("mysterySelect");
mysterySelect.value = state.mysteryKey;
mysterySelect.addEventListener("change", (e) => {
  state.mysteryKey = e.target.value;
  state.rosaryStep = 0;
  localStorage.setItem("ora_mystery", state.mysteryKey);
  renderRosary();
});

const hapticBtn = document.getElementById("hapticToggleBtn");
function updateHapticLabel() { hapticBtn.textContent = "Vibration: " + (state.haptic ? "On" : "Off"); }
updateHapticLabel();
hapticBtn.addEventListener("click", () => {
  state.haptic = !state.haptic;
  localStorage.setItem("ora_haptic", state.haptic);
  updateHapticLabel();
});

function renderLibrary(query = "") {
  const container = document.getElementById("prayerListContainer");
  const q = query.trim().toLowerCase();
  const filtered = PRAYERS_LIBRARY.filter(p =>
    p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.text.toLowerCase().includes(q)
  );
  if (!filtered.length) {
    container.innerHTML = `<p class="muted" style="margin:6px 0;">No prayers matched "${escapeHtml(q)}".</p>`;
    return;
  }
  container.innerHTML = filtered.map((p, idx) => `
    <div class="prayer-item ${q ? "open" : ""}" data-idx="${idx}">
      <div class="prayer-item-header">
        <div><span class="prayer-item-cat">${p.category}</span><h3 class="prayer-item-title">${p.title}</h3></div>
        <span class="muted">▾</span>
      </div>
      <div class="prayer-item-content"><div class="prayer-body">${p.text}</div></div>
    </div>
  `).join("");
  container.querySelectorAll(".prayer-item-header").forEach(hdr => {
    hdr.addEventListener("click", () => hdr.parentElement.classList.toggle("open"));
  });
}

document.getElementById("prayerSearch").addEventListener("input", (e) => renderLibrary(e.target.value));

function saveIntentions() { localStorage.setItem("ora_intentions", JSON.stringify(state.intentions)); }
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

function renderIntentions() {
  const container = document.getElementById("intentionsListContainer");
  if (!state.intentions.length) {
    container.innerHTML = `<p class="muted" style="margin:6px 0;">No intentions added yet. Add someone to keep in your prayers above.</p>`;
    return;
  }
  container.innerHTML = state.intentions.map((item, idx) => `
    <div class="intention-row">
      <input type="checkbox" ${item.answered ? "checked" : ""} data-idx="${idx}" aria-label="Mark answered" />
      <div class="intention-text ${item.answered ? "answered" : ""}">
        ${escapeHtml(item.text)}<span class="intention-date">Added ${item.date}</span>
      </div>
      <button class="delete-btn" data-del="${idx}" type="button" aria-label="Delete intention">✕</button>
    </div>
  `).join("");
  container.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", () => {
      state.intentions[parseInt(cb.dataset.idx, 10)].answered = cb.checked;
      saveIntentions(); renderIntentions();
    });
  });
  container.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.intentions.splice(parseInt(btn.dataset.del, 10), 1);
      saveIntentions(); renderIntentions();
    });
  });
}

document.getElementById("intentionForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("intentionInput");
  const text = input.value.trim();
  if (!text) return;
  state.intentions.unshift({ text, answered: false, date: new Date().toLocaleDateString(undefined, { day: "numeric", month: "short" }) });
  saveIntentions(); input.value = ""; renderIntentions();
});

const segLib = document.getElementById("segLibraryBtn");
const segInt = document.getElementById("segIntentionsBtn");
segLib.addEventListener("click", () => {
  segLib.classList.add("active"); segInt.classList.remove("active");
  document.getElementById("libraryView").style.display = "block";
  document.getElementById("intentionsView").style.display = "none";
});
segInt.addEventListener("click", () => {
  segInt.classList.add("active"); segLib.classList.remove("active");
  document.getElementById("libraryView").style.display = "none";
  document.getElementById("intentionsView").style.display = "block";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(() => {}));
}

let deferredPrompt = null;
const installBtn = document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); deferredPrompt = e; installBtn.style.display = "inline-flex";
});
installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt(); await deferredPrompt.userChoice;
  deferredPrompt = null; installBtn.style.display = "none";
});

applyTheme();
applyFontSize();
initTodayTab();
renderRosary();
renderLibrary();
renderIntentions();
