import { Component, OnInit,ViewChild } from '@angular/core';
import {CountryService} from '../service/countryservice';
import {SelectItemGroup} from 'primeng/api';
import {Transaction} from '../models/transaction'
import { HttpClient } from '@angular/common/http';
import * as fileSaver from 'file-saver';
import {HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

interface City {
    name: string,
    code: string
}


interface Country {
    name: string,
    code: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  value: Date;
  sliderVal = 10;
  @ViewChild('csvReader',{static: false}) csvReader: any;
  target ="assets/files/template.csv"
  cities: City[];
    selectedValues: string[] = ['val1','val2'];

    selectedCities: City[];
    cities2: [];
    selectedCity: City;

    records ;
    constructor(private http: HttpClient,private countryservice: CountryService) {
        this.cities = [
            {name: 'New York', code: 'NY'},
            {name: 'Rome', code: 'RM'},
            {name: 'London', code: 'LDN'},
            {name: 'Istanbul', code: 'IST'},
            {name: 'Paris', code: 'PRS'}
        ];
        console.log(this.cities)
    }
  ngOnInit() {
  let countries=this.countryservice.getCountries().subscribe(
  res=>
  {
  this.cities2=res.data;
  console.log(this.cities2)
  });
  console.log(countries);
  }
  downloadSample(){
    this.http.get(this.target, {responseType: "blob", headers: {'Accept': 'application/csv'}})
      .subscribe(response => {
        fileSaver.saveAs(response, 'upload_template.csv');
      },
      error=> {console.log('error in downloading')}
      );
  }
  myUploader(event) {
   //let file = event.srcElement.files[0];
   if (this.isValidCSVFile(event.srcElement.files[0])) {
   let input = event.target;
   var reader = new FileReader();
   reader.readAsText(input.files[0]);
    reader.onload = () => {
      //console.log(reader.result.split("\n"));
      let csvData = reader.result;
      let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
      let headersRow = this.getHeaderArray(csvRecordsArray);
       this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
       console.log(this.records)
    };
    }
    else{
    alert("Please import valid .csv file.");
    this.fileReset();
    }

  }
    getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
      let csvArr = [];

      for (let i = 1; i < csvRecordsArray.length; i++) {
        let curruntRecord = (<string>csvRecordsArray[i]).split(',');
        if (curruntRecord.length == headerLength) {
          let transaction: Transaction = new Transaction();
          transaction.symbol = curruntRecord[0].trim();
          transaction.side = curruntRecord[1].trim();
          transaction.qty = curruntRecord[2].trim();
          transaction.price = curruntRecord[3].trim();
          transaction.date = curruntRecord[4].trim();
          csvArr.push(transaction);
        }
      }
      return csvArr;
    }
    isValidCSVFile(file: any) {
      return file.name.endsWith(".csv");
    }
    getHeaderArray(csvRecordsArr: any) {
      let headers = (<string>csvRecordsArr[0]).split(',');
      let headerArray = [];
      for (let j = 0; j < headers.length; j++) {
        headerArray.push(headers[j]);
      }
      return headerArray;
    }
     fileReset() {
        this.csvReader.nativeElement.value = "";
        this.records = [];
      }
      selectionChanged(event)
      {
      console.log(event)
      console.log(this.selectedCities)
      }

}
