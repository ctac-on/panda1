import React, { useState, useEffect } from "react";


import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

import list from "./list.json";

import "./app.scss";

//пагинация страницы
const Pagination = (props) => {
  const { lnght, nmb, onClick, page } = props;

  //выводим пагинацию если есть
  if(lnght > nmb) {
    const items = Array(Math.ceil(lnght/nmb)).fill(0);
    return(
        <nav aria-label="Table pages">
          <ul className="pagination tableSection__nav">
            {items.map((name, indx) => {
              const act = indx+1 === page? " active": "";
              return(
                  <li
                      className={"page-item"+act}
                      key={indx}
                  >
                    <a
                        className="page-link tableSection__pageLink"
                        onClick={(e)=> {
                          e.preventDefault();
                          onClick(indx+1)
                        }}
                    >{indx+1}</a>
                  </li>
              )
            })}
          </ul>
        </nav>
    );
  }
  return null;

}

const App = () => {
  const arr = list.list;
  const nmbItems = 50;
  const test = arr.slice()

  //state страницы
  const [page, setPage] = useState(1);
  const [items, setItems] = useState(test);
  const [sort, setSort] = useState({
    sorted: false,
    val: "",
    dir: ""
  });

  //массив который выводится
  const showItems = items.slice(nmbItems*page-nmbItems, nmbItems*page);

  //обработчик сотрировки
  const handleClickSort = (a) => {
    if (!sort.sorted || sort.val !== a) {

      items.sort((prev, next) => {
        if (prev[a] < next[a]) return -1;
        if (prev[a] === next[a]) return 0;
        if (prev[a] > next[a]) return 1;
      });
      const newArr = items.concat();
      setSort({
        sorted: true,
        val: a,
        dir:"↑"
      });
      setItems(newArr);
    } else {
      items.reverse();
      const newArr = items.concat();
      const icon = sort.dir === "↑"? "↓": "↑";
      setSort(prevState => ({
        ...prevState,
        dir: icon
      }));
      setItems(newArr);
    }
  }
  const dirSortIcon = (a) => {
    if (sort.val === a) {
      return (<span>{sort.dir}</span>)
    } else {
      return null;
    }
  }

  //обработчик фильтра
  const handleInputChange = (e) => {
    if (e.target.value !== "") {
      const regexp = new RegExp(e.target.value, 'i', 'g')
      let newArr = arr.filter(item => {
        if (item.name.search(regexp) != -1 || String(item.gol).search(regexp) != -1) {
          return true;
        }
        return false;
      });
      newArr = typeof newArr === "undefined"? Array(0): newArr;
      setItems(newArr);
      setPage(1);
    } else {
      setSort({
        sorted: false,
        val: "",
        dir: ""
      });
      setItems(arr.concat());
    }
  }

  return (
      <section className="tableSection">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="filter"
                  placeholder="Фильтр"
                  onChange={handleInputChange}
                />
              </div>
              <table className="table table-striped">
                <thead className="thead-dark">
                <tr>
                  <th>#</th>
                  <th id="name">
                    <span
                     onClick={()=>handleClickSort("name")}
                     className="tableSection__th"
                    >
                      Игрок
                    </span>
                    {dirSortIcon("name")}
                  </th>
                  <th id="gol">
                    <span
                      onClick={()=>handleClickSort("gol")}
                      className="tableSection__th"
                    >
                      Забитых мячей
                    </span>
                    {dirSortIcon("gol")}
                  </th>
                </tr>
                </thead>
                <tbody>
                  {showItems.map((data, indx) => {
                    return(
                        <tr key={indx}>
                          <td>{indx+(nmbItems*page-nmbItems+1)}</td>
                          <td>{data.name}</td>
                          <td>{data.gol}</td>
                        </tr>
                    );
                  })}
                </tbody>
              </table>
              <Pagination
                lnght={items.length}
                nmb={nmbItems}
                onClick={(i)=>setPage(i)}
                page={page}
              />
            </div>
          </div>
        </div>
      </section>
  )
}


export default App;



