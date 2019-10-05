import {Component, OnInit} from '@angular/core';
import {User} from './user.model';
import {DataService} from './data.service';
import {Chart} from 'Chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'rest';
  users$: User[];
  constructor(private dataService: DataService){}
  chart =[];
  ngOnInit(){
      this.dataService.getUsers().subscribe((data:any) => {
          console.log(data);
          this.users$ = data.data;
          const ListeNames =this.users$.map(data =>data.surname);
          const ListeAddDates =this.users$.map(data =>data.target_salary);

          const ts =this.users$.map(data =>data.current_salary);

          this.chart = new Chart('canvas', {
              type : 'line',
              data : {
                  labels: ListeNames,
                  datasets: [
                      {
                          data: ListeAddDates,
                          borderColor : 'blue',
                          fill : false
                      },
                      {
                          data: ts,
                          borderColor : 'green',
                          fill : false
                      }
                  ]
              },
              options: {
                  legend: {
                      display : false
                  },
                  scales : {
                      xAxes: [{
                          display: true
                      }],
                      yAxes: [{
                          display: true
                      }]
                  }
              }
          })

      });
  }
}
