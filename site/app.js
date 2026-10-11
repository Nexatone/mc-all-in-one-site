"use strict";

const cards = [...document.querySelectorAll(".feature-card")];
const groups = [...document.querySelectorAll(".feature-group")];
const search = document.querySelector("#feature-search");
const filters = [...document.querySelectorAll("[data-filter]")];
const count = document.querySelector("#result-count");
const clear = document.querySelector("#clear-search");
const closeButtons = [...document.querySelectorAll("[data-close-feature]")];
let category = "all";

const normalize = (value) => value.normalize("NFKD").replace(/\p{M}/gu, "").toLocaleLowerCase();
const searchText = new Map(cards.map((card) => [card, normalize(card.textContent)]));

function filterFeatures() {
  const words = normalize(search.value).trim().split(/\s+/).filter(Boolean);
  for (const card of cards) {
    card.hidden = !(category === "all" || card.dataset.category === category)
      || !words.every((word) => searchText.get(card).includes(word));
  }
  for (const group of groups) {
    group.hidden = ![...group.querySelectorAll(".feature-card")].some((card) => !card.hidden);
  }
  const visible = cards.filter((card) => !card.hidden).length;
  count.textContent = visible === cards.length ? `Showing all ${visible} features` : `Showing ${visible} of ${cards.length} features`;
  document.querySelector("#empty-state").hidden = visible > 0;
  clear.hidden = search.value.length === 0;
  document.querySelector("#expand-all").disabled = visible === 0;
  document.querySelector("#collapse-all").disabled = visible === 0;
  for (const button of filters) {
    button.setAttribute("aria-pressed", String(button.dataset.filter === category));
  }
}

function resetFilters() {
  category = "all";
  search.value = "";
  filterFeatures();
}

search.addEventListener("input", filterFeatures);
clear.addEventListener("click", () => { search.value = ""; filterFeatures(); search.focus(); });
document.querySelector("#reset-filters").addEventListener("click", () => { resetFilters(); search.focus(); });
filters.forEach((button) => button.addEventListener("click", () => { category = button.dataset.filter; filterFeatures(); }));
document.querySelector("#expand-all").addEventListener("click", () => cards.filter((card) => !card.hidden).forEach((card) => { card.open = true; }));
document.querySelector("#collapse-all").addEventListener("click", () => cards.filter((card) => !card.hidden).forEach((card) => { card.open = false; }));
closeButtons.forEach((button) => button.addEventListener("click", () => {
  const card = button.closest(".feature-card");
  card.open = false;
  card.querySelector("summary").focus({ preventScroll: true });
  card.scrollIntoView({ block: "start" });
}));

function revealAnchor() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  const card = target.closest(".feature-card");
  if (card) { resetFilters(); card.open = true; }
  // A heading can be inside both a feature and a nested disclosure.
  for (let parent = target.parentElement; parent; parent = parent.parentElement) {
    if (parent.tagName === "DETAILS") parent.open = true;
  }
  if (card) requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior: "instant" }));
}

window.addEventListener("hashchange", revealAnchor);
document.addEventListener("click", (event) => {
  const link = event.target.closest("a[href^='#']");
  if (link && link.hash === location.hash) revealAnchor();
});
document.addEventListener("keydown", (event) => {
  const typing = event.target.closest("input, textarea, select, [contenteditable='true']");
  if (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault(); search.focus(); search.scrollIntoView({ block: "center" });
  }
  if (event.key === "Escape" && document.activeElement === search) {
    search.value = ""; filterFeatures();
  }
});

document.querySelector(".catalogue-tools").hidden = false;
document.querySelector(".category-filters").hidden = false;
closeButtons.forEach((button) => { button.hidden = false; });
filterFeatures();
revealAnchor();
