import { ANSWER_FORM, CSS_INPUT } from '../constants/elements';
import levels from '../data/index';
import getCurrentLevel from '../services/getCurrentLevel';
import saveProgress from '../services/saveProgress';
import LevelsControls from './levels-controls';

export default class InputControls {
  private form: HTMLFormElement | null;
  private inputElement: HTMLInputElement | null;

  constructor() {
    this.form = ANSWER_FORM;
    this.inputElement = CSS_INPUT;

    this.inputElement?.focus();
    this.form?.addEventListener('submit', (e: Event) => this.checkAnswer(e));
  }

  private checkAnswer(event: Event) {
    event.preventDefault();
    const currentLevel = getCurrentLevel();
    const animateElements = document.querySelectorAll('.animate');

    if (this.inputElement?.value === levels[currentLevel - 1].answer) {
      this.inputElement.value = '';
      saveProgress(currentLevel);
      animateElements?.forEach((el) => el.classList.add('done'));
      setTimeout(() => {
        new LevelsControls().setLevel(currentLevel + 1);
      }, 500);
    } else {
      animateElements?.forEach((el) => el.classList.add('error'));
      setTimeout(() => {
        animateElements?.forEach((el) => el.classList.remove('error'));
      }, 500);
    }
  }
}
