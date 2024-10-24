// components/OrderCard.js
import { XCircleIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';

const OrderCard = (props) => {
  const { id, title, imageUrl, price, quantity, handleDelete, handleQuantityChange } = props;

  let renderXMarkIcon;
  if (handleDelete) {
    renderXMarkIcon = (
      <XCircleIcon className='size-6 cursor-pointer' onClick={() => handleDelete(id)} />
    );
  }

  return (
    <div className='flex justify-between items-center mb-3'>
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20'>
          <img className='w-full h-full rounded-lg object-cover' src={imageUrl} alt={title} />
        </figure>
        <p className='text-sm font-light'>{title}</p>
      </div>
      <div className='flex items-center gap-2'>
        <MinusCircleIcon
          className='w-6 h-6 cursor-pointer text-gray-500 hover:text-black'
          onClick={() => handleQuantityChange(id, quantity - 1)}
        />
        <span>{quantity}</span>
        <PlusCircleIcon
          className='w-6 h-6 cursor-pointer text-gray-500 hover:text-black'
          onClick={() => handleQuantityChange(id, quantity + 1)}
        />
        <p className='text-lg font-medium'>${price * quantity}</p>
        {renderXMarkIcon}
      </div>
    </div>
  );
};

export default OrderCard;