import React, { useEffect, useState } from "react";
import PlanesAPI from "../apis/PlanesAPI";
import UpdateFromTown from "./UpdateFromTown";
import UpdateAirline from "./UpdateAirline";
import UpdateDate from "./UpdateDate";
import UpdateIsLate from "./UpdateIsLate";
import "./ItemsList.css";
import SortButton from "./SortButton";

const ItemsList = ({
  planes,
  setPlanes,
  updates,
  setUpdates,
  isTownValid,
  isAirlineValid,
  isDateTimeValid,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PlanesAPI.get("/");
        const newUpdate = response.data.map((item) => {
          let obj = {};
          obj.id = item.id;
          obj.newTown = "";
          obj.newAirline = "";
          obj.newDate = "";
          obj.newIsLate = item.isLate === 1 ? true : false;

          return obj;
        });
        setUpdates(newUpdate);
        setPlanes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await PlanesAPI.delete(`/${id}`);
      setPlanes(
        planes.filter((item) => {
          return item.id !== id;
        })
      );
      setUpdates(
        updates.filter((item) => {
          return item.id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e, id) => {
    e.stopPropagation();

    const isLate =
      updates.filter((el) => el.id === id)[0].newIsLate === true ? 1 : 0;

    let arrivalTime = updates.filter((el) => el.id === id)[0].newDate;
    if (arrivalTime === "") {
      arrivalTime = formatDate(
        planes.filter((el) => el.id === id)[0].arrivalTime
      );
    }

    let fromTown = updates.filter((el) => el.id === id)[0].newTown;
    if (fromTown === "") {
      fromTown = planes.filter((el) => el.id === id)[0].fromTown;
    }

    let airline = updates.filter((el) => el.id === id)[0].newAirline;
    if (airline === "") {
      airline = planes.filter((el) => el.id === id)[0].airline;
    }

    try {
      await PlanesAPI.put(`/${id}`, {
        fromTown,
        airline,
        arrivalTime,
        isLate,
      });

      setPlanes(
        planes.map((el) => {
          if (el.id === id) {
            el.fromTown = fromTown;
            el.airline = airline;
            el.arrivalTime = arrivalTime;
            el.isLate = isLate;
          }
          return el;
        })
      );

      setUpdates(
        updates.map((el) => {
          if (el.id === id) {
            el.newIsLate =
              planes.filter((el) => el.id === id)[0].isLate === 1
                ? true
                : false;
            el.newDate = "";
            el.newTown = "";
            el.newAirline = "";
          }
          return el;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (isoDate) => {
    let date = new Date(isoDate);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();
    let HH = date.getHours();
    let MM = date.getMinutes();

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }

    if (HH < 10) {
      HH = `0${HH}`;
    }

    if (MM < 10) {
      MM = `0${MM}`;
    }

    return `${yyyy}-${mm}-${dd} ${HH}:${MM}`;
  };

  const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedItems = () => {
      let sortableItems = [...items];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          let aItem = a[sortConfig.key];
          let bItem = b[sortConfig.key];

          if (sortConfig.key === "newAirline") {
            aItem = parseFloat(a[sortConfig.key]);
            bItem = parseFloat(b[sortConfig.key]);
          }

          if (aItem < bItem) {
            return sortConfig.direction === "sort-up" ? -1 : 1;
          }
          if (aItem > bItem) {
            return sortConfig.direction === "sort-up" ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    };

    const requestSort = (key) => {
      let direction = "sort-up";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "sort-up"
      ) {
        direction = "sort-down";
      }
      setSortConfig({ key, direction });
    };

    return { items: sortedItems(), requestSort, sortConfig };
  };

  const { items, requestSort, sortConfig } = useSortableData(planes);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return "sort";
    }
    return sortConfig.key === name ? sortConfig.direction : "sort";
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover">
        <thead>
          <tr className="table-dark">
            <th scope="col">
              Atvyksta iš miesto{" "}
              <SortButton
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
                name="fromTown"
              />
            </th>
            <th scope="col">
              Aviakompanija{" "}
              <SortButton
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
                name="airline"
              />
            </th>
            <th scope="col">
              Atvykimo laikas{" "}
              <SortButton
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
                name="arrivalTime"
              />
            </th>
            <th scope="col">
              Ar vėluoja?{" "}
              <SortButton
                requestSort={requestSort}
                getClassNamesFor={getClassNamesFor}
                name="isLate"
              />
            </th>
            <th scope="col">Redaguoti</th>
            <th scope="col">Trinti</th>
          </tr>
        </thead>

        <tbody>
          {items &&
            items.map((item) => {
              return (
                <tr key={item.id}>
                  <td className="from-town">
                    {item.fromTown}
                    <UpdateFromTown
                      updates={updates}
                      setUpdates={setUpdates}
                      id={item.id}
                      isTownValid={isTownValid}
                    />
                  </td>
                  <td className="airline">
                    {item.airline}
                    <UpdateAirline
                      updates={updates}
                      setUpdates={setUpdates}
                      id={item.id}
                      isAirlineValid={isAirlineValid}
                    />
                  </td>
                  <td className="arrival-time">
                    {formatDate(item.arrivalTime)}
                    <UpdateDate
                      updates={updates}
                      setUpdates={setUpdates}
                      id={item.id}
                      isDateTimeValid={isDateTimeValid}
                    />
                  </td>
                  <td className="is-late">
                    {item.isLate ? "vėluoja   " : "laiku   "}
                    <UpdateIsLate
                      updates={updates}
                      setUpdates={setUpdates}
                      id={item.id}
                    />
                  </td>
                  <td className="updates">
                    <button
                      onClick={(e) => handleUpdate(e, item.id)}
                      className="btn btn-warning btn-sm"
                    >
                      Redaguoti
                    </button>
                  </td>
                  <td className="delete">
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Trinti
                    </button>
                  </td>
                </tr>
              );
            })}

          <tr className="table-dark fw-bolder">
            <td className="left-align" colSpan="2">
              Bendras reisų kiekis: {planes && planes.length}
            </td>
            <td className="left-align" colSpan="1">
              Atskrenda laiku:{" "}
              {planes &&
                planes.length -
                  planes.reduce(
                    (total, item) => total + parseFloat(item.isLate),
                    0
                  )}{" "}
            </td>
            <td className="left-align" colSpan="2">
              Vėluoja:{" "}
              {planes &&
                planes.reduce(
                  (total, item) => total + parseFloat(item.isLate),
                  0
                )}{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ItemsList;
