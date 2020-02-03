import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

// import { getInitials } from 'helpers';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const CategoriesTable = props => {
  const { className, categories, ...rest} = props;
  const classes = useStyles();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { categories } = props;
    var selectedCategories;
    if(event.target.checked){
      selectedCategories = categories.map(category => category.id);
    }else{
      selectedCategories = [];
    }

    setSelectedCategories(selectedCategories);
  }

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCategories.indexOf(id);
    var newSelectedCategories = [];

    if(selectedIndex === -1){
      newSelectedCategories = newSelectedCategories.concat(selectedCategories, id);
    } else if (selectedIndex === 0) {
      newSelectedCategories = newSelectedCategories.concat(selectedCategories.slice(1));
    } else if (selectedIndex === selectedCategories.length - 1) {
      newSelectedCategories = newSelectedCategories.concat(selectedCategories.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCategories = newSelectedCategories.concat(
        selectedCategories.slice(0, selectedIndex),
        selectedCategories.slice(selectedIndex + 1)
      );
    }
    setSelectedCategories(newSelectedCategories);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.content}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCategories.length === categories.length}
                      color="primary"
                      indeterminate={
                        selectedCategories.length > 0 && 
                      selectedCategories.length < categories.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Ativo?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.slice(0, rowsPerPage).map(category => (
                  <TableRow
                    className={classes.TableRow}
                    hover
                    key={categories.id}
                    selected={selectedCategories.indexOf(category.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCategories.indexOf(category.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, category.id)}
                        value="true"
                      />
                    </TableCell>

                    <TableCell>
                      <Typography variant="body1">{category.name}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography variant="body1">{category.active}</Typography>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={categories.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

CategoriesTable.propTypes = {
  categories: PropTypes.array.isRequired,
  className: PropTypes.string
};

export default CategoriesTable;
