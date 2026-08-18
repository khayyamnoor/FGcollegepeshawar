// ── Apply Supabase announcement banner override ───────────────────────────────
// Pulls the banner text, button label and link from the `announcement` table
// (edited in the admin panel). The markup already in index.html is the fallback —
// if Supabase is unreachable, or no row exists, that hardcoded banner stays as-is.
async function applyAnnouncement() {
  const banner = document.getElementById('announcement-banner')
  if (!banner) return

  try {
    const { data, error } = await _supabase
      .from('announcement')
      .select('is_visible, label, message, button_text, link_type, button_link, storage_path, updated_at')
      .eq('slot_key', 'main')
      .maybeSingle()

    if (error || !data) return

    // Hidden by the admin — remove the bar entirely.
    if (data.is_visible === false) {
      banner.style.display = 'none'
      return
    }

    const labelEl = document.getElementById('announcement-label')
    const msgEl   = document.getElementById('announcement-message')
    const btnEl   = document.getElementById('announcement-btn')

    if (labelEl) {
      const label = (data.label || '').trim()
      labelEl.textContent   = label
      labelEl.style.display = label ? '' : 'none'
    }

    if (msgEl && data.message) {
      msgEl.textContent = data.message
    }

    if (btnEl) {
      const text = (data.button_text || '').trim()
      const href = announcementHref(data)

      if (!text || !href) {
        // No button configured — drop it, message spans the full bar.
        btnEl.style.display = 'none'
      } else {
        btnEl.textContent = text
        btnEl.href        = href
        btnEl.style.display = ''

        // PDFs and external links open in a new tab; internal pages navigate normally.
        if (data.link_type === 'pdf' || /^https?:\/\//i.test(href)) {
          btnEl.target = '_blank'
          btnEl.rel    = 'noopener'
        } else {
          btnEl.removeAttribute('target')
          btnEl.removeAttribute('rel')
        }
      }
    }
  } catch (_) { /* fail silently — the hardcoded banner remains */ }
}

// Resolves the button's destination: an uploaded PDF in Supabase Storage,
// or whatever URL/page the admin typed in.
function announcementHref(data) {
  if (data.link_type === 'pdf') {
    if (!data.storage_path) return ''
    const ts = data.updated_at ? new Date(data.updated_at).getTime() : Date.now()
    return `${SUPABASE_URL}/storage/v1/object/public/announcements/${data.storage_path}?t=${ts}`
  }
  return (data.button_link || '').trim()
}

document.addEventListener('DOMContentLoaded', applyAnnouncement)
