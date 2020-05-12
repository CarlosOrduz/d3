const canvas = d3.select("#canvas");

d3.json("https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json").then(data => {
    console.log(data);
    graph(data)
});
function graph(data){
    const width =700
    const height=500
    const margin ={top:10,left:50,bottom: 40, right:10}
    const iwidth =width-margin.left -margin.right
    const iheight =height -margin.top-margin.bottom
    const svg = canvas.append("svg")
    svg.attr("width",width)
    svg.attr("height",height)
    
    let g =svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`)
   
    const x =d3.scaleLinear()
        .domain([0, Math.max.apply(Math, data.map(function(o) { return o.value; }))])
        .range([0,iwidth])
    
    const y=d3.scaleBand()
        .domain(data.map(d=>d.name))
        .range([iheight,0])
        .padding(0.1)
    
    const bars =g.selectAll("rect").data(data)
    
    bars.enter().append("rect")
        .attr("class","bar")
        .style("fill","orange")
        .attr("y",d=>y(d.name))
        .attr("x",0)
        .attr("width",d=>x(d.value))
        .attr("height", y.bandwidth())
    
    g.append("g")
        .classed("x--axis",true)
        .call(d3.axisBottom(x))
        .attr("transform",`translate(0,${iheight})`)
    
    g.append("g")
        .classed("y--axis",true)
        .call(d3.axisLeft(y))
        
}


 /*   
svg.append("rect")
    .attr("x",10)
    .attr("y",10)
    .attr("width",100)
    .attr("height",100)
    .style("fill","steelblue")

const data=[
    {name: "Juan", age: 4},
    {name: "Maria", age: 7},
    {name: "Sandra", age: 24},
    {name: "Elvia", age: 40},
]
const ul = canvas.append("ul");

const li =ul.selectAll("li").data(data)
li.enter()
    .append("li")
    .text(d=>d.name)

data.forEach(d=> ul.append("li").text(d.name))*/
