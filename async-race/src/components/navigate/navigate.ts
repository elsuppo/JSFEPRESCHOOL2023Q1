import onClickNavigate from '../../actions/onClickNavigate';
import getCurrentPage from '../../services/getCurrentPage';
import baseButton from '../base/button/button';
import './navigate.scss';

const navigateView = (): HTMLDivElement => {
  const navigateElement = document.createElement('div');
  navigateElement.classList.add('navigate');

  const btnToGarage = baseButton({
    text: 'to garage',
    customClass: 'button--main',
    disabled: getCurrentPage() === 'garage',
  });

  const btnToWinners = baseButton({
    text: 'to winners',
    customClass: 'button--main',
    disabled: getCurrentPage() === 'winners',
  });

  btnToGarage.addEventListener('click', (event) =>
    onClickNavigate(event, [btnToWinners], 'garage')
  );
  btnToWinners.addEventListener('click', (event) =>
    onClickNavigate(event, [btnToGarage], 'winners')
  );

  navigateElement.append(btnToGarage, btnToWinners);

  return navigateElement;
};

export default navigateView;
