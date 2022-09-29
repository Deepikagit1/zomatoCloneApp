import React, { useEffect, useState } from "react";
import axios from "axios";
import QuickSearchItem from "./QuickSearchItem";

function QuickSearch() {
  let [mealType, setMealType] = useState([]);
  let getQuickSearchData = async () => {
    let URL = "https://nameless-mountain-02509.herokuapp.com/api/get-meal-types";
    try {
      let response = await axios.get(URL);
      let { status, meal_type } = response.data;
      if (status) {
        setMealType([...meal_type]);
      } else {
        alert("Meal Types Not found");
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getQuickSearchData();
  }, []);
  return (
    <>
      <section className="row justify-content-center">
        <section className="col-10 mt-3">
          <h3 className="fw-bold text-navy">Quick Searches</h3>
          <p className="text-secondary">Discover restaurants by type of meal</p>
        </section>
        <section className="col-12">
          <section className="row py-2 d-flex justify-content-center flex-wrap">
              {mealType.map((meal) => {
                return <QuickSearchItem meal={meal} key={meal._id} />;
              })}       
          </section>
        </section>
      </section>
    </>
  );
}

export default QuickSearch;
