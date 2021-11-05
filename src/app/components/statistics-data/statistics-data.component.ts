import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ProductStatistics } from 'src/app/dto/product/productStatistics';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-statistics-data',
  templateUrl: './statistics-data.component.html',
  styleUrls: ['./statistics-data.component.css']
})
export class StatisticsDataComponent implements OnInit {

  chart: any;

  statisticsResp: ProductStatistics[] = [];
  statisticsConverted: number[] = [];

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.getStatistics();
  }

  getStatistics() {
    this.productService.getStatistics().subscribe(
      (res)=>{
        this.statisticsResp = res;

        this.statisticsResp.forEach(element => {
          this.statisticsConverted.push(element.number);
        });

        this.initChart(["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Avg", "Sep", "Oct", "Nov", "Dec"], this.statisticsConverted);
      }
    );
  }

  initChart(labels: string[], numberOfProductsPerMonth: number[]) {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: numberOfProductsPerMonth,
            backgroundColor: '#b5b5b5',
            borderColor: '#ff3333',
            fill: false,
            label: 'Products',
          },
        ],
      },
      options: {
        title: {
          display: true,
          fontSize: 20,
          text: 'Number of added products per month',
        },
        legend: {
          display: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontSize: 15,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
  }

}
