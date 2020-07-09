import { FighterControl, LeftPlayerCriticalHitCombination, RightPlayerCriticalHitCombination } from '../../constants/controls';
import { Fighter, FighterCredentials } from '../../types/index';


function playerCredentials(fighter: Fighter, position:string): FighterCredentials {
  return {
    fighter,
    healthProgress: document.getElementById(`${position}-fighter-indicator`),
    currentHealth: fighter.health,
    isAttacking: false,
    isBlocking: false,
    baseHealth: fighter.health
  }
}

export async function fight(firstFighter: Fighter, secondFighter: Fighter): Promise<Fighter> {
  const {
    leftPlayerAttack,
    rightPlayerAttack,
    leftPlayerBlock,
    rightPlayerBlock
  } = FighterControl;
  const leftPlayerCriticalHitCombination = Object.keys(LeftPlayerCriticalHitCombination).filter(item => (item !== '0' && !Number(item)));
  const rightPlayerCriticalHitCombination = Object.keys(RightPlayerCriticalHitCombination).filter(item => (item !== '0' && !Number(item)));

  return new Promise((resolve) => {
    const leftFighter = playerCredentials(firstFighter, 'left');
    const rightFighter = playerCredentials(secondFighter, 'right');

    let keyPress: Set<string> = new Set();

    document.addEventListener('keydown', function (e) {
      keyPress.add(e.code);
      switch (e.code) {
        case leftPlayerBlock:
          leftFighter.isBlocking = true;
          break;
        case rightPlayerBlock:
          rightFighter.isBlocking = true;
          break;
        case leftPlayerAttack:
          makeAttack(leftFighter, rightFighter);
          break;
        case rightPlayerAttack:
          makeAttack(rightFighter, leftFighter);
        default:
      }
      if (keyPress.size === 3) {
        if (isCriticalAttack(keyPress, leftPlayerCriticalHitCombination) && !leftFighter.isAttacking) {
          makeCriticalAttack(leftFighter, rightFighter)
        }
        if (isCriticalAttack(keyPress, rightPlayerCriticalHitCombination) && !rightFighter.isAttacking) {
          makeCriticalAttack(rightFighter, leftFighter)
        }
      }
    })

    document.addEventListener('keyup', function (e) {
      switch (e.code) {
        case leftPlayerBlock:
          leftFighter.isBlocking = false;
          break;
        case rightPlayerBlock:
          rightFighter.isBlocking = false;
        default:
      }
      keyPress.delete(e.code);

      if (leftFighter.currentHealth <= 0 || rightFighter.currentHealth <= 0) {
        resolve(leftFighter.currentHealth > 0 ? firstFighter : secondFighter);
      }
    })
  });
}
function isCriticalAttack(keyPress: Set<string>, combination: Array<string>): boolean{
  let isRightCombination = true
  combination.forEach(keyCode => {
    if (!keyPress.has(keyCode)) isRightCombination = false;
  });
  return isRightCombination
}
function showCurrentHealth(current: number, basic: number, el: HTMLElement): void {
  const healthPercent = current / basic * 100;
  el.style.width = `${healthPercent > 0 ? healthPercent : 0}%`;
}

function makeAttack(attacker: FighterCredentials, defender: FighterCredentials): void {
  if(!attacker.isBlocking && !defender.isBlocking) {
    defender.currentHealth -= getDamage(attacker.fighter, defender.fighter);
    showCurrentHealth(defender.currentHealth, defender.baseHealth, defender.healthProgress)
  }
}

function makeCriticalAttack(attacker: FighterCredentials, defender: FighterCredentials): void {
  const attackDuration = 10000; ;
  defender.currentHealth -= attacker.fighter.attack * 2;
  showCurrentHealth(defender.currentHealth, defender.baseHealth, defender.healthProgress);
  attacker.isAttacking = true;
  setTimeout(() => attacker.isAttacking = false, attackDuration);
}
export function getDamage(attacker: Fighter, defender: Fighter): number {
  const damage = getHitPower(attacker) - getBlockPower(defender)
  return Math.max(0, damage);
}

export function getHitPower(fighter: Fighter): number {
  return fighter.attack * getRandomValue()
}

export function getBlockPower(fighter: Fighter): number {
  return fighter.defense * getRandomValue()
}

function getRandomValue(): number {
  return Math.random() + 1
}