import {
  BTN_RESET,
  GAME_TABLE,
  GAME_TITLE,
  HTML_VIEWER,
  LEVELS_LIST,
} from '../constants/elements';
import levels from '../data/index';
import getCurrentLevel from '../services/getCurrentLevel';
import getCurrentProgress from '../services/getCurrentProgress';
import resetProgress from '../services/resetProgress';
import { ILevel } from '../types/index';

export default class LevelsControls {
  private elementList: HTMLUListElement | null;
  private elementGameTitle: HTMLHeadingElement | null;
  private elementGameTable: HTMLDivElement | null;
  private elementHTMLViewer: HTMLDivElement | null;
  private btnReset: HTMLButtonElement | null;

  constructor() {
    this.elementList = LEVELS_LIST;
    this.elementGameTitle = GAME_TITLE;
    this.elementGameTable = GAME_TABLE;
    this.elementHTMLViewer = HTML_VIEWER;
    this.btnReset = BTN_RESET;

    this.btnReset?.addEventListener('click', () => this.resetProgress());
  }

  public init(): void {
    const fragment = document.createDocumentFragment();
    levels.forEach((level: ILevel) => {
      const levelItem = document.createElement('li');
      levelItem.classList.add('level');
      levelItem.dataset.levelId = `${level.id}`;

      levelItem.innerHTML = `
        <img src="./svg/check.svg" alt="icon" class="level__icon" />
        <span class="level__number">${level.id}</span>
        <span class="level__title">${level.title}</span>
      `;

      levelItem.addEventListener('click', () => this.setLevel(level.id));
      fragment.append(levelItem);
    });

    this.elementList?.append(fragment);
    this.setProgress();

    const currentLevelId: number = getCurrentLevel();
    this.setLevel(currentLevelId);
  }

  public setLevel(levelId: number): void {
    if (levelId <= levels.length) {
      this.clearPrevLevel();
      const currentLevelElement = this.elementList?.querySelector(
        `[data-level-id='${levelId}']`
      );
      currentLevelElement?.classList.add('level--current');

      this.saveCurrentLevel(levelId);
      this.setGameTitle(levelId);
      this.setGameTable(levelId);
      this.setHtmlViewer(levelId);
      this.setProgress();
    }
  }

  private saveCurrentLevel(levelId: number): void {
    localStorage.setItem('cur_lvl_rs_css', `${levelId}`);
  }

  private setGameTitle(levelId: number): void {
    if (this.elementGameTitle) {
      this.elementGameTitle.textContent = levels[levelId - 1].title;
    }
  }

  private setGameTable(levelId: number): void {
    if (this.elementGameTable) {
      this.elementGameTable.innerHTML = levels[levelId - 1].markup;
    }
  }

  private setHtmlViewer(levelId: number): void {
    const fragment = document.createDocumentFragment();
    const strings = levels[levelId - 1].markup.trim().split('\n');
    strings.forEach((string) => {
      const span = document.createElement('span');
      span.textContent = string;

      fragment.append(span);
    });
    this.elementHTMLViewer?.append(fragment);
  }

  private setProgress(): void {
    const progress = getCurrentProgress();
    progress.forEach((levelId) => {
      const levelElement = this.elementList?.querySelector(
        `[data-level-id='${levelId}']`
      );
      levelElement?.classList.add('level--done');
    });
  }

  private resetProgress(): void {
    resetProgress();
    const doneLevels = this.elementList?.querySelectorAll('.level--done');
    doneLevels?.forEach((item) => {
      item.classList.remove('level--done');
      console.log(item);
    });
    this.setLevel(1);
  }

  private clearPrevLevel(): void {
    const levels = this.elementList?.querySelectorAll('[data-level-id]');
    levels?.forEach((item) => {
      item.classList.remove('level--current');
    });

    if (this.elementHTMLViewer) this.elementHTMLViewer.innerHTML = '';
  }
}
