import React, { useMemo } from "react";

// state
import { useSelector } from "react-redux";

// router
import { Link } from "react-router-dom";

// comonents
// prime components
import { BreadCrumb } from "primereact/breadcrumb";

const HFNBreadcrumb = () => {

  const breadcrumb = useSelector(state => state.appDetails.breadcrumb);

  const menuItems = useMemo(() => {
    return breadcrumb.map((menu, index) => {
      return {
        ...menu,
        template: (item, options) => {
          return (
            (breadcrumb.length - 1 === index) ?
              <Link to={`/${item.url}`} className={`disabled ${options.className}`} key={index} >
                <span className={options.labelClassName}>{item.label}</span>
              </Link> :
              <Link to={`/${item.url}`} className={options.className} key={index} >
                <span className={options.labelClassName}>{item.label}</span>
              </Link>

          );
        },
      };
    });
  }, [breadcrumb]);

  return (
    <div>
      <BreadCrumb model={menuItems} />
    </div>
  )
}

export default HFNBreadcrumb;
