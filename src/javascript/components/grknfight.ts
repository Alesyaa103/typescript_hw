// import { controls } from '../../constants/controls';
// import { Fighter } from '../../types/index';

// export async function fight(firstFighter: Fighter, secondFighter: Fighter): Promise<Fighter> {
//   const {
//     leftPlayerAttack,
//     rightPlayerAttack,
//     leftPlayerBlock,
//     rightPlayerBlock,
//     leftPlayerCriticalHitCombination,
//     rightPlayerCriticalHitCombination
//   } = controls;
//   let firstFighterProgress = document.getElementById('left-fighter-indicator');
//   let secondFighterProgress = document.getElementById('right-fighter-indicator');

//   return new Promise((resolve) => {
//     let FirstPlayerIsAttacking = false;
//     let SecondPlayerIsAttcking = false;
//     let FirstPlayerIsBlocking = false;
//     let SecondPlayerIsBlocking = false;
//     let firstFighterHealth = firstFighter.health;
//     let secondFighterHealth = secondFighter.health;
//     let keyPress: Array<string> = []
//     const actionDuration = 1000; //1s
//     function showCurrentHealth(current, basic, el) {
//       let healthPercent = current / basic * 100
//       el.style.width = `${healthPercent > 0 ? healthPercent : 0}%`;
//     }

//     document.addEventListener('keydown', function (e) {
//       keyPress.push(e.code);
//       switch (e.code) {
//         case leftPlayerBlock:
//           FirstPlayerIsBlocking = true;
//           break;
//         case rightPlayerBlock:
//           SecondPlayerIsBlocking = true;
//           break;
//         case leftPlayerAttack:
//           if (!FirstPlayerIsBlocking && !SecondPlayerIsBlocking) {
//             secondFighterHealth -= getDamage(firstFighter, secondFighter);
//             showCurrentHealth(secondFighterHealth, secondFighter.health, secondFighterProgress);
//           }
//           break;
//         case rightPlayerAttack:
//           if (!SecondPlayerIsBlocking && !FirstPlayerIsBlocking) {
//             firstFighterHealth -= getDamage(secondFighter, firstFighter)
//             showCurrentHealth(firstFighterHealth, firstFighter.health, firstFighterProgress);
//           }
//           break;
//         default:
//       }
//     })

//     document.addEventListener('keyup', function (e) {
//       switch (e.code) {
//         case leftPlayerBlock:
//           FirstPlayerIsBlocking = false;
//           break;
//         case rightPlayerBlock:
//           SecondPlayerIsBlocking = false;
//           break;
//         default:
//       }

//       if (keyPress.length === 3) {
//         if (keyPress.sort().join() === leftPlayerCriticalHitCombination.sort().join() && !FirstPlayerIsAttacking) {
//           secondFighterHealth -= firstFighter.attack * 2;
//           showCurrentHealth(secondFighterHealth, secondFighter.health, secondFighterProgress);
//           FirstPlayerIsAttacking = true;
//           setTimeout(() => FirstPlayerIsAttacking = false, actionDuration);
//         }
//         if (keyPress.sort().join() === rightPlayerCriticalHitCombination.sort().join() && !SecondPlayerIsAttcking) {
//           firstFighterHealth -= secondFighter.attack * 2;
//           showCurrentHealth(firstFighterHealth, firstFighter.health, firstFighterProgress);
//           SecondPlayerIsAttcking = true;
//           setTimeout(() => SecondPlayerIsAttcking = false, actionDuration)
//         }
//       }

//       keyPress = [];

//       if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
//         resolve(firstFighterHealth > 0 ? firstFighter : secondFighter);
//       }
//     })
//   });
// }

// export function getDamage(attacker, defender): number {
//   let damage = getHitPower(attacker) - getBlockPower(defender)
//   return Math.max(0, damage);
// }

// export function getHitPower(fighter: Fighter): number {
//   return fighter.attack * getRandomValue()
// }

// export function getBlockPower(fighter: Fighter): number {
//   return fighter.defense * getRandomValue()
// }

// function getRandomValue(): number {
//   return Math.random() + 1
// }