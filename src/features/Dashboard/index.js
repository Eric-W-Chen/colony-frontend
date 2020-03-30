import React, { useState } from 'react';
import { useProfileProvider } from 'contexts/profile';
import Logout from 'components/Logout';
import Colonies from 'components/Colonies';
// import ItemForm from 'components/ItemForm';
// import Cart from 'components/Cart';

const Dashboard = () => {
  const { getCart } = useProfileProvider();
  const { state, state: { name: { first } } } = useProfileProvider();
  // const [showCart, setShowCart] = useState(false);
  // const [cartToggle, setCartToggle] = useState(false);

  // const setClose = () => {
  //   setCartToggle(false);
  //   setShowCart(false);
  // };

  // const setShow = () => {
  //   setCartToggle(true);
  //   setShowCart(true);
  //   getCart();
  // };

  return (
    <div className="dashboard" style={{ textAlign: 'center' }}>
      <Logout />
      <Colonies />

      {/* {cartToggle ? <Button
        variant="outlined"
        onClick={setClose}
      >
                        Add Item
                    </Button> : <Button variant="outlined" onClick={setShow}>Show Cart</Button>}
      {showCart ? <Cart /> : <ItemForm />} */}
    </div>
  );
};

export default Dashboard;
