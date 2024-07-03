import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import LastSynced from "../../layout/LastSynced";
import StyledTable from "../../ui/styledTable";
import { customerListData } from "../../assets/json/crm";
import { useNavigate } from "react-router-dom";
import { getUsersListforAdmin } from "../../services/userApi";
import { tableHeaderReplace } from "../../utils/tableHeaderReplace";
import StyledSearchField from "../../ui/styledSearchField";
import { searchAndFilter } from "../../utils/search";

const tableHeader = ["Name", "Phone Number", "Email", "RFID", "Tariff"];

function restructureData(dataArray) {
  return dataArray.map(item => ({
    _id: item._id,
    name: item.username,
    email: item.email,
    mobile: item.mobile,
    rfid: item.rfidValues.map((res, i) => (i === item.rfidValues.length - 1 ? res.serialNumber : res.serialNumber + ",")),
    tariff: item.tariffValues.length > 0 ? item.tariffValues.map((res) => res.name) : "Basic",
  }));
}

export default function CustomerLists() {
  const [userListData, setUserListData] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const getTariffData = (filter={pageNo}) => {
    if(searchQuery){
      filter.searchQuery = searchQuery;
    }
    getUsersListforAdmin(filter).then((res) => {
      if (res.status) {
        setUserListData(res.result);
        setTotalCount(res.totalCount);
      }
    });
  };

  useEffect(() => {
    getTariffData();
  }, [pageNo, searchQuery]);

  const navigate = useNavigate();

  const actionClick = (e) => {
    navigate(`/user-details/${e.data._id}`);
  };


  const restructuredData = restructureData(userListData);
  console.log("🚀 ~ CustomerLists ~ restructuredData:", restructuredData)

  const customersList = tableHeaderReplace(restructuredData, ["name", "mobile", "email", "rfid", "tariff"], tableHeader);

  return (
    <Box>
      <LastSynced heading="Customers List" reloadHandle={getTariffData} >
        <StyledSearchField placeholder={'Search'} onChange={(e) => {
          setSearchQuery(e.target.value)
        }} />
      </LastSynced>
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        <StyledTable
          headers={tableHeader}
          data={customersList}
          showActionCell={true}
          actions={["View"]}
          onActionClick={actionClick}
          setPageNo={setPageNo} 
          totalCount={totalCount}
        />
      </Box>
    </Box>
  );
}
