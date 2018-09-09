import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DataServiceService } from '../data-service.service';
import { Student } from '../student';
import { BullyEvent } from '../bully-event';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataServiceService]
})
export class DashboardComponent implements OnInit {

  students: Student[] = [];
  bullyEvents: BullyEvent[] = [];
  recentEvents: BullyEvent[] = [];
  classroomScore: number;


  constructor(private dataService: DataServiceService) { }
  startAnimationForLineChart(chart) {
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart) {
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if (data.type === 'bar') {
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };
  ngOnInit() {
      this.dataService.getAllStudents().subscribe(result => {
        this.students = [];
        (<Array<any>>result).forEach(element => {
          const newStudent: Student = new Student();
          newStudent.firstName = element.firstName;
          newStudent.dateOfBirth = element.dateOfBirth;
          newStudent.gender = element.gender;
          newStudent.lastName = element.lastName;
          newStudent.race = element.race;
          this.students.push(newStudent);
        });
      });
      this.dataService.getBullyingEvents().subscribe(result => {
        this.bullyEvents = [];
        (<Array<any>>result).forEach(element => {
          const newEvent: BullyEvent = new BullyEvent();
          newEvent.bully = element.bully;
          newEvent.datetime = element.datetime;
          console.log(newEvent.datetime);
          newEvent.date = new Date(newEvent.datetime / 1000).toLocaleTimeString();
          newEvent.location = element.location;
          newEvent.statement = element.statement;
          newEvent.toxicity = element.toxicity;
          newEvent.victim = element.victim;
          this.bullyEvents.push(newEvent);
          this.classroomScore = 300;

        })
        console.log(this.bullyEvents.slice(this.bullyEvents.length - 10, this.bullyEvents.length - 1));
        this.recentEvents = this.bullyEvents.slice(this.bullyEvents.length - 10, this.bullyEvents.length - 1);
      });
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

      const dataDailySalesChart: any = {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
              [12, 17, 7, 17, 23, 18, 38]
          ]
      };

     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      const dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
          series: [
              [230, 750, 450, 300, 280, 240, 200, 190]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

      const datawebsiteViewsChart = {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [
          [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        ]
      };
      const optionswebsiteViewsChart = {
          axisX: {
              showGrid: false
          },
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
      };
      const responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];
      const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

      // start animation for the Emails Subscription Chart
      this.startAnimationForBarChart(websiteViewsChart);
  }

}
