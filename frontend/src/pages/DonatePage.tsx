import { useNavigate, useParams } from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function DonatePage() {
  const navigate = useNavigate();
  const { projectName, projectId } = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      projectId: Number(projectId),
      projectName: projectName || 'No Project Found',
      donationAmount,
    };
    addToCart(newItem);
    navigate('/cart');
  };
  return (
    <>
      <WelcomeBand />
      <h2>Donate to {projectName}</h2>
      <div>
        <input
          // className=""
          type="number"
          placeholder="Enter Donation amount"
          value={donationAmount}
          onChange={(x) => setDonationAmount(Number(x.target.value))}
        />
        <button className="btn btn-info" onClick={handleAddToCart}>
          Add to Cart
        </button>
        <button className="btn btn-info" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    </>
  );
}

export default DonatePage;
