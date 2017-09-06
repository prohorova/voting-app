import { Component, OnInit, OnChanges, Input, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('chart') chartContainer: ElementRef;
  @Input() options: Array<any>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initChart();
  }

  ngOnChanges() {
    this.initChart();
  }

  initChart() {
    if (!this.options) return;

    const el = this.chartContainer.nativeElement;

    const width = el.offsetWidth,
          chartWidth = width / 2,
          chartHeight = chartWidth,
          legendSide = 20,
          legendHeight = legendSide + 5,
          legendMarginVert = 5,
          height = chartHeight + legendHeight * this.options.length + legendMarginVert * 2,
          radius = chartHeight / 2;

    const svg = d3.select(this.chartContainer.nativeElement).html('').append('svg')
        .attr('width', width)
        .attr('height', height);

    const chartWrapper = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + chartHeight / 2 + ')');

    const tooltip = d3.select(el).append('div').attr('class', 'tooltip').style('opacity', 0);

    const legendWrapper = svg.append('g').attr('transform', 'translate(0,' + (chartHeight + legendMarginVert) + ')');

    const color = d3.scaleOrdinal(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

    const pie = d3.pie()
      .sort(null)
      .value((d: any) => d.votes);

    const path = d3.arc()
      .outerRadius(0)
      .outerRadius(radius)
      .innerRadius(0);

    const arc = chartWrapper.selectAll('.arc')
      .data(pie(<any>this.options))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', <any>path)
      .attr('fill', (d: any, i: number) => color(i.toString()))
      .on('mousemove', function(d: any) {
        d3.select(this).attr('opacity', 0.8);
        tooltip
          .html(d.data.value + ': ' + d.data.votes + ' vote(s)')
          .style('top', d3.event.pageY + 10 + 'px')
          .style('left', d3.event.pageX + 10 + 'px')
          .style('opacity', 1);
      })
      .on('mouseleave', function() {
        d3.select(this).attr('opacity', 1);
        tooltip.style('opacity', 0);
      });

    const legendGroup = legendWrapper.selectAll('g').data(this.options).enter().append('g')
      .attr('height', legendHeight)
      .attr('transform', (d, i) => 'translate(0,' + legendHeight * i + ')');

    legendGroup.append('rect')
      .attr('width', legendSide)
      .attr('height', legendSide)
      .attr('dx', 0)
      .attr('dy', 0)
      .style('fill', (d: any, i: number) => color(i.toString()));

    legendGroup.append('text')
      .attr('transform', 'translate(' + (legendSide + 5) + ', ' + legendSide / 2 + ')')
      .attr('text-anchor', 'start')
      .attr('dy', '5')
      .style('font-size', 12)
      .text((d) => d.value + ' ' + '(' + d.votes + ')');

  }

}
