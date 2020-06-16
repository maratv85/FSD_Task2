class DonutChart {
 constructor(element, params) {
   this.element = element;
   this.params = params;
   this.init();
 }

 init() {
   this.calcParts();
   this.render();
 }

 polarToCartesian(centerX, centerY, radius, angleInDegrees) {
   let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
   return {
     x: centerX + radius * Math.cos(angleInRadians),
     y: centerY + radius * Math.sin(angleInRadians)
   };
 }

 describeArc(x, y, radius, startAngle, endAngle) {
   let start = this.polarToCartesian(x, y, radius, endAngle);
   let end = this.polarToCartesian(x, y, radius, startAngle);
   let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
   let d = [
     "M",
     start.x,
     start.y,
     "A",
     radius,
     radius,
     0,
     largeArcFlag,
     0,
     end.x,
     end.y
   ].join(" ");
   return d;
 }

 calcParts() {
   let sum = 0;
   let count = 0;
   let position = 0;
   let i = 0;

   this.params.namesAndColors.forEach((el) => {
     el.id = i;
     i += 1;
     if (el.count > 0) {
       count += 1;
       sum += el.count;
     }
   });

   this.params.namesAndColors.forEach((el) => {
     if (el.count > 1) {
       const delim = this.params.delimeter;
       const delimHalf = delim / 2;
       const elementPercent = el.count / sum;
       el.start = position + delimHalf;
       position = el.end = position + elementPercent * 360 - delimHalf;
       position += delimHalf;
     }
   });
   this.params.sum = sum
 }

 createGradient(element) {
   const { start, end } = element.gradient;
   const { id } = element;
   return `
    <linearGradient id="grad${id}" x1="50%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${start};stop-opacity:1"></stop>
      <stop offset="100%" style="stop-color:${end};stop-opacity:1"></stop>
    </linearGradient>
   `;
 }
 createPath(element) {
   const { start, end, id } = element;
   return `
     <path stroke="url(#grad${id})" fill="none" stroke-width="4" 
     d="${this.describeArc(60, 60, 56, start, end)}"/>
   `;
 }

 render() {
   let svg = document.createElement("svg");
   this.params.namesAndColors.forEach((el) => {
     svg.innerHTML += this.createGradient(el);
     svg.innerHTML += this.createPath(el);
   });
   this.element.innerHTML = `<svg style="display: block; width: 120px; height: 120px; transform: scale(-1,1)">${svg.innerHTML}</svg>`;
   let sumElement = document.createElement('div')
   sumElement.classList.add('donut-chart__text-container')
   sumElement.innerHTML = `<div class="donut-chart__text-count">${this.params.sum}</div><div class="donut-chart__text">голосов</div>`
   this.element.appendChild(sumElement)
 }
}

document.addEventListener("DOMContentLoaded", () => {
 const params = {
  width: "",
  height: "",
  delimeter: 2,
  namesAndColors: [
    {
      name: "Великолепно",
      gradient: {
        start: "#FFE39C",
        end: "#FFBA9C"
      },
      count: 130
    },
    {
      name: "Хорошо",
      gradient: {
        start: "#6FCF97",
        end: "#66D2EA"
      },
      count: 65
    },
    {
      name: "Удовлетворительно",
      gradient: {
        start: "#BC9CFF",
        end: "#8BA4F9"
      },
      count: 65
    },
    {
      name: "Разочарован",
      gradient: {
        start: "#919191",
        end: "#3D4975"
      },
      count: 0
    }
  ]
 };
 const donut = document.querySelectorAll(".js-donut-chart");
 donut.forEach((val) => new DonutChart(val, params));
});

