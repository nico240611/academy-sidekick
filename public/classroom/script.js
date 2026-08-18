/* =========================================================
   English Classroom · Plataforma Académica 2026-2
   Sitio estático (sin backend). Persistencia en localStorage.
   ========================================================= */
(function () {
  "use strict";

  var STORE = "ec2026_state_v1";
  var SESSION = "ec2026_session_v1";

  /* ---------------- SUPABASE / CLOUD ---------------- */
  var COURSE_ID = "english-classroom-2026-2";
  var SUPABASE_USERS = {
    t1:    { email: "teacher@englishclassroom.local", password: "profe2026" },
    andy:  { email: "andy@englishclassroom.local",   password: "andy2026" },
    tommy: { email: "tommy@englishclassroom.local",  password: "tommy2026" }
  };

  /* ---------------- DATOS BASE (Excel 2026-2) ---------------- */
  var UNITS = [
    { id: "u_inicio", name: "Inicio y Diagnóstico" },
    { id: "u_python", name: "Python" },
    { id: "u_letter", name: "Letter" },
    { id: "u_web", name: "Web Pages & AI" },
    { id: "u_mine", name: "Minecraft" },
    { id: "u_proy", name: "Proyecto Final" }
  ];

  var SESSIONS = [
    { id: "s01", type: "Primera Sesión", date: "2026-08-07", time: "12:00 p.m.", topic: "Welcome Back!", unit: "u_inicio" },
    { id: "s02", type: "Reposición 10 de Junio", date: "2026-08-18", time: "7:30 p.m.", topic: "Last Details", unit: "u_inicio" },
    { id: "s03", type: "Normal", date: "2026-08-19", time: "6:30 p.m.", topic: "Python #1", unit: "u_python" },
    { id: "s04", type: "Reposición 17 de Junio", date: "2026-08-20", time: "7:30 p.m.", topic: "Python #2", unit: "u_python" },
    { id: "s05", type: "Reposición 24 de Junio", date: "2026-08-25", time: "7:30 p.m.", topic: "Python #3", unit: "u_python" },
    { id: "s06", type: "Normal", date: "2026-08-26", time: "6:30 p.m.", topic: "Exam Python", unit: "u_python" },
    { id: "s07", type: "Clase Adicional", date: "2026-08-28", time: "7:05 p.m.", topic: "Letter #1", unit: "u_letter" },
    { id: "s08", type: "Reposición 2 de Septiembre", date: "2026-09-07", time: "7:30 p.m.", topic: "Letter #2", unit: "u_letter" },
    { id: "s09", type: "Normal", date: "2026-09-09", time: "6:30 p.m.", topic: "Exam Letter", unit: "u_letter" },
    { id: "s10", type: "Normal", date: "2026-09-16", time: "6:30 p.m.", topic: "Diagnostic Test", unit: "u_inicio" },
    { id: "s11", type: "Normal", date: "2026-09-23", time: "6:30 p.m.", topic: "Web Pages & AI #1", unit: "u_web" },
    { id: "s12", type: "Clase Adicional", date: "2026-09-28", time: "7:30 p.m.", topic: "Web Pages & AI #2", unit: "u_web" },
    { id: "s13", type: "Normal", date: "2026-09-30", time: "6:30 p.m.", topic: "Web Pages & AI #3", unit: "u_web" },
    { id: "s14", type: "Normal", date: "2026-10-14", time: "6:30 p.m.", topic: "Web Pages & AI #4", unit: "u_web" },
    { id: "s15", type: "Clase Adicional", date: "2026-10-19", time: "7:30 p.m.", topic: "Web Pages & AI #5", unit: "u_web" },
    { id: "s16", type: "Normal", date: "2026-10-21", time: "6:30 p.m.", topic: "Exam Pages & AI", unit: "u_web" },
    { id: "s17", type: "Normal", date: "2026-10-28", time: "6:30 p.m.", topic: "Minecraft #1", unit: "u_mine" },
    { id: "s18", type: "Normal", date: "2026-11-04", time: "6:30 p.m.", topic: "Minecraft #2", unit: "u_mine" },
    { id: "s19", type: "Normal", date: "2026-11-11", time: "6:30 p.m.", topic: "Minecraft #3", unit: "u_mine" },
    { id: "s20", type: "Normal", date: "2026-11-18", time: "6:30 p.m.", topic: "Minecraft #4", unit: "u_mine" },
    { id: "s21", type: "Clase Adicional", date: "2026-11-23", time: "7:30 p.m.", topic: "Exam Minecraft", unit: "u_mine" },
    { id: "s22", type: "Normal", date: "2026-11-25", time: "6:30 p.m.", topic: "Proyect", unit: "u_proy" },
    { id: "s23", type: "Normal", date: "2026-12-02", time: "6:30 p.m.", topic: "Proyect", unit: "u_proy" },
    { id: "s24", type: "Clase Adicional", date: "2026-12-08", time: "11:00 a.m.", topic: "Proyect (Festivo)", unit: "u_proy" },
    { id: "s25", type: "Normal", date: "2026-12-09", time: "6:30 p.m.", topic: "Presentation Proyect", unit: "u_proy" },
    { id: "s26", type: "Cambio de Día", date: "2026-12-17", time: "11:00 a.m.", topic: "Final Review Session", unit: "u_proy" }
  ];

  var SPECIALS = [
    {
      month: 8, date: "2026-08-31", type: "Especial",
      title: "Curso Gratuito de Excel Daxus",
      detail: "Del 31 de Agosto al 3 de Septiembre · 7:00 p.m. (no lectivo del curso)",
      link: "https://lp.hashtagcapacitaciones.com/excel/semana/inscripcion?fonte=pmax-col&conversion=lcto-lexcap-co&utm_source=google-ads&origemurl=&origemads=&utm_campaign=24111917444&utm_medium=&utm_content=&utm_term=&gad_source=2&gad_campaignid=24106354272&gbraid=0AAAAA-IFriA0GM0dCbwJDmykxFX_QXHjp&wbraid=CmgKCAjwv4XUBhAvElgA1sSoWDsizQZ6Gngj9Ko8RYmsl-JRwId1z0kBRawKbefaXr4qLsqC_J2W0zx6YuujnnFhyQZhFZt1Tth02ePVBgkFXL2BA3gn3NX4gPAwaGZVFCnermQfGgKVDg&curso=excel",
      linkText: "Para más información registra tu nombre y correo aquí"
    },
    {
      month: 10, date: "2026-10-01", type: "Especial",
      title: "Semana de Receso",
      detail: "Del 1 al 13 de Octubre · Se retoman clases el 14 de Octubre",
      link: "", linkText: ""
    }
  ];

  var EVENTS = [
    { date: "2026-08-25", desc: "Control de Lectura Python", limit: "En Clase" },
    { date: "2026-08-26", desc: "Exámen Python", limit: "En Clase" },
    { date: "2026-08-30", desc: "Recomendaciones de Notas Python", limit: "11 de Septiembre" },
    { date: "2026-09-07", desc: "Control de Lectura Letter", limit: "En Clase" },
    { date: "2026-09-09", desc: "Exámen Letter", limit: "En Clase" },
    { date: "2026-09-11", desc: "Último Día Mejorar Notas Python", limit: "Último Día" },
    { date: "2026-09-13", desc: "Recomendaciones de Notas Letter", limit: "19 de Septiembre" },
    { date: "2026-09-16", desc: "Diagnostic Test", limit: "En Clase" },
    { date: "2026-09-19", desc: "Último Día Mejorar Notas Letter", limit: "Último Día" },
    { date: "2026-10-19", desc: "Control de Lectura Web Pages", limit: "En Clase" },
    { date: "2026-10-21", desc: "Exámen Web Pages", limit: "En Clase" },
    { date: "2026-10-25", desc: "Recomendaciones de Notas Pages", limit: "6 de Noviembre" },
    { date: "2026-11-06", desc: "Último Día Mejorar Notas Pages", limit: "Último Día" },
    { date: "2026-11-18", desc: "Control de Lectura Minecraft", limit: "En Clase" },
    { date: "2026-11-23", desc: "Exámen Minecraft", limit: "En Clase" },
    { date: "2026-11-29", desc: "Recomendaciones de Notas Minecraft", limit: "17 de Diciembre" },
    { date: "2026-12-09", desc: "Presentation Proyect", limit: "En Clase" },
    { date: "2026-12-17", desc: "Último Día Mejorar Notas Minecraft", limit: "Último Día - En Clase" }
  ];

  var DEFAULT_ACTIVITIES = ["Vocabulary", "Speaking", "Listening", "Writing"];
  var MONTHS = [
    { n: 8, label: "Agosto" }, { n: 9, label: "Septiembre" }, { n: 10, label: "Octubre" },
    { n: 11, label: "Noviembre" }, { n: 12, label: "Diciembre" }
  ];
  var MONTH_NAMES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  /* ---------------- ESTADO ---------------- */
  var state;

  function defaultState() {
    var activities = {};
    SESSIONS.forEach(function (s) {
      activities[s.id] = DEFAULT_ACTIVITIES.map(function (n, i) {
        return { id: s.id + "_a" + (i + 1), name: n };
      });
    });
    return {
      config: {
        threshold: 3.0,
        classroomLink: "https://classroom.google.com/",
        meetLink: "https://meet.google.com/fhu-ffxo-egr",
        courseName: "English Classroom"
      },
      users: [
        { id: "t1", user: "profesor", pass: "profe2026", name: "Nicolás Delgado", role: "teacher" },
        { id: "andy", user: "andy", pass: "andy2026", name: "Andy", role: "student" },
        { id: "tommy", user: "tommy", pass: "tommy2026", name: "Tommy", role: "student" }
      ],
      activities: activities,
      grades: { andy: {}, tommy: {} },
      announcements: [],
      chat: []
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return defaultState();
      var s = JSON.parse(raw);
      var d = defaultState();
      s.config = Object.assign(d.config, s.config || {});
      s.users = s.users || d.users;
      s.activities = Object.assign(d.activities, s.activities || {});
      s.grades = s.grades || d.grades;
      s.grades.andy = s.grades.andy || {};
      s.grades.tommy = s.grades.tommy || {};
      s.announcements = [];
      s.chat = [];
      return s;
    } catch (e) { return defaultState(); }
  }
  function save() {
    var toStore = Object.assign({}, state);
    toStore.announcements = [];
    toStore.chat = [];
    localStorage.setItem(STORE, JSON.stringify(toStore));
  }

  /* ---------------- HELPERS ---------------- */
  function $(sel) { return document.querySelector(sel); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function parseDate(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fmtDate(iso) { var d = parseDate(iso); return d.getDate() + " de " + MONTH_NAMES[d.getMonth()] + " de " + d.getFullYear(); }
  function weekday(iso) { return ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][parseDate(iso).getDay()]; }
  function today() { var t = new Date(); return new Date(t.getFullYear(), t.getMonth(), t.getDate()); }
  function daysTo(iso) { return Math.round((parseDate(iso) - today()) / 86400000); }
  function badgeClass(type) {
    if (/^Normal/.test(type)) return "b-normal";
    if (/^Reposición/.test(type)) return "b-repo";
    if (/^Clase Adicional/.test(type)) return "b-extra";
    if (/^Cambio/.test(type)) return "b-cambio";
    if (/^Primera/.test(type)) return "b-primera";
    return "b-especial";
  }
  function acts(sid) { return state.activities[sid] || []; }
  function gradeOf(studentId, sid, aid) {
    var g = state.grades[studentId];
    if (!g || !g[sid]) return null;
    var v = g[sid][aid];
    return (typeof v === "number" && !isNaN(v)) ? v : null;
  }
  function setGrade(studentId, sid, aid, val) {
    var g = state.grades[studentId] || (state.grades[studentId] = {});
    var s = g[sid] || (g[sid] = {});
    if (val === null) delete s[aid]; else s[aid] = val;
  }
  function avg(list) {
    var v = list.filter(function (x) { return typeof x === "number"; });
    if (!v.length) return null;
    return v.reduce(function (a, b) { return a + b; }, 0) / v.length;
  }
  function sessionAvg(studentId, sid) {
    return avg(acts(sid).map(function (a) { return gradeOf(studentId, sid, a.id); }));
  }
  function unitSessions(uid) { return SESSIONS.filter(function (s) { return s.unit === uid; }); }
  function unitAvg(studentId, uid) {
    var all = [];
    unitSessions(uid).forEach(function (s) {
      acts(s.id).forEach(function (a) { all.push(gradeOf(studentId, s.id, a.id)); });
    });
    return avg(all);
  }
  function generalAvg(studentId) {
    var all = [];
    SESSIONS.forEach(function (s) { acts(s.id).forEach(function (a) { all.push(gradeOf(studentId, s.id, a.id)); }); });
    return avg(all);
  }
  function nfmt(v) { return v === null ? "N.A." : v.toFixed(1); }
  function noteClass(v) {
    if (v === null) return "na";
    return v >= state.config.threshold ? "note-good" : "note-bad";
  }
  function seal(v) {
    if (v === null) return '<span class="seal seal-na">Sin notas</span>';
    return v >= state.config.threshold
      ? '<span class="seal seal-ok">Aprobado</span>'
      : '<span class="seal seal-bad">Reprobado</span>';
  }

  /* ---------------- SESIÓN / LOGIN ---------------- */
  var currentUser = null;

  function findUser(u, p) {
    return state.users.filter(function (x) {
      return x.user.toLowerCase() === String(u).trim().toLowerCase() && x.pass === p;
    })[0];
  }

  function startSession(user, remember) {
    currentUser = user;
    var payload = JSON.stringify({ id: user.id, ts: Date.now() });
    if (remember) localStorage.setItem(SESSION, payload);
    else sessionStorage.setItem(SESSION, payload);
    showApp();
  }

  function restoreSession() {
    var raw = localStorage.getItem(SESSION) || sessionStorage.getItem(SESSION);
    if (!raw) return false;
    try {
      var id = JSON.parse(raw).id;
      var u = state.users.filter(function (x) { return x.id === id; })[0];
      if (!u) return false;
      currentUser = u;
      return true;
    } catch (e) { return false; }
  }

  function logout() {
    localStorage.removeItem(SESSION);
    sessionStorage.removeItem(SESSION);
    currentUser = null;
    $("#app").hidden = true;
    $("#loginScreen").hidden = false;
    $("#loginForm").reset();
    $("#loginError").hidden = true;
    document.body.style.overflow = "";
    $("#username").focus();
  }

  function showApp() {
    $("#loginScreen").hidden = true;
    $("#app").hidden = false;
    document.body.style.overflow = "";
    $("#userName").textContent = currentUser.name;
    $("#userRole").textContent = currentUser.role === "teacher" ? "Profesor" : "Estudiante";
    Array.prototype.forEach.call(document.querySelectorAll(".teacher-only"), function (el) {
      el.hidden = currentUser.role !== "teacher";
    });
    $("#sideMeet").href = state.config.meetLink;
    render("dashboard");
  }

  /* ---------------- VISTAS ---------------- */
  var currentView = "dashboard";
  var selectedStudent = null;
  var openUnits = {};

  function viewerStudentId() {
    if (currentUser.role === "student") return currentUser.id;
    if (!selectedStudent) selectedStudent = "andy";
    return selectedStudent;
  }
  function students() { return state.users.filter(function (u) { return u.role === "student"; }); }
  function studentName(id) { var u = state.users.filter(function (x) { return x.id === id; })[0]; return u ? u.name : id; }

  function render(view) {
    currentView = view || currentView;
    Array.prototype.forEach.call(document.querySelectorAll(".nav-item"), function (b) {
      b.classList.toggle("is-active", b.dataset.view === currentView);
    });
    var titles = {
      dashboard: "Dashboard", cronograma: "Cronograma de clases", eventos: "Fechas importantes",
      notas: "Boletín de notas por tema", avisos: "Avisos y chat del curso",
      docente: "Panel docente", config: "Configuración"
    };
    $("#topbarTitle").textContent = titles[currentView] || "";
    var c = $("#content");
    c.innerHTML = ({
      dashboard: viewDashboard, cronograma: viewCronograma, eventos: viewEventos,
      notas: viewNotas, avisos: viewAvisos, docente: viewDocente, config: viewConfig
    }[currentView] || viewDashboard)();
    wire();
    window.scrollTo(0, 0);
  }

  function nextSession() {
    return SESSIONS.filter(function (s) { return daysTo(s.date) >= 0; })[0] || null;
  }
  function nextEvent() {
    return EVENTS.filter(function (e) { return daysTo(e.date) >= 0; })[0] || null;
  }

  function viewDashboard() {
    var sid = viewerStudentId();
    var ns = nextSession(), ne = nextEvent();
    var g = generalAvg(sid);
    var approved = UNITS.filter(function (u) {
      var a = unitAvg(sid, u.id);
      return a !== null && a >= state.config.threshold;
    }).length;
    var withNotes = UNITS.filter(function (u) { return unitAvg(sid, u.id) !== null; }).length;

    var picker = currentUser.role === "teacher" ? studentPicker() : "";

    var h = '<div class="section-head"><h2>Hola, ' + esc(currentUser.name) + '</h2>' +
      '<p>Resumen académico del segundo semestre 2026 · ' + esc(studentName(sid)) + '</p></div>' + picker;

    h += '<div class="grid grid-4" style="margin-bottom:18px">' +
      stat("Promedio general", nfmt(g), g === null ? "Aún sin notas registradas" : "Escala 1.0 – 5.0 · mínimo " + state.config.threshold.toFixed(1)) +
      stat("Próxima clase", ns ? ns.topic : "—", ns ? weekday(ns.date) + " " + fmtDate(ns.date) + " · " + ns.time : "Semestre finalizado") +
      stat("Próxima fecha límite", ne ? (daysTo(ne.date) + " días") : "—", ne ? ne.desc + " · " + fmtDate(ne.date) : "Sin pendientes", true) +
      stat("Unidades aprobadas", approved + " / " + UNITS.length, withNotes + " unidades con notas registradas", true) +
      '</div>';

    h += '<div class="grid grid-2">';
    h += '<div class="card card-pad"><h3 style="font-size:1rem;margin-bottom:12px">Accesos rápidos</h3>' +
      '<div class="toolbar" style="margin:0">' +
      '<a class="btn btn-gold" href="' + esc(state.config.meetLink) + '" target="_blank" rel="noopener">Entrar a Google Meet</a>' +
      '<a class="btn btn-ghost" href="' + esc(state.config.classroomLink) + '" target="_blank" rel="noopener">Abrir Google Classroom</a>' +
      '</div><p class="hint">Las actividades se desarrollan y entregan en Google Classroom; las clases en vivo se realizan por Meet.</p></div>';

    h += '<div class="card card-pad"><h3 style="font-size:1rem;margin-bottom:12px">Promedio por unidad</h3><div class="table-wrap" style="box-shadow:none"><table><tbody>';
    UNITS.forEach(function (u) {
      var a = unitAvg(sid, u.id);
      h += '<tr><td>' + esc(u.name) + '</td><td class="mono ' + noteClass(a) + '" style="text-align:right">' + nfmt(a) + '</td><td style="text-align:right">' + seal(a) + '</td></tr>';
    });
    h += '</tbody></table></div></div></div>';

    var an = state.announcements.slice(-2).reverse();
    if (an.length) {
      h += '<h3 style="font-size:1rem;margin:22px 0 12px">Últimos avisos</h3>';
      an.forEach(function (a) {
        h += '<div class="announce"><h4>' + esc(a.title) + '</h4><p>' + esc(a.body) + '</p></div>';
      });
    }
    return h;
  }

  function stat(label, value, sub, gold) {
    return '<div class="stat' + (gold ? " gold" : "") + '"><div class="stat-label">' + esc(label) + '</div>' +
      '<div class="stat-value">' + esc(value) + '</div><div class="stat-sub">' + esc(sub) + '</div></div>';
  }

  function studentPicker() {
    var h = '<div class="toolbar"><span class="stat-label">Ver como estudiante:</span>';
    students().forEach(function (s) {
      h += '<button class="tab' + (viewerStudentId() === s.id ? " is-active" : "") + '" data-student="' + s.id + '">' + esc(s.name) + '</button>';
    });
    return h + '</div>';
  }

  var activeMonth = 8;
  function viewCronograma() {
    var h = '<div class="section-head"><h2>Cronograma de clases</h2><p>Agosto – Diciembre 2026 · incluye reposiciones, clases adicionales y eventos no lectivos.</p></div>';
    h += '<div class="tabs">';
    MONTHS.forEach(function (m) {
      h += '<button class="tab' + (m.n === activeMonth ? " is-active" : "") + '" data-month="' + m.n + '">' + m.label + '</button>';
    });
    h += '</div>';

    var rows = SESSIONS.filter(function (s) { return parseDate(s.date).getMonth() + 1 === activeMonth; });
    var sp = SPECIALS.filter(function (s) { return s.month === activeMonth; });

    h += '<div class="table-wrap"><table><thead><tr><th>Tipo</th><th>Fecha</th><th>Hora</th><th>Tema / Unidad</th><th></th></tr></thead><tbody>';
    if (!rows.length) h += '<tr><td colspan="5" class="na">Sin clases programadas este mes.</td></tr>';
    rows.forEach(function (s) {
      var past = daysTo(s.date) < 0;
      h += '<tr' + (past ? ' style="opacity:.62"' : '') + '>' +
        '<td><span class="badge ' + badgeClass(s.type) + '">' + esc(s.type) + '</span></td>' +
        '<td>' + weekday(s.date) + ' ' + parseDate(s.date).getDate() + ' de ' + MONTH_NAMES[parseDate(s.date).getMonth()] + '</td>' +
        '<td class="mono">' + esc(s.time) + '</td>' +
        '<td><strong>' + esc(s.topic) + '</strong><br><span class="stat-sub">' + esc(unitName(s.unit)) + '</span></td>' +
        '<td style="text-align:right"><a class="btn btn-ghost btn-sm" href="' + esc(state.config.meetLink) + '" target="_blank" rel="noopener">Meet</a></td>' +
        '</tr>';
    });
    h += '</tbody></table></div>';

    sp.forEach(function (s) {
      h += '<div class="notice" style="margin-top:16px"><strong>' + esc(s.title) + '</strong><br>' + esc(s.detail);
      if (s.link) h += '<br><a href="' + esc(s.link) + '" target="_blank" rel="noopener">' + esc(s.linkText) + '</a>';
      h += '</div>';
    });
    return h;
  }
  function unitName(uid) { var u = UNITS.filter(function (x) { return x.id === uid; })[0]; return u ? u.name : ""; }

  function viewEventos() {
    var h = '<div class="section-head"><h2>Fechas importantes</h2><p>Controles de lectura, exámenes, recomendaciones y últimos días para mejorar notas.</p></div><div class="timeline">';
    EVENTS.forEach(function (e) {
      var d = daysTo(e.date);
      var cls = d < 0 ? "past" : (d <= 7 ? "soon" : "");
      var txt = d < 0 ? "Finalizado" : (d === 0 ? "¡Es hoy!" : "Faltan " + d + " días");
      h += '<div class="tl-item ' + cls + '"><div class="tl-title">' + esc(e.desc) + '</div>' +
        '<div class="tl-meta"><span>📅 ' + weekday(e.date) + ' ' + fmtDate(e.date) + '</span>' +
        '<span>⏳ Fecha límite: <strong>' + esc(e.limit) + '</strong></span>' +
        '<span class="days">' + txt + '</span></div></div>';
    });
    return h + '</div>';
  }

  function viewNotas() {
    var sid = viewerStudentId();
    var g = generalAvg(sid);
    var h = '<div class="section-head"><h2>Boletín de notas por tema</h2><p>Escala 1.0 – 5.0 · Nota mínima aprobatoria ' + state.config.threshold.toFixed(1) + ' · Las notas no registradas se muestran como N.A. y no afectan el promedio.</p></div>';
    if (currentUser.role === "teacher") h += studentPicker();

    h += '<div class="toolbar no-print">' +
      '<button class="btn btn-primary btn-sm" id="btnPdf">Exportar boletín en PDF</button>' +
      '<button class="btn btn-ghost btn-sm" id="btnXls">Exportar notas a Excel</button>' +
      '<div class="spacer"></div>' +
      '<span class="avg-pill">Promedio general: <span class="' + noteClass(g) + '">' + nfmt(g) + '</span></span> ' + seal(g) +
      '</div>';

    h += '<div id="boletin"><div class="card card-pad" style="margin-bottom:16px"><strong>' + esc(state.config.courseName) + ' · Boletín oficial 2026-2</strong><br>' +
      '<span class="stat-sub">Estudiante: ' + esc(studentName(sid)) + ' · Generado el ' + fmtDate(new Date().toISOString().slice(0, 10)) + '</span></div>';

    UNITS.forEach(function (u) {
      var ua = unitAvg(sid, u.id);
      var open = !!openUnits[u.id];
      h += '<div class="acc' + (open ? " open" : "") + '" data-unit="' + u.id + '">' +
        '<button class="acc-head" data-toggle="' + u.id + '" aria-expanded="' + open + '">' +
        '<span class="chev">▶</span><span class="acc-title">' + esc(u.name) + '</span>' +
        '<span class="avg-pill ' + noteClass(ua) + '">' + nfmt(ua) + '</span>' + seal(ua) + '</button>';
      h += '<div class="acc-body"' + (open ? "" : " hidden") + '>';
      unitSessions(u.id).forEach(function (s) {
        var sa = sessionAvg(sid, s.id);
        h += '<div class="class-block"><div class="class-head"><strong>' + esc(s.topic) + '</strong>' +
          '<span class="badge ' + badgeClass(s.type) + '">' + esc(s.type) + '</span>' +
          '<span class="stat-sub">' + fmtDate(s.date) + '</span><span class="spacer"></span>' +
          '<span class="avg-pill ' + noteClass(sa) + '">Promedio clase: ' + nfmt(sa) + '</span></div>';
        h += '<table><thead><tr><th>Actividad</th><th style="text-align:right">Nota</th></tr></thead><tbody>';
        var list = acts(s.id);
        if (!list.length) h += '<tr><td colspan="2" class="na">Sin actividades definidas.</td></tr>';
        list.forEach(function (a) {
          var v = gradeOf(sid, s.id, a.id);
          h += '<tr><td>' + esc(a.name) + '</td><td class="mono ' + noteClass(v) + '" style="text-align:right">' + nfmt(v) + '</td></tr>';
        });
        h += '</tbody></table></div>';
      });
      h += '</div></div>';
    });
    return h + '</div>';
  }

  function viewDocente() {
    var sid = viewerStudentId();
    var h = '<div class="section-head"><h2>Panel docente</h2><p>Registra y edita notas, y administra el nombre de las actividades de cada clase. Los cambios se guardan en este navegador.</p></div>';
    h += studentPicker();
    h += '<div class="toolbar">' +
      '<button class="btn btn-primary btn-sm" id="btnSaveAll">Guardar cambios</button>' +
      '<button class="btn btn-ghost btn-sm" id="btnXls">Exportar a Excel</button>' +
      '<button class="btn btn-ghost btn-sm" id="btnPdf">Exportar boletín PDF</button>' +
      '<div class="spacer"></div>' +
      '<button class="btn btn-ghost btn-sm" id="btnBackup">Copia de seguridad (.json)</button>' +
      '<label class="btn btn-ghost btn-sm" for="fileRestore">Restaurar copia</label>' +
      '<input id="fileRestore" type="file" accept="application/json" hidden />' +
      '</div>';
    h += '<p class="hint" style="margin-bottom:16px">Notas de 1.0 a 5.0 (un decimal). Deja el campo vacío para dejarla como <strong>N.A.</strong></p>';

    SESSIONS.forEach(function (s) {
      var sa = sessionAvg(sid, s.id);
      h += '<div class="card" style="margin-bottom:14px"><div class="class-head" style="border-bottom:1px solid var(--line)">' +
        '<strong>' + esc(s.topic) + '</strong><span class="badge ' + badgeClass(s.type) + '">' + esc(s.type) + '</span>' +
        '<span class="stat-sub">' + fmtDate(s.date) + ' · ' + esc(s.time) + '</span><span class="spacer"></span>' +
        '<span class="avg-pill ' + noteClass(sa) + '">' + nfmt(sa) + '</span></div>';
      h += '<div class="table-wrap" style="border:0;box-shadow:none"><table><thead><tr><th>Actividad</th><th style="width:140px">Nota (1.0–5.0)</th><th style="width:120px"></th></tr></thead><tbody>';
      acts(s.id).forEach(function (a) {
        var v = gradeOf(sid, s.id, a.id);
        h += '<tr><td><input class="act-input" data-act-name="' + s.id + '|' + a.id + '" value="' + esc(a.name) + '" /></td>' +
          '<td><input class="grade-input" type="number" min="1" max="5" step="0.1" data-grade="' + s.id + '|' + a.id + '" value="' + (v === null ? "" : v) + '" placeholder="N.A." /></td>' +
          '<td><button class="btn btn-ghost btn-sm" data-del-act="' + s.id + '|' + a.id + '">Eliminar</button></td></tr>';
      });
      h += '</tbody></table></div><div style="padding:12px 14px"><button class="btn btn-ghost btn-sm" data-add-act="' + s.id + '">+ Agregar actividad</button></div></div>';
    });
    return h;
  }

  function viewConfig() {
    var c = state.config;
    var h = '<div class="section-head"><h2>Configuración</h2><p>Enlaces del curso, nota mínima y credenciales de acceso.</p></div>';
    h += '<div class="card card-pad" style="margin-bottom:16px">' +
      '<div class="field"><label for="cfgCourse">Nombre del curso</label><input id="cfgCourse" value="' + esc(c.courseName) + '" /></div>' +
      '<div class="field"><label for="cfgClassroom">Enlace de Google Classroom (botón "Abrir Google Classroom")</label><input id="cfgClassroom" value="' + esc(c.classroomLink) + '" /></div>' +
      '<div class="field"><label for="cfgMeet">Enlace de Google Meet</label><input id="cfgMeet" value="' + esc(c.meetLink) + '" /></div>' +
      '<div class="field"><label for="cfgTh">Nota mínima aprobatoria (1.0 – 5.0)</label><input id="cfgTh" type="number" min="1" max="5" step="0.1" value="' + c.threshold + '" /></div>' +
      '<button class="btn btn-primary btn-sm" id="btnSaveCfg">Guardar configuración</button></div>';

    h += '<div class="card card-pad"><h3 style="font-size:1rem;margin-bottom:12px">Usuarios y contraseñas</h3><div class="table-wrap" style="box-shadow:none"><table><thead><tr><th>Nombre</th><th>Rol</th><th>Usuario</th><th>Contraseña</th></tr></thead><tbody>';
    state.users.forEach(function (u) {
      h += '<tr><td>' + esc(u.name) + '</td><td>' + (u.role === "teacher" ? "Profesor" : "Estudiante") + '</td>' +
        '<td><input class="act-input" data-user="' + u.id + '" value="' + esc(u.user) + '" /></td>' +
        '<td><input class="act-input" data-pass="' + u.id + '" value="' + esc(u.pass) + '" /></td></tr>';
    });
    h += '</tbody></table></div><div style="margin-top:12px"><button class="btn btn-primary btn-sm" id="btnSaveUsers">Guardar usuarios</button></div></div>';
    return h;
  }

  function viewAvisos() {
    var isT = currentUser.role === "teacher";
    var h = '<div class="section-head"><h2>Avisos y chat del curso</h2><p>Avisos generales del docente y mensajería del curso (se guarda en este navegador).</p></div>';
    if (isT) {
      h += '<div class="card card-pad" style="margin-bottom:18px"><h3 style="font-size:1rem;margin-bottom:12px">Publicar aviso</h3>' +
        '<div class="field"><label for="anTitle">Título</label><input id="anTitle" placeholder="Ej: Recordatorio examen Python" /></div>' +
        '<div class="field"><label for="anBody">Mensaje</label><textarea id="anBody" rows="3" placeholder="Escribe el aviso..."></textarea></div>' +
        '<button class="btn btn-primary btn-sm" id="btnAnnounce">Publicar aviso</button></div>';
    }
    h += '<h3 style="font-size:1rem;margin-bottom:12px">Avisos publicados</h3>';
    if (!state.announcements.length) h += '<p class="hint">Aún no hay avisos.</p>';
    state.announcements.slice().reverse().forEach(function (a) {
      h += '<div class="announce"><h4>' + esc(a.title) + '</h4><p>' + esc(a.body) + '</p>' +
        '<div class="tl-meta"><span>' + fmtDate(a.date.slice(0, 10)) + '</span>' +
        (isT ? '<button class="btn btn-ghost btn-sm" data-del-an="' + a.id + '">Eliminar</button>' : '') + '</div></div>';
    });

    h += '<h3 style="font-size:1rem;margin:22px 0 12px">Chat del curso</h3>' +
      '<div class="card chat-box"><div class="chat-list" id="chatList"></div>' +
      '<form class="chat-form" id="chatForm"><input id="chatInput" placeholder="Escribe un mensaje..." autocomplete="off" /><button class="btn btn-primary btn-sm" type="submit">Enviar</button></form></div>' +
      '<p class="hint">Nota: al ser un sitio estático sin servidor, el chat funciona como bitácora local del dispositivo. Para chat en tiempo real entre Andy, Tommy y el docente se requiere un backend.</p>';
    return h;
  }

  function paintChat() {
    var list = $("#chatList");
    if (!list) return;
    list.innerHTML = state.chat.map(function (m) {
      return '<div class="msg' + (m.uid === currentUser.id ? " mine" : "") + '"><span class="who">' + esc(m.name) + '</span>' +
        esc(m.text) + '<span class="when">' + new Date(m.ts).toLocaleString("es-CO") + '</span></div>';
    }).join("") || '<p class="hint">Sin mensajes todavía.</p>';
    list.scrollTop = list.scrollHeight;
  }

  /* ---------------- EXPORTACIONES ---------------- */
  function download(blob, name) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }

  function exportExcel() {
    var rows = ['<tr><th>Estudiante</th><th>Unidad</th><th>Clase</th><th>Fecha</th><th>Actividad</th><th>Nota</th></tr>'];
    students().forEach(function (st) {
      SESSIONS.forEach(function (s) {
        acts(s.id).forEach(function (a) {
          var v = gradeOf(st.id, s.id, a.id);
          rows.push('<tr><td>' + esc(st.name) + '</td><td>' + esc(unitName(s.unit)) + '</td><td>' + esc(s.topic) +
            '</td><td>' + fmtDate(s.date) + '</td><td>' + esc(a.name) + '</td><td>' + (v === null ? "N.A." : v.toFixed(1)) + '</td></tr>');
        });
      });
      rows.push('<tr><td colspan="5"><b>Promedio general ' + esc(st.name) + '</b></td><td><b>' + nfmt(generalAvg(st.id)) + '</b></td></tr>');
    });
    var html = '<html><head><meta charset="utf-8"></head><body><table border="1">' + rows.join("") + '</table></body></html>';
    download(new Blob(["\ufeff" + html], { type: "application/vnd.ms-excel" }), "Notas_English_Classroom_2026-2.xls");
  }

function exportPdf() {
    if (currentView !== "notas") { render("notas"); }
    UNITS.forEach(function (u) { openUnits[u.id] = true; });
    render("notas");
    setTimeout(function () { window.print(); }, 200);
  }

  /* ---------------- INICIALIZACIÓN ---------------- */
  // Asegúrate de incluir la función wire() o el llamado a restoreSession() / render() al cargar
  if (restoreSession()) {
    showApp();
  } else {
    $("#loginScreen").hidden = false;
  }
})();

  function backupJson() {
    download(new Blob([JSON.stringify(state, null, 2)], { type: "application/json" }), "respaldo_english_classroom.json");
  }

  /* ---------------- EVENTOS ---------------- */
  function wire() {
    var c = $("#content");

    c.addEventListener("click", function (e) {
      var t = e.target.closest("[data-month],[data-student],[data-toggle],[data-add-act],[data-del-act],[data-del-an],#btnSaveAll,#btnXls,#btnPdf,#btnBackup,#btnSaveCfg,#btnSaveUsers,#btnAnnounce");
      if (!t) return;
      if (t.dataset.month) { activeMonth = +t.dataset.month; return render(); }
      if (t.dataset.student) { selectedStudent = t.dataset.student; return render(); }
      if (t.dataset.toggle) {
        var u = t.dataset.toggle;
        openUnits[u] = !openUnits[u];
        var acc = t.closest(".acc");
        acc.classList.toggle("open", openUnits[u]);
        acc.querySelector(".acc-body").hidden = !openUnits[u];
        t.setAttribute("aria-expanded", String(!!openUnits[u]));
        return;
      }
      if (t.dataset.addAct) {
        var sid = t.dataset.addAct;
        var name = prompt("Nombre de la nueva actividad:", "Nueva actividad");
        if (!name) return;
        state.activities[sid] = acts(sid).concat([{ id: sid + "_a" + Date.now(), name: name.trim() }]);
        save(); return render();
      }
      if (t.dataset.delAct) {
        var p = t.dataset.delAct.split("|");
        if (!confirm("¿Eliminar esta actividad y su nota?")) return;
        state.activities[p[0]] = acts(p[0]).filter(function (a) { return a.id !== p[1]; });
        setGrade(viewerStudentId(), p[0], p[1], null);
        students().forEach(function (s) { setGrade(s.id, p[0], p[1], null); });
        save(); return render();
      }
      if (t.dataset.delAn) {
        state.announcements = state.announcements.filter(function (a) { return a.id !== t.dataset.delAn; });
        save(); return render();
      }
      switch (t.id) {
        case "btnSaveAll": save(); alert("Cambios guardados correctamente."); return render();
        case "btnXls": return exportExcel();
        case "btnPdf": return exportPdf();
        case "btnBackup": return backupJson();
        case "btnSaveCfg":
          state.config.courseName = $("#cfgCourse").value.trim() || "English Classroom";
          state.config.classroomLink = $("#cfgClassroom").value.trim();
          state.config.meetLink = $("#cfgMeet").value.trim();
          var th = parseFloat($("#cfgTh").value);
          state.config.threshold = isNaN(th) ? 3 : Math.min(5, Math.max(1, th));
          save(); $("#sideMeet").href = state.config.meetLink;
          alert("Configuración guardada."); return render();
        case "btnSaveUsers":
          Array.prototype.forEach.call(c.querySelectorAll("[data-user]"), function (i) {
            var u = state.users.filter(function (x) { return x.id === i.dataset.user; })[0];
            if (u && i.value.trim()) u.user = i.value.trim();
          });
          Array.prototype.forEach.call(c.querySelectorAll("[data-pass]"), function (i) {
            var u = state.users.filter(function (x) { return x.id === i.dataset.pass; })[0];
            if (u && i.value) u.pass = i.value;
          });
          save(); alert("Usuarios actualizados."); return;
        case "btnAnnounce":
          var ti = $("#anTitle").value.trim(), bo = $("#anBody").value.trim();
          if (!ti || !bo) return alert("Escribe título y mensaje.");
          state.announcements.push({ id: "an" + Date.now(), title: ti, body: bo, date: new Date().toISOString() });
          save(); return render();
      }
    });

    c.addEventListener("change", function (e) {
      var el = e.target;
      if (el.dataset.grade) {
        var p = el.dataset.grade.split("|");
        var raw = el.value.trim();
        if (raw === "") { setGrade(viewerStudentId(), p[0], p[1], null); }
        else {
          var v = Math.round(parseFloat(raw.replace(",", ".")) * 10) / 10;
          if (isNaN(v) || v < 1 || v > 5) { alert("La nota debe estar entre 1.0 y 5.0"); el.value = ""; return; }
          el.value = v.toFixed(1);
          setGrade(viewerStudentId(), p[0], p[1], v);
        }
        save();
      }
      if (el.dataset.actName) {
        var q = el.dataset.actName.split("|");
        var a = acts(q[0]).filter(function (x) { return x.id === q[1]; })[0];
        if (a) { a.name = el.value.trim() || a.name; save(); }
      }
      if (el.id === "fileRestore" && el.files[0]) {
        var fr = new FileReader();
        fr.onload = function () {
          try {
            var data = JSON.parse(fr.result);
            localStorage.setItem(STORE, JSON.stringify(data));
            state = load(); save(); alert("Copia restaurada."); render();
          } catch (err) { alert("Archivo inválido."); }
        };
        fr.readAsText(el.files[0]);
      }
    });

    c.addEventListener("submit", function (e) {
      if (e.target.id === "chatForm") {
        e.preventDefault();
        var v = $("#chatInput").value.trim();
        if (!v) return;
        state.chat.push({ uid: currentUser.id, name: currentUser.name, text: v, ts: Date.now() });
        save(); $("#chatInput").value = ""; paintChat();
      }
    });

    if (currentView === "avisos") paintChat();
  }

  /* ---------------- INIT ---------------- */
  state = load();

  document.addEventListener("click", function (e) {
    var nav = e.target.closest(".nav-item");
    if (nav) { render(nav.dataset.view); $("#sidebar").classList.remove("open"); }
    if (e.target.id === "menuBtn") $("#sidebar").classList.toggle("open");
    if (e.target.id === "logoutBtn") logout();
  });

  $("#loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var u = findUser($("#username").value, $("#password").value);
    if (!u) { $("#loginError").hidden = false; return; }
    $("#loginError").hidden = true;
    startSession(u, $("#remember").checked);
  });

  if (restoreSession()) showApp();
  else { $("#app").hidden = true; $("#loginScreen").hidden = false; }
})();
