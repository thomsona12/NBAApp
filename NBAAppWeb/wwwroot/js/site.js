﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
function buildCourt() {
    const FGAverage = "@ViewBag.FGAverage";
    const ThreeAverage = "@ViewBag.ThreeAverage";
    const PaintAverage = "@ViewBag.PaintAverage";
    const RMidAverage = "@ViewBag.RMidAverage";
    const LMidAverage = "@ViewBag.LMidAverage";
    const RCenMidAverage = "@ViewBag.RCenMidAverage";
    const LCenMidAverage = "@ViewBag.LCenMidAverage";
    const CenMidAverage = "@ViewBag.CenMidAverage";
    const RThreeAverage = "@ViewBag.RThreeAverage";
    const LThreeAverage = "@ViewBag.LThreeAverage";
    const RWingThreeAverage = "@ViewBag.RWingThreeAverage";
    const LWingThreeAverage = "@ViewBag.LWingThreeAverage";
    const CenThreeAverage = "@ViewBag.CenThreeAverage";

    const colourRMidAverage = parseFloat("@ViewBag.RMidAverage") >= parseFloat("@ViewBag.LeagueAverages["RMid"]") ? "#90EE90" : "#ffcccb";
    const colourLMidAverage = parseFloat("@ViewBag.LMidAverage") >= parseFloat("@ViewBag.LeagueAverages["LMid"]") ? "#90EE90" : "#ffcccb";
    const colourLCenMidAverage = parseFloat("@ViewBag.LCenMidAverage") >= parseFloat("@ViewBag.LeagueAverages["LCenMid"]") ? "#90EE90" : "#ffcccb";
    const colourRCenMidAverage = parseFloat("@ViewBag.RCenMidAverage") >= parseFloat("@ViewBag.LeagueAverages["RCenMid"]") ? "#90EE90" : "#ffcccb";
    const colourCenMidAverage = parseFloat("@ViewBag.CenMidAverage") >= parseFloat("@ViewBag.LeagueAverages["CenMid"]") ? "#90EE90" : "#ffcccb";
    const colourPaintAverage = parseFloat("@ViewBag.PaintAverage") >= parseFloat("@ViewBag.LeagueAverages["Paint"]") ? "#90EE90" : "#ffcccb";
    const colourLCornerAverage = parseFloat("@ViewBag.LThreeAverage") >= parseFloat("@ViewBag.LeagueAverages["LCornerThree"]") ? "#90EE90" : "#ffcccb";
    const colourRCornerAverage = parseFloat("@ViewBag.RThreeAverage") >= parseFloat("@ViewBag.LeagueAverages["RCornerThree"]") ? "#90EE90" : "#ffcccb";
    const colourLWingAverage = parseFloat("@ViewBag.LWingThreeAverage") >= parseFloat("@ViewBag.LeagueAverages["LWingThree"]") ? "#90EE90" : "#ffcccb";
    const colourRWingAverage = parseFloat("@ViewBag.RWingThreeAverage") >= parseFloat("@ViewBag.LeagueAverages["RWingThree"]") ? "#90EE90" : "#ffcccb";
    const colourCenThreeAverage = parseFloat("@ViewBag.CenThreeAverage") >= parseFloat("@ViewBag.LeagueAverages["CenterThree"]") ? "#90EE90" : "#ffcccb";

    document.addEventListener("DOMContentLoaded", function () {
        const court = () => {
            const usableWidth = 1000
            const margins = 20
            const height = usableWidth / 50 * 47
            const x = d3.scaleLinear().range([0, usableWidth - margins * 2]).domain([-25, 25])
            const pi = Math.PI / 180
            const y = d3.scaleLinear().range([0, height - margins * 2]).domain([0, 47])
            const arc = (radius, start, end) => {

                const points = [...Array(30)].map((d, i) => i);

                const angle = d3.scaleLinear()
                    .domain([0, points.length - 1])
                    .range([start, end]);

                const line = d3.lineRadial()
                    .radius(radius)
                    .angle((d, i) => angle(i));

                return line(points);

            }
            const threeAngle = Math.atan((10 - 0.75) / 22) * 180 / Math.PI
            const basket = y(4)
            const basketRadius = y(4.75) - basket
            //polygon data for midrange
            const trapezoidRightMidData = [
                { x: x(8), y: y(0) },
                { x: x(21.75), y: y(0) },
                { x: x(21.75), y: y(14) },
                { x: x(8), y: y(8) }
            ];
            const trapezoidLeftMidData = [
                { x: x(-8), y: y(0) },
                { x: x(-21.75), y: y(0) },
                { x: x(-21.75), y: y(14) },
                { x: x(-8), y: y(8) }
            ];
            const trapezoidCenRightMidData = [
                { x: x(8), y: y(8) },
                { x: x(8), y: y(19) },
                { x: x(6), y: y(19) },
                { x: x(9), y: y(26.75) },
                { x: x(21.75), y: y(14) }
            ];
            const trapezoidCenLeftMidData = [
                { x: x(-8), y: y(8) },
                { x: x(-8), y: y(19) },
                { x: x(-6), y: y(19) },
                { x: x(-9), y: y(26.75) },
                { x: x(-21.75), y: y(14) }
            ];
            const trapezoidMidData = [
                { x: x(6), y: y(19) },
                { x: x(-6), y: y(19) },
                { x: x(-9), y: y(26.75) },
                { x: x(9), y: y(26.75) }
            ];

            //three point polygons
            const trapezoidLeftWingData = [
                { x: x(-25), y: y(14) },
                { x: x(-25), y: y(47) },
                { x: x(-19), y: y(47) },
                { x: x(-9), y: y(26.75) },
                { x: x(-21.75), y: y(14) },
            ];


            const trapezoidRightWingData = [
                { x: x(25), y: y(14) },
                { x: x(25), y: y(47) },
                { x: x(19), y: y(47) },
                { x: x(9), y: y(26.75) },
                { x: x(21.75), y: y(14) },
            ];

            const trapezoidCenThreeData = [
                { x: x(19), y: y(47) },
                { x: x(-19), y: y(47) },
                { x: x(-9), y: y(26.75) },
                { x: x(9), y: y(26.75) },
            ];

            const trapezoidLine = d3.line()
                .x(d => d.x)
                .y(d => d.y);


            // Create the SVG element

            const svg = d3.select("#basketball-court")
                .append("svg")
                .attr("width", usableWidth)
                .attr("height", height);

            const g = svg.append('g')
                .attr('transform', `translate(${[margins, margins]})`)
                .style('fill', 'none')
                .style('stroke', '#000')


            //colour polygons for midrange
            g.append('path')
                .datum(trapezoidRightMidData)
                .attr('d', trapezoidLine)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourRMidAverage); // Change the fill color on mouseover

                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout

                });

            g.append('path')
                .datum(trapezoidLeftMidData)
                .attr('d', trapezoidLine)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourLMidAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });



            g.append('path')
                .datum(trapezoidCenRightMidData)
                .attr('d', `
													M ${trapezoidCenRightMidData[0].x} ${trapezoidCenRightMidData[0].y}
													L ${trapezoidCenRightMidData[1].x} ${trapezoidCenRightMidData[1].y}
													L ${trapezoidCenRightMidData[2].x} ${trapezoidCenRightMidData[2].y}
													L ${trapezoidCenRightMidData[3].x} ${trapezoidCenRightMidData[3].y}
													C ${trapezoidCenRightMidData[3].x * 1.25} ${trapezoidCenRightMidData[3].y * 0.86} ${trapezoidCenRightMidData[3].x * 1.36} ${trapezoidCenRightMidData[3].y * 0.60} ${trapezoidCenRightMidData[4].x} ${trapezoidCenRightMidData[4].y}
												`)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourRCenMidAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });

            g.append('path')
                .datum(trapezoidCenLeftMidData)
                .attr('d', `
													M ${trapezoidCenLeftMidData[0].x} ${trapezoidCenLeftMidData[0].y}
													L ${trapezoidCenLeftMidData[1].x} ${trapezoidCenLeftMidData[1].y}
													L ${trapezoidCenLeftMidData[2].x} ${trapezoidCenLeftMidData[2].y}
													L ${trapezoidCenLeftMidData[3].x} ${trapezoidCenLeftMidData[3].y}
													C ${trapezoidCenLeftMidData[3].x * 0.60} ${trapezoidCenLeftMidData[3].y * 0.9} ${trapezoidCenLeftMidData[3].x * 0.30} ${trapezoidCenLeftMidData[3].y * 0.7} ${trapezoidCenLeftMidData[4].x} ${trapezoidCenLeftMidData[4].y}
												`)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourLCenMidAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });


            g.append('path')
                .datum(trapezoidMidData)
                .attr('d', `
													M ${trapezoidMidData[0].x} ${trapezoidMidData[0].y}
													L ${trapezoidMidData[1].x} ${trapezoidMidData[1].y}
													L ${trapezoidMidData[2].x} ${trapezoidMidData[2].y}
													C ${trapezoidMidData[2].x * 1.4} ${trapezoidMidData[2].y * 1.09} ${trapezoidMidData[2].x * 1.7} ${trapezoidMidData[2].y * 1.09} ${trapezoidMidData[3].x} ${trapezoidMidData[3].y}
												`)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourCenMidAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });

            g.append('rect')
                .attr('x', x(-8))
                .attr('y', y(0))
                .attr('width', x(8) - x(-8))
                .attr('height', y(15) + basket)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourPaintAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });

            //colour polygons for three
            g.append('rect')
                .attr('x', x(21.75))
                .attr('y', y(0))
                .attr('width', x(25) - x(21.775))
                .attr('height', y(14))
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourRCornerAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });
            //colour polygons for three
            g.append('rect')
                .attr('x', x(-25))
                .attr('y', y(0))
                .attr('width', x(-21.775) - x(-25))
                .attr('height', y(14))
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourLCornerAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });

            g.append('path')
                .datum(trapezoidLeftWingData)
                .attr('d', `
													M ${trapezoidLeftWingData[0].x} ${trapezoidLeftWingData[0].y}
													L ${trapezoidLeftWingData[1].x} ${trapezoidLeftWingData[1].y}
													L ${trapezoidLeftWingData[2].x} ${trapezoidLeftWingData[2].y}
													L ${trapezoidLeftWingData[3].x} ${trapezoidLeftWingData[3].y}
													C ${trapezoidLeftWingData[3].x * 0.60} ${trapezoidLeftWingData[3].y * 0.9} ${trapezoidLeftWingData[3].x * 0.30} ${trapezoidLeftWingData[3].y * 0.7} ${trapezoidLeftWingData[4].x} ${trapezoidLeftWingData[4].y}
												`)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourLWingAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });

            g.append('path')
                .datum(trapezoidRightWingData)
                .attr('d', `
													M ${trapezoidRightWingData[0].x} ${trapezoidRightWingData[0].y}
													L ${trapezoidRightWingData[1].x} ${trapezoidRightWingData[1].y}
													L ${trapezoidRightWingData[2].x} ${trapezoidRightWingData[2].y}
													L ${trapezoidRightWingData[3].x} ${trapezoidRightWingData[3].y}
													C ${trapezoidRightWingData[3].x * 1.25} ${trapezoidRightWingData[3].y * 0.86} ${trapezoidRightWingData[3].x * 1.36} ${trapezoidRightWingData[3].y * 0.60} ${trapezoidRightWingData[4].x} ${trapezoidRightWingData[4].y}
												`)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourRWingAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });

            g.append('path')
                .datum(trapezoidCenThreeData)
                .attr('d', `
													M ${trapezoidCenThreeData[0].x} ${trapezoidCenThreeData[0].y}
													L ${trapezoidCenThreeData[1].x} ${trapezoidCenThreeData[1].y}
													L ${trapezoidCenThreeData[2].x} ${trapezoidCenThreeData[2].y}
													C ${trapezoidCenThreeData[2].x * 1.4} ${trapezoidCenThreeData[2].y * 1.09} ${trapezoidCenThreeData[2].x * 1.7} ${trapezoidCenThreeData[2].y * 1.09} ${trapezoidCenThreeData[3].x} ${trapezoidCenThreeData[3].y}
												`)
                .style('fill', 'white')
                .style('stroke', 'none')
                .on('mouseover', function () {
                    d3.select(this).style('fill', colourCenThreeAverage); // Change the fill color on mouseover
                })
                .on('mouseout', function () {
                    d3.select(this).style('fill', 'white'); // Change the fill color on mouseout
                });

            // basket
            g.append('circle')
                .attr('r', basketRadius)
                .attr('cx', x(0))
                .attr('cy', y(4.75))

            // backboard
            g.append('rect')
                .attr('x', x(-3))
                .attr('y', basket)
                .attr('width', x(3) - x(-3))
                .attr('height', 1)

            // outer paint
            g.append('rect')
                .attr('x', x(-8))
                .attr('y', y(0))
                .attr('width', x(8) - x(-8))
                .attr('height', y(15) + basket)

            // inner paint
            g.append('rect')
                .attr('x', x(-6))
                .attr('y', y(0))
                .attr('width', x(6) - x(-6))
                .attr('height', y(15) + basket)

            // restricted area
            g.append('path')
                .attr('d', arc(x(4) - x(0), 90 * pi, 270 * pi))
                .attr('transform', `translate(${[x(0), basket]})`)

            // freethrow
            g.append('path')
                .attr('d', arc(x(6) - x(0), 90 * pi, 270 * pi))
                .attr('transform', `translate(${[x(0), y(15) + basket]})`)

            // freethrow dotted
            g.append('path')
                .attr('d', arc(x(6) - x(0), -90 * pi, 90 * pi))
                .attr('stroke-dasharray', '3,3')
                .attr('transform', `translate(${[x(0), y(15) + basket]})`)

            // 3-point lines
            g.append('line')
                .attr('x1', x(-21.775)) // lines up the stroke a little better than the true 22 ft.
                .attr('x2', x(-21.775))
                .attr('y2', y(14))

            g.append('line')
                .attr('x1', x(21.775))
                .attr('x2', x(21.775))
                .attr('y2', y(14))

            //mid-range shot zones
            g.append('line')
                .attr('x1', x(8))
                .attr('y1', y(8))
                .attr('x2', x(21.75))
                .attr('y2', y(14))
                .attr('stroke-dasharray', '3,3')

            g.append('line')
                .attr('x1', x(-8))
                .attr('y1', y(8))
                .attr('x2', x(-21.75))
                .attr('y2', y(14))
                .attr('stroke-dasharray', '3,3')

            g.append('line')
                .attr('x1', x(6))
                .attr('y1', y(19))
                .attr('x2', x(9))
                .attr('y2', y(26.75))
                .attr('stroke-dasharray', '3,3')

            g.append('line')
                .attr('x1', x(-6))
                .attr('y1', y(19))
                .attr('x2', x(-9))
                .attr('y2', y(26.75))
                .attr('stroke-dasharray', '3,3')




            //three point shot zones
            g.append('line')
                .attr('x1', x(-21.775)) // lines up the stroke a little better than the true 22 ft.
                .attr('x2', x(-25))
                .attr('y1', y(14))
                .attr('y2', y(14))
                .attr('stroke-dasharray', '3,3')

            g.append('line')
                .attr('x1', x(21.775)) // lines up the stroke a little better than the true 22 ft.
                .attr('x2', x(25))
                .attr('y1', y(14))
                .attr('y2', y(14))
                .attr('stroke-dasharray', '3,3')

            g.append('line')
                .attr('x1', x(9))
                .attr('y1', y(26.75))
                .attr('x2', x(19))
                .attr('y2', y(47))
                .attr('stroke-dasharray', '3,3')
            g.append('line')
                .attr('x1', x(-9))
                .attr('y1', y(26.75))
                .attr('x2', x(-19))
                .attr('y2', y(47))
                .attr('stroke-dasharray', '3,3')

            // text for averages
            g.append('text')
                .attr('x', x(-1))
                .attr('y', y(10))
                .text(PaintAverage)
            //midrange averages
            g.append('text')
                .attr('x', x(17))
                .attr('y', y(5))
                .text(RMidAverage)

            g.append('text')
                .attr('x', x(-17))
                .attr('y', y(5))
                .text(LMidAverage)
            g.append('text')
                .attr('x', x(-13))
                .attr('y', y(18))
                .text(LCenMidAverage)
            g.append('text')
                .attr('x', x(13))
                .attr('y', y(18))
                .text(RCenMidAverage)
            g.append('text')
                .attr('x', x(-1))
                .attr('y', y(20))
                .text(CenMidAverage)

            //three averages
            g.append('text')
                .attr('x', x(22))
                .attr('y', y(5))
                .text(RThreeAverage)
            g.append('text')
                .attr('x', x(-25))
                .attr('y', y(5))
                .text(LThreeAverage)
            g.append('text')
                .attr('x', x(-21))
                .attr('y', y(22))
                .text(LWingThreeAverage)

            g.append('text')
                .attr('x', x(21))
                .attr('y', y(22))
                .text(RWingThreeAverage)

            g.append('text')
                .attr('x', x(-1))
                .attr('y', y(30))
                .text(CenThreeAverage)
            //three point
            g.append('path')
                .attr('d', arc(y(23.75), (threeAngle + 90) * pi, (270 - threeAngle) * pi))
                .attr('transform', `translate(${[x(0), basket + basketRadius]})`)


            // half court outer
            g.append('path')
                .attr('d', arc(x(6) - x(0), -90 * pi, 90 * pi))
                .attr('transform', `translate(${[x(0), y(47)]})`)

            // half court inner
            g.append('path')
                .attr('d', arc(x(2) - x(0), -90 * pi, 90 * pi))
                .attr('transform', `translate(${[x(0), y(47)]})`)

            // half court line
            g.append('line')
                .attr('x1', x(-25))
                .attr('x2', x(25))
                .attr('y1', y(47))
                .attr('y2', y(47))

            // boundaries
            g.append('rect')
                .style('stroke', '#ddd')
                .attr('x', x(-25))
                .attr('y', y(0))
                .attr('width', x(25))
                .attr('height', y(47))


            return svg.node();
        }
        court();
    });
}