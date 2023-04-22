import React from 'react';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shipping.css';
import { useSelector, useDispatch } from 'react-redux';
import LocationCity from '@material-ui/icons/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import FaceIcon from '@material-ui/icons/Face';
import { useAlert } from 'react-alert';
import MultiSteps from './MultiSteps';
import { saveShippingDetails } from '../../reduxFeature/actions/cartAction';

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { shippingDetails } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [contact, setContact] = useState(
    shippingDetails.contact || user.contact
  );
  const [city, setCity] = useState(shippingDetails.city);
  const [address, setAddress] = useState(shippingDetails.address);
  const [province, SetProvince] = useState(
    shippingDetails.province || 'Bagmati Province'
  );

  const handleShippingSubmit = (e) => {
    e.preventDefault();

    if (contact.length < 10 || contact.length > 10) {
      alert.error('Phone number should be 10 digits long');
      return;
    }

    dispatch(
      saveShippingDetails({ firstName, contact, city, address, province })
    );
    navigate('/order/details');
  };

  return (
    <Fragment>
      <MultiSteps activeStep={0} />
      <div className="shippingContainer">
        <div className="shippingDetails">
          <div className="shippingBox">
            <h2>Shipping Details</h2>
            <form className="shippingForm" onSubmit={handleShippingSubmit}>
              <div className="shippingAddress">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  value={user?.firstName}
                  readOnly
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="shhpingAddress">
                <SmartphoneIcon />
                <input
                  type="number"
                  placeholder="Contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  size="10"
                />
              </div>

              <div className="shippingAddress">
                <LocationCity />
                <input
                  type="text"
                  placeholder="Province"
                  value={province}
                  onChange={(e) => SetProvince(e.target.value)}
                  readOnly
                />
              </div>

              <div className="shhpingAddress">
                <LocationCity />
                <select
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="city">Select City</option>
                  <option value="Kathmandu">Kathmandu</option>
                  <option value="Lalitpur">Lalitpur</option>
                  <option value="Bhaktapur">Bhaktapur</option>
                </select>
              </div>

              <div className="shhpingAddress">
                <PlaceIcon />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Next"
                className="ShippingAddressBtn"
              />
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
