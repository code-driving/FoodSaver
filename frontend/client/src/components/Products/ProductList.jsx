// import React, { Fragment, useEffect } from "react";
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import Button from "@material-ui/core/Button";
import id from "date-fns/locale/id/index";
import useRecipesApi from "../../hooks/useRecipesApi";
import { Link } from "react-router-dom";
import ingredientsToString from "../../helpers/ingredientsToString";
import Popup from "./popup";
import "./ProductList.scss";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { purple } from "@material-ui/core/colors";
import { palette } from "@material-ui/system";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import date from "../../helpers/date";

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: "#802026",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#0DA71A",
    },
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Select All",
  },
  {
    id: "expiration_date",
    numeric: true,
    disablePadding: false,
    label: "Expiration Date",
  },
  {
    id: "Time",
    numeric: true,
    disablePadding: false,
    label: "Time left",
  },
  {
    id: "quantity_grams",
    numeric: true,
    disablePadding: false,
    label: "Quantity (g)",
  },
  {
    id: "quantity_units",
    numeric: true,
    disablePadding: false,
    label: "Amount (units)",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <span className="warning">Warning</span>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    textSize: "1.3rem",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
    fontSize: "1.7rem",
    color: "#000",
    textShadow: "1px 1px 2px #0ba718"
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, deleteProduct, selected, setSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#bf824f",
    fontSize: "1.3rem",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    backgroundColor: "#bf824f",
    fontSize: "1.3rem",
  },
  table: {
    minWidth: 750,
    backgroundColor: "#bf824f",
    fontSize: "1.3rem",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function ProductList(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [selectedName, setSelectedName] = React.useState([]);
  const [selectedItemDate, setSelectedItemDate] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [OpenPopUp, setOpenPopUp] = React.useState(false);

  const {
    products,
    deleteProduct,
    dateData,
    setIngredientsItems,
    EditProduct,
    EditSummary,
  } = props;

  const options = {
    title: "Title",
    message: "Message",
    buttons: [
      {
        label: "Yes",
        onClick: () => alert("Click Yes"),
      },
      {
        label: "No",
        onClick: () => alert("Click No"),
      },
    ],
    childrenElement: () => <div />,
    customUI: ({ onClose }) => (
      <div>
        <h3 style={{ marginLeft: "2.5rem", color: "orange" }}>
          {"Are you sure?"}
        </h3>
        <button
          className="button"
          style={{ marginTop: "1.5rem" }}
          onClick={() => onClose()}
        >
          cancel
        </button>
        <button
          className="button"
          style={{ marginTop: "1.5rem", marginLeft: "3rem" }}
          onClick={() => {
            deleteProduct(selected);
            setSelected([]);
            onClose();
          }}
        >
          delete
        </button>
      </div>
    ),
    closeOnEscape: true,
    closeOnClickOutside: true,
    willUnmount: () => {},
    afterClose: () => {},
    onClickOutside: () => {},
    onKeypressEscape: () => {},
    overlayClassName: "overlay-custom-class-name",
  };
  const rows = products;

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);

      const newSelectedsName = rows.map((n) => n.name);
      setSelectedName(newSelectedsName);

      return;
    }
    setSelected([]);
    setSelectedName([]);
  };

  const handleClick = (event, id, name, date) => {
    const selectedIndex = selected.indexOf(id);
    const selectedIndexName = selectedName.indexOf(name);
    const selectedIndexItemDate = selectedItemDate.indexOf(date);
    let newSelected = [];
    let newSelectedName = [];
    let newSelectedItemDate = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    if (selectedIndexName === -1) {
      newSelectedName = newSelectedName.concat(selectedName, name);
    } else if (selectedIndexName === 0) {
      newSelectedName = newSelectedName.concat(selectedName.slice(1));
    } else if (selectedIndexName === selectedName.length - 1) {
      newSelectedName = newSelectedName.concat(selectedName.slice(0, -1));
    } else if (selectedIndexName > 0) {
      newSelectedName = newSelectedName.concat(
        selectedName.slice(0, selectedIndexName),
        selectedName.slice(selectedIndexName + 1)
      );
    }

    if (selectedIndexItemDate === -1) {
      newSelectedItemDate = newSelectedItemDate.concat(selectedItemDate, date);
    } else if (selectedIndexItemDate === 0) {
      newSelectedItemDate = newSelectedItemDate.concat(
        selectedItemDate.slice(1)
      );
    } else if (selectedIndexItemDate === selectedItemDate.length - 1) {
      newSelectedItemDate = newSelectedItemDate.concat(
        selectedItemDate.slice(0, -1)
      );
    } else if (selectedIndexItemDate > 0) {
      newSelectedItemDate = newSelectedItemDate.concat(
        selectedItemDate.slice(0, selectedIndexItemDate),
        selectedItemDate.slice(selectedIndexItemDate + 1)
      );
    }
    setSelected(newSelected);
    setSelectedName(newSelectedName);
    setSelectedItemDate(newSelectedItemDate);
  };
  let ingredientString = ingredientsToString(selectedName);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const warning = (dayLeft) => {
    if (dayLeft === "Expired") {
      return "dot-red";
    } else if (dayLeft === "1 day" || dayLeft.includes("hour")) {
      return "dot-yellow";
    }
    return "dot-green";
  };
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, row.id, row.name, row.expiration)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.expiration}</TableCell>
                        <TableCell align="right">{row.dayLeft}</TableCell>
                        <TableCell align="right">
                          {row.quantity_grams}
                        </TableCell>
                        <TableCell align="right">
                          {row.quantity_units}
                        </TableCell>
                        <section className={warning(row.dayLeft)}></section>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="product_list_buttons">
            <button
              className="button"
              onClick={() => confirmAlert(options)}
            >
              delete
            </button>
            <Link to="/recipes">
              <button
                className="button"
                onClick={setIngredientsItems(ingredientString)}
              >
                find recipes
              </button>
            </Link>
            <button
              classes={classes}
              onClick={() => {
                setOpenPopUp(true);
              }}
              variant="outlined"
              color="primary"
              className="button"
            >
              edit/consume
            </button>
          </div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <Popup
          openPopUp={OpenPopUp}
          setopenPopUp={setOpenPopUp}
          selectedName={selectedName}
          EditProduct={EditProduct}
          EditSummary={EditSummary}
          selected={selected}
          selectedItemDate={selectedItemDate}
          setOpenPopUp={setOpenPopUp}
        ></Popup>
      </div>
    </ThemeProvider>
  );
}
