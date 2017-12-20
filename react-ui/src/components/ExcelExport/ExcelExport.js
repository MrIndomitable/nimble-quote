import React from 'react';
import { ExcelFile, ExcelColumn, ExcelSheet } from "react-data-export";
import {Link} from 'react-router-dom';

export const ExcelExport = () => {
  alert(sessionStorage.getItem('exportData'));
  var dataSet = JSON.parse(sessionStorage.getItem('exportData'));
  return (
    <ExcelFile>
        <ExcelSheet data={dataSet} name="Employees">
            <ExcelColumn label="Manufacture" value="manufacture" />
            <ExcelColumn label="Part" value="partNumber" />
            <ExcelColumn label="Target Price" value="targetPrice" />
            <ExcelColumn label="Quantity" value="quantity" />
            <ExcelColumn label="Your offer price" value="" />
        </ExcelSheet>
    </ExcelFile>
  );
};