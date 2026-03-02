// ─── Admin Panel Logic ────────────────────────────────────────────────────────
const sb = _supabase   // from supabase-config.js

// ── Slot definitions ──────────────────────────────────────────────────────────
const FEE_SLOTS = {
  'inter-civ': [
    { key: 'inter-civ-1st-arts',       label: '1st Year Arts' },
    { key: 'inter-civ-1st-premed',     label: '1st Year Pre-Med' },
    { key: 'inter-civ-1st-cs',         label: '1st Year Computer Science' },
    { key: 'inter-civ-1st-preeng',     label: '1st Year Pre-Engineering' },
    { key: 'inter-civ-1st-arts-state', label: '1st Year Arts State' },
    { key: 'inter-civ-2nd-arts',       label: '2nd Year Arts' },
    { key: 'inter-civ-2nd-cs',         label: '2nd Year Computer Science' },
    { key: 'inter-civ-2nd-preeng',     label: '2nd Year Pre-Engineering' },
    { key: 'inter-civ-2nd-premed',     label: '2nd Year Pre-Med' },
    { key: 'inter-civ-2nd-arts-state', label: '2nd Year Arts State' },
  ],
  'inter-fgei': [
    { key: 'inter-fgei-1st-arts',       label: 'FGEIs 1st Year Arts' },
    { key: 'inter-fgei-1st-cs',         label: 'FGEIs 1st Year Computer Science' },
    { key: 'inter-fgei-1st-preeng',     label: 'FGEIs 1st Year Pre-Engineering' },
    { key: 'inter-fgei-1st-premed',     label: 'FGEIs 1st Year Pre-Medical' },
    { key: 'inter-fgei-1st-arts-state', label: 'FGEIs 1st Year Arts State' },
    { key: 'inter-fgei-2nd-arts',       label: 'FGEIs 2nd Year Arts' },
    { key: 'inter-fgei-2nd-cs',         label: 'FGEIs 2nd Year Computer Science' },
    { key: 'inter-fgei-2nd-premed',     label: 'FGEIs 2nd Year Pre-Medical' },
    { key: 'inter-fgei-2nd-preeng',     label: 'FGEIs 2nd Year Pre-Engineering' },
    { key: 'inter-fgei-2nd-arts-state', label: 'FGEIs 2nd Year Arts State' },
  ],
  'nup': [
    { key: 'nup-bba-1st',     label: 'BBA (Hons) 1st Semester' },
    { key: 'nup-bba-2nd',     label: 'BBA (Hons) 2nd Semester' },
    { key: 'nup-cs-1st',      label: 'BS CS 1st Semester' },
    { key: 'nup-cs-2nd',      label: 'BS CS 2nd Semester' },
    { key: 'nup-eng-1st',     label: 'BS English 1st Semester' },
    { key: 'nup-eng-2nd',     label: 'BS English 2nd Semester' },
    { key: 'nup-polsci-1st',  label: 'BS Political Science 1st Semester' },
    { key: 'nup-polsci-2nd',  label: 'BS Political Science 2nd Semester' },
  ],
  'uop-cs': [
    { key: 'uop-cs-1st', label: 'BS CS 1st Semester' },
    { key: 'uop-cs-2nd', label: 'BS CS 2nd Semester' },
    { key: 'uop-cs-3rd', label: 'BS CS 3rd Semester' },
    { key: 'uop-cs-4th', label: 'BS CS 4th Semester' },
    { key: 'uop-cs-5th', label: 'BS CS 5th Semester' },
    { key: 'uop-cs-6th', label: 'BS CS 6th Semester' },
    { key: 'uop-cs-7th', label: 'BS CS 7th Semester' },
    { key: 'uop-cs-8th', label: 'BS CS 8th Semester' },
  ],
  'uop-eng': [
    { key: 'uop-eng-1st', label: 'BS English 1st Semester' },
    { key: 'uop-eng-3rd', label: 'BS English 3rd Semester' },
    { key: 'uop-eng-5th', label: 'BS English 5th Semester' },
    { key: 'uop-eng-7th', label: 'BS English 7th Semester' },
  ],
  'uop-polsci': [
    { key: 'uop-polsci-1st', label: 'BS Pol Sci 1st Semester' },
    { key: 'uop-polsci-3rd', label: 'BS Pol Sci 3rd Semester' },
    { key: 'uop-polsci-5th', label: 'BS Pol Sci 5th Semester' },
    { key: 'uop-polsci-7th', label: 'BS Pol Sci 7th Semester' },
  ],
  'uop-bba': [
    { key: 'uop-bba-1st', label: 'BBA (Hons) 1st Semester' },
    { key: 'uop-bba-4th', label: 'BBA (Hons) 4th Semester' },
    { key: 'uop-bba-6th', label: 'BBA (Hons) 6th Semester' },
    { key: 'uop-bba-8th', label: 'BBA (Hons) 8th Semester' },
  ],
}

const DOWNLOAD_SLOTS = [
  { key: 'dl-reference-letter',    label: 'Reference Letter',              desc: 'Official reference letter format' },
  { key: 'dl-english-proficiency', label: 'English Proficiency Certificate', desc: 'Certificate of English proficiency' },
  { key: 'dl-character-cert',      label: 'Character Certificate',         desc: 'Official character certificate' },
  { key: 'dl-hope-cert',           label: 'Hope Certificate',              desc: 'Certificate for continuing students' },
  { key: 'dl-clearance-cert',      label: 'Student Clearance Certificate', desc: 'Clearance for graduating students' },
  { key: 'dl-degree-form-uop',     label: 'Degree Form UOP',               desc: 'University of Peshawar degree form' },
]

// Static faculty seed data (from existing faculty.html)
const FACULTY_SEED = [
  { name: 'Dr. Muhammad Shoaib',      level: 'BS Programs',    discipline: 'Islamic Studies',    designation: 'Associate Professor', category: 'professor', qualification: 'Ph.D.',               sort_order: 1 },
  { name: 'Mr. Aamir Ullah',          level: 'Physics',        discipline: 'Physics',            designation: 'Associate Professor', category: 'professor', qualification: 'MS / M.Phil',         sort_order: 2 },
  { name: 'Mr. Zafar Ali',            level: 'BS & Inter',     discipline: 'Political Science',  designation: 'Associate Professor', category: 'professor', qualification: 'M.Phil. PS/ Pol Sc', sort_order: 3 },
  { name: 'Mr. Ijaz Ul Haq',          level: 'Physics',        discipline: 'Physics',            designation: 'Associate Professor', category: 'professor', qualification: 'M.Sc Physics, M.Ed', sort_order: 4 },
  { name: 'Mr. Tariq Saeed',          level: 'Chemistry',      discipline: 'Chemistry',          designation: 'Associate Professor', category: 'professor', qualification: 'M.Sc Chemistry',      sort_order: 5 },
  { name: 'Mr. Aslam Khan',           level: 'Urdu',           discipline: 'Urdu',               designation: 'Assistant Professor', category: 'assistant', qualification: 'MA Urdu, B.Ed.',     sort_order: 10 },
  { name: 'Mr. Zahid Ullah',          level: 'BS Programs',    discipline: 'English',            designation: 'Assistant Professor', category: 'assistant', qualification: 'MS English',          sort_order: 11 },
  { name: 'Mr. Qazi Saheef Ur Rehman',level: 'BS Programs',   discipline: 'English',            designation: 'Assistant Professor', category: 'assistant', qualification: 'MA English',          sort_order: 12 },
  { name: 'Mr. M. Ihsan',             level: 'All BS Programs',discipline: 'Statistics',         designation: 'Assistant Professor', category: 'assistant', qualification: 'M.Sc. Statistics',   sort_order: 13 },
  { name: 'Mr. Ikram Ullah',          level: 'BS',             discipline: 'BS Computer Science',designation: 'Assistant Professor', category: 'assistant', qualification: 'M.Sc. / M.Phil',     sort_order: 14 },
  { name: 'Mr. Naik Rehman',          level: 'BS & Inter',     discipline: 'Economics',          designation: 'Assistant Professor', category: 'assistant', qualification: 'M.Sc Economics, B.Ed.',sort_order: 15 },
  { name: 'Mr. Muhammad Asif',        level: 'BS Programs',    discipline: 'Political Science',  designation: 'TVF',                 category: 'assistant', qualification: 'Ph.D.',               sort_order: 16 },
  { name: 'Mr. Muhammad Shoaib',      level: 'BS Political Science', discipline: 'BS Political Science', designation: 'Lecturer',   category: 'lecturer',  qualification: 'M.Phil',              sort_order: 20 },
  { name: 'Mr. Muhammad Awais Khan',  level: 'BBA',            discipline: 'MBA',                designation: 'Lecturer',            category: 'lecturer',  qualification: 'MBA, M.Ed',           sort_order: 21 },
  { name: 'Mr. Tajal Hussain',        level: 'BS / Inter CS',  discipline: 'CS',                 designation: 'Contract Lecturer',   category: 'lecturer',  qualification: 'M.Sc. Comp',          sort_order: 22 },
  { name: 'Mr. Zakir Hussain',        level: 'BS Programs',    discipline: 'BBA',                designation: 'Contract Lecturer',   category: 'lecturer',  qualification: 'MBA, M.Ed',           sort_order: 23 },
  { name: 'Mr. Ayaz Mehmood',         level: 'BS Programs',    discipline: 'BBA',                designation: 'Contract Lecturer',   category: 'lecturer',  qualification: 'MBA, M.Ed',           sort_order: 24 },
  { name: 'Mr. Faiz Muhammad',        level: 'BS / Inter',     discipline: 'Economics',          designation: 'Lecturer',            category: 'lecturer',  qualification: 'M.Phil (Economics)',  sort_order: 25 },
  { name: 'Mr. Waqar Ali Shah',       level: 'BS / Inter',     discipline: 'IT / Maths',         designation: 'Lecturer',            category: 'lecturer',  qualification: 'BS',                  sort_order: 26 },
  { name: 'Mr. M. Aziz Ullah Shah',   level: 'BS / Inter',     discipline: 'BS Political Science',designation: 'Lecturer',           category: 'lecturer',  qualification: 'MA BS Political Science', sort_order: 27 },
  { name: 'Mr. Muhammad Taif',        level: 'BS / Inter',     discipline: 'CS',                 designation: 'Lecturer',            category: 'lecturer',  qualification: 'MS CS',               sort_order: 28 },
  { name: 'Mr. Miraj Ud Din',         level: 'BS / Inter',     discipline: 'Arabic',             designation: 'Lecturer',            category: 'lecturer',  qualification: 'MS Arabic',           sort_order: 29 },
  { name: 'Mr. Syed Asghar Ali Shah', level: 'BS Computer Science', discipline: 'CS',           designation: 'Honorary Lecturer',   category: 'lecturer',  qualification: 'M.Sc. CS',            sort_order: 30 },
]

// ─── State ────────────────────────────────────────────────────────────────────
let allApps = []
let currentAppId = null
let feeOverrides = {}   // slot_key → storage_path
let dlOverrides  = {}   // slot_key → storage_path

// ─── Auth ─────────────────────────────────────────────────────────────────────
async function doLogin() {
  const email    = document.getElementById('admin-email').value.trim()
  const password = document.getElementById('admin-password').value
  const btn      = document.getElementById('login-btn')
  const errEl    = document.getElementById('login-error')

  errEl.style.display = 'none'
  btn.innerHTML = '<span class="spinner"></span> Signing in…'
  btn.disabled  = true

  const { error } = await sb.auth.signInWithPassword({ email, password })

  if (error) {
    errEl.textContent    = 'Invalid email or password. Please try again.'
    errEl.style.display  = 'block'
    btn.innerHTML = 'Sign In'
    btn.disabled  = false
    return
  }

  showDashboard(email)
}

async function doLogout() {
  await sb.auth.signOut()
  document.getElementById('dashboard').style.display    = 'none'
  document.getElementById('login-screen').style.display = 'flex'
  document.getElementById('admin-password').value = ''
}

function showDashboard(email) {
  document.getElementById('login-screen').style.display    = 'none'
  document.getElementById('dashboard').style.display       = 'block'
  document.getElementById('admin-email-display').textContent = email
  initDashboard()
}

// Check existing session on load
window.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await sb.auth.getSession()
  if (session) {
    showDashboard(session.user.email)
  }

  // Allow login on Enter key
  document.getElementById('admin-password').addEventListener('keydown', e => {
    if (e.key === 'Enter') doLogin()
  })

  // Tab switching
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.dash-tab-btn').forEach(b => b.classList.remove('active'))
      document.querySelectorAll('.dash-panel').forEach(p => p.classList.remove('active'))
      this.classList.add('active')
      document.getElementById('panel-' + this.dataset.panel).classList.add('active')
    })
  })
})

// ─── Dashboard init ───────────────────────────────────────────────────────────
function initDashboard() {
  loadFeeOverrides()
  loadFaculty()
  loadApplications()
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const t = document.createElement('div')
  t.className = `toast ${type}`
  t.textContent = msg
  document.getElementById('toast-container').appendChild(t)
  setTimeout(() => t.remove(), 4000)
}

// ─── Supabase Storage URL helper ──────────────────────────────────────────────
function storageUrl(bucket, path) {
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`
}

// ══════════════════════════════════════════════════════════════════════════════
// FEE VOUCHERS
// ══════════════════════════════════════════════════════════════════════════════
async function loadFeeOverrides() {
  const { data } = await sb.from('fee_vouchers').select('slot_key, storage_path')
  feeOverrides = {}
  if (data) data.forEach(r => { feeOverrides[r.slot_key] = r.storage_path })
  renderFeeSlots()
}

function renderFeeSlots() {
  const containerMap = {
    'inter-civ':   'slots-inter-civ',
    'inter-fgei':  'slots-inter-fgei',
    'nup':         'slots-nup',
    'uop-cs':      'slots-uop-cs',
    'uop-eng':     'slots-uop-eng',
    'uop-polsci':  'slots-uop-polsci',
    'uop-bba':     'slots-uop-bba',
  }

  Object.entries(FEE_SLOTS).forEach(([group, slots]) => {
    const el = document.getElementById(containerMap[group])
    if (!el) return
    el.innerHTML = slots.map(s => slotCardHTML(s, 'fee-vouchers')).join('')
  })
}

function slotCardHTML({ key, label }, bucket) {
  const hasOverride = !!feeOverrides[key]
  const statusHtml  = hasOverride
    ? `<span class="status-supabase"><i class="fas fa-check-circle"></i> Uploaded to Supabase</span>`
    : `<span class="status-local"><i class="fas fa-hdd"></i> Using local file</span>`

  const viewUrl = hasOverride ? storageUrl(bucket, feeOverrides[key]) : ''
  const viewBtn = hasOverride
    ? `<a class="btn btn-outline btn-sm" href="${viewUrl}" target="_blank"><i class="fas fa-eye"></i> View</a>`
    : ''

  return `
    <div class="slot-card" id="slot-${key}">
      <div class="slot-card-name">${label}</div>
      <div class="slot-card-status">${statusHtml}</div>
      <div class="slot-card-actions">
        <label class="btn btn-primary btn-sm" for="file-${key}">
          <i class="fas fa-upload"></i> ${hasOverride ? 'Replace' : 'Upload'}
        </label>
        <input class="file-input" type="file" id="file-${key}" accept=".pdf"
          onchange="uploadFeeVoucher('${key}', this)">
        ${viewBtn}
      </div>
    </div>`
}

async function uploadFeeVoucher(key, input) {
  const file = input.files[0]
  if (!file) return

  const slotEl = document.getElementById(`slot-${key}`)
  slotEl.querySelector('.slot-card-actions').innerHTML =
    '<span><span class="spinner" style="border-color:rgba(26,58,92,.3);border-top-color:#1a3a5c;"></span> Uploading…</span>'

  const path = `${key}.pdf`
  const { error: upErr } = await sb.storage.from('fee-vouchers').upload(path, file, { upsert: true })

  if (upErr) { toast(`Upload failed: ${upErr.message}`, 'error'); await loadFeeOverrides(); return }

  const { error: dbErr } = await sb.from('fee_vouchers').upsert({ slot_key: key, storage_path: path, updated_at: new Date().toISOString() }, { onConflict: 'slot_key' })

  if (dbErr) { toast(`DB update failed: ${dbErr.message}`, 'error'); await loadFeeOverrides(); return }

  feeOverrides[key] = path
  toast(`"${key}" uploaded successfully!`)
  await loadFeeOverrides()
}

// ══════════════════════════════════════════════════════════════════════════════
// DOWNLOADS
// ══════════════════════════════════════════════════════════════════════════════
async function loadDownloadSlots() {
  const { data } = await sb.from('downloads').select('slot_key, storage_path')
  dlOverrides = {}
  if (data) data.forEach(r => { dlOverrides[r.slot_key] = r.storage_path })
  renderDownloadSlots()
}

function renderDownloadSlots() {
  const el = document.getElementById('slots-downloads')
  el.innerHTML = DOWNLOAD_SLOTS.map(s => {
    const hasOverride = !!dlOverrides[s.key]
    const statusHtml  = hasOverride
      ? `<span class="status-supabase"><i class="fas fa-check-circle"></i> Uploaded to Supabase</span>`
      : `<span class="status-local"><i class="fas fa-hdd"></i> Using local file</span>`
    const viewUrl = hasOverride ? storageUrl('downloads', dlOverrides[s.key]) : ''
    const viewBtn = hasOverride
      ? `<a class="btn btn-outline btn-sm" href="${viewUrl}" target="_blank"><i class="fas fa-eye"></i> View</a>`
      : ''
    return `
      <div class="slot-card" id="slot-${s.key}">
        <div class="slot-card-name">${s.label}</div>
        <div style="font-size:.75rem;color:var(--muted);margin-top:-4px;">${s.desc}</div>
        <div class="slot-card-status">${statusHtml}</div>
        <div class="slot-card-actions">
          <label class="btn btn-primary btn-sm" for="file-${s.key}">
            <i class="fas fa-upload"></i> ${hasOverride ? 'Replace' : 'Upload'}
          </label>
          <input class="file-input" type="file" id="file-${s.key}" accept=".pdf"
            onchange="uploadDownload('${s.key}', '${s.label}', '${s.desc}', this)">
          ${viewBtn}
        </div>
      </div>`
  }).join('')
}

async function uploadDownload(key, label, desc, input) {
  const file = input.files[0]
  if (!file) return

  const slotEl = document.getElementById(`slot-${key}`)
  slotEl.querySelector('.slot-card-actions').innerHTML =
    '<span><span class="spinner" style="border-color:rgba(26,58,92,.3);border-top-color:#1a3a5c;"></span> Uploading…</span>'

  const path = `${key}.pdf`
  const { error: upErr } = await sb.storage.from('downloads').upload(path, file, { upsert: true })
  if (upErr) { toast(`Upload failed: ${upErr.message}`, 'error'); await loadDownloadSlots(); return }

  const { error: dbErr } = await sb.from('downloads').upsert(
    { slot_key: key, label, description: desc, storage_path: path, updated_at: new Date().toISOString() },
    { onConflict: 'slot_key' }
  )
  if (dbErr) { toast(`DB update failed: ${dbErr.message}`, 'error'); await loadDownloadSlots(); return }

  dlOverrides[key] = path
  toast(`"${label}" uploaded successfully!`)
  await loadDownloadSlots()
}

// Load downloads when tab is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.dash-tab-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      if (this.dataset.panel === 'downloads' && Object.keys(dlOverrides).length === 0) {
        loadDownloadSlots()
      }
    })
  })
})

// ══════════════════════════════════════════════════════════════════════════════
// FACULTY
// ══════════════════════════════════════════════════════════════════════════════
async function loadFaculty() {
  const tbody = document.getElementById('faculty-tbody')
  const { data, error } = await sb.from('faculty').select('*').order('sort_order').order('name')

  if (error) { tbody.innerHTML = `<tr><td colspan="7" style="color:red;padding:20px;">Error: ${error.message}</td></tr>`; return }

  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7">
      <div class="empty-state">
        <i class="fas fa-users-slash"></i>
        <h3>No faculty records yet</h3>
        <p>Click "Seed from Current Data" to import existing faculty, or add members manually.</p>
      </div>
    </td></tr>`
    return
  }

  tbody.innerHTML = data.map((f, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${f.name}</strong></td>
      <td>${f.designation || '—'}</td>
      <td><span class="badge badge-${f.category}">${categoryLabel(f.category)}</span></td>
      <td>${f.discipline || '—'}</td>
      <td>${f.qualification || '—'}</td>
      <td>
        <div style="display:flex;gap:6px;">
          <button class="btn btn-outline btn-sm" onclick='openFacultyModal(${JSON.stringify(f)})'>
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteFaculty('${f.id}', '${f.name.replace(/'/g,"\\'")}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>`).join('')
}

function categoryLabel(cat) {
  return cat === 'professor' ? 'Assoc. Professor' : cat === 'assistant' ? 'Asst. Professor' : 'Lecturer'
}

function openFacultyModal(faculty = null) {
  document.getElementById('faculty-modal-title').textContent = faculty ? 'Edit Faculty Member' : 'Add Faculty Member'
  document.getElementById('faculty-id').value          = faculty?.id || ''
  document.getElementById('f-name').value              = faculty?.name || ''
  document.getElementById('f-category').value          = faculty?.category || 'lecturer'
  document.getElementById('f-designation').value       = faculty?.designation || ''
  document.getElementById('f-discipline').value        = faculty?.discipline || ''
  document.getElementById('f-level').value             = faculty?.level || ''
  document.getElementById('f-qualification').value     = faculty?.qualification || ''
  document.getElementById('f-sort').value              = faculty?.sort_order ?? 0
  document.getElementById('faculty-modal').classList.add('open')
}

function closeFacultyModal() {
  document.getElementById('faculty-modal').classList.remove('open')
}

async function saveFaculty() {
  const id   = document.getElementById('faculty-id').value
  const name = document.getElementById('f-name').value.trim()
  if (!name) { toast('Name is required.', 'error'); return }

  const payload = {
    name,
    category:      document.getElementById('f-category').value,
    designation:   document.getElementById('f-designation').value.trim(),
    discipline:    document.getElementById('f-discipline').value.trim(),
    level:         document.getElementById('f-level').value.trim(),
    qualification: document.getElementById('f-qualification').value.trim(),
    sort_order:    parseInt(document.getElementById('f-sort').value) || 0,
  }

  const btn = document.getElementById('faculty-save-btn')
  btn.innerHTML = '<span class="spinner"></span> Saving…'
  btn.disabled  = true

  let error
  if (id) {
    ;({ error } = await sb.from('faculty').update(payload).eq('id', id))
  } else {
    ;({ error } = await sb.from('faculty').insert(payload))
  }

  btn.innerHTML = '<i class="fas fa-save"></i> Save'
  btn.disabled  = false

  if (error) { toast(`Save failed: ${error.message}`, 'error'); return }
  toast(id ? 'Faculty member updated!' : 'Faculty member added!')
  closeFacultyModal()
  loadFaculty()
}

async function deleteFaculty(id, name) {
  if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
  const { error } = await sb.from('faculty').delete().eq('id', id)
  if (error) { toast(`Delete failed: ${error.message}`, 'error'); return }
  toast(`"${name}" removed.`)
  loadFaculty()
}

async function seedFaculty() {
  if (!confirm(`This will insert ${FACULTY_SEED.length} faculty members into the database. Existing records will NOT be replaced. Continue?`)) return
  const { error } = await sb.from('faculty').insert(FACULTY_SEED)
  if (error) { toast(`Seed failed: ${error.message}`, 'error'); return }
  toast(`${FACULTY_SEED.length} faculty members seeded successfully!`)
  loadFaculty()
}

// ══════════════════════════════════════════════════════════════════════════════
// APPLICATIONS
// ══════════════════════════════════════════════════════════════════════════════
async function loadApplications() {
  const tbody = document.getElementById('apps-tbody')
  const { data, error } = await sb.from('admissions').select('*').order('submitted_at', { ascending: false })

  if (error) { tbody.innerHTML = `<tr><td colspan="9" style="color:red;padding:20px;">Error: ${error.message}</td></tr>`; return }

  allApps = data || []
  renderApps(allApps)
}

function renderApps(apps) {
  const tbody  = document.getElementById('apps-tbody')
  const countEl = document.getElementById('app-count')
  countEl.textContent = `${apps.length} application${apps.length !== 1 ? 's' : ''}`

  if (apps.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9">
      <div class="empty-state">
        <i class="fas fa-inbox"></i>
        <h3>No applications yet</h3>
        <p>Submitted forms will appear here.</p>
      </div>
    </td></tr>`
    return
  }

  tbody.innerHTML = apps.map((a, i) => `
    <tr style="cursor:pointer" onclick="openAppModal('${a.id}')">
      <td>${i + 1}</td>
      <td><strong>${a.full_name || '—'}</strong></td>
      <td>${a.father_name || '—'}</td>
      <td>${a.phone || '—'}</td>
      <td>${a.email || '—'}</td>
      <td>${a.program_level || '—'}</td>
      <td>${a.program_choice || '—'}</td>
      <td>${a.submitted_at ? new Date(a.submitted_at).toLocaleDateString('en-PK') : '—'}</td>
      <td><button class="btn btn-outline btn-sm" onclick="event.stopPropagation();openAppModal('${a.id}')"><i class="fas fa-eye"></i></button></td>
    </tr>`).join('')
}

function filterApps() {
  const q = document.getElementById('app-search').value.toLowerCase()
  renderApps(allApps.filter(a =>
    [a.full_name, a.father_name, a.email, a.phone, a.program_choice].some(v => v && v.toLowerCase().includes(q))
  ))
}

function openAppModal(id) {
  const a = allApps.find(x => x.id === id)
  if (!a) return
  currentAppId = id

  document.getElementById('app-modal-body').innerHTML = `
    <div class="app-detail-section">
      <h4>Personal Information</h4>
      <div class="app-detail-grid">
        ${field('Full Name', a.full_name)} ${field("Father's Name", a.father_name)}
        ${field('Date of Birth', a.dob)} ${field('Gender', a.gender)}
        ${field('CNIC / B-Form', a.cnic)} ${field('Nationality', a.nationality)}
        ${field('Religion', a.religion)} ${field('Domicile', a.domicile)}
        ${field('Any Disability', a.any_disability ? 'Yes' : 'No')}
      </div>
    </div>
    <div class="app-detail-section">
      <h4>Contact</h4>
      <div class="app-detail-grid">
        ${field('Phone', a.phone)} ${field('Email', a.email)}
        ${field("Guardian's Phone", a.guardian_phone)} ${field('Emergency Contact', a.emergency_contact)}
        ${field('Address', a.address, true)}
      </div>
    </div>
    <div class="app-detail-section">
      <h4>Matric Details</h4>
      <div class="app-detail-grid">
        ${field('Board', a.matric_board)} ${field('Year', a.matric_year)}
        ${field('Roll No', a.matric_roll_no)} ${field('Institute', a.matric_institute)}
        ${field('Total Marks', a.matric_total)} ${field('Obtained', a.matric_obtained)}
        ${field('Percentage', a.matric_percentage)}
      </div>
    </div>
    <div class="app-detail-section">
      <h4>Intermediate Details</h4>
      <div class="app-detail-grid">
        ${field('Board', a.inter_board)} ${field('Year', a.inter_year)}
        ${field('Roll No', a.inter_roll_no)} ${field('Institute', a.inter_institute)}
        ${field('Total Marks', a.inter_total)} ${field('Obtained', a.inter_obtained)}
        ${field('Percentage', a.inter_percentage)}
      </div>
    </div>
    <div class="app-detail-section">
      <h4>Program Selection</h4>
      <div class="app-detail-grid">
        ${field('Level', a.program_level)} ${field('Program', a.program_choice)}
        ${field('Blood Group', a.blood_group)} ${field('Hafiz-e-Quran', a.hafiz_quran)}
        ${field('Disability', a.disability)} ${field('Medical Condition', a.medical_condition)}
        ${field('Why this program?', a.program_reason, true)}
      </div>
    </div>
    <div class="app-detail-section">
      <h4>Submission Info</h4>
      <div class="app-detail-grid">
        ${field('Reference No', a.reference_number)}
        ${field('Submitted At', a.submitted_at ? new Date(a.submitted_at).toLocaleString('en-PK') : '—')}
      </div>
    </div>`

  document.getElementById('app-modal').classList.add('open')
}

function field(label, val, full = false) {
  return `<div class="app-detail-item${full ? '" style="grid-column:1/-1' : ''}">
    <label>${label}</label><p>${val || '—'}</p>
  </div>`
}

function closeAppModal() {
  document.getElementById('app-modal').classList.remove('open')
  currentAppId = null
}

async function deleteApp() {
  if (!currentAppId) return
  const app = allApps.find(a => a.id === currentAppId)
  if (!confirm(`Delete application from "${app?.full_name}"? This cannot be undone.`)) return

  const { error } = await sb.from('admissions').delete().eq('id', currentAppId)
  if (error) { toast(`Delete failed: ${error.message}`, 'error'); return }

  toast('Application deleted.')
  closeAppModal()
  loadApplications()
}

function exportCSV() {
  if (!allApps.length) { toast('No applications to export.', 'info'); return }

  const cols = ['reference_number','full_name','father_name','dob','gender','cnic','phone','email',
    'guardian_phone','address','domicile','religion','nationality','any_disability',
    'matric_board','matric_year','matric_roll_no','matric_institute','matric_total','matric_obtained','matric_percentage',
    'inter_board','inter_year','inter_roll_no','inter_institute','inter_total','inter_obtained','inter_percentage',
    'program_level','program_choice','program_reason','blood_group','hafiz_quran','disability','medical_condition','submitted_at']

  const header = cols.join(',')
  const rows   = allApps.map(a => cols.map(c => `"${String(a[c] ?? '').replace(/"/g,'""')}"`).join(','))
  const csv    = [header, ...rows].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href     = url
  a.download = `applications-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
  toast('CSV downloaded!')
}

// Close modals on overlay click
document.addEventListener('click', e => {
  if (e.target.id === 'faculty-modal') closeFacultyModal()
  if (e.target.id === 'app-modal')     closeAppModal()
})
