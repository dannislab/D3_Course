import { scaleLinear, scaleBand, max } from "d3";

const Barplot = ({ data }) => {
    // 1. X SCALE — Convert student counts into bar widths (pixels).
    // domain = data values; range = visual width in pixels.
    // Example: 68 students becomes 400px.
    const xScale = scaleLinear().domain([0, max(data, (d) => d.students)]).range([0, 520]);

  // 2. Y SCALE — Assign each country a vertical position.
  // scaleBand divides the available height into 20 category slots.
  // padding(0.2) creates spacing between the bars.
  const yScale = scaleBand()
    .domain(data.map((d) => d.country))
    .range([15, 565])
    .padding(0.2);

  return (
    <svg width={900} height={650} viewBox="0 0 700 650" style ={{ height: "auto"}}>
      {/* 3. BARS — React creates one rectangle per country.
          D3 calculates its position, width and height. */}
      {data.map((d) => (
        <rect
          key={d.country}
          x={150} // All bars start at x = 150px
          y={yScale(d.country)} // Vertical position
          width={xScale(d.students)} // Students → pixel width
          height={yScale.bandwidth()} // Bar height
          fill="#F8B79A"
          rx={3} // Slightly rounded corners
        />
      ))}

      {/* 4. COUNTRY LABELS — Display names to the left of the bars.
          textAnchor="end" right-aligns the text at x = 140px. */}
      {data.map((d) => (
        <text
          key={d.country}
          x={140}
          y={yScale(d.country) + yScale.bandwidth() / 2}
          textAnchor="end"
          dominantBaseline="middle"
          fontSize={12}
          fill="#303437"
        >
          {d.country}
        </text>
      ))}

      {/* 5. VALUE LABELS — Display student counts after each bar.
          x = bar starting position + calculated width + 8px gap. */}
      {data.map((d) => (
        <text
          key={d.country}
          x={150 + xScale(d.students) + 8}
          y={yScale(d.country) + yScale.bandwidth() / 2}
          textAnchor="start"
          dominantBaseline="middle"
          fontSize={12}
          fill="#303437"
        >
          {d.students}
        </text>
      ))}
    </svg>
  );
};

export default Barplot;
