import RAPIER, { Cuboid } from '@dimforge/rapier2d';
import { toRadian } from './calc';
import { SCALE, SimulaterProps, forceVector, gravity, simulaterProps } from './constants';

const world = new RAPIER.World(gravity);

// scale: 計算を早くするために除算する係数
const createSimulator = (scale: number, props: SimulaterProps) => {
  //  壁と床を作る
  props.deviders.forEach((devider) => {
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(devider.width / 2 / scale, devider.height / 2 / scale)
        .setMass(devider.mass)
        .setTranslation(devider.position.x / scale, devider.position.y / scale)
        .setRotation(toRadian(devider.rotate)),
    );
  });

  const texts: { rigid: RAPIER.RigidBody; collider: RAPIER.ColliderDesc; text: string }[] = [];
  return {
    getTexts: () => texts,
    addText: ({
      text,
      position,
      force = forceVector,
    }: {
      text: string;
      position: { x: number; y: number };
      force?: { x: number; y: number };
    }) => {
      const b = world.createRigidBody(
        RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(position.x / scale, position.y / scale)
          .setAngvel(0)
          .setLinvel(force.x, force.y),
      );
      // cuboidは長さ・高さを半分にして作成
      const hw = (props.textFrame.fontSize * text.length) / 2 / scale;
      const hh = props.textFrame.fontSize / 2 / scale;
      const c = RAPIER.ColliderDesc.cuboid(hw, hh)
        .setMass(props.textFrame.mass)
        .setDensity(props.textFrame.density)
        .setRestitution(0.7)
        .setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS);
      // シミュレーション開始
      world.createCollider(c, b);

      texts.push({ rigid: b, collider: c, text });
    },
  };
};

export const simulator = createSimulator(SCALE, simulaterProps);
const eventQueue = new RAPIER.EventQueue(true);

export const simulateLoop = () => {
  world.step(eventQueue);

  const items = simulator.getTexts().map((obj) => {
    const trans = obj.rigid.translation();
    return {
      position: { x: trans.x, y: trans.y },
      rotation: obj.rigid.rotation(),
      width: (obj.collider.shape as Cuboid).halfExtents.x * 2,
      height: (obj.collider.shape as Cuboid).halfExtents.y * 2,
      text: `${obj.text}`,
    };
  });

  // eventQueue.drainCollisionEventsはCOLLISION_EVENTSを有効にしていないので、発生しない
  // eventQueue.drainContactForceEventsはCONTACT_FORCE_EVENTSを有効にしていないので、発生しない
  return items;
};
