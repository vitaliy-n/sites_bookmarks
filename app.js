/* ============================================
   STATE
   ============================================ */
let customBM = JSON.parse(localStorage.getItem('bh_custom') || '[]');
let editsBM = JSON.parse(localStorage.getItem('bh_edits') || '{}');
let hiddenBM = JSON.parse(localStorage.getItem('bh_hidden') || '[]');
let favs = JSON.parse(localStorage.getItem('bh_fav') || '[]');
let collSt = JSON.parse(localStorage.getItem('bh_coll') || '[]');
let subCollSt = JSON.parse(localStorage.getItem('bh_subcoll') || '[]');
let openTreeNodes = JSON.parse(localStorage.getItem('bh_tree') || '[]');
let activeTag = null;
let showFav = false;
let sq = '';
let editingId = null;
let sortMode = localStorage.getItem('bh_sort') || 'default';
let viewMode = localStorage.getItem('bh_view') || 'normal';
let activeCatFilter = null;
let _bmCache = null;
let _bmCacheDirty = true;

/* merged bookmark list (cached) */
function getAllBM() {
    if (!_bmCacheDirty && _bmCache) return _bmCache;
    const hidSet = new Set(hiddenBM);
    const merged = BM.map(b => {
        if (hidSet.has(b.id)) return null;
        if (editsBM[b.id]) return { ...b, ...editsBM[b.id] };
        return b;
    }).filter(Boolean);
    _bmCache = merged.concat(customBM);
    _bmCacheDirty = false;
    return _bmCache;
}
function invalidateCache() { _bmCacheDirty = true; }

/* ============================================
   UTILITIES
   ============================================ */
function deb(fn, d) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; }

function toast(m) {
    const t = document.getElementById('toast');
    t.textContent = m; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
}

function save(k, v) { localStorage.setItem(k, JSON.stringify(v)); }
function extractDomain(url) {
    try { return new URL(url).hostname.replace('www.', ''); } catch { return ''; }
}
function nextId() {
    const all = getAllBM();
    return all.length ? Math.max(...all.map(b => b.id)) + 1 : 1;
}
function esc(s) { return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ============================================
   SEARCH INDEX — ranked, highlighted
   ============================================ */
function scoreMatch(bm, q) {
    if (!q) return 1;
    const ql = q.toLowerCase();
    const nl = bm.n.toLowerCase();
    const dl = bm.d.toLowerCase();
    const ul = bm.u.toLowerCase();
    let score = 0;
    // Exact name match = highest
    if (nl === ql) return 100;
    // Name starts with query
    if (nl.startsWith(ql)) score += 50;
    // Name contains query
    else if (nl.includes(ql)) score += 30;
    // URL contains query
    if (ul.includes(ql)) score += 15;
    // Description contains query
    if (dl.includes(ql)) score += 10;
    // Tag exact match
    if (bm.t.some(t => t.toLowerCase() === ql)) score += 25;
    // Tag contains
    else if (bm.t.some(t => t.toLowerCase().includes(ql))) score += 12;
    // Fuzzy name match (last resort)
    if (score === 0) {
        let qi = 0;
        for (let i = 0; i < nl.length && qi < ql.length; i++) if (nl[i] === ql[qi]) qi++;
        if (qi === ql.length) score += 5;
    }
    // Bonus for free/incredible
    if (score > 0) {
        if (bm.inc) score += 3;
        if (bm.f) score += 1;
    }
    return score;
}

function highlightText(text, q) {
    if (!q) return esc(text);
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return esc(text);
    return esc(text.slice(0, idx)) + '<mark>' + esc(text.slice(idx, idx + q.length)) + '</mark>' + esc(text.slice(idx + q.length));
}

/* ============================================
   THEME
   ============================================ */
function initTheme() {
    if (localStorage.getItem('bh_th') === 'dark')
        document.documentElement.setAttribute('data-theme', 'dark');
    updThBtn();
}
function togTheme() {
    const d = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', d ? 'light' : 'dark');
    localStorage.setItem('bh_th', d ? 'light' : 'dark');
    updThBtn();
}
function updThBtn() {
    document.getElementById('thBtn').textContent =
        document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
}

/* ============================================
   TREE (sidebar) — hierarchical
   ============================================ */
function buildTree() {
    const all = getAllBM();
    document.getElementById('tree').innerHTML = renderTreeLevel(CAT_TREE, all, 0);
}

function renderTreeLevel(nodes, allBM, depth) {
    if (!nodes || !nodes.length) return '';
    return nodes.map(node => {
        const descIds = getCatDescendantIds(node.id);
        const cnt = allBM.filter(b => descIds.includes(b.c)).length;
        const isOpen = openTreeNodes.includes(node.id);
        const hasKids = node.children && node.children.length;
        const directBM = allBM.filter(b => b.c === node.id);
        return `<div class="tree-node depth-${depth}">
            <div class="tree-hdr" onclick="togTreeNode('${node.id}')" style="padding-left:${8 + depth * 16}px">
                <span class="tree-arrow${isOpen ? ' open' : ''}${!hasKids && !directBM.length ? ' hide' : ''}">▶</span>
                <span class="tree-emoji">${node.emoji}</span>
                <span class="tree-name">${node.name}</span>
                ${cnt ? `<span class="tree-cnt">${cnt}</span>` : ''}
            </div>
            <div class="tree-kids${isOpen ? ' open' : ''}" id="tkids-${node.id}">
                ${directBM.map(b => `<div class="tree-item" onclick="scrollToBm(${b.id})" style="padding-left:${24 + depth * 16}px">
                    <span>${b.e}</span><span>${b.n}</span>
                </div>`).join('')}
                ${hasKids ? renderTreeLevel(node.children, allBM, depth + 1) : ''}
            </div>
        </div>`;
    }).join('');
}

function togTreeNode(id) {
    const kids = document.getElementById('tkids-' + id);
    if (!kids) return;
    const arrow = kids.closest('.tree-node').querySelector('.tree-arrow');
    if (openTreeNodes.includes(id)) {
        openTreeNodes = openTreeNodes.filter(n => n !== id);
        kids.classList.remove('open'); if (arrow) arrow.classList.remove('open');
    } else {
        openTreeNodes.push(id);
        kids.classList.add('open'); if (arrow) arrow.classList.add('open');
    }
    save('bh_tree', openTreeNodes);
}

function scrollToBm(id) {
    closeSB();
    const el = document.getElementById('bm-' + id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.style.background = 'var(--ac-bg)';
        setTimeout(() => el.style.background = '', 1200);
    }
}

/* ============================================
   TAGS (sidebar)
   ============================================ */
function buildTagList() {
    const all = getAllBM();
    const map = {};
    all.forEach(b => b.t.forEach(t => { map[t] = (map[t] || 0) + 1; }));
    window._allTags = Object.entries(map).sort((a, b) => b[1] - a[1]);
    renderTagList('');
}

function renderTagList(q) {
    const tags = q ? window._allTags.filter(([t]) => fuzzy(t, q)) : window._allTags;
    document.getElementById('tagList').innerHTML = tags.map(([tag, cnt]) =>
        `<div class="tag-item${activeTag === tag ? ' active' : ''}" onclick="filterTag('${tag}')">
            <span>#${tag}</span><span class="tag-item-count">${cnt}</span>
        </div>`
    ).join('');
}

function filterTag(tag) {
    activeTag = (activeTag === tag) ? null : tag;
    renderTagList(document.getElementById('tagSearch').value);
    render();
}

/* ============================================
   SIDEBAR
   ============================================ */
function openSB() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('sov').classList.add('show');
    document.getElementById('hamBtn').classList.add('active');
}
function closeSB() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sov').classList.remove('show');
    document.getElementById('hamBtn').classList.remove('active');
}

/* ============================================
   SIDEBAR STATS
   ============================================ */
function buildSidStats() {
    const all = getAllBM();
    const free = all.filter(b => b.f).length;
    const catCount = CATS.length;
    document.getElementById('sidStats').innerHTML =
        `<div>📚 ${all.length} закладок</div>
         <div>📂 ${catCount} категорій</div>
         <div>🆓 ${free} безкоштовних</div>
         <div>⭐ ${favs.length} обраних</div>
         <div>✏️ ${customBM.length} користувацьких</div>`;
    document.getElementById('tbCount').textContent = all.length + ' закладок';
}

/* ============================================
   FILTERING (with scoring & sorting)
   ============================================ */
function getFiltered() {
    let items = getAllBM();
    const favSet = new Set(favs);
    if (showFav) items = items.filter(b => favSet.has(b.id));
    if (activeTag) items = items.filter(b => b.t.includes(activeTag));
    if (activeCatFilter) {
        const descIds = getCatDescendantIds(activeCatFilter);
        const descSet = new Set(descIds);
        items = items.filter(b => descSet.has(b.c));
    }
    if (sq) {
        items = items.map(b => ({ bm: b, score: scoreMatch(b, sq) }))
            .filter(x => x.score > 0)
            .sort((a, b) => b.score - a.score)
            .map(x => x.bm);
    }
    // Sort
    if (sortMode === 'name') items.sort((a, b) => a.n.localeCompare(b.n, 'uk'));
    else if (sortMode === 'name-desc') items.sort((a, b) => b.n.localeCompare(a.n, 'uk'));
    else if (sortMode === 'free') items.sort((a, b) => (b.f + b.inc * 2) - (a.f + a.inc * 2));
    return items;
}

/* ============================================
   RENDER (optimized with DocumentFragment)
   ============================================ */
function render() {
    const mc = document.getElementById('mc');
    const frag = document.createDocumentFragment();
    const filtered = getFiltered();
    let total = 0;
    const isSearch = !!(sq || activeTag || showFav || activeCatFilter);
    const isCompact = viewMode === 'compact';

    // If searching with a query, show flat ranked results
    if (sq && filtered.length > 0) {
        total = filtered.length;
        const sec = document.createElement('section');
        sec.className = 'cat-sec';
        sec.innerHTML = `
            <div class="cat-hdr search-results-hdr" style="border-left:4px solid var(--ac)">
                <span class="cat-emoji">🔍</span>
                <span class="cat-title">Результати пошуку</span>
                <span class="cat-badge" style="background:var(--ac)">${total}</span>
            </div>
            <div class="bm-list${isCompact ? ' compact-view' : ''}">
                ${filtered.slice(0, 200).map(b => rowHTML(b, true)).join('')}
            </div>`;
        frag.appendChild(sec);
    } else {
        // Group by top-level category
        CAT_TREE.forEach(topCat => {
            const descIds = getCatDescendantIds(topCat.id);
            const descSet = new Set(descIds);
            const items = filtered.filter(b => descSet.has(b.c));
            if (!items.length) return;
            total += items.length;
            const isColl = collSt.includes(topCat.id);
            const color = topCat.color || '#868e96';

            const sec = document.createElement('section');
            sec.className = 'cat-sec';
            sec.id = 'cat-' + topCat.id;
            sec.innerHTML = `
                <div class="cat-hdr" onclick="togCat('${topCat.id}')" style="border-left:4px solid ${color}">
                    <span class="cat-emoji">${topCat.emoji}</span>
                    <span class="cat-title">${topCat.name}</span>
                    <span class="cat-sub">${topCat.sub || ''}</span>
                    <span class="cat-badge" style="background:${color}">${items.length}</span>
                    <span class="cat-arrow${isColl ? ' coll' : ''}">▼</span>
                </div>
                <div class="bm-list${isColl ? ' coll' : ''}${isCompact ? ' compact-view' : ''}" id="grid-${topCat.id}">
                    ${renderSubCatGroups(topCat, items)}
                </div>`;
            frag.appendChild(sec);
        });
    }

    mc.innerHTML = '';
    mc.appendChild(frag);

    // Update counters
    document.getElementById('scnt').textContent =
        isSearch ? `${total}/${getAllBM().length}` : '';
    document.getElementById('nores').style.display = total === 0 ? 'block' : 'none';

    // Update category nav pills
    updateCatNav();
}

function renderSubCatGroups(node, items) {
    // If leaf or no children, just render all items
    if (!node.children || !node.children.length) {
        return items.map(b => rowHTML(b)).join('');
    }
    let html = '';
    // Items directly in this node
    const direct = items.filter(b => b.c === node.id);
    if (direct.length) html += direct.map(b => rowHTML(b)).join('');
    // Sub-groups
    node.children.forEach(child => {
        const childIds = getCatDescendantIds(child.id);
        const childItems = items.filter(b => childIds.includes(b.c));
        if (!childItems.length) return;
        const isSub = subCollSt.includes(child.id);
        html += `<div class="subcat-group">
            <div class="subcat-hdr" onclick="togSubCat('${child.id}')">
                <span class="subcat-arrow${isSub ? ' coll' : ''}">▶</span>
                ${child.emoji} ${child.name} <span class="subcat-cnt">${childItems.length}</span>
            </div>
            <div class="subcat-body${isSub ? ' coll' : ''}" id="sub-${child.id}">
                ${renderSubCatGroups(child, childItems)}
            </div>
        </div>`;
    });
    return html;
}

function togSubCat(id) {
    const body = document.getElementById('sub-' + id);
    if (!body) return;
    const arrow = body.closest('.subcat-group').querySelector('.subcat-arrow');
    if (subCollSt.includes(id)) {
        subCollSt = subCollSt.filter(s => s !== id);
        body.classList.remove('coll'); if (arrow) arrow.classList.remove('coll');
    } else {
        subCollSt.push(id);
        body.classList.add('coll'); if (arrow) arrow.classList.add('coll');
    }
    save('bh_subcoll', subCollSt);
}

/* ============================================
   ROW HTML
   ============================================ */
function rowHTML(b, showCat) {
    const isFav = favs.includes(b.id);
    const domain = extractDomain(b.u);
    const tags = b.t.slice(0, 3).map(t =>
        `<span class="bm-tag" onclick="event.stopPropagation();filterTag('${t}')">#${t}</span>`
    ).join('');
    const nameHtml = sq ? highlightText(b.n, sq) : esc(b.n);
    const descHtml = sq ? highlightText(b.d, sq) : esc(b.d);
    const catInfo = showCat ? getCatById(b.c) : null;
    const catBreadcrumb = catInfo ? `<span class="bm-cat-pill" onclick="event.stopPropagation();jumpToCat('${catInfo.id}')">${catInfo.emoji} ${catInfo.name}</span>` : '';

    return `<div class="bm-row${b.inc ? ' bm-inc' : ''}" id="bm-${b.id}">
        <span class="bm-emoji">${b.e}</span>
        <div class="bm-info">
            <a class="bm-name" href="${b.u}" target="_blank" rel="noopener">${nameHtml}</a>
            <div class="bm-meta"><span class="bm-url">${domain}</span>${catBreadcrumb}</div>
        </div>
        <div class="bm-desc">${descHtml}</div>
        <div class="bm-tags">${tags}</div>
        ${b.f ? '<span class="bm-free">FREE</span>' : ''}
        <div class="bm-actions">
            <button class="bm-btn${isFav ? ' fav-on' : ''}" onclick="togFav(${b.id},this)" title="Обране">⭐</button>
            <button class="bm-btn" onclick="openEdit(${b.id})" title="Редагувати">✏️</button>
            <button class="bm-btn" onclick="copyURL('${b.u}',this)" title="Копіювати">📋</button>
        </div>
    </div>`;
}

/* ============================================
   CATEGORY TOGGLE
   ============================================ */
function togCat(id) {
    const g = document.getElementById('grid-' + id);
    const a = g.closest('.cat-sec').querySelector('.cat-arrow');
    if (collSt.includes(id)) {
        collSt = collSt.filter(c => c !== id);
        g.classList.remove('coll'); a.classList.remove('coll');
    } else {
        collSt.push(id);
        g.classList.add('coll'); a.classList.add('coll');
    }
    save('bh_coll', collSt);
}

/* ============================================
   FAVORITES
   ============================================ */
function togFav(id, btn) {
    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id);
        if (btn) btn.classList.remove('fav-on');
        toast('Видалено з обраних');
    } else {
        favs.push(id);
        if (btn) btn.classList.add('fav-on');
        toast('⭐ Додано до обраних');
    }
    save('bh_fav', favs);
    buildSidStats();
}

/* ============================================
   COPY URL
   ============================================ */
function copyURL(url, btn) {
    navigator.clipboard.writeText(url).then(() => {
        const o = btn.textContent; btn.textContent = '✅';
        toast('URL скопійовано!');
        setTimeout(() => { btn.textContent = o; }, 1000);
    });
}

/* ============================================
   MODAL — ADD / EDIT
   ============================================ */
const modalOv = document.getElementById('modalOv');
const modalTitle = document.getElementById('modalTitle');
const modalDel = document.getElementById('modalDel');
const fEmoji = document.getElementById('fEmoji');
const fName = document.getElementById('fName');
const fUrl = document.getElementById('fUrl');
const fDesc = document.getElementById('fDesc');
const fCat = document.getElementById('fCat');
const fTags = document.getElementById('fTags');
const fFree = document.getElementById('fFree');
const fInc = document.getElementById('fInc');

// Populate category dropdown (hierarchical)
CATS.forEach(c => {
    const o = document.createElement('option');
    o.value = c.id;
    o.textContent = '\u00A0'.repeat(c.depth * 2) + c.emoji + ' ' + c.name;
    fCat.appendChild(o);
});

function openAdd() {
    editingId = null;
    modalTitle.textContent = '➕ Додати закладку';
    modalDel.classList.remove('show');
    fEmoji.value = '🔗'; fName.value = ''; fUrl.value = '';
    fDesc.value = ''; fCat.value = CATS[0].id;
    fTags.value = ''; fFree.checked = false; fInc.checked = false;
    modalOv.classList.add('show');
    setTimeout(() => fName.focus(), 100);
}

function openEdit(id) {
    const all = getAllBM();
    const bm = all.find(b => b.id === id);
    if (!bm) return;

    editingId = id;
    modalTitle.textContent = '✏️ Редагувати: ' + bm.n;

    const isCustom = customBM.some(c => c.id === id);
    const isDefault = BM.some(b => b.id === id);
    // Show delete only for custom bookmarks, or show "hide" for defaults
    if (isCustom) {
        modalDel.textContent = '🗑️ Видалити';
        modalDel.classList.add('show');
    } else if (isDefault) {
        modalDel.textContent = '👁️ Сховати';
        modalDel.classList.add('show');
    } else {
        modalDel.classList.remove('show');
    }

    fEmoji.value = bm.e;
    fName.value = bm.n;
    fUrl.value = bm.u;
    fDesc.value = bm.d;
    fCat.value = bm.c;
    fTags.value = bm.t.join(', ');
    fFree.checked = !!bm.f;
    fInc.checked = !!bm.inc;
    modalOv.classList.add('show');
    setTimeout(() => fName.focus(), 100);
}

function closeModal() {
    modalOv.classList.add('closing');
    setTimeout(() => {
        modalOv.classList.remove('show', 'closing');
        editingId = null;
    }, 150);
}

function saveBookmark() {
    const name = fName.value.trim();
    const url = fUrl.value.trim();
    if (!name || !url) { toast('Заповніть назву та URL'); return; }

    const data = {
        n: name,
        u: url,
        d: fDesc.value.trim(),
        c: fCat.value,
        t: fTags.value.split(',').map(t => t.trim()).filter(Boolean),
        e: fEmoji.value.trim() || '🔗',
        f: fFree.checked ? 1 : 0,
        inc: fInc.checked ? 1 : 0
    };

    if (editingId !== null) {
        // EDITING
        const isCustom = customBM.some(c => c.id === editingId);
        if (isCustom) {
            // Update custom bookmark
            const idx = customBM.findIndex(c => c.id === editingId);
            customBM[idx] = { ...customBM[idx], ...data };
            save('bh_custom', customBM);
        } else {
            // Store edit override for default bookmark
            editsBM[editingId] = data;
            save('bh_edits', editsBM);
        }
        toast('✅ Закладку оновлено');
    } else {
        // ADDING NEW
        const newBm = { id: nextId(), ...data };
        customBM.push(newBm);
        save('bh_custom', customBM);
        toast('✅ Закладку додано');
    }

    closeModal();
    refreshAll();
}

function deleteBookmark() {
    if (editingId === null) return;

    const isCustom = customBM.some(c => c.id === editingId);
    if (isCustom) {
        customBM = customBM.filter(c => c.id !== editingId);
        save('bh_custom', customBM);
        // Also remove from favs
        favs = favs.filter(f => f !== editingId);
        save('bh_fav', favs);
        toast('🗑️ Закладку видалено');
    } else {
        // Hide default bookmark
        hiddenBM.push(editingId);
        save('bh_hidden', hiddenBM);
        // Remove edits if any
        delete editsBM[editingId];
        save('bh_edits', editsBM);
        toast('👁️ Закладку сховано');
    }

    closeModal();
    refreshAll();
}

/* ============================================
   IMPORT (PASTE)
   ============================================ */
const importOv = document.getElementById('importOv');
const importArea = document.getElementById('importArea');
const importInfo = document.getElementById('importInfo');

function openImport() {
    importArea.value = '';
    importInfo.innerHTML = '';
    importOv.classList.add('show');
    setTimeout(() => importArea.focus(), 100);
}

function closeImport() {
    importOv.classList.add('closing');
    setTimeout(() => { importOv.classList.remove('show', 'closing'); }, 150);
}

function parseBookmarkPaste(text) {
    // Strip BM.push( ... ); wrapper if present
    text = text.replace(/^\s*BM\.push\s*\(/i, '').replace(/\)\s*;?\s*$/, '');
    // Remove only full-line comments (lines that start with //)
    text = text.split('\n').map(line => {
        const trimmed = line.trimStart();
        return trimmed.startsWith('//') ? '' : line;
    }).join('\n');
    // Remove trailing/leading whitespace & commas
    text = text.trim().replace(/,\s*$/, '');
    if (!text) return [];

    // Wrap in array and evaluate safely
    try {
        const arr = new Function('return [' + text + ']')();
        return arr.filter(item => item && typeof item === 'object' && item.n && item.u);
    } catch (e) {
        throw new Error('Помилка парсингу: ' + e.message);
    }
}

function previewImport() {
    const text = importArea.value.trim();
    if (!text) { importInfo.innerHTML = '<span class="imp-err">⚠️ Вставте дані</span>'; return; }
    try {
        const items = parseBookmarkPaste(text);
        if (!items.length) {
            importInfo.innerHTML = '<span class="imp-err">⚠️ Не знайдено жодної закладки</span>';
            return;
        }
        const knownCats = CATS.map(c => c.id);
        const unknownCats = [...new Set(items.map(b => b.c).filter(c => c && !knownCats.includes(c)))];

        let html = `<span class="imp-ok">✅ Знайдено <b>${items.length}</b> закладок</span>`;
        if (unknownCats.length) {
            html += `<br><span class="imp-warn">⚠️ Невідомі категорії (${unknownCats.length}): <b>${unknownCats.join(', ')}</b></span>`;
        }
        html += '<div class="imp-preview-list">';
        items.slice(0, 15).forEach(b => {
            html += `<div class="imp-preview-row">${b.e || '🔗'} <b>${b.n}</b> <span class="imp-url">${b.u}</span></div>`;
        });
        if (items.length > 15) html += `<div class="imp-more">…і ще ${items.length - 15}</div>`;
        html += '</div>';
        importInfo.innerHTML = html;
    } catch (e) {
        importInfo.innerHTML = `<span class="imp-err">❌ ${e.message}</span>`;
    }
}

function doImport() {
    const text = importArea.value.trim();
    if (!text) { toast('⚠️ Вставте дані'); return; }

    let items;
    try {
        items = parseBookmarkPaste(text);
    } catch (e) {
        toast('❌ ' + e.message); return;
    }
    if (!items.length) { toast('⚠️ Не знайдено закладок'); return; }

    const autoId = document.getElementById('importAutoId').checked;
    const autoCat = document.getElementById('importAutoCat').checked;
    const knownCats = CATS.map(c => c.id);

    // Handle unknown categories
    if (autoCat) {
        const unknownCats = [...new Set(items.map(b => b.c).filter(c => c && !knownCats.includes(c)))];
        if (unknownCats.length) {
            let dynamicCats = JSON.parse(localStorage.getItem('bh_dyn_cats') || '[]');
            unknownCats.forEach(catId => {
                if (!dynamicCats.some(dc => dc.id === catId)) {
                    const catName = catId.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    dynamicCats.push({ id: catId, name: catName, emoji: '📁' });
                }
            });
            localStorage.setItem('bh_dyn_cats', JSON.stringify(dynamicCats));
            applyDynamicCats();
        }
    }

    // Assign IDs
    let baseId = nextId();
    items.forEach(b => {
        if (autoId) b.id = baseId++;
        else if (!b.id) b.id = baseId++;

        // Ensure required fields
        b.n = b.n || 'Без назви';
        b.u = b.u || '';
        b.d = b.d || '';
        b.c = b.c || 'arch-later';
        b.t = Array.isArray(b.t) ? b.t : [];
        b.e = b.e || '🔗';
        b.f = b.f ? 1 : 0;
        b.inc = b.inc ? 1 : 0;
    });

    // Add to customBM
    customBM = customBM.concat(items);
    save('bh_custom', customBM);

    closeImport();
    refreshAll();
    toast(`✅ Імпортовано ${items.length} закладок`);
}

/* Dynamic categories from localStorage */
function applyDynamicCats() {
    const dynamicCats = JSON.parse(localStorage.getItem('bh_dyn_cats') || '[]');
    if (!dynamicCats.length) return;
    dynamicCats.forEach(dc => {
        if (!CATS.some(c => c.id === dc.id)) {
            // Find or create a 'user-imported' top-level node in CAT_TREE
            let userNode = CAT_TREE.find(n => n.id === 'user-imported');
            if (!userNode) {
                userNode = { id: 'user-imported', name: 'Імпортовані', emoji: '📥', color: '#868e96', sub: 'Категорії з імпорту', children: [] };
                CAT_TREE.push(userNode);
            }
            if (!userNode.children) userNode.children = [];
            if (!userNode.children.some(ch => ch.id === dc.id)) {
                userNode.children.push({ id: dc.id, name: dc.name, emoji: dc.emoji || '📁' });
            }
        }
    });
    // Rebuild CATS flat list
    CATS.length = 0;
    CATS.push(...flattenCats(CAT_TREE, null, 0));
    // Rebuild category dropdown
    const fCatEl = document.getElementById('fCat');
    fCatEl.innerHTML = '';
    CATS.forEach(c => {
        const o = document.createElement('option');
        o.value = c.id;
        o.textContent = '\u00A0'.repeat(c.depth * 2) + c.emoji + ' ' + c.name;
        fCatEl.appendChild(o);
    });
}

/* ============================================
   EXPORT
   ============================================ */
function exportBookmarks() {
    const all = getAllBM();
    let html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmark Hub</TITLE>\n<H1>Bookmark Hub</H1>\n<DL><p>\n`;
    CAT_TREE.forEach(cat => {
        const descIds = getCatDescendantIds(cat.id);
        const items = all.filter(b => descIds.includes(b.c));
        if (!items.length) return;
        html += `    <DT><H3>${cat.emoji} ${cat.name}</H3>\n    <DL><p>\n`;
        items.forEach(b => { html += `        <DT><A HREF="${b.u}">${b.n}</A>\n        <DD>${b.d}\n`; });
        html += `    </DL><p>\n`;
    });
    html += `</DL><p>`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
    a.download = 'bookmark_hub_export.html';
    a.click();
    toast('📥 Закладки експортовано');
}

/* ============================================
   SPOTLIGHT (Cmd+K quick-find)
   ============================================ */
const spotOv = document.getElementById('spotOv');
const spotInp = document.getElementById('spotInp');
const spotList = document.getElementById('spotList');
let spotIdx = 0;
let spotResults = [];

function openSpotlight() {
    spotInp.value = '';
    spotList.innerHTML = renderSpotHints();
    spotIdx = 0;
    spotOv.classList.add('show');
    setTimeout(() => spotInp.focus(), 50);
}
function closeSpotlight() {
    spotOv.classList.remove('show');
}
function renderSpotHints() {
    return `<div class="spot-hint">Почніть вводити для пошуку серед ${getAllBM().length} закладок…</div>
    <div class="spot-shortcuts">
        <span><kbd>↑↓</kbd> навігація</span>
        <span><kbd>Enter</kbd> відкрити</span>
        <span><kbd>Esc</kbd> закрити</span>
    </div>`;
}
function spotSearch(q) {
    if (!q) { spotList.innerHTML = renderSpotHints(); spotResults = []; return; }
    const all = getAllBM();
    spotResults = all.map(b => ({ bm: b, score: scoreMatch(b, q) }))
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 12)
        .map(x => x.bm);
    spotIdx = 0;
    if (!spotResults.length) {
        spotList.innerHTML = '<div class="spot-hint">Нічого не знайдено 😕</div>';
        return;
    }
    spotList.innerHTML = spotResults.map((b, i) => {
        const cat = getCatById(b.c);
        const catLabel = cat ? `<span class="spot-cat">${cat.emoji} ${cat.name}</span>` : '';
        return `<div class="spot-item${i === 0 ? ' active' : ''}" data-idx="${i}" onmouseenter="spotHover(${i})" onclick="spotGo(${i})">
            <span class="spot-emoji">${b.e}</span>
            <div class="spot-info">
                <div class="spot-name">${highlightText(b.n, q)}</div>
                <div class="spot-meta">${extractDomain(b.u)} ${catLabel}</div>
            </div>
            ${b.f ? '<span class="bm-free">FREE</span>' : ''}
        </div>`;
    }).join('');
}
function spotHover(i) {
    spotIdx = i;
    spotList.querySelectorAll('.spot-item').forEach((el, j) => el.classList.toggle('active', j === i));
}
function spotGo(i) {
    const b = spotResults[i];
    if (!b) return;
    closeSpotlight();
    window.open(b.u, '_blank');
}
function spotNav(dir) {
    if (!spotResults.length) return;
    spotIdx = (spotIdx + dir + spotResults.length) % spotResults.length;
    spotList.querySelectorAll('.spot-item').forEach((el, j) => el.classList.toggle('active', j === spotIdx));
    const active = spotList.querySelector('.spot-item.active');
    if (active) active.scrollIntoView({ block: 'nearest' });
}
spotInp && spotInp.addEventListener('input', deb(() => spotSearch(spotInp.value.trim()), 80));
spotInp && spotInp.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); spotNav(1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); spotNav(-1); }
    else if (e.key === 'Enter') { e.preventDefault(); spotGo(spotIdx); }
    else if (e.key === 'Escape') { closeSpotlight(); }
});
spotOv && spotOv.addEventListener('click', e => { if (e.target === spotOv) closeSpotlight(); });

/* ============================================
   CATEGORY NAV PILLS (floating)
   ============================================ */
function updateCatNav() {
    const nav = document.getElementById('catNav');
    if (!nav) return;
    const all = getAllBM();
    nav.innerHTML = CAT_TREE.filter(c => {
        const descIds = getCatDescendantIds(c.id);
        return all.some(b => descIds.includes(b.c));
    }).map(c =>
        `<button class="cnav-pill${activeCatFilter === c.id ? ' active' : ''}" onclick="toggleCatFilter('${c.id}')" title="${c.name}">${c.emoji}</button>`
    ).join('') + (activeCatFilter ? `<button class="cnav-pill cnav-clear" onclick="toggleCatFilter(null)" title="Скинути">✕</button>` : '');
}
function toggleCatFilter(id) {
    activeCatFilter = (activeCatFilter === id) ? null : id;
    render();
    if (id) {
        const el = document.getElementById('cat-' + id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
function jumpToCat(catId) {
    // Clear search, jump to category
    sinp.value = ''; sq = ''; scl.classList.remove('show');
    activeCatFilter = null;
    render();
    setTimeout(() => {
        // Find the parent top-level cat
        const path = getCatPath(catId);
        if (path.length) {
            const topId = path[0].id;
            const el = document.getElementById('cat-' + topId);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, 50);
}

/* ============================================
   SORT & VIEW MODE
   ============================================ */
function setSort(mode) {
    sortMode = mode;
    localStorage.setItem('bh_sort', mode);
    document.querySelectorAll('.sort-opt').forEach(el => el.classList.toggle('active', el.dataset.sort === mode));
    render();
}
function setView(mode) {
    viewMode = mode;
    localStorage.setItem('bh_view', mode);
    document.querySelectorAll('.view-opt').forEach(el => el.classList.toggle('active', el.dataset.view === mode));
    render();
}

/* ============================================
   BACK TO TOP
   ============================================ */
function updateBackToTop() {
    const btn = document.getElementById('backTop');
    if (!btn) return;
    btn.classList.toggle('show', mainEl.scrollTop > 300);
}

/* ============================================
   SEARCH
   ============================================ */
const sinp = document.getElementById('sinp');
const scl = document.getElementById('scl');
const doSearch = deb(() => {
    sq = sinp.value.trim();
    scl.classList.toggle('show', sq.length > 0);
    if (sq.toLowerCase() === 'konami') {
        document.getElementById('eem').classList.add('show');
        sinp.value = ''; sq = ''; scl.classList.remove('show');
    }
    render();
}, 150);
sinp.addEventListener('input', doSearch);
scl.addEventListener('click', () => { sinp.value = ''; sq = ''; scl.classList.remove('show'); activeCatFilter = null; render(); });

/* Tag search */
document.getElementById('tagSearch').addEventListener('input', deb(function () {
    renderTagList(this.value.trim());
}, 120));

/* ============================================
   SCROLL / TOOLBAR
   ============================================ */
const mainEl = document.querySelector('.main');
mainEl.addEventListener('scroll', () => {
    document.getElementById('toolbar').classList.toggle('scrolled', mainEl.scrollTop > 4);
    updateBackToTop();
});

/* ============================================
   REFRESH ALL
   ============================================ */
function refreshAll() {
    invalidateCache();
    buildTree();
    buildTagList();
    buildSidStats();
    render();
}

/* ============================================
   EVENT LISTENERS
   ============================================ */
document.getElementById('thBtn').addEventListener('click', togTheme);
document.getElementById('addBtn').addEventListener('click', openAdd);
document.getElementById('hamBtn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.contains('open') ? closeSB() : openSB();
});
document.getElementById('sov').addEventListener('click', closeSB);
document.getElementById('favBtn').addEventListener('click', function () {
    showFav = !showFav;
    this.classList.toggle('active', showFav);
    render();
});
document.getElementById('expBtn').addEventListener('click', exportBookmarks);
document.getElementById('impBtn').addEventListener('click', openImport);
document.getElementById('importClose').addEventListener('click', closeImport);
document.getElementById('importCancel').addEventListener('click', closeImport);
document.getElementById('importPreview').addEventListener('click', previewImport);
document.getElementById('importSave').addEventListener('click', doImport);
importOv.addEventListener('click', e => { if (e.target === importOv) closeImport(); });

// Modal events
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalCancel').addEventListener('click', closeModal);
document.getElementById('modalDel').addEventListener('click', deleteBookmark);
document.getElementById('bmForm').addEventListener('submit', e => { e.preventDefault(); saveBookmark(); });
modalOv.addEventListener('click', e => { if (e.target === modalOv) closeModal(); });

// Back to top
document.getElementById('backTop') && document.getElementById('backTop').addEventListener('click', () => {
    mainEl.scrollTo({ top: 0, behavior: 'smooth' });
});

// Sort & View
document.querySelectorAll('.sort-opt').forEach(el => {
    el.addEventListener('click', () => setSort(el.dataset.sort));
    el.classList.toggle('active', el.dataset.sort === sortMode);
});
document.querySelectorAll('.view-opt').forEach(el => {
    el.addEventListener('click', () => setView(el.dataset.view));
    el.classList.toggle('active', el.dataset.view === viewMode);
});

// Easter egg
document.getElementById('eecl').addEventListener('click', () => document.getElementById('eem').classList.remove('show'));
document.getElementById('eem').addEventListener('click', e => { if (e.target.id === 'eem') e.target.classList.remove('show'); });

/* Keyboard */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (spotOv && spotOv.classList.contains('show')) closeSpotlight();
        else if (importOv.classList.contains('show')) closeImport();
        else if (modalOv.classList.contains('show')) closeModal();
        else if (document.getElementById('eem').classList.contains('show'))
            document.getElementById('eem').classList.remove('show');
        else closeSB();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (spotOv) openSpotlight(); else sinp.focus();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault(); openAdd();
    }
});

/* ============================================
   INIT
   ============================================ */
initTheme();
applyDynamicCats();
refreshAll();
