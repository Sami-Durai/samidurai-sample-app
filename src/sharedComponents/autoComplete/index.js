import React, { useState, useRef, useCallback } from "react";

// prime components
import { AutoComplete } from "primereact/autocomplete";

// services
import AutoCompleteService from "services/autoComplete/autoComplete.service";

export const HFNAutoComplete = ({ method }) => {

  const [selectedItem, setSelectedItem] = useState(null);

  const [filteredItems, setFilteredItems] = useState(null);

  const service = useRef(new AutoCompleteService());

  const setCountries = useCallback(searchValue => {
    const payload = { college_name: searchValue };

    try {
      service[method](payload)
        .then((res) => {
          setFilteredItems(res.data.data);
        });
    }
    catch {
      console.log("Something went wrong.");
    }
  }, []);

  const searchItems = useCallback(e => {
    const searchValue = e.query;

    if (searchValue.length > 2) {
      setTimeout(() => {
        setCountries(searchValue)
      }, 500);
    } else {
      console.log("search value must be minimum 3 character...")
    }
  }, []);

  return (
    <div className="hfn-auto-complete">
      <AutoComplete
        value={selectedItem}
        suggestions={filteredItems}
        completeMethod={searchItems}
        field="label"
        onChange={(e) => setSelectedItem(e.value)}
      />
    </div>
  );
};

export default HFNAutoComplete;
