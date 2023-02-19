// import React from 'react';
// import { Fragment, useState, useEffect } from 'react';
// import { Button } from '@material-ui/core';
// import { LeftSidebar } from '../LeftSidebar';
// import SpellcheckIcon from '@material-ui/icons/Spellcheck';
// import { useDispatch, useSelector } from 'react-redux';
// import './category.css';
// import {
//   updateCategoryDetails,
//   errorClear,
// } from '../../../reduxFeature/actions/categoryAction';
// import { CATEGORY_UPDATE_RESET } from '../../../reduxFeature/reducers/category/categoryConstants';
// import { useNavigate } from 'react-router-dom';
// import { useAlert } from 'react-alert';
// import { useParams } from 'react-router-dom';

// const Category = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const alert = useAlert();
//   const params = useParams();

//   const { error, success, category } = useSelector(
//     (state) => state.categoryDetails
//   );

//   const [categoryName, setName] = useState('');

//   const categoryId = params.id;

//   useEffect(() => {
//     if (category && category._id !== categoryId) {
//       dispatch(updateCategoryDetails(categoryId));
//     } else {
//       setName(category.categoryName);
//     }

//     if (error) {
//       alert.error(error);
//       dispatch(errorClear());
//     }

//     if (isUpdated) {
//       alert.success('Product Updated Successfully');
//       navigate('/admin/categories');
//       dispatch({ type: CATEGORY_UPDATE_RESET });
//     }
//   }, [dispatch, alert, navigate, error, isUpdated, categoryId, category]);

//   const productSummitHandler = () => {
//     const form = new FormData();

//     form.append('title', categoryName);

//     dispatch(addCategory(form));
//   };

//   return (
//     <Fragment>
//       <div className="dashboard">
//         <LeftSidebar />
//         <div className="categoryContainer">
//           <h1 className="headingProd">Add Category</h1>
//           <form className="categoryForm" onSubmit={productSummitHandler}>
//             <div>
//               <SpellcheckIcon />
//               <input
//                 value={categoryName}
//                 placeholder={`Category Name`}
//                 onChange={(e) => setName(e.target.value)}
//                 type="text"
//                 required
//               />
//             </div>

//             <Button id="createProductBtn" type="submit">
//               Add
//             </Button>
//           </form>
//         </div>
//       </div>
//       ;
//     </Fragment>
//   );
// };

// export default Category;
