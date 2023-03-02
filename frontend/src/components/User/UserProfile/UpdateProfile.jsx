import React from 'react';
import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import Loader from '../../mainPage/FrontFeatures/Loading/Loader';
import { UPDATE_DETAILS_RESET } from '../../../reduxFeature/reducers/Users/userConstants';
import { userLoad, errorClear } from '../../../reduxFeature/actions/userAction';
import { editProfileDetails } from '../../../reduxFeature/actions/userAction';
import { useNavigate } from 'react-router-dom';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FaceIcon from '@material-ui/icons/Face';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import './updateprofile.css';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.account);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  const updateDetailsSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.set('firstName', firstName);
    form.set('lastName', lastName);
    form.set('email', email);
    form.set('address', address);
    form.set('contact', contact);
    if (avatar) {
      form.set('avatar', avatar);
    }
    // for (let key of form.keys()) {
    //   console.log(key + ': ' + form.get(key));
    // }
    dispatch(editProfileDetails(form));
  };

  const updateDetailsHandleChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setAddress(user.address);
      setContact(user.contact);
      setEmail(user.email);
      setAvatarPreview(user.avatar?.url);
    }

    if (error) {
      alert.error(error);
      dispatch(errorClear());
    }

    if (isUpdated) {
      alert.success('Profile Updated Successfully');
      dispatch(userLoad());
      navigate('/account');

      dispatch({ type: UPDATE_DETAILS_RESET });
    }
  }, [dispatch, error, alert, navigate, user, isUpdated]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="updateCon">
            <div className="updateprofile">
              <div className="updateBox">
                <h2 className="updateH2">Update Details</h2>
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateDetailsSubmit}
                >
                  {' '}
                  <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateDetailsHandleChange}
                    />
                  </div>
                  <div className="updateProfileName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="firstName"
                      required
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="lastName"
                      required
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      readOnly
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileName">
                    <LocationCityIcon />
                    <input
                      type="text"
                      placeholder="address"
                      required
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileName">
                    <SmartphoneIcon />
                    <input
                      type="number"
                      placeholder="contact"
                      required
                      name="contact"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                  />
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
