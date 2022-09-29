import SearchFilter from "./SearchFilter";
import SearchResult from "./SearchResult";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Header from "../Header";

function SearchPage() {
  let [searchParams] = useSearchParams();
  let [filter, setFilter] = useState({});
  let [searchList, setSearchList] = useState([]);
  let [locationList, setLocationList] = useState([]);

  let getFilterDetails = async (_filter) => {
    _filter = { ..._filter };
    let URL = "https://nameless-mountain-02509.herokuapp.com/api/filter";

    //filter
    if (searchParams.get("meal_type"))
      _filter["mealtype"] = searchParams.get("meal_type");

    try {
      let response = await axios.post(URL, _filter);
      let data = response.data;
      setSearchList([...data.result]);
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  let getLocationList = async () => {
    let URL = "https://nameless-mountain-02509.herokuapp.com/api/get-location";
    try {
      let response = await axios.get(URL);
      let data = response.data;
      setLocationList([...data.location]);
    } catch (error) {
      alert("Error");
      console.log(error);
    }
  };

  let filterData = (event, option) => {
    let { value } = event.target;
    let checkedValue = Number(event.target.value);
    console.log([checkedValue]);
    let _filter = {};
    switch (option) {
      case "location":
        _filter["location"] = value;
        break;
      case "sort":
        _filter["sort"] = value;
        break;
      case "cuisine":
        //let _cuisine = [2];
        _filter["cuisine"] = checkedValue;
        break;
      case "cost":
        let cost = value.split("-");
        _filter["lcost"] = cost[0];
        _filter["hcost"] = cost[1];
        break;
      case "page":
        _filter["page"] = value;
        break;
    }
    
    setFilter({ ...filter, ..._filter });
  };

  // mounting
  useEffect(() => {
    getLocationList();
  }, []);

  // mounting & update of filter
  useEffect(() => {
    getFilterDetails(filter);
  }, [filter]);

  return (
    <>
      <div className="row justify-content-center">
        <Header bgColor="bg-danger" />
      </div>
      {/* <!-- section --> */}
      <div className="row">
        <div className="col-12 px-5 pt-4">
          <p className="h3">Restaurants In Hyderabad</p>
        </div>
        {/* <!-- food item --> */}
        <div className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
          <SearchFilter locationList={locationList} filterData={filterData} />
          {/* <!-- search result --> */}
          <SearchResult searchList={searchList} filterData={filterData} />
        </div>
      </div>
    </>
  );
}
export default SearchPage;

