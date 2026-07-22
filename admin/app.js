'use strict';

const API = 'http://localhost:5000/api';
let token = localStorage.getItem('bp_admin_token');
let currentQuoteId = null;
let allProducts = [];

// ---- API HELPER ----
async function req(method, url, body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`${API}${url}`, opts);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ---- TOAST ----
function showToast(msg, type = 'success') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = `toast ${type}`;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 3000);
}

// ---- AUTH ----
function isLoggedIn() {
  return !!token && !!localStorage.getItem('bp_admin_user');
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('login-btn');
  const errEl = document.getElementById('login-error');
  btn.disabled = true;
  btn.textContent = 'Signing in...';
  errEl.style.display = 'none';
  try {
    const data = await req('POST', '/auth/login', {
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value,
    });
    if (data.user?.role !== 'admin') throw new Error('Admin access only');
    token = data.token;
    localStorage.setItem('bp_admin_token', token);
    localStorage.setItem('bp_admin_user', JSON.stringify(data.user));
    initApp();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Sign In';
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  token = null;
  localStorage.removeItem('bp_admin_token');
  localStorage.removeItem('bp_admin_user');
  document.getElementById('admin-app').style.display = 'none';
  document.getElementById('login-screen').style.display = 'flex';
});

// ---- NAVIGATION ----
document.querySelectorAll('.nav-item[data-page]').forEach(btn => {
  btn.addEventListener('click', () => switchPage(btn.dataset.page));
});

function switchPage(page) {
  document.querySelectorAll('.nav-item[data-page]').forEach(b => {
    b.classList.toggle('active', b.dataset.page === page);
  });
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(`page-${page}`).classList.add('active');
  document.getElementById('page-title').textContent = capitalize(page);
  if (page === 'products') loadProducts();
  if (page === 'categories') loadCategories();
  if (page === 'quotes') loadQuotes();
  if (page === 'users') loadUsers();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ');
}

// ---- SIDEBAR TOGGLE ----
document.getElementById('menu-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// ---- MODAL HELPERS ----
function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// close on backdrop click
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', (e) => { if (e.target === m) closeModal(m.id); });
});

// ---- INIT ----
function initApp() {
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('admin-app').style.display = 'flex';
  lucide.createIcons();
  const user = JSON.parse(localStorage.getItem('bp_admin_user') || '{}');
  document.getElementById('admin-name').textContent = user.name || 'Admin';
  document.querySelector('.avatar').textContent = (user.name || 'A').charAt(0).toUpperCase();
  loadDashboard();
}

// ---- DASHBOARD ----
async function loadDashboard() {
  try {
    const [prods, cats, quotes] = await Promise.allSettled([
      req('GET', '/products?limit=1'),
      req('GET', '/categories'),
      req('GET', '/quotes?limit=5'),
    ]);
    if (prods.status === 'fulfilled') document.getElementById('stat-products').textContent = prods.value.total ?? '--';
    if (cats.status === 'fulfilled') document.getElementById('stat-categories').textContent = cats.value.data?.length ?? '--';
    if (quotes.status === 'fulfilled') {
      document.getElementById('stat-quotes').textContent = quotes.value.total ?? '--';
      renderRecentQuotes(quotes.value.data?.slice(0, 5) || []);
    }
    document.getElementById('stat-users').textContent = '--';
  } catch { }
}

function renderRecentQuotes(quotes) {
  const el = document.getElementById('recent-quotes-table');
  if (!quotes.length) { el.innerHTML = '<p style="padding:16px;color:#888;font-size:13px">No quote requests yet.</p>'; return; }
  el.innerHTML = `<table><thead><tr><th>Name</th><th>Email</th><th>Status</th></tr></thead><tbody>
    ${quotes.map(q => `<tr>
      <td>${escHtml(q.name)}</td>
      <td>${escHtml(q.email)}</td>
      <td><span class="badge ${statusBadgeClass(q.status)}">${q.status}</span></td>
    </tr>`).join('')}
  </tbody></table>`;
}

// ---- PRODUCTS ----
async function loadProducts() {
  const tbody = document.getElementById('products-tbody');
  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#888">Loading...</td></tr>';
  try {
    const data = await req('GET', '/products?limit=100');
    allProducts = data.data || [];
    renderProductsTable(allProducts);
    await loadCategoryOptions();
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:30px;color:#dc3545">${escHtml(err.message)}</td></tr>`;
  }
}

function renderProductsTable(products) {
  const tbody = document.getElementById('products-tbody');
  if (!products.length) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#888">No products found.</td></tr>'; return; }
  tbody.innerHTML = products.map(p => `
    <tr>
      <td><strong>${escHtml(p.name)}</strong><br><span style="color:#888;font-size:12px">${escHtml(p.sku || '')}</span></td>
      <td>${escHtml(p.category?.name || '--')}</td>
      <td>$${p.price.toFixed(2)}</td>
      <td>${p.stock}</td>
      <td><span class="badge ${p.isActive ? 'badge-green' : 'badge-gray'}">${p.isActive ? 'Active' : 'Inactive'}</span></td>
      <td>
        <div class="actions-cell">
          <button class="btn-icon" title="Edit" onclick="editProduct('${p._id}')"><i data-lucide="pencil"></i></button>
          <button class="btn-icon danger" title="Delete" onclick="deleteProduct('${p._id}', '${escHtml(p.name)}')"><i data-lucide="trash-2"></i></button>
        </div>
      </td>
    </tr>
  `).join('');
  lucide.createIcons();
}

function filterProducts() {
  const q = document.getElementById('product-search').value.toLowerCase();
  renderProductsTable(allProducts.filter(p => p.name.toLowerCase().includes(q) || (p.sku || '').toLowerCase().includes(q)));
}

async function loadCategoryOptions() {
  try {
    const data = await req('GET', '/categories');
    const sel = document.getElementById('prd-category');
    const current = sel.value;
    sel.innerHTML = '<option value="">Select Category</option>' +
      (data.data || []).map(c => `<option value="${c._id}">${escHtml(c.name)}</option>`).join('');
    if (current) sel.value = current;
  } catch { }
}

function openProductModal(product = null) {
  document.getElementById('product-modal-title').textContent = product ? 'Edit Product' : 'Add Product';
  document.getElementById('product-id').value = product?._id || '';
  document.getElementById('prd-name').value = product?.name || '';
  document.getElementById('prd-price').value = product?.price || '';
  document.getElementById('prd-original-price').value = product?.originalPrice || '';
  document.getElementById('prd-sku').value = product?.sku || '';
  document.getElementById('prd-stock').value = product?.stock || '';
  document.getElementById('prd-short-desc').value = product?.shortDescription || '';
  document.getElementById('prd-description').value = product?.description || '';
  document.getElementById('prd-rating').value = product?.rating || '';
  document.getElementById('prd-review-count').value = product?.reviewCount || '';
  document.getElementById('prd-featured').checked = product?.isFeatured || false;
  document.getElementById('prd-bestseller').checked = product?.isBestSeller || false;
  document.getElementById('prd-sale').checked = product?.isOnSale || false;
  document.getElementById('product-form-error').style.display = 'none';
  if (product?.category) {
    setTimeout(() => { document.getElementById('prd-category').value = product.category._id || product.category; }, 100);
  }
  loadCategoryOptions();
  openModal('product-modal');
}

function editProduct(id) {
  const p = allProducts.find(x => x._id === id);
  if (p) openProductModal(p);
}

document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const btn = document.getElementById('save-product-btn');
  const errEl = document.getElementById('product-form-error');
  btn.disabled = true;
  btn.textContent = 'Saving...';
  errEl.style.display = 'none';
  const id = document.getElementById('product-id').value;
  const body = {
    name: document.getElementById('prd-name').value,
    category: document.getElementById('prd-category').value,
    price: parseFloat(document.getElementById('prd-price').value),
    originalPrice: parseFloat(document.getElementById('prd-original-price').value) || undefined,
    sku: document.getElementById('prd-sku').value,
    stock: parseInt(document.getElementById('prd-stock').value) || 0,
    shortDescription: document.getElementById('prd-short-desc').value,
    description: document.getElementById('prd-description').value,
    rating: parseFloat(document.getElementById('prd-rating').value) || 0,
    reviewCount: parseInt(document.getElementById('prd-review-count').value) || 0,
    isFeatured: document.getElementById('prd-featured').checked,
    isBestSeller: document.getElementById('prd-bestseller').checked,
    isOnSale: document.getElementById('prd-sale').checked,
  };
  try {
    if (id) { await req('PUT', `/products/${id}`, body); showToast('Product updated'); }
    else { await req('POST', '/products', body); showToast('Product created'); }
    closeModal('product-modal');
    loadProducts();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = 'block';
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save Product';
  }
});

async function deleteProduct(id, name) {
  if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
  try {
    await req('DELETE', `/products/${id}`);
    showToast('Product deleted');
    loadProducts();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ---- CATEGORIES ----
async function loadCategories() {
  const tbody = document.getElementById('categories-tbody');
  tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;color:#888">Loading...</td></tr>';
  try {
    const data = await req('GET', '/categories');
    const cats = data.data || [];
    if (!cats.length) { tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:30px;color:#888">No categories yet.</td></tr>'; return; }
    tbody.innerHTML = cats.map(c => `
      <tr>
        <td><strong>${escHtml(c.name)}</strong></td>
        <td><code style="font-size:12px;background:#f5f5f5;padding:2px 6px;border-radius:4px">${escHtml(c.slug)}</code></td>
        <td>${c.productCount}</td>
        <td><span class="badge ${c.isActive ? 'badge-green' : 'badge-gray'}">${c.isActive ? 'Active' : 'Inactive'}</span></td>
        <td>
          <div class="actions-cell">
            <button class="btn-icon" title="Edit" onclick="editCategory(${JSON.stringify(c).replace(/"/g, '&quot;')})"><i data-lucide="pencil"></i></button>
            <button class="btn-icon danger" title="Delete" onclick="deleteCategory('${c._id}', '${escHtml(c.name)}')"><i data-lucide="trash-2"></i></button>
          </div>
        </td>
      </tr>
    `).join('');
    lucide.createIcons();
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:30px;color:#dc3545">${escHtml(err.message)}</td></tr>`;
  }
}

function openCategoryModal(cat = null) {
  document.getElementById('category-modal-title').textContent = cat ? 'Edit Category' : 'Add Category';
  document.getElementById('category-id').value = cat?._id || '';
  document.getElementById('cat-name').value = cat?.name || '';
  document.getElementById('cat-description').value = cat?.description || '';
  document.getElementById('cat-count').value = cat?.productCount || '';
  document.getElementById('category-form-error').style.display = 'none';
  openModal('category-modal');
}

function editCategory(cat) { openCategoryModal(cat); }

document.getElementById('category-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl = document.getElementById('category-form-error');
  errEl.style.display = 'none';
  const id = document.getElementById('category-id').value;
  const body = {
    name: document.getElementById('cat-name').value,
    description: document.getElementById('cat-description').value,
    productCount: parseInt(document.getElementById('cat-count').value) || 0,
  };
  try {
    if (id) { await req('PUT', `/categories/${id}`, body); showToast('Category updated'); }
    else { await req('POST', '/categories', body); showToast('Category created'); }
    closeModal('category-modal');
    loadCategories();
  } catch (err) {
    errEl.textContent = err.message;
    errEl.style.display = 'block';
  }
});

async function deleteCategory(id, name) {
  if (!confirm(`Delete "${name}"?`)) return;
  try {
    await req('DELETE', `/categories/${id}`);
    showToast('Category deleted');
    loadCategories();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ---- QUOTES ----
async function loadQuotes() {
  const tbody = document.getElementById('quotes-tbody');
  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#888">Loading...</td></tr>';
  const status = document.getElementById('quote-status-filter').value;
  try {
    const data = await req('GET', `/quotes?limit=50${status ? '&status=' + status : ''}`);
    const quotes = data.data || [];
    if (!quotes.length) { tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#888">No quotes found.</td></tr>'; return; }
    tbody.innerHTML = quotes.map(q => `
      <tr>
        <td>${new Date(q.createdAt).toLocaleDateString('en-AU')}</td>
        <td><strong>${escHtml(q.name)}</strong></td>
        <td>${escHtml(q.email)}</td>
        <td>${escHtml(q.company || '--')}</td>
        <td><span class="badge ${statusBadgeClass(q.status)}">${q.status}</span></td>
        <td>
          <button class="btn-icon" title="View" onclick="viewQuote('${q._id}')"><i data-lucide="eye"></i></button>
        </td>
      </tr>
    `).join('');
    lucide.createIcons();
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;padding:30px;color:#dc3545">${escHtml(err.message)}</td></tr>`;
  }
}

async function viewQuote(id) {
  currentQuoteId = id;
  try {
    const data = await req('GET', `/quotes?limit=200`);
    const q = data.data?.find(x => x._id === id);
    if (!q) return;
    document.getElementById('quote-status-update').value = q.status;
    document.getElementById('quote-notes').value = q.adminNotes || '';
    document.getElementById('quote-detail-content').innerHTML = `
      <div class="quote-detail">
        <div class="field-row"><span>Name</span><span>${escHtml(q.name)}</span></div>
        <div class="field-row"><span>Email</span><span>${escHtml(q.email)}</span></div>
        <div class="field-row"><span>Phone</span><span>${escHtml(q.phone || '--')}</span></div>
        <div class="field-row"><span>Company</span><span>${escHtml(q.company || '--')}</span></div>
        <div class="field-row"><span>Date</span><span>${new Date(q.createdAt).toLocaleString('en-AU')}</span></div>
        <div class="quote-msg">${escHtml(q.message)}</div>
      </div>`;
    openModal('quote-modal');
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function saveQuoteStatus() {
  if (!currentQuoteId) return;
  try {
    await req('PUT', `/quotes/${currentQuoteId}`, {
      status: document.getElementById('quote-status-update').value,
      adminNotes: document.getElementById('quote-notes').value,
    });
    showToast('Quote updated');
    closeModal('quote-modal');
    loadQuotes();
    loadDashboard();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// ---- USERS ----
async function loadUsers() {
  document.getElementById('users-tbody').innerHTML =
    '<tr><td colspan="5" style="text-align:center;padding:30px;color:#888">Connect to backend to load users.</td></tr>';
}

// ---- HELPERS ----
function statusBadgeClass(s) {
  return { pending: 'badge-orange', reviewed: 'badge-blue', quoted: 'badge-green', closed: 'badge-gray' }[s] || 'badge-gray';
}

function escHtml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ---- BOOT ----
window.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  if (isLoggedIn()) {
    initApp();
  } else {
    document.getElementById('login-screen').style.display = 'flex';
  }
});

// expose to HTML onclick
window.switchPage = switchPage;
window.openProductModal = openProductModal;
window.openCategoryModal = openCategoryModal;
window.closeModal = closeModal;
window.editProduct = editProduct;
window.editCategory = editCategory;
window.deleteProduct = deleteProduct;
window.deleteCategory = deleteCategory;
window.filterProducts = filterProducts;
window.loadQuotes = loadQuotes;
window.viewQuote = viewQuote;
window.saveQuoteStatus = saveQuoteStatus;
