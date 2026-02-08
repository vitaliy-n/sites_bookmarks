/* ============================================
   STATE
   ============================================ */
let customBM = JSON.parse(localStorage.getItem('bh_custom') || '[]');
let editsBM = JSON.parse(localStorage.getItem('bh_edits') || '{}');
let hiddenBM = JSON.parse(localStorage.getItem('bh_hidden') || '[]');
let favs = JSON.parse(localStorage.getItem('bh_fav') || '[]');
let collSt = JSON.parse(localStorage.getItem('bh_coll') || '[]');
let openTreeNodes = JSON.parse(localStorage.getItem('bh_tree') || '[]');
let activeTag = null;
let showFav = false;
let sq = '';
let editingId = null;

/* merged bookmark list */
function getAllBM() {
    const merged = BM.map(b => {
        if (hiddenBM.includes(b.id)) return null;
        if (editsBM[b.id]) return { ...b, ...editsBM[b.id] };
        return b;
    }).filter(Boolean);
    return merged.concat(customBM);
}

/* ============================================
   UTILITIES
   ============================================ */
function deb(fn, d) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), d); }; }

function fuzzy(txt, q) {
    txt = txt.toLowerCase(); q = q.toLowerCase();
    if (txt.includes(q)) return true;
    let qi = 0;
    for (let i = 0; i < txt.length && qi < q.length; i++) if (txt[i] === q[qi]) qi++;
    return qi === q.length;
}

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
   FILTERING
   ============================================ */
function getFiltered() {
    let items = getAllBM();
    if (sq) items = items.filter(b =>
        fuzzy(b.n, sq) || fuzzy(b.d, sq) || b.t.some(t => fuzzy(t, sq))
    );
    if (activeTag) items = items.filter(b => b.t.includes(activeTag));
    if (showFav) items = items.filter(b => favs.includes(b.id));
    return items;
}

/* ============================================
   RENDER
   ============================================ */
function render() {
    const mc = document.getElementById('mc');
    mc.innerHTML = '';
    const filtered = getFiltered();
    let total = 0;

    // Group by top-level category
    CAT_TREE.forEach(topCat => {
        const descIds = getCatDescendantIds(topCat.id);
        const items = filtered.filter(b => descIds.includes(b.c));
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
            <div class="bm-list${isColl ? ' coll' : ''}" id="grid-${topCat.id}">
                ${renderSubCatGroups(topCat, items)}
            </div>`;
        mc.appendChild(sec);
    });

    // Bookmarks directly in 'free' top-level (no children in tree)
    // Already handled by CAT_TREE iteration

    document.getElementById('scnt').textContent =
        (sq || activeTag || showFav) ? `${total}/${getAllBM().length}` : '';
    document.getElementById('nores').style.display = total === 0 ? 'block' : 'none';
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
        html += `<div class="subcat-group">
            <div class="subcat-hdr">${child.emoji} ${child.name} <span class="subcat-cnt">${childItems.length}</span></div>
            ${renderSubCatGroups(child, childItems)}
        </div>`;
    });
    return html;
}

/* ============================================
   ROW HTML
   ============================================ */
function rowHTML(b) {
    const isFav = favs.includes(b.id);
    const domain = extractDomain(b.u);
    const isCustom = customBM.some(c => c.id === b.id);
    const tags = b.t.slice(0, 3).map(t =>
        `<span class="bm-tag" onclick="event.stopPropagation();filterTag('${t}')">#${t}</span>`
    ).join('');

    return `<div class="bm-row${b.inc ? ' bm-inc' : ''}" id="bm-${b.id}">
        <span class="bm-emoji">${b.e}</span>
        <div class="bm-info">
            <a class="bm-name" href="${b.u}" target="_blank" rel="noopener">${b.n}</a>
            <div class="bm-url">${domain}</div>
        </div>
        <div class="bm-desc">${b.d}</div>
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
}, 180);
sinp.addEventListener('input', doSearch);
scl.addEventListener('click', () => { sinp.value = ''; sq = ''; scl.classList.remove('show'); render(); });

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
});

/* ============================================
   REFRESH ALL
   ============================================ */
function refreshAll() {
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

// Modal events
document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalCancel').addEventListener('click', closeModal);
document.getElementById('modalDel').addEventListener('click', deleteBookmark);
document.getElementById('bmForm').addEventListener('submit', e => { e.preventDefault(); saveBookmark(); });
modalOv.addEventListener('click', e => { if (e.target === modalOv) closeModal(); });

// Easter egg
document.getElementById('eecl').addEventListener('click', () => document.getElementById('eem').classList.remove('show'));
document.getElementById('eem').addEventListener('click', e => { if (e.target.id === 'eem') e.target.classList.remove('show'); });

/* Keyboard */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (modalOv.classList.contains('show')) closeModal();
        else if (document.getElementById('eem').classList.contains('show'))
            document.getElementById('eem').classList.remove('show');
        else closeSB();
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); sinp.focus(); }
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault(); openAdd();
    }
});

/* ============================================
   INIT
   ============================================ */
initTheme();
refreshAll();
