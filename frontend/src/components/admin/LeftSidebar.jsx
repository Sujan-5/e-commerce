import React from 'react';
import { Link } from 'react-router-dom';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PeopleIcon from '@material-ui/icons/People';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
// import Category from '@material-ui/icons/Category';
import './sidebar.css';

import AddIcon from '@material-ui/icons/Add';

export const LeftSidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create Product" icon={<AddIcon />} />
            </Link>
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All Products"
                icon={<PostAddIcon />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>

      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Category">
            <Link to="/admin/category">
              <TreeItem nodeId="3" label="Create Category" icon={<AddIcon />} />
            </Link>
            <Link to="/admin/categories">
              <TreeItem
                nodeId="2"
                label="All Categories"
                icon={<PostAddIcon />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
    </div>
  );
};
