// Wasmがうまくimportできないので、モックを作成してjest.configのmoduleNameMapper設定でこちらに向ける
class World {
  createCollider() {}
}
class EventQueue {}
const collider = {
  setMass: () => collider,
  setTranslation: () => collider,
  setRotation: () => collider,
};
const ColliderDesc = { cuboid: () => collider };
const rapier = { World, ColliderDesc, EventQueue };

export default rapier;
