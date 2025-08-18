const CUSTOM_KEY = 'customCatalog';
const REMOVED_KEY = 'removedCatalogIds';

function getCustomCatalog(){
  return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '[]');
}

function saveCustomCatalog(list){
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(list));
}

function getRemovedIds(){
  return JSON.parse(localStorage.getItem(REMOVED_KEY) || '[]');
}

function saveRemovedIds(list){
  localStorage.setItem(REMOVED_KEY, JSON.stringify(list));
}

function addCatalogItem(item){
  const list = getCustomCatalog();
  list.push(item);
  saveCustomCatalog(list);
}

function updateCatalogItem(item){
  const list = getCustomCatalog();
  const idx = list.findIndex(i => i.id === item.id);
  if(idx !== -1){
    list[idx] = item;
  } else {
    list.push(item);
  }
  saveCustomCatalog(list);
  const removed = getRemovedIds();
  if(!removed.includes(item.id)){
    removed.push(item.id);
    saveRemovedIds(removed);
  }
}

function deleteCatalogItem(id){
  const list = getCustomCatalog();
  const idx = list.findIndex(i => i.id === id);
  if(idx !== -1){
    list.splice(idx,1);
    saveCustomCatalog(list);
  } else {
    const removed = getRemovedIds();
    if(!removed.includes(id)){
      removed.push(id);
      saveRemovedIds(removed);
    }
  }
}

function getMergedCatalog(base){
  const removed = getRemovedIds();
  const custom = getCustomCatalog();
  return [...base.filter(i => !removed.includes(i.id)), ...custom];
}

window.catalogManager = {
  getCustomCatalog,
  addCatalogItem,
  updateCatalogItem,
  deleteCatalogItem,
  getMergedCatalog,
  getRemovedIds
};

