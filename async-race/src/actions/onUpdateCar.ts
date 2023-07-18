import { ICar } from '../types/types';
import { updateCar } from '../api/requests';
import carStore from '../store/carStore';

const onUpdateCar = async (event: SubmitEvent): Promise<ICar | undefined> => {
  let updatedCar: ICar | undefined;
  event.preventDefault();

  const updateForm = event.target as HTMLFormElement;
  const formData = new FormData(updateForm);

  const id = Number(updateForm.dataset.carId);
  const name = formData.get('name')?.toString().trim();
  const color = formData.get('color')?.toString();

  if (window.confirm('are you sure you want to update this car')) {
    if (name && color) {
      try {
        updatedCar = await updateCar({ id, name, color });
        carStore.dispatch({ type: 'UPDATE_ITEM', payload: [updatedCar] });
      } catch (error) {
        console.log(error);
      }
    }
  }
  return updatedCar;
};

export default onUpdateCar;
